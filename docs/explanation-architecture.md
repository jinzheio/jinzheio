# Architecture explanation

jinzhe.io 的核心问题不是“展示几个页面”，而是让个人身份、文章、项目、概念和发布渠道保持可引用、可维护、可部署。

## The problem

这个站点同时承担四件事：

1. 个人身份入口。
2. Blog canonical home。
3. 项目和概念索引。
4. 微信公众号复制和 IndexNow 提交这样的发布辅助工作。

如果这些内容都写在页面里，后面会出现三个问题：

- 改项目文案时要翻多个 `.astro` 文件。
- 文章页面和微信公众号复制格式会互相污染。
- 部署说明容易停留在旧架构，比如把 Worker 项目误写成 Cloudflare Pages 静态站。

## The approach

项目把页面拆成四层：

```text
src/pages/
  Astro route files
  Decide URL, prerender behavior, layout props

src/views/
  Page-level composition
  Build each major page from data and components

src/content/
  Typed data and collections
  Blog schema, project data, site copy bridge

messages/en.json
  Shared page copy
```

博客内容使用 Astro content collection。这样 `src/content.config.ts` 可以限制 frontmatter 类型，`getCollection("blog")` 可以在 Blog、Writings、RSS 和文章页之间复用同一批内容。

项目数据放在 `src/content/projects.ts`。普通项目走 `/projects/[slug]`，需要特别视觉结构的项目可以走专用 route。`CommandDeck` 就是例子。

## Why the WeChat copy page is separate

普通文章页使用 Tailwind Typography。它适合网页阅读，但复制到微信公众号编辑器时，背景色、圆角、代码块和图片样式容易被带进去。

所以每篇文章还有一个复制版：

```text
/blog/wechat/[slug]
```

这个页面的特点：

- `noindex`，不参与搜索索引。
- `<base href="https://jinzhe.io" />`，让相对资源在微信里更稳定。
- 主要样式写成 inline style。
- 正文放在 `#wechat-content`，普通文章页的复制按钮只复制这个节点。

这个拆分让网页阅读和微信发布互不牵连。网页样式可以继续迭代，微信复制页只关心粘贴结果。

## Why deployment uses Cloudflare Workers

`astro.config.mjs` 使用：

```js
output: "server",
adapter: cloudflare(),
```

这意味着构建结果不是普通静态目录部署。GitHub Actions 先构建，再用 Wrangler 部署：

```bash
pnpm exec wrangler deploy --config dist/server/wrangler.json
```

`wrangler.toml` 把 Worker 绑定到：

```toml
[[routes]]
pattern = "jinzhe.io/*"
zone_name = "jinzhe.io"
```

这样生产域名由同一个 Worker 服务处理，和 `CLAUDE.md` 里的部署约定一致。

## Why IndexNow is diff-based

IndexNow 不需要每次提交全站 URL。脚本根据 git diff 推导要提交的公开页面：

```text
changed files -> route map / blog slug / global patterns -> URL list
```

这样做有两个直接效果：

- 改一篇文章时，只提交该文章和 `/blog/`。
- 改布局、样式或全局文案时，提交主要公开页面。

它也刻意跳过 `docs/`、`scripts/` 和 `.github/`，因为这些文件通常不会改变站点公开内容。

## Trade-offs

### Copy lives in two places

`messages/en.json` 保存大部分页面文案，但 About、Concepts、Blog 和工具页还有页面内文案。好处是简单，坏处是想做完整 i18n 时需要再收敛。

### Blog pages are prerendered

`/blog/[slug]` 和 `/blog/wechat/[slug]` 都设置 `prerender = true`。好处是文章输出稳定，坏处是文章数量上来后构建时间会增长。

### Project pages mix generic and bespoke paths

普通项目由 `ProjectPage.astro` 统一渲染，`CommandDeck` 使用专用页面。好处是保留表达空间，坏处是新增定制项目时要同时维护 route、view 和导航入口。

### IndexNow route map needs maintenance

`scripts/indexnow-collect-urls.ts` 的 `DIRECT_ROUTE_MAP` 和 `ALL_PUBLIC_ROUTES` 需要跟路由同步。新增公开页面后，如果不更新脚本，相关页面可能不会被 IndexNow 收集。

## Alternatives considered

从代码里能看出至少经历过一次部署路径调整：README 旧写法仍是 Cloudflare Pages，而当前配置已经是 Cloudflare Workers。现在的 Worker 路径更符合 `@astrojs/cloudflare` 的 server output，也能和 `wrangler.toml` 里的 `jinzhe.io/*` route 保持一致。

另一个可选方案是把所有页面都变成纯静态输出。它会让部署更简单，但会弱化后续接入 Worker 能力的空间。当前项目已经选择 Worker 路径，文档和部署流程应跟随这个事实。

## Related

- [Project reference](reference-project.md)
- [How to maintain the site](how-to-maintain-site.md)
- [IndexNow](indexnow.md)
