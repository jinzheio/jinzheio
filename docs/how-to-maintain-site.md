# How to maintain the site

这份文档覆盖四个高频任务：发布文章、更新项目页、预览 PR、部署后提交 IndexNow。

## Prerequisites

- 已运行 `pnpm install`。
- 本机能运行 `pnpm build`。
- 如果要部署，GitHub repo 需要配置 `CLOUDFLARE_ACCOUNT_ID` 和 `CLOUDFLARE_API_TOKEN`。

## How to publish a blog post

1. 在 `src/content/blog/` 新建 `.md` 或 `.mdx` 文件。

   文件名会成为 URL slug。例如：

   ```text
   src/content/blog/my-post.mdx
   ```

   文章地址是：

   ```text
   /blog/my-post/
   ```

2. 添加 frontmatter。

   ```md
   ---
   title: "文章标题"
   description: "文章摘要"
   pubDate: 2026-06-27
   tags:
     - 标签
   draft: false
   ---
   ```

   `title`、`description`、`pubDate` 必填。`tags` 和 `draft` 可省略，省略时分别是空数组和 `false`。

3. 如果文章要用图片，把图片放进 `src/assets/images/`，在 MDX 里用 Astro assets 导入。

   ```mdx
   import { Image } from "astro:assets";
   import screenshot from "../../assets/images/example.webp";

   <Image src={screenshot} alt="示例截图" />
   ```

4. 本地检查文章页和微信复制页。

   ```bash
   pnpm dev
   ```

   打开：

   ```text
   http://localhost:4321/blog/my-post
   http://localhost:4321/blog/wechat/my-post
   ```

   `/blog/wechat/[slug]` 带 `noindex`，用于复制到微信公众号编辑器。普通文章页右上角的复制按钮也会读取这个页面的 `#wechat-content`。

5. 构建验证。

   ```bash
   pnpm build
   ```

## How to update the project index

1. 修改 `src/content/projects.ts`。

   每个项目必须包含：

   - `slug`
   - `name`
   - `tagline`
   - `summary`
   - `status`
   - `focus`
   - `pillars`
   - `capabilities`
   - `stack`
   - `notes`

2. 如果是普通项目，不需要新增路由文件。

   `src/pages/projects/[slug].astro` 会读取 `projects` 数组，并为除了 `commanddeck` 之外的项目生成页面。

3. 如果项目需要定制页面，新增专用 route。

   `CommandDeck` 就是这种情况：`src/pages/projects/commanddeck.astro` 使用 `src/views/CommandDeckPage.astro`。

4. 本地打开项目页。

   ```bash
   pnpm dev
   ```

   检查：

   ```text
   http://localhost:4321/projects
   http://localhost:4321/projects/<slug>
   ```

5. 构建验证。

   ```bash
   pnpm build
   ```

## How to preview a pull request

PR 打开或更新后，`.github/workflows/preview.yml` 会构建当前分支，把生成的 Wrangler 配置改成无生产 route 的 preview 配置，然后运行：

```bash
pnpm exec wrangler deploy --config dist/server/preview.wrangler.json
```

Preview Worker 名称是 `jinzheio-pr-<number>`。它只挂 `workers.dev`，不会绑定 `jinzhe.io/*` 生产 route，也不会创建 session KV。Workflow 会把 `*.workers.dev` preview URL 写到 PR 评论里。

PR 关闭或合并后，workflow 会删除同名 preview Worker：

```bash
pnpm exec wrangler delete jinzheio-pr-<number> --force
```

注意两点：

- `wrangler.toml` 保留 `preview_urls = true`，后续原生 Worker version preview 也可以使用。
- Workflow 只处理同仓库分支的 PR。fork PR 没有 Cloudflare secrets，不会上传 preview。

## How to deploy and submit IndexNow

1. 推送到 `main`。

   `.github/workflows/deploy.yml` 会在 `main` push 后部署。流程是：

   ```bash
   pnpm install --frozen-lockfile
   pnpm run build
   pnpm exec wrangler deploy --config dist/server/wrangler.json
   ```

2. 如果这次 commit 不应该部署，在 commit message 里写 `[skip deploy]`。

   GitHub Actions 的 deploy job 会跳过包含 `[skip deploy]` 的 push。

3. 部署后收集变化 URL。

   ```bash
   tmp_file="$(mktemp)"
   pnpm indexnow:collect --base-url https://jinzhe.io --from <old-ref> --to <new-ref> --out-file "$tmp_file"
   ```

4. 先 dry run。

   ```bash
   pnpm indexnow:submit --base-url https://jinzhe.io --urls-file "$tmp_file" --dry-run
   ```

5. 确认 URL 正确后提交。

   ```bash
   pnpm indexnow:submit --base-url https://jinzhe.io --urls-file "$tmp_file"
   ```

## Verification

每次修改后至少运行：

```bash
pnpm build
```

如果修改了 IndexNow 脚本，再用一个已知 diff 跑：

```bash
tmp_file="$(mktemp)"
pnpm indexnow:collect --base-url https://jinzhe.io --from origin/main --to HEAD --out-file "$tmp_file"
cat "$tmp_file"
pnpm indexnow:submit --base-url https://jinzhe.io --urls-file "$tmp_file" --dry-run
```

## Troubleshooting

### `pnpm build` 报 frontmatter 类型错误

检查文章是否满足 `src/content.config.ts` 的 schema：`title`、`description`、`pubDate` 必填，`tags` 必须是字符串数组。

### 生产环境看不到草稿

这是预期行为。`/blog` 和 `/blog/[slug]` 在 `import.meta.env.PROD` 下会过滤 `draft: true` 的文章。

### 微信复制样式不对

不要从普通文章页手动全选复制。打开 `/blog/wechat/<slug>`，复制 `#wechat-content` 对应正文，或点击普通文章页右上角的复制按钮。

### IndexNow 没有收集到 URL

`scripts/indexnow-collect-urls.ts` 只处理已映射的页面、博客内容、全局配置和样式变更。只改 `docs/`、`scripts/` 或 `.github/` 时会跳过，因为这些不是公开页面内容。
