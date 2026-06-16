---
name: paid-traction-weekly
description: 从 paid-traction-radar 的 SQLite 数据、TrustMRR、Similarweb、Semrush、域名注册时间、网站 metadata 和截图，调查某个给定网站、产品方向、网站类型或增长赛道，并整理"增长产品每周观察"周刊。输出 Markdown 格式，发布到 jinzheio（Astro 博客）和公众号。
---

# Paid Traction Weekly

## 工作目标

把 `paid-traction-radar` 项目中的候选网站数据整理成一份 Markdown 周刊：

- 筛选有可观察增长、注册时间较新、访问量达到阈值的网站。
- 删除不适合公开推荐的产品，例如加密交易、受管制商品、违法灰产、成人内容、赌博、明显侵权或欺诈。
- 获取网站首页、About、FAQ、metadata、headings、公开社区讨论，确认产品到底解决什么问题。
- 输出 Markdown 周刊文件到 jinzheio 项目，同时适合公众号发布。

## 输出路径

周刊 Markdown 文件放在 jinzheio 项目下：

`{jinzheio}/src/content/blog/paid-traction-weekly-{week}.md`

截图放在 jinzheio 项目的 public 目录：

`{jinzheio}/public/images/weekly/{week}/`

## Markdown 格式

每篇周刊使用 jinzheio Astro 博客的 frontmatter + Markdown 正文格式。读取 `references/markdown-format.md` 了解完整模板。

## 默认口径

- 标题：`增长产品每周观察`
- 周期标识：使用 `WEEK {week}`，不要使用"第 n 期"。
- 署名：`@金哲 Dev`
- 默认最多整理 50 个；如果用户指定 Top 15、Top 50 或不限个数，按用户要求。
- 输出格式：Markdown 文件，适合直接发布到 jinzheio 和公众号。

## 数据流程

1. 确认工作目录是 `paid-traction-radar`。
2. 先加载项目根目录 `.env`，再判断 TrustMRR、Similarweb、Semrush 等外部数据源是否有认证信息。不要只看当前 shell 环境变量。
   - 运行项目 CLI 或临时查询脚本时，默认使用 `set -a; source .env; set +a; ...`。
   - 如果 `.env` 存在但命令仍未认证，再检查变量名、登录是否过期或账号权限。
   - 只有确认 `.env` 不存在、缺少对应 key，或加载后仍失败，才写"认证缺失/登录过期"。
   - 不要在日志、报告、提交内容或回复中输出 `.env` 的具体值。
3. 读取数据库和现有报告脚本，优先复用项目内已有 CLI、SQLite 查询和 `paid-traction-table` skill 产物。
   - 本地数据只是起点，不是终点。只要用户要调查、统计、补齐、排行、找相似站或判断流量/收入，本地没有命中时必须继续查线上数据源。不要因为 SQLite、CSV、raw cache 或历史报告没有记录，就直接回复"没有""未命中"或结束任务。
   - 线上补查优先级：项目 dash API/CLI、TrustMRR API、Similarweb dash、Semrush、RDAP/WHOIS、公开一手页面或可验证目录。每个缺口至少尝试一个相应线上源；失败时写清楚失败源和错误类型。
