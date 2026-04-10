# Implementation Plan: 个人博客系统

**Branch**: `001-personal-blog-system` | **Date**: 2026-04-11 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-personal-blog-system/spec.md`

**Note**: This plan documents the target implementation architecture for the blog system. It intentionally records constitution conflicts instead of hiding them.

## Summary

本功能要交付一个完整的个人博客平台，覆盖公开阅读、搜索筛选、GitHub OAuth 与邮箱密码登录、角色权限、Markdown 写作后台、评论、分类标签、SEO、图片上传，以及首页和文章页的 ISR 或等效增量静态再生成能力。

结合当前仓库现状与功能要求，计划采用“仓库内新增独立博客应用”的方案，而不是直接在现有 CRA 微前端子应用中硬扩展。推荐在仓库内新增 `apps/blog-web` 作为全栈博客应用，使用 React 18 + TypeScript + 支持 ISR 的服务端 Web 框架来承载公共博客站点、管理后台、认证、内容 API 与再生成能力；现有 `src/` 下的微前端代码在首阶段保持不动，避免把 ISR、SEO、认证回调和上传写入能力强行塞进现有静态子应用模型。

## Technical Context

**Language/Version**: TypeScript 5.x（新博客应用）；现有仓库保留 TypeScript 4.9.5 基线直至完成架构切换  
**Primary Dependencies**: React 18, Next.js（App Router，用于 SSR/ISR 与路由处理）, Ant Design 5, Auth.js（GitHub + Credentials）, Prisma ORM, PostgreSQL, react-markdown/remark/rehype, Zod  
**Storage**: PostgreSQL（用户、文章、评论、标签、分类、身份绑定）；本地文件系统（图片上传），并通过存储适配器预留云存储接口  
**Testing**: Jest + Testing Library（单元/UI）, Playwright（关键用户旅程）, API integration/contract verification（路由与权限场景）  
**Target Platform**: Linux 容器化部署，Nginx 反向代理 + Node.js 应用运行时；桌面端与移动端现代浏览器  
**Project Type**: 仓库内新增的全栈 Web 应用，与现有微前端代码并存  
**Performance Goals**: 公开首页与文章页命中再生成缓存时 TTFB < 1s；发布或更新文章后，首页和文章详情页在 5 分钟内完成再生成并对外可见；后台分页列表操作的感知响应时间 < 300ms  
**Constraints**: 必须支持角色权限、SEO 元信息、响应式布局、Markdown 实时预览、本地上传优先且可扩展到云存储、发布后稳定 `slug`、评论默认公开后可管理；当前宪章的 CRA 微前端与静态托管基线无法直接满足上述能力  
**Scale/Scope**: 单站点个人博客，数百到数千篇文章，低写入并发，三种角色，公开读流量高于后台写流量

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Gate 1 - 技术栈一致性**: `FAIL（需批准例外）`
  原宪章要求基于 CRA + CRACO 的 React 微前端子应用；本方案引入独立的支持 ISR 的全栈博客应用，已超出原前端子应用边界。
- **Gate 2 - 微前端兼容性优先**: `PASS（对现有应用） / NOT APPLICABLE（对新增博客应用）`
  现有 `src/` 微前端代码在本计划中保持不动；博客系统以新增应用承载，不直接破坏现有 qiankun 子应用契约。
- **Gate 3 - 函数式 React 架构**: `PASS`
  新应用仍使用 React 函数组件、Hooks、模块化目录以及清晰的 `components/` / `features/` / `lib/` 分层。
- **Gate 4 - 统一 UI 与状态模型**: `PASS WITH ADAPTATION`
  管理后台继续沿用 React 18 + Ant Design 体系；管理端复杂共享状态可保留 Redux/Rematch 思路，公共页面尽量减少全局客户端状态。
- **Gate 5 - 工程质量与交付纪律**: `FAIL（需批准例外）`
  原宪章基线是静态 Nginx 托管；本方案需要 Node.js 应用运行时、数据库与可写上传目录，CI/CD 也需要同步升级。

**Gate Result**: `CONDITIONAL`
本计划继续推进的前提是：团队接受“为博客系统新增独立全栈应用”的架构例外，或在实施前修订宪章。若不接受该例外，则必须缩减需求，放弃 ISR、服务端 SEO 页面和动态认证回调能力。

**Post-Design Re-Check**:
- Phase 1 设计后未新增新的宪章冲突项。
- 已确认的例外仍为两项：`新增支持 ISR 的全栈应用`、`引入 Node 运行时 + 数据库 + 上传存储`。

## Project Structure

### Documentation (this feature)

```text
specs/001-personal-blog-system/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── openapi.yaml
└── tasks.md
```

### Source Code (repository root)

```text
apps/
└── blog-web/
    ├── app/
    │   ├── (public)/
    │   │   ├── page.tsx
    │   │   ├── about/page.tsx
    │   │   ├── tags/[slug]/page.tsx
    │   │   ├── categories/[slug]/page.tsx
    │   │   └── articles/[slug]/page.tsx
    │   ├── (admin)/
    │   │   ├── dashboard/page.tsx
    │   │   ├── articles/
    │   │   ├── categories/
    │   │   ├── tags/
    │   │   └── users/
    │   └── api/
    │       ├── auth/
    │       ├── public/
    │       ├── admin/
    │       └── uploads/
    ├── components/
    ├── features/
    │   ├── auth/
    │   ├── articles/
    │   ├── categories/
    │   ├── tags/
    │   ├── comments/
    │   ├── dashboard/
    │   └── media/
    ├── lib/
    │   ├── auth/
    │   ├── db/
    │   ├── markdown/
    │   ├── seo/
    │   ├── storage/
    │   ├── permissions/
    │   └── validation/
    ├── prisma/
    ├── public/
    │   └── uploads/
    └── tests/
        ├── e2e/
        ├── integration/
        └── unit/

src/
├── ...existing legacy microfrontend code retained during initial delivery

.specify/
└── ...planning artifacts
```

**Structure Decision**: 选择“仓库内新增独立博客应用”的结构，而不是直接改造现有 `src/` 微前端。这样能在不破坏现有子应用契约的前提下交付 ISR、SEO、OAuth 回调、数据库与上传能力，并让迁移边界清晰可控。

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 在仓库内新增独立全栈博客应用 | 需要支持 ISR、SEO 友好的公开详情页、认证回调、图片上传与内容 API | 继续扩展现有 CRA 微前端会导致 SSR/ISR、SEO 页面输出和上传能力都需要绕路实现，复杂度更高且效果更差 |
| 引入数据库与 ORM | 用户角色、文章、标签多对多、分类单选、评论管理都需要可靠关系模型与约束 | 使用本地 JSON/文件难以保证唯一性、权限控制、迁移与查询能力 |
| 引入 Node 运行时与可写上传目录 | 需要路由处理、再生成触发、认证流程、本地上传与未来云存储扩展 | 纯静态 Nginx 托管无法承载动态认证、上传写入和页面增量再生成 |
