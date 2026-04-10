# Quickstart: 个人博客系统

本文件描述的是**按当前计划完成实现后**的本地启动和验证流程，用于后续开发与验收。

## 1. Prerequisites

- Node.js 18+（计划中的博客应用运行时）
- pnpm 8+
- PostgreSQL 15+
- 一个可用的 GitHub OAuth App
- 可写的本地上传目录

## 2. Planned Directory

```text
apps/blog-web/
```

## 3. Environment Variables

在 `apps/blog-web/.env.local` 中至少配置以下变量：

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/blog_web
AUTH_SECRET=replace-with-random-secret
GITHUB_ID=your-github-oauth-client-id
GITHUB_SECRET=your-github-oauth-client-secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
UPLOAD_DRIVER=local
UPLOAD_LOCAL_DIR=public/uploads
```

## 4. Install Dependencies

```bash
pnpm install
pnpm --dir apps/blog-web install
```

## 5. Prepare Database

```bash
pnpm --dir apps/blog-web prisma migrate dev
pnpm --dir apps/blog-web prisma db seed
```

种子数据应至少包含：

- 1 个管理员账号
- 1 个作者账号
- 1 个读者账号
- 若干分类、标签和演示文章

## 6. Start the Application

```bash
pnpm --dir apps/blog-web dev
```

预期启动后：

- 公共首页：`http://localhost:3000/`
- 关于页：`http://localhost:3000/about`
- 管理后台：`http://localhost:3000/dashboard`

## 7. Manual Verification Flow

### Public Site

1. 打开首页，确认文章列表、分页和空状态正常。
2. 打开文章详情页，确认 Markdown 渲染、SEO 元信息和阅读量展示正常。
3. 通过标签页、分类页和关键词搜索验证筛选能力。

### Authentication

1. 使用邮箱密码注册一个新用户，确认默认角色为 `reader`。
2. 使用 GitHub OAuth 登录新账号。
3. 验证 GitHub 同邮箱冲突时，系统要求先登录原账号再绑定。

### Author Workflow

1. 使用作者账号登录后台。
2. 新建文章并输入 Markdown，确认实时预览正常。
3. 上传封面图，设置标签、分类和 SEO 字段。
4. 保存为草稿，再发布，确认公开详情页生成。

### Admin Workflow

1. 使用管理员账号登录后台。
2. 检查 Dashboard 文章数、状态统计和总阅读量。
3. 新增、编辑、删除分类与标签。
4. 删除有关联文章的分类时，确认系统要求先选择替代分类并完成迁移。
5. 隐藏或删除评论，确认前台不再显示。

## 8. Regeneration Verification

1. 发布一篇草稿文章。
2. 确认首页和对应文章详情页在 5 分钟内完成再生成。
3. 修改文章标签或分类，确认相关标签页、分类页也随之更新。
4. 将文章归档，确认首页、搜索结果和详情访问策略符合预期。

## 9. Future Storage Swap Check

当后续把 `UPLOAD_DRIVER=cloud` 时，应只更换存储适配器实现，而无需改动文章、评论或后台编辑业务逻辑。