4. 如果用户给定单个网站或域名，并要求查看付费、收费、Stripe/Paddle/PayPal/Creem/Polar、Similarweb、主站流量、referral、相关流量、获客来源或增长情况，必须使用本项目的 Similarweb 访问方法：
   - 先查 SQLite：`domains`、`referral_snapshots`、`referral_records`、`trustmrr_startups`、`trustmrr_metrics`，确认该域名是否已在本地样本、历史报告或支付目标 referral 中出现。
   - 对支付路径，优先查给定网站自己的 Similarweb `Referral -> Outgoing traffic`，看跳出目标是否包含支付网关，例如 `checkout.stripe.com`、`buy.stripe.com`、`billing.stripe.com`、`checkout.paddle.com`、`paypal.com`、`creem.io`、`polar.sh`。这是单域名付费路径调查的第一优先级。
   - `Referral -> Outgoing traffic` 使用 Similarweb dash API，不访问公网页。接口是 `https://sim.3ue.co/api/websiteanalysis/GetOutgoingTable`；UI 默认路由为 `/digitalsuite/websiteanalysis/referrals/*/999/3m?webSource=Total&selectedTab=outgoingTraffic&key=<domain>`。常用参数：`country=999`、`key=<domain>`、`webSource=Total`、`isWWW=false`、`page=1`、`pageSize=100`、`orderby=Share desc`、`sort=Share`、`asc=false`，日期按 `duration` 展开为 `from`、`to`、`isWindow`。
   - 给定网站调查时，先查 UI 默认 `duration=3m` 的 outgoing 表；再按需要查 `1m`、`6m`、`12m`、`Total/Desktop/MobileWeb` 和 `www.<domain>`。如果用户手查和脚本结果不一致，先对齐 UI 上的 duration、country、webSource、isWWW，再下结论。
   - 再查已有支付目标快照，例如 `checkout.stripe.com`、`buy.stripe.com`、`billing.stripe.com`、`checkout.paddle.com`、`paypal.com`、`creem.io`，按 `source_domain` 精确匹配给定域名及常见子域名。
   - 对主站相关流量，使用 `set -a; source .env; set +a; uv run --with requests python -m ptr.cli fetch-similarweb --period 1m --targets <domain> --country 999 --web-source Total --all-pages --max-pages 16 --dry-run` 查看缓存，再在需要时去掉 `--dry-run` 抓取。不要访问 `similarweb.com/website/<domain>` 公网页来替代项目方法。
   - 对支付目标相关流量，也使用同一个 CLI 和 dash API/缓存机制。先 dry-run，复用 `data/raw/similarweb/<month>/<target>/page-*.json`；只有用户要求刷新或缓存缺失时才抓取。
   - 如果本地支付目标样本未命中，不要直接报告"没有"。必须到 Similarweb dash API 直接查：优先查目标站自身的 referral/outgoing 表；反查支付目标时，对目标页执行 `--force` 刷新，或用 API 参数 `orderBy=Domain asc` 分页扫完整返回表，再按给定域名搜索。必要时也查 `Domain desc`。
   - 如果返回"similarweb 超出同一时间设备数量限制"，不要直接停止。先丢弃当前 session，重新调用 `https://dash.3ue.co/api/account/login` 登录，再用新 session 重试同一个 API。重试后再区分结果：JSON 成功、403 权限不足、404 endpoint 不存在、官方 API key 缺失、或请求中断。
   - 非必要不要使用可视 Chrome。普通总访问量、referral、outgoing、支付网关跳转、TrustMRR、Semrush、RDAP/WHOIS 都应优先用 requests/API/CLI 或后台浏览器完成，不能因为方便就打开可视 Chrome。
   - 如果用户能在 Similarweb 页面访问，但脚本请求某个前端接口返回 CloudFront 403，不要直接写抓不到。先用前端 bundle 确认真实接口名，再使用不打扰用户的浏览器路径：优先 Codex Browser 后台 tab 或 GStack `browse` persistent headless Chromium；需要登录态时先导入/复用 cookie 或在后台会话中重新登录。只有后台浏览器仍被风控挡住、且任务必须使用真实可视 Chrome 时，才打开独立的 automation Chrome/profile，并在回复中说明原因；不要占用用户当前正在使用的 Chrome profile 或前台标签页。Similar Sites 当前前端接口为 `https://sim.3ue.co/api/WebsiteOverview/getsimilarsites`，常用参数：`key=<domain>`、`limit=20`、`country=999`、`webSource=Total`。成功后保存原始 JSON 到 `data/raw/similarweb/similar-sites/` 并回填报告/数据库。
   - 如果 API 返回 HTML 登录页，先确认 `.env` 已加载；仍失败时再明确说明"Similarweb dash 抓取不可用"，不要改用 Similarweb 公网页补数。
   - 结论要区分：`not_found` 表示本地和本次 dash 样本未命中；不等于没有收费、没有流量或没有收入。若支付目标样本有最低入榜 visits，给出上限判断。
