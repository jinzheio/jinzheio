# 维护阿里云 ECS 镜像站

`https://jinrelay.cn` 是 jinzhe.io 的 ECS 镜像。Cloudflare 接收公网请求，ECS 上的 Caddy 直接提供 Astro 静态产物和 HTTPS。

本文记录当前架构、发布、回滚和 2026-07-16 的 CPU 异常排查。Cloudflare Worker 与 ECS 使用同一套源码，但构建和发布彼此独立。

## 当前请求路径

```text
浏览器
  -> Cloudflare: jinrelay.cn
  -> ECS Caddy: 80 / 443
  -> Astro 静态文件
```

- `http://jinrelay.cn`：Caddy 返回 `308` 并跳转 HTTPS。
- `https://jinrelay.cn`：Cloudflare 连接 ECS 443；Caddy 终止 TLS 并读取静态文件。
- 站点不再运行 Node.js、Wrangler 或 Cloudflare Worker 本地运行时。

## 已安装和正在运行的组件

服务器系统是 Ubuntu 24.04 LTS。Docker 在本次部署前已经安装；宿主机没有安装 Node.js、pnpm、Nginx 或 Caddy。

| 项目 | 当前值 | 用途 |
| --- | --- | --- |
| Caddy 镜像 | `hub.rat.dev/library/caddy:2-alpine` | HTTPS、HTTP 跳转、压缩和静态文件服务 |
| Caddy 容器 | `jinzheio-caddy` | 使用 host network 监听 80/443 |
| 静态 release | `/opt/jinzheio-ecs/releases/<release>/site/` | 每次发布的 Astro 静态产物 |
| 当前 release | `/opt/jinzheio-ecs/current` | 指向当前静态 release |

`jinzheio-caddy` 使用 `restart=unless-stopped`，服务器或 Docker 重启后会自动启动。

ECS 连接 Docker Hub 会超时，所以 Caddy 镜像通过 `hub.rat.dev` 拉取。不要直接在这台机器上依赖 Docker Hub 构建或拉取镜像。

## 服务器文件

```text
/opt/jinzheio-ecs/
  current -> /opt/jinzheio-ecs/releases/<release>
  releases/
    <release>/
      site/
        index.html
        _astro/
        ...

/opt/jinzheio-caddy/
  Caddyfile
  Caddyfile.before-static-<release>
  data/
  config/
```

- `releases/<release>/site/` 是完整静态站，不包含 `.dev.vars`、Cloudflare token 或私钥。
- `current` 切换到新目录后，Caddy 会在后续请求中读取新文件，不需要重启 Caddy。
- `data/` 保存 ACME 账户和 TLS 证书。不要删除它。
- `config/` 保存 Caddy 自动生成的运行配置。
- `Caddyfile.before-static-<release>` 是从旧 Worker 反向代理配置切换到静态配置时保留的备份，不是日常回滚入口。

## Caddy 配置

仓库版本在 [`deploy/Caddyfile.aliyun-ecs`](../deploy/Caddyfile.aliyun-ecs)。服务器上的 `/opt/jinzheio-caddy/Caddyfile` 应与它一致：

```caddyfile
jinrelay.cn {
	encode zstd gzip

	redir /en / 301
	redir /zh / 301
	redir /tools/wechat-format /tools/format 301
	redir /tools/wechat-format/ /tools/format 301

	handle_path /en/* {
		redir {uri} 301
	}

	handle_path /zh/* {
		redir {uri} 301
	}

	handle {
		root * /opt/jinzheio-ecs/current/site
		file_server
	}
}
```

Astro 为旧路径生成 `_redirects`，但 Caddy 不会读取这个文件，所以等价的重定向规则明确写在 Caddyfile 中。

Caddy 通过 Let’s Encrypt HTTP-01 challenge 申请 `jinrelay.cn` 证书。Cloudflare 应使用 `Full (strict)` SSL/TLS 模式，阿里云安全组需要允许 TCP 80 和 443 入站。

