# Data Model: 个人博客系统

## Enums

### UserRole

- `admin`
- `author`
- `reader`

### UserStatus

- `active`
- `suspended`

### AuthProvider

- `credentials`
- `github`

### ArticleStatus

- `draft`
- `published`
- `archived`

### CommentStatus

- `visible`
- `hidden`
- `deleted`

### MediaStorageProvider

- `local`
- `cloud`

## Entities

### User

| Field | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK | 用户主键 |
| email | string | unique, not null | 登录邮箱，全局唯一 |
| displayName | string | not null | 展示名称 |
| passwordHash | string | nullable | 仅邮箱密码账号需要 |
| role | UserRole | not null, default `reader` | 仅管理员可提升 |
| status | UserStatus | not null, default `active` | 用于封禁或停用 |
| avatarUrl | string | nullable | 头像 |
| bio | string | nullable | 个人简介 |
| createdAt | datetime | not null | 创建时间 |
| updatedAt | datetime | not null | 更新时间 |
| lastLoginAt | datetime | nullable | 最后登录时间 |

**Relationships**
- One-to-many with `AuthIdentity`
- One-to-many with `Article` as author
- One-to-many with `Comment`
- One-to-many with `MediaAsset` as uploader

### AuthIdentity

| Field | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK | 身份绑定主键 |
| userId | UUID | FK -> User.id, not null | 归属用户 |
| provider | AuthProvider | not null | 凭证来源 |
| providerAccountId | string | not null | 第三方账号唯一标识或内部身份标识 |
| providerEmail | string | nullable | 第三方返回邮箱快照 |
| createdAt | datetime | not null | 绑定时间 |
| updatedAt | datetime | not null | 更新时间 |

**Constraints**
- `provider + providerAccountId` 组合唯一
- GitHub OAuth 同邮箱冲突时，不允许自动合并到已有用户

### Category

| Field | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK | 分类主键 |
| name | string | unique, not null | 分类名称 |
| slug | string | unique, not null | 分类路由标识 |
| description | string | nullable | 分类描述 |
| sortOrder | int | not null, default 0 | 后台排序 |
| createdAt | datetime | not null | 创建时间 |
| updatedAt | datetime | not null | 更新时间 |

**Relationships**
- One-to-many with `Article`

**Deletion Rule**
- 删除分类前必须选择替代分类，并迁移所有关联文章

### Tag

| Field | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK | 标签主键 |
| name | string | unique, not null | 标签名称 |
| slug | string | unique, not null | 标签路由标识 |
| description | string | nullable | 标签描述 |
| createdAt | datetime | not null | 创建时间 |
| updatedAt | datetime | not null | 更新时间 |

**Relationships**
- Many-to-many with `Article` via `ArticleTag`

**Deletion Rule**
- 只要仍被任一文章使用，即不可删除

### Article

| Field | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK | 文章主键 |
| authorId | UUID | FK -> User.id, not null | 作者 |
| categoryId | UUID | FK -> Category.id, not null | 所属分类，单选 |
| title | string | not null | 标题 |
| slug | string | unique, not null | 详情页可读地址 |
| excerpt | string | nullable | 摘要 |
| markdownContent | text | not null | 原始 Markdown |
| coverImageId | UUID | FK -> MediaAsset.id, nullable | 封面图 |
| status | ArticleStatus | not null, default `draft` | 状态机见下方 |
| seoTitle | string | nullable | SEO title |
| seoDescription | string | nullable | SEO description |
| seoOgImageId | UUID | FK -> MediaAsset.id, nullable | SEO og:image |
| publishedAt | datetime | nullable | 首次发布时间 |
| archivedAt | datetime | nullable | 归档时间 |
| readCount | bigint | not null, default 0 | 阅读量 |
| createdAt | datetime | not null | 创建时间 |
| updatedAt | datetime | not null | 更新时间 |

**Relationships**
- Many-to-one with `User`
- Many-to-one with `Category`
- Many-to-many with `Tag` via `ArticleTag`
- One-to-many with `Comment`

**Validation Rules**
- `title`、`markdownContent`、`categoryId` 为发布前必填
- `slug` 全站唯一
- 作者仅可在文章首次发布前修改 `slug`
- `published` 文章才允许公开访问

### ArticleTag

| Field | Type | Constraints | Notes |
|---|---|---|---|
| articleId | UUID | FK -> Article.id, PK(part) | 文章 |
| tagId | UUID | FK -> Tag.id, PK(part) | 标签 |
| createdAt | datetime | not null | 关联创建时间 |

**Constraints**
- `articleId + tagId` 组合唯一

### Comment

| Field | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK | 评论主键 |
| articleId | UUID | FK -> Article.id, not null | 所属文章 |
| authorId | UUID | FK -> User.id, not null | 评论作者 |
| body | text | not null | 评论内容 |
| status | CommentStatus | not null, default `visible` | 默认公开 |
| hiddenByUserId | UUID | FK -> User.id, nullable | 隐藏操作者 |
| deletedByUserId | UUID | FK -> User.id, nullable | 删除操作者 |
| createdAt | datetime | not null | 创建时间 |
| updatedAt | datetime | not null | 更新时间 |

**Rules**
- 仅登录读者可发表评论
- 默认 `visible`
- `hidden` 评论前台不可见，但后台保留
- `deleted` 为终态，前台不可见

### MediaAsset

| Field | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK | 资源主键 |
| uploaderId | UUID | FK -> User.id, not null | 上传者 |
| originalFilename | string | not null | 原始文件名 |
| mimeType | string | not null | MIME 类型 |
| sizeBytes | bigint | not null | 文件大小 |
| storageProvider | MediaStorageProvider | not null | 本地/云端 |
| storageKey | string | not null | 存储路径或对象 key |
| publicUrl | string | not null | 可访问地址 |
| width | int | nullable | 图片宽 |
| height | int | nullable | 图片高 |
| createdAt | datetime | not null | 上传时间 |

## Relationships Summary

- `User 1..n Article`
- `User 1..n Comment`
- `User 1..n AuthIdentity`
- `User 1..n MediaAsset`
- `Category 1..n Article`
- `Article n..n Tag` via `ArticleTag`
- `Article 1..n Comment`
- `MediaAsset` 可被 `Article.coverImageId` 与 `Article.seoOgImageId` 引用

## State Transitions

### ArticleStatus

```text
draft -> published
draft -> archived
published -> archived
archived -> draft
archived -> published
```

**Rules**
- 首次进入 `published` 时写入 `publishedAt`
- 进入 `archived` 时写入 `archivedAt`
- 从 `published` 变为 `archived` 后，文章需从首页、搜索、标签页、分类页中移除
- 首次发布后 `slug` 锁定，后续不可再改

### CommentStatus

```text
visible -> hidden
hidden -> visible
visible -> deleted
hidden -> deleted
```

**Rules**
- `deleted` 视为终态，不再恢复显示

## Derived / Query-Oriented Views

- `DashboardMetrics`: 文章总数、按状态统计、总阅读量、评论总数
- `PublicArticleListItem`: 标题、`slug`、摘要、封面、发布时间、作者、标签、分类
- `AdminArticleListItem`: 标题、状态、分类、标签数、更新时间、阅读量、作者