5. 如果用户要求"调查一个方向""统计某类网站""找高流量/高收入网站"，默认不能只用本地已有结果。必须先做"本地种子 + 实时扩充"：
   - 从本地 SQLite、历史报告、TrustMRR CSV、Similarweb referral 缓存中找第一批种子域名。
   - 用种子域名和方向关键词扩展搜索词：功能词、用户场景词、竞品词、替代品词、价格页词、工具集合词、类目榜单词。
   - 主动到 TrustMRR、Similarweb、Semrush 网站或可用 API 中实时搜索和抓取新数据。优先补：30 日收入、MRR、月访问总量、organic traffic、paid traffic、referring domains、关键词主题、Similarweb 类目排名、payment referral。
   - 用已知域名做竞品发现：搜索 `alternatives`、`competitors`、`best tools`、目录页、Similarweb similar sites、Semrush competitor/organic competitors、官网比较页。
   - 对"大家都知道的高流量网站"单独列基准站，不要因为本地 paid referral 没命中而漏掉。高流量基准站和新注册/本地付费信号站分表或分区展示。
   - 对每个候选域名补齐 `registration_date`、`registered_after_threshold`、`monthly_total_visits`、`trustmrr_revenue_30d`、`similarweb_paid_referral_visits`、`semrush_organic_traffic` 或明确写 `not_found`/`unknown`，不要留空。
   - 如果本地源未命中，必须实时查线上 TrustMRR、Similarweb、Semrush 或公开可验证来源后再下结论。禁止只查本地后直接返回。
   - 如果外部源抓取失败，记录失败原因和已使用的缓存范围；不要把"未命中"写成"没有收入"或"没有流量"。
6. 选择筛选条件：
   - 默认注册时间：用户指定；没有指定时询问或使用最近一年。
   - 默认访问量阈值：用户指定；没有指定时使用 5000。
   - 默认 change：`any`，除非用户要求只看上涨。
   - 默认设备：合并 desktop 与 mobileweb，保留来源字段或聚合说明。
7. 输出候选表，至少包含：
   - domain、registration_date、targets、target_type、monthly_change、estimated_visits、engagement 指标、score。
   - 可选：产品页、价格、TrustMRR、实际收入对照。
8. 对候选网站做人工可读性补充：
   - 首页 title、description、H1/H2/H3。
   - About、FAQ、Pricing、Docs、Product pages。
   - 如果官网不足以判断，用公开社区讨论、Reddit、X、Product Hunt、Trustpilot、目录站或搜索结果补充。
9. 过滤合规和公共发布风险。
10. 按 `references/markdown-format.md` 模板生成 Markdown 周刊文件。

## 数据源扩充规则

调查方向时默认使用这些数据源，按任务相关性取舍：

- **本地库**：`data/paid_traction_radar.sqlite3`、`data/reports/*.csv`、`data/input/trustmrr-latest.csv`、`data/raw/similarweb/**/combined.json`。
- **TrustMRR**：优先使用最新 API/CSV 快照；按域名、产品名、关键词、category 搜索。记录 `trustmrr_revenue_30d`、`mrr`、`growth_30d`、`visitors_30d`、`trustmrr_url`。
- **Similarweb**：只能使用项目 CLI 的 dash API/缓存机制抓 referral 和目标站相关流量，例如 `set -a; source .env; set +a; uv run --with requests python -m ptr.cli fetch-similarweb ...`。不要访问 `similarweb.com/website/<domain>` 公网页。目标站总流量和 traffic sources 若项目 CLI 当前无法覆盖，写明缺口或使用项目已有外部源；不要用公网页截图或搜索摘要填充。遇到登录失败或"超出同一时间设备数量限制"时，先确认 `.env` 已加载，然后用新 session 重新登录并重试，再判断是否失效、权限不足或 endpoint 不存在。
- **Semrush**：作为 Similarweb 总流量未命中时的补充来源，同时查询 organic traffic、paid traffic、organic keywords、paid keywords、referring domains、competitors、keyword themes。已有 Semrush 报告先复用，缺口再实时查。
- **域名年龄**：用 `ptr.cli enrich-domain-age`、RDAP、WHOIS、公开 whois 页面补注册时间。无法稳定取得时写 `unknown`，并说明源失败。
- **公开发现源**：官网、pricing、alternatives/competitors 搜索、Product Hunt、tool directories、Chrome/Shopify/App Store 列表、Reddit/X 讨论、公开榜单。

输出表字段默认包含：

- `domain`
- `product_name`
- `category_or_task`
- `registration_date`
- `registered_after_threshold`
- `monthly_total_visits`
- `monthly_total_visits_source`
- `similarweb_paid_referral_visits`
- `trustmrr_revenue_30d`
- `semrush_organic_traffic`
- `semrush_paid_traffic`
- `source_urls`
- `data_status`
- `notes`

`not_found` 表示查过但对应数据源未命中。`unknown` 表示数据源没有给出稳定结果。不要用空单元格表达缺失状态。

`monthly_total_visits` 和 `similarweb_paid_referral_visits` 是两个不同维度：

