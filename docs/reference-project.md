# jinzhe.io project reference

jinzhe.io 是 Astro 站点，输出为 Cloudflare Worker。公开页面由 `src/pages/` 路由、`src/views/` 页面视图、`src/content/` 数据和 `messages/en.json` 文案组成。

## Commands

| Command | Effect |
| --- | --- |
| `pnpm dev` | 启动 Astro 开发服务器 |
| `pnpm build` | 运行 `astro check && astro build` |
| `pnpm preview` | 预览构建结果 |
| `pnpm indexnow:collect` | 根据 git diff 收集需要通知 IndexNow 的公开 URL |
| `pnpm indexnow:submit` | 提交 URL 到 IndexNow |

## Runtime and deployment

| Item | Value |
| --- | --- |
| Framework | Astro 7 |
| Adapter | `@astrojs/cloudflare` |
| Output mode | `server` |
| Production route | `jinzhe.io/*` |
| Wrangler config | `wrangler.toml` |
| Deploy command | `pnpm exec wrangler deploy --config dist/server/wrangler.json` |

`astro.config.mjs` 设置：

```js
site: "https://jinzhe.io",
output: "server",
adapter: cloudflare(),
integrations: [react(), mdx()],
```

## Routes

| Route | Source | Notes |
| --- | --- | --- |
| `/` | `src/pages/index.astro` + `src/views/HomePage.astro` | 首页 |
| `/about` | `src/pages/about.astro` | 个人身份页 |
| `/blog` | `src/pages/blog/index.astro` | 文章列表，生产环境过滤 `draft: true` |
| `/blog/[slug]` | `src/pages/blog/[...slug].astro` | 文章详情，`prerender = true` |
| `/blog/wechat/[slug]` | `src/pages/blog/wechat/[slug].astro` | 微信复制版，`noindex` |
| `/projects` | `src/pages/projects/index.astro` + `src/views/ProjectsPage.astro` | 项目列表 |
| `/projects/[slug]` | `src/pages/projects/[slug].astro` + `src/views/ProjectPage.astro` | 普通项目详情 |
| `/projects/commanddeck` | `src/pages/projects/commanddeck.astro` + `src/views/CommandDeckPage.astro` | CommandDeck 定制页 |
| `/concepts` | `src/pages/concepts.astro` | 概念入口 |
| `/ludic-systems` | `src/pages/ludic-systems.astro` + `src/views/LudicSystemsPage.astro` | Ludic Systems 规划页 |
| `/philosophy` | `src/pages/philosophy.astro` + `src/views/PhilosophyPage.astro` | 长期问题页 |
| `/writings` | `src/pages/writings.astro` | 白皮书占位和文章索引 |
| `/tools/wechat-format` | `src/pages/tools/wechat-format.astro` | Markdown 转微信公众号 HTML 工具 |
| `/rss.xml` | `src/pages/rss.xml.ts` | RSS feed |

## Blog content model

`src/content.config.ts` 定义 `blog` collection：

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `title` | `string` | yes | none |
| `description` | `string` | yes | none |
| `pubDate` | `Date` | yes | none |
| `tags` | `string[]` | no | `[]` |
| `draft` | `boolean` | no | `false` |

内容文件位置：

```text
src/content/blog/**/*.md
src/content/blog/**/*.mdx
```

生产环境下，文章列表和文章详情会过滤 `draft: true`。RSS 当前读取所有非草稿文章。

## Project data model

`src/content/projects.ts` 导出 `projects: Project[]`。

`ProjectStatus` 可选值：

```ts
"Active" | "Draft" | "Exploring"
```

`Project` 字段：

```ts
{
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  status: ProjectStatus;
  focus: string[];
  pillars: { title: string; description: string }[];
  capabilities: string[];
  stack: string[];
  notes: string[];
  link?: string;
  logo?: string;
}
```

普通项目由 `/projects/[slug]` 渲染。`commanddeck` 被过滤出去，使用专用页面。

## Site copy

`src/content/site-copy.ts` 从 `messages/en.json` 导入文案：

```ts
import copy from "../../messages/en.json";

export const siteCopy = copy;
```

首页、导航、页脚、Projects、CommandDeck、Ludic Systems 和 Philosophy 都主要读取这个 JSON。About、Concepts、Blog 和工具页仍有部分页面内文案。

## WeChat copy surfaces

站点有两个微信相关入口：

- `/blog/wechat/[slug]`：每篇文章的复制版，使用 inline style 和 `noindex`。
- `/tools/wechat-format`：独立 Markdown 转微信 HTML 工具，客户端使用 `markdown-it`，支持样式预设、图片 base64、IndexedDB 草稿保存和复制 HTML。

普通文章页的复制按钮会 fetch `/blog/wechat/[slug]/`，读取 `#wechat-content`，再写入 Clipboard API。

## IndexNow scripts

`scripts/indexnow-collect-urls.ts`：

- 必填 `--from <git-ref>`。
- 必填 `--out-file <path>`。
- 默认 `--to HEAD`。
- 默认 `--base-url https://jinzhe.io`。
- 跳过 `scripts/`、`docs/`、`.github/` 和 `src/pages/api/`。
- 博客内容变更会添加对应文章 URL 和 `/blog/`。
- 全局样式、布局、站点文案等变更会添加 `ALL_PUBLIC_ROUTES`。

`scripts/indexnow-submit.ts`：

- 必填 `--urls-file <path>`。
- 默认 endpoint 是 `https://api.indexnow.org/indexnow`。
- key 读取顺序：`INDEXNOW_KEY`、`--key`、`public/<key>.txt`。
- 只提交 host 等于 `--base-url` host 的 URL。
- 每批最多 `10_000` 个 URL。
- `--dry-run` 只验证输入和分批，不发送请求。

## Assets and public files

| Path | Use |
| --- | --- |
| `src/assets/images/` | Astro assets 管理的文章图片 |
| `public/icons/` | 项目图标和站点直接引用的静态图标 |
| `public/cd8f71cec5563e0ca2a726bfd47de86e.txt` | IndexNow key 验证文件 |
| `public/_redirects` | Cloudflare 兼容的重定向文件 |

## Git hooks

`.githooks/pre-commit` 会检查 staged PNG：

- 只处理 `src/assets/images/**/*.png`。
- 需要交互确认。
- 使用 `cwebp -q 85` 转成 WebP。
- 转换后移除 PNG，stage 生成的 WebP。

## Related

- [Getting started](tutorial-getting-started.md)
- [How to maintain the site](how-to-maintain-site.md)
- [Architecture explanation](explanation-architecture.md)
- [IndexNow](indexnow.md)
