# Test Spec Kit 宪章

## 核心原则

### 一、技术栈一致性
本项目是一个 React 微前端子应用，除非经过批准的架构决策明确要求调整，否则必须持续与既定技术栈保持一致。当前基线技术栈为 React 18+、React DOM 18+、TypeScript 4.9.5、基于 `react-scripts` 5.0.1 的 Create React App，以及用于构建定制的 CRACO 7+ 与 `craco-less`。Webpack 相关定制必须保留别名 `@`、UMD 输出、CSS Modules 行为、Less 支持以及本地开发代理能力。

### 二、微前端兼容性优先
所有运行时入口与构建产物都必须兼容基于 qiankun 的主应用集成方式。应用必须保留 `__POWERED_BY_QIANKUN__` 检测、`bootstrap` / `mount` / `unmount` 生命周期导出、动态 `publicPath` 处理能力，以及兼容 UMD 的打包输出。任何会破坏主子应用路由、共享状态通信或子应用挂载能力的修改，都不得在未完成主应用联调验证前合入。

### 三、函数式 React 架构
所有组件必须使用函数式组件或箭头函数组件，并配合 React Hooks 编写。公共 UI 必须放在 `components/`，可复用 hooks 必须放在 `hooks/`，全局常量必须放在 `constants/`，接口 API 模块必须放在 `services/` 下，并按照页面或业务域拆分子目录。组件命名必须使用大驼峰，代码实现应优先选择小而可组合的模块，而不是职责混杂的大文件。

### 四、统一的 UI 与状态模型
项目指定的 UI 体系为 Ant Design 5.8.1 与 `@ant-design/icons`，并结合 `styled-components`、CSS、CSS Modules 和已配置的 Less 使用。内部业务 UI 在可满足需求时应继续优先复用 `@cos-power/cos-power-pc-ui`，包括但不限于 keep-alive、分页、请求封装、表格抽象与错误页能力。全局状态必须沿用现有的 Redux + React-Redux + Rematch 模式；路由必须保持在 `react-router-dom` 6.x 与 `BrowserRouter` 体系下，除非明确批准进行微前端路由迁移。

### 五、工程质量与交付纪律
包管理统一使用 `pnpm`。代码质量门禁通过 ESLint、`@typescript-eslint`、`eslint-plugin-react`、Stylelint 规则以及与 Conventional Commits 对齐的 Commitlint 共同保障。CI 与交付链路必须兼容当前流水线要求，包括 Jenkins 中的 Node.js 16.17.1、SonarScanner 检查、Docker 镜像构建、Nginx 静态资源托管以及 Kubernetes 部署清单。任何对工具链或交付流程的修改，都必须在同一次变更中同步更新相关配置与部署文档。

## 技术基线与约束

### 前端运行时
- React 18+
- React DOM 18+
- TypeScript 4.9.5
- React Router DOM 6.16.0，并使用 `BrowserRouter`
- Redux 4.2.1 + React-Redux 8.0.5 + Rematch 2.2.0
- Ant Design 5.8.1 + `@ant-design/icons`
- `@cos-power/cos-power-pc-ui`
- `dayjs`
- `web-vitals`
- `antd` 的 `zh_CN` 语言包 + `dayjs/locale/zh-cn`

### 构建与样式
- 基于 `react-scripts` 5.0.1 的 Create React App
- CRACO 7+ + `craco-less`
- Webpack 别名 `@`
- 面向子应用集成的 UMD 打包输出
- CSS、CSS Modules、Less，以及 `styled-components` 5.3.6

### 工程规范
- 包管理器：`pnpm`
- CI 运行时：Node.js 16.17.1
- 代码检查：ESLint + `@typescript-eslint` + `eslint-plugin-react`
- 样式检查：`stylelint-config-standard` + `stylelint-order`
- 提交信息：通过 Commitlint 约束的 Conventional Commits
- 代码风格遵循 ESLint、EditorConfig 以及仓库现有格式规范；若后续引入 Prettier，必须将配置提交到仓库，并与 ESLint 保持一致，而不是临时自行使用
- `@cos-power` 私有源：`http://lib.gydev.cn/repository/npm-group/`

### 部署基线
- 使用 Docker 进行镜像打包
- 使用 Nginx 1.22.0 托管静态资源
- 使用 Kubernetes，并包含 Ingress / Service / Deployment 清单
- 使用 Jenkins Pipeline 与共享库模板
- 在 CI 中执行 SonarScanner 4.4.0.2170 质量检查
- 使用公司内网镜像仓库 `repo.gydev.cn`

## 开发流程与项目约定

### 代码组织
- 共享或可复用 UI 组件放在 `components/`
- 可复用 hooks 放在 `hooks/`
- 全局常量放在 `constants/`
- API 访问代码放在 `services/`，并按页面或业务域组织
- 影响环境、路由或服务地址的配置应集中维护在 `config/`

### 实现规则
- 所有新增 React 代码优先采用函数式组件与 Hooks
- 路由定义必须兼容现有路由结构与微前端基础路径约定
- 修改入口文件时必须保留当前 qiankun 子应用生命周期契约
- 在引入新的第三方能力前，应优先复用已批准的内部 UI 抽象
- API 定义与依赖环境的服务地址必须保持显式、集中管理

### 评审与交付门禁
- 每次变更都必须保持现有 `pnpm` + CRACO 工作流下的可构建性
- 修改基础设施相关文件时，必须同步保持 Docker、Jenkins、Nginx 与 Kubernetes 定义的一致性
- 新增依赖必须基于现有技术栈进行合理性说明，且不应重复引入已有能力
- 合并前必须通过代码检查与样式检查规则
- 提交信息必须遵循已配置的 Conventional Commits 策略
- 任何架构例外都必须在合并前记录到 spec 或相关实现说明中

## 治理

本宪章是项目在架构、工具链、目录约定与交付预期上的权威基线。所有 Pull Request、规格文档、计划文档与实现任务都必须以本宪章为审查依据。任何修订都必须满足以下要求：

1. 记录本次变更的原因。
2. 说明受影响的运行时、构建或部署文件。
3. 在同一次变更集中同步更新相关配置或文档。
4. 在新规则成为默认基线前获得批准。

当仓库实际实现与本宪章不一致时，必须选择其一处理：要么将实现调整回符合宪章的状态，要么明确修订本宪章。

**版本**：1.0.0 | **批准日期**：2026-04-10 | **最后修订日期**：2026-04-10