- `monthly_total_visits`：目标网站月访问总量，优先来自 Similarweb `Total Visits`；Similarweb 未命中时用 Semrush；两者都未命中时再用 TrustMRR `visitors_30d`。
- `similarweb_paid_referral_visits`：从支付目标页反查到的付款 referral 来源访问。它只是支付路径信号，不代表目标网站总流量、收入或付费用户数。

如果 `similarweb_paid_referral_visits=not_found`，仍必须尝试补 `monthly_total_visits`。大站尤其要看月访问总量，不要把 payment referral 未命中解释为没有流量。

如果目标站总访问量未命中，但 `similarweb_paid_referral_visits` 为正数，不要把 `monthly_total_visits` 留空后直接写 `not_found`。可将 payment referral 写成 `monthly_total_visits_lower_bound` 或在 `monthly_total_visits` 中填可确认下限，并把来源标为 `similarweb_payment_referral_lower_bound`，同时在 notes 中说明这不是精确总访问量。

如果已经存在同一批产品的周刊成稿，转换另一种输出样式时只复用已审核文案和图片，不重新做数据筛选、文案生成、证据补充或合规判断。只有用户要求更新内容、发现明显风险、或原稿缺少必要字段时，才回到数据和文案流程。

## 合规过滤

公开推荐前必须筛掉：

- 加密交易、交易信号、自动交易、BTC/ETH 策略、合约/杠杆相关产品。
- 大麻、受管制药品、处方药、灰产商品、违禁品。
- 赌博、博彩、成人内容、仿冒、账号黑产、明显规避平台规则的服务。
- 需要"猜测用途"才能描述的站点。

如果站点页面信息不足：

1. 查 About、FAQ、Terms、Pricing。
2. 查公开社区讨论。
3. 仍无法确认时，不写进推荐列表。

不要用"页面看起来像""似乎是""更像"这类不确定表述。必须写成可验证的产品定位。

## 文案规则

- 面向公众号读者，直接说产品卖什么、用户是谁、为什么现在值得关注。
- 少用形容词和副词；删除不影响判断的修饰。
- 避免"不是 X，而是 Y"。直接写"它卖的是 Y"。
- 避免解释页面设计意图。
- 不泄露数据源 target domain，例如 `checkout.stripe.com`、`buy.stripe.com`。
- 开头或导语不要暴露信息获取方式，不写"从支付行为、域名时间、访问量、页面内容筛选"这类内部流程。
- 公开稿不要泄露信息源、抓取状态和编辑方法。正文、导语、注释、封面目录和图片文案中不要出现 `Similarweb`、`TrustMRR`、`Semrush`、`RDAP`、`WHOIS`、SQLite、缓存、内部接口、内部 API、seed、种子、筛选口径、数据源、抓取失败、403、登录、快照、raw、target、referral 等内部来源或流程词。内部 CSV、JSON、工作表可以保留来源字段；公开 Markdown、公众号内容只能写读者可理解的结果，例如"月访问""累计收入""注册时间""增长信号"。
- 公开稿不要展示 `not_found`、`unknown`、`checked_no_hit` 等内部缺失状态。缺失字段直接省略，或写成不暴露来源的事实表达，例如"收入未公开""公开访问估算暂缺"；不要解释哪个数据源未命中。
- 如果需要开头观点，关注细分工作流、生活工作场景和 AI 辅助过程优化，而不是泛 AI 生图、AI 视频或简单 wrapper。
- "付款行为增长"规则：
  - 如果增长超过 50%，显示 `付款行为增长 {rounded}%`。
  - 如果增长不超过 50%，仅当付款行为超过 10000 时显示付款行为。
- 公开稿里的付款行为数字必须模糊化，只保留首位有效数字，不展示精确值。中文稿默认用中文量级，例如 `10,351` 写 `1 万+`，`23,631` 写 `2 万+`，`75,331` 写 `7 万+`。内部 CSV、JSON、工作表可以保留精确值，公开 Markdown 必须使用模糊值。
- score 放在开头，显示为四舍五入整数。

## 单个产品结构

每个产品使用这些板块：

- 用户是谁
- 付费场景
- 技术原理
- 流量方法

每个板块写具体场景。避免"提升效率""帮助创作者""AI 工具"这类空泛描述。

"流量方法"写这个网站的主站流量从哪里来、靠什么内容或外部页面被带起来。必须结合主站获客证据，禁止写成我们要采用的推广建议。

