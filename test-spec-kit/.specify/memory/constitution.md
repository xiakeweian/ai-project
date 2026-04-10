# Test Spec Kit 宪章

## 核心原则

### 一、架构与场景匹配
本仓库允许在统一工程规范下并存多种 React 应用形态，但每一种形态都必须服务于明确业务目标，而不是随意叠加技术。当前已认可的两类架构基线如下：

1. 现有基线：基于 React 18+、React DOM 18+、TypeScript 4.9.5、`react-scripts` 5.0.1、CRACO 7+ 与 `craco-less` 的 CRA 微前端子应用。
2. 博客基线：面向公开站点与后台管理的全栈博客应用，可采用 React 18+、TypeScript 与支持 SSR/ISR、服务端路由和 SEO 元信息输出的 React 全栈框架承载，推荐 Next.js App Router。

任何新增应用都必须在 spec/plan 中说明为何选择该架构，并明确与现有应用的边界、共享资源与迁移策略。

### 二、兼容性与隔离并重
现有微前端子应用继续以 qiankun 兼容性为最高优先级。凡是修改现有 `src/` 目录下子应用入口、路由、打包配置或主子通信能力的变更，都必须保留 `__POWERED_BY_QIANKUN__` 检测、`bootstrap` / `mount` / `unmount` 生命周期、动态 `publicPath` 和 UMD 输出能力。

新增博客应用不受 qiankun 子应用契约约束，但必须与现有微前端代码物理隔离，推荐放置于 `apps/` 目录下，不得通过破坏现有子应用运行模式来换取博客能力。对现有系统的影响必须通过明确的适配层或部署边界控制，而不是隐式替换。

### 三、函数式 React 与清晰分层
所有新增 React 代码必须优先使用函数式组件或箭头函数组件，并配合 React Hooks 编写。代码结构必须清晰分层：

- 微前端子应用继续沿用 `components/`、`hooks/`、`constants/`、`services/`、`config/` 等既有目录约定。
- 新增博客应用应采用面向领域的结构，如 `app/`、`components/`、`features/`、`lib/`、`tests/`，并把页面路由、领域逻辑、基础设施逻辑分开管理。

组件命名必须使用大驼峰，代码实现应优先选择可组合的小模块，而不是职责混杂的大文件。

### 四、统一体验与按应用选型
Ant Design 与 `@ant-design/icons` 仍是仓库默认 UI 基线，`styled-components`、CSS、CSS Modules 和 Less 都属于允许使用的样式方案。内部业务 UI 在可满足需求时应优先复用 `@cos-power/cos-power-pc-ui`，特别是在现有微前端子应用中。

状态管理与渲染策略遵循“按应用选型”的原则：

- 微前端子应用继续优先使用现有 Redux + React-Redux + Rematch 模型，以及 `react-router-dom` 6.x + `BrowserRouter`。
- 博客应用可以依据 SSR/ISR、SEO 和后台交互需求采用更适合的服务端/客户端混合渲染模式，并根据场景选择局部状态、服务端数据获取或集中状态管理。

### 五、工程质量与可交付运行时
包管理统一使用 `pnpm`。代码质量门禁仍通过 ESLint、`@typescript-eslint`、`eslint-plugin-react`、Stylelint 规则以及 Commitlint 保证。部署与运行时不再只限定为静态 Nginx 托管，而是允许以下两种交付模式：

1. 静态前端模式：适用于现有 CRA 微前端子应用，继续使用 Docker + Nginx 静态资源托管。
2. 全栈运行时模式：适用于博客应用，允许使用 Node.js 应用运行时、数据库、可写上传目录、对象存储适配器，以及通过反向代理或 Kubernetes Service 对外提供服务。

CI/CD 必须按应用类型声明对应的 Node 版本与运行要求。现有微前端链路继续兼容 Node.js 16.17.1；新增博客应用若依赖更高版本运行时，可在计划与部署配置中显式提升到 Node.js 18+，但必须同步更新相关容器、流水线与文档。

## 技术基线与约束

### 仓库级公共基线
- React 18+
- TypeScript
- `pnpm`
- ESLint + `@typescript-eslint` + `eslint-plugin-react`
- `stylelint-config-standard` + `stylelint-order`
- Commitlint + Conventional Commits
- Docker
- Jenkins Pipeline
- Kubernetes

