# Research: 个人博客系统

## Decision 1: 不直接扩展现有 CRA 微前端，而是在仓库内新增独立博客应用

- **Decision**: 在仓库内新增 `apps/blog-web` 作为博客系统主承载应用，保留现有 `src/` 微前端代码不动。
- **Rationale**: 现有项目是基于 CRA 的静态前端子应用，不具备天然的 ISR、SEO 友好页面输出、服务端认证回调、文件上传和内容 API 运行时。新增独立应用能把新功能边界与历史代码明确隔离。
- **Alternatives considered**:
  - 继续在现有 CRA 微前端中实现：被否决，因为 ISR、SEO 与认证写入能力实现成本过高且不自然。
  - 另开新仓库：被暂时否决，因为当前 Spec Kit 产物与需求上下文都已存在于本仓库中。

## Decision 2: 采用支持 ISR 的全栈 React 框架承载公开站点与后台

- **Decision**: 使用支持 SSR/ISR、服务端路由和服务端元信息输出的 React 全栈框架来承载博客系统，推荐 Next.js App Router。
- **Rationale**: 需求明确要求首页和文章页支持 ISR，且公开页面需要正确输出 SEO 元信息，这类能力最自然的承载方式是支持服务端页面生成和按路径增量再生成的 React 框架。
- **Alternatives considered**:
  - CRA + `react-snap` 或手写预渲染：被否决，因为动态内容更新和按页面再生成能力不足。
  - 传统前后端分离 SPA + 后端模版站：被否决，因为会拆散开发模型，后台和前台重复实现成本更高。

## Decision 3: 认证使用 GitHub OAuth + 邮箱密码，统一落到同一个用户模型

- **Decision**: 使用统一的 `User + AuthIdentity` 认证模型，支持邮箱密码身份和 GitHub OAuth 身份绑定；新注册用户默认角色为 `reader`。
- **Rationale**: 这与澄清结果一致，能兼顾安全与扩展性。GitHub OAuth 同邮箱冲突场景要求用户先登录原账号后再手动绑定，可避免仅凭邮箱自动合并造成账号接管风险。
- **Alternatives considered**:
  - GitHub 同邮箱自动绑定：被否决，因为安全风险高。
  - 两套独立用户体系：被否决，因为权限和资料同步成本高。

## Decision 4: 使用 PostgreSQL + Prisma 管理博客核心数据

- **Decision**: 使用 PostgreSQL 作为主存储，Prisma 负责模式定义、迁移与查询访问。
- **Rationale**: 文章、标签、分类、评论、用户角色和身份绑定都属于强关系模型，且需要唯一性、外键与多对多关系支持。Prisma 适合 TypeScript 团队快速建立清晰的数据层。
- **Alternatives considered**:
  - SQLite：适合本地原型，但不适合作为长期部署方案。
  - 文档数据库：被否决，因为标签多对多、分类迁移和权限约束更适合关系型建模。

## Decision 5: 文章存储原始 Markdown，并在渲染侧生成 HTML

- **Decision**: 数据库存储原始 Markdown 内容，公开详情页与后台预览使用统一 Markdown 渲染链进行展示。
- **Rationale**: 原始 Markdown 便于作者编辑、版本迁移和渲染策略演进。后台实时预览与前台详情渲染共享渲染规则，可以降低内容表现不一致的问题。
- **Alternatives considered**:
  - 只存 HTML：被否决，因为会损失编辑友好性与可迁移性。
  - 使用富文本 JSON Schema：被否决，因为需求已明确偏向 Markdown 写作体验。

## Decision 6: 图片上传先走本地存储适配器，存储能力通过接口抽象

- **Decision**: 第一阶段使用本地文件系统存储图片，但所有上传流程都经过统一 `StorageProvider` 抽象。
- **Rationale**: 这样可以最快满足当前需求，同时保留未来接入对象存储的扩展空间，而不需要重写业务层逻辑。
- **Alternatives considered**:
  - 直接写死本地路径：被否决，因为未来迁移云存储会造成广泛改动。
  - 一开始就上云存储：被否决，因为超出当前需求最小交付范围。

## Decision 7: 再生成策略采用“发布/更新/归档时按路径触发”

- **Decision**: 首页、文章详情页、标签页和分类页采用增量静态再生成或等效按路径再生成策略；发布、更新、归档、标签变更、分类迁移时触发相关路径失效与重建。
- **Rationale**: 这样既能满足公开访问性能，也能确保内容变更及时反映到关键公共页面。
- **Alternatives considered**:
  - 全量重建整个站点：被否决，因为发布一篇文章就重建全部页面代价过高。
  - 完全动态 SSR：被否决，因为无法充分利用静态缓存优势。

## Decision 8: 评论默认公开，管理员事后治理

- **Decision**: 已登录读者提交的评论默认立即公开；管理员可以隐藏或删除评论。
- **Rationale**: 这是澄清后的规则，能最大化互动性并减少审核等待成本，同时通过登录门槛和后台治理控制风险。
- **Alternatives considered**:
  - 全量预审核：被否决，因为实现复杂度更高且影响互动体验。
  - 彻底不开放评论：被否决，因为不满足需求。

## Decision 9: 文章 URL 使用唯一 `slug`，首次发布后保持稳定

- **Decision**: 文章详情 URL 使用唯一可读 `slug`；`slug` 自动由标题生成，作者可在首次发布前调整，发布后保持稳定。
- **Rationale**: 这与 SEO、分享体验和缓存键稳定性高度一致，且已在澄清阶段确认。
- **Alternatives considered**:
  - 使用纯数字 ID：被否决，因为可读性和 SEO 较差。
  - 发布后允许任意改 `slug`：被否决，因为会破坏链接稳定性与缓存路径。
