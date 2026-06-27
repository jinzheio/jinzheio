# Getting started

这份教程带你在本机跑起 jinzhe.io，并确认 Blog、Projects 和工具页都能打开。

## 你需要准备

- Node.js 22。GitHub Actions 也使用 Node.js 22。
- pnpm 10。`package.json` 声明了 `pnpm@10.23.0`。
- 已经 clone 下来的仓库。

## Step 1: 安装依赖

在项目根目录运行：

```bash
pnpm install
```

安装完成后，`node_modules/` 会出现在项目根目录。`prepare` 脚本会把 Git hooks 指向 `.githooks`，用于提交图片时检查 PNG。

## Step 2: 启动开发服务器

运行：

```bash
pnpm dev
```

Astro 默认会监听 <http://localhost:4321>。打开这个地址后，你应该能看到首页。

## Step 3: 检查主要页面

在浏览器里打开这些页面：

- <http://localhost:4321/blog>
- <http://localhost:4321/projects>
- <http://localhost:4321/concepts>
- <http://localhost:4321/tools/wechat-format>

如果 `/blog` 能看到文章列表，说明 `src/content/blog/` 的内容集合加载正常。

如果 `/tools/wechat-format` 能输入 Markdown 并看到预览，说明页面里的 `markdown-it` 客户端脚本加载正常。

## Step 4: 运行生产构建

停止开发服务器，然后运行：

```bash
pnpm build
```

这条命令先执行 `astro check`，再执行 `astro build`。构建成功后，Cloudflare Worker 输出会写入 `dist/`，GitHub Actions 部署时会使用 `dist/server/wrangler.json`。

## What you built

你现在有一个能本地运行、能通过类型检查、能生成 Cloudflare Worker 输出的 jinzhe.io。下一步看 [How to maintain the site](how-to-maintain-site.md)，按任务更新文章、项目页或部署相关内容。