### 现有微前端子应用基线
- React DOM 18+
- TypeScript 4.9.5
- `react-scripts` 5.0.1
- CRACO 7+ + `craco-less`
- Webpack 别名 `@`
- UMD 打包输出
- `react-router-dom` 6.16.0 + `BrowserRouter`
- Redux 4.2.1 + React-Redux 8.0.5 + Rematch 2.2.0
- Ant Design 5.8.1 + `@ant-design/icons`
- `@cos-power/cos-power-pc-ui`
- `dayjs`
- `web-vitals`

### 博客全栈应用基线
- React 18+
- TypeScript 5.x 或与目标框架兼容的稳定版本
- 支持 SSR/ISR、服务端路由与 SEO 元信息输出的 React 全栈框架
- Ant Design 5.x 作为后台默认 UI 基线
- PostgreSQL 或等价关系型数据库，用于用户、文章、标签、分类、评论和身份绑定
- ORM 或等价数据访问层，用于模式管理、迁移和查询封装
- Markdown 渲染链，用于后台预览与前台展示一致性
- 本地文件系统上传能力，并通过存储适配器预留云存储接口

### 工程规范
- 包管理器：`pnpm`
- 微前端子应用 CI 运行时默认兼容 Node.js 16.17.1
- 博客全栈应用可以升级到 Node.js 18+，但必须在计划、Docker、Jenkins 与部署配置中显式声明
- 代码风格遵循 ESLint、EditorConfig 与仓库现有格式规范；若引入 Prettier，必须提交配置并与 ESLint 协调
- `@cos-power` 私有源：`http://lib.gydev.cn/repository/npm-group/`

### 部署基线
- 所有应用均通过 Docker 镜像交付
- 现有微前端子应用继续可使用 Nginx 1.22.0 托管静态资源
- 博客全栈应用允许使用 Node.js 运行时容器，并通过 Nginx、Ingress 或网关转发流量
- Kubernetes 资源可按应用形态拆分为静态前端服务或全栈应用服务
- 在 CI 中执行 SonarScanner 4.4.0.2170 质量检查
- 使用公司内网镜像仓库 `repo.gydev.cn`

## 开发流程与项目约定

### 代码组织
- 现有微前端子应用代码继续维护在 `src/`
- 新增独立应用优先放在 `apps/`
- 共享或可复用 UI 组件放在各自应用的 `components/`
- 可复用 hooks 放在各自应用的 `hooks/` 或 `features/` 内
- 全局常量放在 `constants/` 或应用内等价目录
- API 访问代码放在 `services/`、`lib/` 或应用内的基础设施层，必须清晰归类
- 环境、路由、服务地址和存储策略等配置应集中维护

### 实现规则
- 所有新增 React 代码优先采用函数式组件与 Hooks
- 修改现有微前端入口文件时必须保留 qiankun 子应用生命周期契约
- 博客方案若要求 ISR、服务端 SEO、OAuth 回调、文件上传或可写数据接口，应优先在独立全栈应用中实现，而不是在现有 CRA 子应用中绕路模拟
- 新增数据库、上传、认证或缓存依赖时，必须在 spec/plan 中说明引入原因、边界与迁移策略
- API 定义、权限规则和依赖环境的服务地址必须保持显式、集中管理

### 评审与交付门禁
- 每次变更都必须保持受影响应用自身的可构建性与可部署性
- 修改基础设施相关文件时，必须同步保持 Docker、Jenkins、Nginx、Kubernetes 与运行时配置的一致性
- 新增依赖必须基于应用场景进行合理性说明，且不应重复引入已有能力
- 合并前必须通过对应应用的代码检查与样式检查规则
- 提交信息必须遵循已配置的 Conventional Commits 策略
- 若新增应用类型或运行时模式超出本宪章基线，必须先修订宪章或在计划中明确记录并获批

## 治理

本宪章是项目在架构、工具链、目录约定与交付预期上的权威基线。所有 Pull Request、规格文档、计划文档与实现任务都必须以本宪章为审查依据。任何修订都必须满足以下要求：

1. 记录本次变更的原因。
2. 说明受影响的运行时、构建、部署或目录边界。
3. 在同一次变更集中同步更新相关配置、计划或文档。
4. 在新规则成为默认基线前获得批准。

当仓库实际实现与本宪章不一致时，必须选择其一处理：要么将实现调整回符合宪章的状态，要么明确修订本宪章。

**版本**：2.0.0 | **批准日期**：2026-04-10 | **最后修订日期**：2026-04-11