## 常用检查

### 通过公网检查

在开发机或任意外部机器运行：

```bash
curl -fsS -o /dev/null -w '%{http_code}\n' https://jinrelay.cn/
curl -fsS -o /dev/null -w '%{http_code}\n' https://jinrelay.cn/blog/
curl -fsS -o /dev/null -w '%{http_code}\n' https://jinrelay.cn/tools/format/
curl -fsS -o /dev/null -w '%{http_code}\n' https://jinrelay.cn/rss.xml
```

四个请求都应返回 `200`。

### 检查 ECS 源站

```bash
ssh aliyun-ecs '
  docker ps --filter name=jinzheio
  curl -fsS --resolve jinrelay.cn:443:127.0.0.1 \
    https://jinrelay.cn/ -o /dev/null
'
```

预期只有 `jinzheio-caddy` 在运行；不应存在 `jinzheio-ecs` Worker 容器，也不应监听 4321。

### 查看日志和证书

```bash
ssh aliyun-ecs 'docker logs --tail 100 jinzheio-caddy'

ecs_ip="$(ssh -G aliyun-ecs 2>/dev/null | awk '$1 == "hostname" { print $2; exit }')"
echo | openssl s_client -connect "$ecs_ip:443" -servername jinrelay.cn 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates
```

证书 subject 应为 `CN=jinrelay.cn`，且 `notAfter` 尚未过期。

## 发布 ECS 静态站

以下命令只更新 ECS，不会部署 Cloudflare Worker。Cloudflare Worker 仍使用 `pnpm build` 和 Wrangler 发布。

1. 本地构建静态产物。

   ```bash
   pnpm build:vps
   ```

   产物在 `dist-vps/`。该命令会先运行检查，再使用 `astro.config.vps.mjs` 生成完整静态站。

2. 上传新 release。

   ```bash
   release="$(date +%Y%m%d-%H%M%S)"

   ssh aliyun-ecs "mkdir -p /opt/jinzheio-ecs/releases/$release/site"

   rsync -az --delete --exclude '.dev.vars' \
     dist-vps/ \
     "aliyun-ecs:/opt/jinzheio-ecs/releases/$release/site/"
   ```

3. 在 4322 端口验证候选 release。

   ```bash
   ssh aliyun-ecs "
     docker run -d --rm \
       --name jinzheio-static-candidate \
       -p 127.0.0.1:4322:80 \
       -v /opt/jinzheio-ecs/releases/$release/site:/usr/share/caddy:ro \
       hub.rat.dev/library/caddy:2-alpine
   "

   ssh aliyun-ecs '
     curl -fsS http://127.0.0.1:4322/ -o /dev/null
     curl -fsS http://127.0.0.1:4322/blog/ -o /dev/null
     curl -fsS http://127.0.0.1:4322/tools/format/ -o /dev/null
     docker rm -f jinzheio-static-candidate
   '
   ```

   候选检查失败时，不要切换 `current`。

4. 原子切换 release。

   ```bash
   ssh aliyun-ecs \
     "ln -sfn /opt/jinzheio-ecs/releases/$release /opt/jinzheio-ecs/current"
   ```

5. 验证源站和公网。

   ```bash
   ssh aliyun-ecs '
     curl -fsS --resolve jinrelay.cn:443:127.0.0.1 \
       https://jinrelay.cn/ -o /dev/null
   '

   curl -fsS -o /dev/null -w '%{http_code}\n' https://jinrelay.cn/
   ```

首次配置静态 Caddy，或 Caddyfile 有修改时，先校验并重新创建容器：