- 看搜索词和页面入口：哪些测试名、结果名、题型、分数解释、免费/完整版报告关键词已经带来访问。
- 优先看主站 backlink、referring domain、referral 页面和外部提及：目录站、测评集合页、论坛帖、内容站、学校或机构资源页、App Store / Google Play、Reddit、TikTok、X、小红书、微博、新闻报道。
- Similarweb payment referral 只能证明付款行为或转化路径，不能当作主站获客来源。写"流量方法"时不要用支付入口 referral 代替主站 backlink 分析。
- 看分享证据：结果卡、分数、百分位、人格标签、对比关系、可截图结论是否构成传播素材。
- 看内容扩展证据：每个测试结果的解释页、样题页、比较页、FAQ、报告样例页是否进入索引或获得外链。
- 写成 2 到 4 句事实归因，说明数据指向的获客来源和内容机制。缺失 backlink 或关键词数据时，先用公开搜索、Semrush、Similarweb 主站数据或外部提及补证据；仍缺失时明确写"外链/关键词数据暂缺"，不要猜测。

## 截图规则

网站展示区域默认必须使用真实首页截图，不使用自己制作的产品卡片、渐变卡片、metadata 卡片或文字占位图。

1. 先打开官网首页，等待主要图片、字体和首屏内容加载完成，再截图。
2. 截图前至少做一次页面状态检查：确认页面主体不是空白页、加载页、错误页、cookie 设置页、地区拦截页、登录页或验证码页。
3. 如果页面出现 cookie banner，只能在不影响内容的情况下关闭或接受；如果是全屏 cookie 设置页，处理后重新等待并重新截图。
4. 如果页面需要登录，尝试主站域名，例如 `app.example.com` 改为 `example.com`，或使用公开落地页、官网首页、产品页。
5. 如果截图为空白，增加等待时间、滚动触发懒加载、检查图片请求是否完成，再重新截图。
6. 每张截图保存后必须打开或读取图片做质量检查，确认不是纯白、纯黑、透明、过小、登录页、cookie 页、错误页。
7. 只有官网和公开产品页都不可用时，才可以使用真实 logo、公开产品截图或 hero 区域截图作为替代；替代图必须来自真实公开页面或真实图片资源，并在内部记录原因。
8. 图片放在 `{jinzheio}/public/images/weekly/{week}/` 下，文件名沿用域名 slug。

截图必须在周刊中可读。Markdown 中的图片使用标准 `![](path)` 语法，图片宽度适中，避免在移动端过大。

推荐质量检查方法：

```bash
uv run --with pillow python - <<'PY'
from pathlib import Path
from PIL import Image

for path in Path("public/images/weekly").glob("**/*.png"):
    im = Image.open(path).convert("RGB")
    w, h = im.size
    extrema = im.getextrema()
    flat = max(s[1] - s[0] for s in extrema) < 8
    too_small = w < 600 or h < 400
    if flat or too_small:
        print("check", path, "size=", (w, h), "flat=", flat)
PY
```

图片像素检查只能发现空白、纯色、尺寸异常；还必须人工查看截图内容，确认它展示的是产品首页或公开产品页。

## 质量检查

完成前运行这些检查：

```bash
rg -n "checkout\\.stripe|buy\\.stripe|paddle|lemon|creem|paypal|target_type|target url|target domain" {jinzheio}/src/content/blog/paid-traction-weekly-*.md
rg -n "BTC|加密|crypto|Crypto|cannabis|hash|rosin|大麻|赌博|博彩|成人|不是|而是|似乎|看起来像|更像" {jinzheio}/src/content/blog/paid-traction-weekly-*.md
rg -n "闷声|ISSUE|第 [0-9]+ 期|独立开发者情报" {jinzheio}/src/content/blog/paid-traction-weekly-*.md
rg -n "Similarweb|TrustMRR|Semrush|RDAP|WHOIS|SQLite|缓存|快照|raw|target|referral|抓取失败|403" {jinzheio}/src/content/blog/paid-traction-weekly-*.md
```

再人工检查：

- 产品数量、编号是否一致。
- 每个产品用途是否有证据支持。
- 图片是否来自真实首页或公开产品页，不是自制卡片、占位图、登录页、cookie 设置页、空白页或错误页。
- 文案是否适合公开公众号读者。
- Markdown 格式是否正确，frontmatter 字段是否完整。

## 参考资料

- 输出格式和模板：读取 `references/markdown-format.md`。
- 写作和判断标准：读取 `references/editorial-checklist.md`。
