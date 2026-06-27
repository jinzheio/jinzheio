# CLAUDE.md — jinzhe.io

## 项目性质

jinzhe.io 是个人站点，包含 blog、About、Concepts 等页面。Blog 是公众号「金哲 Dev」的 canonical home，SEO 资产和首发地；公众号隔天发，是分发渠道。

## 写作规则

本项目的写作规则统一维护在 `/Users/hwang/Projects/aboutme/` 下。写作前按任务类型读取：

- **about.md** — 任何任务前读取（身份、目标、约束）。
- **voice.md** — 写作/编辑/发布/命名/UX 文案/README 等对外文本。
- **voice-content.md** — blog、公众号、X 等中文内容渠道（中文、有判断）。
- **anti-style.md** — 写作时的禁用词和禁用结构清单。

## 内容策略

所有产出内容（blog 文章、公众号、X 等）默认先调用 dbs 系列 skill 诊断方向，再进行写作。使用 Perell 三层框架自检：

- **吸引型**（故事/数据/截图）→ 写
- **教学型**（方法/判断/框架）→ 写
- **武器型**（具体渠道/话术/关键词）→ 滞后或付费

透明边界的原则：**结果让别人看见，路径不要同时让别人看见。** 路径不是永远不说——是等你已经换打法了、那条路走完了，回头当故事讲。"同时"是关键词：Marc Lou 写"当年没收入但坚持 build"是已经完成的叙事，不是他当前正在依赖的获客方式。Pieter Levels 的全透明策略不适用于本项目——他的商业模式就是透明本身，我们不是。

## 技术栈

- Astro 静态站点
- MDX blog 内容（`src/content/blog/`）
- 部署到 Cloudflare Pages

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
- Author a backlog-ready spec/issue → invoke /spec
