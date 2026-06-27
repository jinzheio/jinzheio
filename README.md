# jinzhe.io

jinzhe.io 是个人站点，包含 About、Blog、Projects、Concepts、Writings 和工具页。

Blog 是公众号「金哲 Dev」内容的 canonical home。站点使用 Astro，构建后部署到 Cloudflare Workers。

## 快速开始

```bash
pnpm install
pnpm dev
```

打开 <http://localhost:4321>。

## 常用命令

| 命令 | 用途 |
| --- | --- |
| `pnpm dev` | 启动本地开发服务器 |
| `pnpm build` | 运行 `astro check`，然后构建 Cloudflare Worker 输出 |
| `pnpm preview` | 预览构建结果 |
| `pnpm indexnow:collect --base-url https://jinzhe.io --from <old-ref> --to <new-ref> --out-file <file>` | 根据 git diff 收集需要提交给 IndexNow 的 URL |
| `pnpm indexnow:submit --base-url https://jinzhe.io --urls-file <file>` | 提交 URL 到 IndexNow |

## 文档

| 文档 | 用途 |
| --- | --- |
| [Getting started](docs/tutorial-getting-started.md) | 从安装到看到本地站点 |
| [How to maintain the site](docs/how-to-maintain-site.md) | 发布文章、更新项目、部署和提交 IndexNow |
| [Project reference](docs/reference-project.md) | 项目结构、路由、内容模型、命令和配置 |
| [Architecture explanation](docs/explanation-architecture.md) | 为什么站点这样组织内容、复制页和部署 |
| [IndexNow](docs/indexnow.md) | IndexNow 脚本的独立说明 |

## 部署

GitHub Actions 在 `main` 分支 push 后运行 `.github/workflows/deploy.yml`：

1. 安装 pnpm 依赖。
2. 运行 `pnpm run build`。
3. 运行 `pnpm exec wrangler deploy --config dist/server/wrangler.json`。

`wrangler.toml` 里的生产路由是 `jinzhe.io/*`。部署目标是 Cloudflare Workers，不要按 Cloudflare Pages 静态站配置。
