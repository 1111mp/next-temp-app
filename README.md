# next-temp-app

一个基于 **Next.js App Router** 的全栈模板项目，内置了类型安全 API、认证、多语言、队列任务与基础 UI 组件，适合作为中后台或 SaaS 项目的起始脚手架。

## 项目概览

该项目围绕以下能力构建：

- **前端框架**：Next.js 16 + React 19（App Router）
- **类型安全后端**：tRPC + Zod
- **数据库层**：Prisma（当前配置为 SQLite）
- **认证系统**：better-auth（支持邮箱密码、GitHub OAuth、Magic Link）
- **国际化**：next-intl（`en` / `zh-CN`）
- **任务队列**：BullMQ + Redis + Nodemailer（异步发信）
- **UI 体系**：Radix UI + Tailwind CSS 4 + 自定义组件
- **测试**：Vitest + Testing Library

## 目录结构

```text
.
├── prisma/                 # Prisma Schema 与迁移
├── public/                 # 静态资源
├── src/
│   ├── app/                # Next.js App Router 页面与 API Route
│   ├── components/         # 业务组件与基础 UI 组件
│   ├── i18n/               # next-intl 路由与导航配置
│   ├── lib/                # 校验、工具函数
│   ├── proxys/             # 中间件（代理）组合逻辑
│   ├── server/             # 服务端能力：db、auth、trpc、jobs、redis
│   ├── trpc/               # tRPC React/Server 客户端适配
│   └── __tests__/          # 测试用例
├── _locales/               # 多语言文案
└── README.md
```

## 核心能力说明

### 1) 路由与页面

- 采用 App Router，主页面位于 `src/app/[locale]/page.tsx`。
- 应用支持 locale 路由前缀，如 `/en`、`/zh-CN`。
- 通过导航栏和登录页提供基础认证交互。

### 2) 认证（better-auth）

已在 `src/server/better-auth/config.ts` 中配置：

- 邮箱密码登录
- GitHub OAuth
- Magic Link（通过异步邮件队列发送登录链接）

### 3) tRPC API

当前示例路由为 `post`：

- `post.create`：登录后创建 Post
- `post.getLatest`：获取当前登录用户最近一条 Post

### 4) 异步邮件队列

`sendMail` 会将任务放入 BullMQ 队列，由 worker 消费后通过 Nodemailer 发送。

- 队列：`src/server/jobs/mailer/mailer.queue.ts`
- Worker：`src/server/jobs/mailer/mailer.worker.ts`
- 传输器：`src/server/jobs/mailer/mailer.transport.ts`

### 5) 国际化与访问控制

- 国际化基于 `next-intl`，配置在 `src/i18n/routing.ts`。
- 代理（中间件）通过 `stackMiddlewares` 串联授权与 i18n 逻辑。
- 默认行为：未登录访问非 `/login` 页面会被重定向到登录页。

## 环境变量

项目使用 `@t3-oss/env-nextjs` 在运行时校验环境变量（见 `src/env.js`）。

建议创建 `.env` 文件并配置：

```bash
# Database
DATABASE_URL="file:./dev.db"

# App
NODE_ENV="development"
APP_AUTH_KEY="replace-me"
APP_RANDOM_PASSWORD="replace-me"

# Redis
REDIS_URL="redis://localhost:6379"

# Better Auth
BETTER_AUTH_SECRET="replace-me"
BETTER_AUTH_GITHUB_CLIENT_ID="replace-me"
BETTER_AUTH_GITHUB_CLIENT_SECRET="replace-me"

# SMTP
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
EMAIL_FROM="no-reply@example.com"
SMTP_USER="no-reply@example.com"
SMTP_PASSWORD="replace-me"
```

## 本地开发

> 包管理器：`pnpm`

```bash
pnpm install
pnpm db:generate
pnpm dev
```

默认访问：`http://localhost:3000`

## 常用命令

```bash
pnpm dev              # 启动开发环境
pnpm build            # 生产构建（含 oxlint）
pnpm start            # 启动生产服务
pnpm check            # next lint + tsc
pnpm lint             # oxlint
pnpm typecheck        # tsc --noEmit
pnpm test             # vitest
pnpm test:coverage    # vitest 覆盖率
pnpm db:generate      # prisma migrate dev
pnpm db:migrate       # prisma migrate deploy
pnpm db:push          # prisma db push
pnpm db:studio        # prisma studio
```

## 已有测试

当前包含以下示例测试：

- `src/__tests__/apis/auth.test.tsx`
- `src/__tests__/pages/login.test.tsx`

可通过 `pnpm test` 执行。

## 适用场景

如果你想快速开始一个具备以下特性的项目，这个模板会比较合适：

- 端到端 TypeScript 类型安全
- 内置认证与国际化
- 需要异步任务（如邮件）
- 希望在 Next.js 中整合 tRPC + Prisma 的工程化范式

---

如果你准备将它用于生产环境，建议优先补充：监控日志、错误告警、CI/CD、权限模型与安全审计策略。