```bash
scp deploy/Caddyfile.aliyun-ecs aliyun-ecs:/tmp/Caddyfile.jinzheio-static

ssh aliyun-ecs '
  set -e
  install -m 0644 /tmp/Caddyfile.jinzheio-static /opt/jinzheio-caddy/Caddyfile
  docker run --rm \
    -v /opt/jinzheio-caddy/Caddyfile:/etc/caddy/Caddyfile:ro \
    -v /opt/jinzheio-ecs:/opt/jinzheio-ecs:ro \
    hub.rat.dev/library/caddy:2-alpine \
    caddy validate --config /etc/caddy/Caddyfile
  docker rm -f jinzheio-caddy
  docker run -d \
    --name jinzheio-caddy \
    --restart unless-stopped \
    --network host \
    -v /opt/jinzheio-caddy/Caddyfile:/etc/caddy/Caddyfile:ro \
    -v /opt/jinzheio-caddy/data:/data \
    -v /opt/jinzheio-caddy/config:/config \
    -v /opt/jinzheio-ecs:/opt/jinzheio-ecs:ro \
    hub.rat.dev/library/caddy:2-alpine
'
```

重建 Caddy 会造成几秒钟的 HTTPS 中断。日常 release 只切换 `current`，不需要重建。

## 回滚

列出 release：

```bash
ssh aliyun-ecs 'ls -1 /opt/jinzheio-ecs/releases'
```

选择已验证的 `<release-id>` 后切换：

```bash
ssh aliyun-ecs \
  'ln -sfn /opt/jinzheio-ecs/releases/<release-id> /opt/jinzheio-ecs/current'
```

然后重新请求 `https://jinrelay.cn/`。如果 Caddyfile 本身被改坏，先恢复相应备份，再按上面的“首次配置静态 Caddy”命令重建容器。

## 2026-07-16 CPU 100% 事件

控制台显示实例 CPU 100%，同时 SSH 在 banner 阶段超时、443 的 TLS 握手也没有返回。控制面仍显示实例运行和健康正常。普通重启停在“停止中”，手动停止再启动后恢复。

已查到的证据：

- 当时的 sysstat CPU 采样只有当天 00:10 的正常值；异常时段没有采样，不能从历史数据还原具体进程。
- 保存下来的 journal 没有 OOM、kernel panic、watchdog、segfault 或被杀进程记录；一次短启动的关机日志是有序停止服务。
- 没有发现常见挖矿进程、陌生 cron 项或异常 SSH 登录。`authorized_keys` 的修改时间也没有异常。
- 恢复后，旧的 `jinzheio-ecs` Worker 容器使用约 407 MB 内存，运行 Wrangler 和多个 Node/workerd 进程。它没有在恢复后持续占满 CPU，但在 2 GiB、无 swap 的机器上不值得继续承担这个负担。

因此，不能证明是“中毒”，也不能从现有日志证明 CPU 100% 的唯一原因。最合理的操作是保留证据、不扩大结论，并移除不必要的 Worker 本地运行时。当前静态 Caddy 容器内存约 15 MB，站点不再依赖 Wrangler、Node 或 4321 端口。

若再次出现高 CPU：先通过阿里云控制台记录 CPU 图、实例时间和进程快照；如果 SSH 尚可用，立即执行：

```bash
ssh aliyun-ecs '
  date
  uptime
  ps -eo pid,ppid,user,stat,pcpu,pmem,lstart,comm,args --sort=-pcpu | head -30
  docker stats --no-stream
  journalctl -k -n 200 --no-pager
'
```

不要先重启，除非 SSH 和 HTTPS 都已经不可用。重启会丢失正在运行的进程快照。

## Cloudflare 与 ECS 的发布边界

Cloudflare Workers 会在 `main` 分支 push 后由 `.github/workflows/deploy.yml` 发布。ECS 不接入该 workflow，仍从开发机本地构建后通过 SSH 和 rsync 上传。

不要让 ECS 主动从 GitHub HTTPS、npm registry 或 Docker Hub 拉取发布依赖：这些连接在实际测试中出现过超时。构建发生在开发机，ECS 只接收静态文件。

## 相关文档

- [How to maintain the site](how-to-maintain-site.md)
- [Architecture explanation](explanation-architecture.md)
- [Project reference](reference-project.md)
