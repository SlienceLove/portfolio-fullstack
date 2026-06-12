# 项目配置总结文档

**项目名称：** Portfolio Fullstack Application  
**GitHub 仓库：** https://github.com/SlienceLove/portfolio-fullstack  
**项目位置：** D:\Project\A_MyProject  
**创建日期：** 2026-06-12

---

## 📋 项目概览

这是一个基于 Vue 3 + Express + MongoDB 的全栈个人作品集应用，展示个人技能、项目作品，并提供在线留言功能。

### 技术栈

**前端：**
- Vue 3（Composition API）
- Vite（构建工具）
- Vue Router（路由管理）
- Axios（HTTP 客户端）
- TailwindCSS（样式框架）

**后端：**
- Node.js 18+
- Express 5
- MongoDB + Mongoose
- CORS（跨域支持）
- Dotenv（环境变量管理）

**部署：**
- 前端：阿里云 OSS 静态网站托管
- 后端：阿里云 ECS 云服务器
- 数据库：MongoDB Atlas（免费 512MB）
- 图片存储：阿里云 OSS

---

## 🗂️ 项目结构

```
D:\Project\A_MyProject\
├── frontend/                    # 前端项目
│   ├── src/
│   │   ├── views/              # 页面组件
│   │   │   └── Home.vue        # 主页面（Hero/Skills/Projects/Contact）
│   │   ├── components/         # 可复用组件
│   │   ├── api/                # API 调用封装
│   │   │   └── index.js        # Axios 配置和 API 方法
│   │   ├── router/             # 路由配置
│   │   │   └── index.js        # Vue Router 配置
│   │   ├── composables/        # 组合式函数（预留）
│   │   ├── App.vue             # 根组件
│   │   └── main.js             # 入口文件
│   ├── public/                 # 静态资源
│   ├── package.json            # 前端依赖
│   ├── vite.config.js          # Vite 配置
│   ├── tailwind.config.js      # TailwindCSS 配置
│   └── postcss.config.js       # PostCSS 配置
│
├── backend/                     # 后端项目
│   ├── routes/                 # API 路由
│   │   ├── projects.js         # 项目路由（GET /api/projects）
│   │   ├── skills.js           # 技能路由（GET /api/skills）
│   │   └── messages.js         # 留言路由（POST /api/messages）
│   ├── models/                 # Mongoose 数据模型
│   │   ├── Project.js          # 项目模型
│   │   ├── Skill.js            # 技能模型
│   │   └── Message.js          # 留言模型
│   ├── middleware/             # 中间件
│   │   ├── logger.js           # 请求日志中间件
│   │   └── errorHandler.js    # 错误处理中间件
│   ├── config/                 # 配置文件
│   │   └── db.js               # MongoDB 连接配置
│   ├── utils/                  # 工具函数（预留）
│   ├── server.js               # Express 服务器入口
│   ├── seed.js                 # 数据库初始化脚本
│   ├── package.json            # 后端依赖
│   ├── .env.example            # 环境变量模板
│   └── .env                    # 环境变量（需手动创建）
│
├── docs/                        # 项目文档
│   ├── API.md                  # API 接口文档
│   ├── DATABASE.md             # 数据库结构文档
│   └── DEPLOYMENT.md           # 部署指南
│
├── .gitignore                  # Git 忽略文件
├── README.md                   # 项目说明
└── QUICKSTART.md               # 快速启动指南
```

---

## ⚙️ 环境配置

### 1. 后端环境变量（backend/.env）

需要手动创建此文件，内容如下：

```env
# MongoDB Atlas 连接字符串
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# 服务器端口
PORT=3000

# 阿里云 OSS 配置（图片上传功能，可选）
OSS_REGION=oss-cn-hangzhou
OSS_ACCESS_KEY_ID=your-access-key-id
OSS_ACCESS_KEY_SECRET=your-access-key-secret
OSS_BUCKET=your-bucket-name
```

**配置步骤：**
1. 复制 `.env.example` 为 `.env`
2. 访问 MongoDB Atlas 获取连接字符串
3. 替换 `username` 和 `password` 为实际值
4. （可选）配置阿里云 OSS 用于图片上传

### 2. 前端环境变量（frontend/.env.production）

生产环境需要创建此文件：

```env
VITE_API_URL=http://your-ecs-ip:3000/api
```

本地开发默认使用 `http://localhost:3000/api`，无需配置。

---

## 🗄️ 数据库配置

### MongoDB Atlas 设置

1. **注册账号**
   - 访问：https://www.mongodb.com/cloud/atlas
   - 创建免费账号

2. **创建集群**
   - 选择 M0 Sandbox（免费，512MB）
   - 区域：AWS Singapore 或 GCP Taiwan

3. **创建数据库用户**
   - 用户名：`portfolio_user`
   - 密码：生成强密码并保存

4. **配置网络访问**
   - 开发：Allow Access from Anywhere (0.0.0.0/0)
   - 生产：添加 ECS 服务器 IP

5. **获取连接字符串**
   ```
   mongodb+srv://portfolio_user:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

### 数据库结构

**集合（Collections）：**

1. **projects** - 项目作品
   - 字段：title, description, coverImage, techStack, features, screenshots, links
   - 索引：`createdAt: -1`

2. **skills** - 技能
   - 字段：name, category, proficiency, icon, order
   - 分类：frontend/backend/other
   - 索引：`{ category: 1, order: 1 }`

3. **messages** - 留言
   - 字段：name, email, content, isRead
   - 索引：`createdAt: -1`, `isRead: 1`

### 初始化数据

```bash
cd backend
npm run seed
```

**初始数据包含：**
- 16 个技能（前端 6 个，后端 5 个，其他 5 个）
- 3 个项目（Unity 船闸系统，作品集网站，Todo 应用）

---

## 🚀 本地运行

### 启动后端

```bash
cd backend
npm install           # 安装依赖（首次）
npm run seed          # 初始化数据库（首次）
npm run dev           # 启动开发服务器
```

后端地址：`http://localhost:3000`

### 启动前端

```bash
cd frontend
npm install           # 安装依赖（首次）
npm run dev           # 启动开发服务器
```

前端地址：`http://localhost:5173`

### 验证

1. 访问 `http://localhost:5173` 查看前端页面
2. 访问 `http://localhost:3000/health` 验证后端
3. 访问 `http://localhost:3000/api/projects` 查看 API 响应

---

## 📡 API 接口

**Base URL:** `http://localhost:3000/api`（本地）

### 主要接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/projects` | 获取所有项目 |
| GET | `/projects/:id` | 获取单个项目 |
| POST | `/projects` | 创建新项目 |
| GET | `/skills` | 获取所有技能 |
| POST | `/skills` | 创建新技能 |
| POST | `/messages` | 提交留言 |
| GET | `/messages` | 获取所有留言 |

**详细文档：** 参见 `docs/API.md`

---

## 🌐 部署配置

### 1. 前端部署（阿里云 OSS）

**步骤：**
1. 构建生产版本：`npm run build`
2. 创建 OSS Bucket：`portfolio-frontend`
3. 权限设置：公共读
4. 启用静态网站托管
5. 上传 `dist/` 目录内容
6. 配置 CORS 跨域规则

**访问地址：**
```
http://portfolio-frontend.oss-cn-hangzhou.aliyuncs.com
```

### 2. 后端部署（阿里云 ECS）

**服务器配置：**
- 规格：1核2GB（入门配置）
- 系统：CentOS 7.9 或 Ubuntu 20.04
- 开放端口：22, 80, 443, 3000

**部署步骤：**
1. 安装 Node.js 18、PM2、Git
2. 克隆代码到 `/var/www/portfolio-fullstack`
3. 配置 `.env` 文件
4. 运行 `npm install --production`
5. 初始化数据：`npm run seed`
6. 启动服务：`pm2 start server.js --name portfolio-api`
7. 配置 Nginx 反向代理（推荐）
8. 配置 HTTPS（推荐）

**访问地址：**
```
http://your-ecs-ip:3000/api
```

### 3. MongoDB Atlas

已在开发环境配置，生产环境只需：
1. 在网络访问白名单添加 ECS 服务器 IP
2. 确保 `.env` 中连接字符串正确

**详细文档：** 参见 `docs/DEPLOYMENT.md`

---

## 📦 依赖说明

### 前端依赖（frontend/package.json）

**核心依赖：**
- `vue@^3.x` - Vue 框架
- `vue-router@^4.x` - 路由管理
- `axios@^1.x` - HTTP 客户端

**开发依赖：**
- `vite@^6.x` - 构建工具
- `tailwindcss@^4.x` - CSS 框架
- `autoprefixer@^11.x` - CSS 前缀处理
- `postcss@^9.x` - CSS 后处理器

### 后端依赖（backend/package.json）

**核心依赖：**
- `express@^5.x` - Web 框架
- `mongoose@^9.x` - MongoDB ODM
- `cors@^2.x` - CORS 跨域支持
- `dotenv@^17.x` - 环境变量管理
- `ali-oss@^6.x` - 阿里云 OSS SDK（可选）
- `multer@^2.x` - 文件上传中间件（可选）

**开发依赖：**
- `nodemon@^3.x` - 开发服务器自动重启

---

## 🔐 安全配置

### 后端安全

1. **CORS 配置**
   - 生产环境应限制允许的域名
   - 当前配置：允许所有来源（开发用）

2. **环境变量**
   - 敏感信息存储在 `.env` 文件
   - `.env` 文件已添加到 `.gitignore`

3. **输入验证**
   - 邮箱格式验证
   - 必填字段验证
   - 防止 XSS 攻击

4. **错误处理**
   - 统一错误处理中间件
   - 不暴露敏感错误信息

### 前端安全

1. **API 密钥**
   - 不在前端存储敏感密钥
   - API 调用通过后端代理

2. **用户输入**
   - 表单验证
   - HTML 转义防止 XSS

---

## 🎨 功能模块

### 1. 首页（Hero Section）
- 个人介绍和头像
- 职位标题
- CTA 按钮（查看作品、联系我）

### 2. 技能展示（Skills Section）
- 技能分类展示（前端/后端/其他）
- 进度条可视化熟练度
- 卡片式布局
- Hover 动画效果

### 3. 项目作品（Projects Section）
- 项目卡片网格布局
- 展示：标题、封面图、技术栈、描述
- Hover 3D 效果
- 点击查看详情（预留功能）

### 4. 联系方式（Contact Section）
- 在线留言表单
- 表单验证（姓名、邮箱、内容）
- 提交成功/失败反馈
- GitHub/邮箱链接

### 5. 响应式设计
- 移动端适配（< 768px）
- 平板适配（768px - 1024px）
- 桌面端（> 1024px）

---

## 📝 Git 工作流

### 当前状态

- ✅ 本地仓库已初始化
- ✅ 首次提交已完成
- ✅ 远程仓库已关联：`https://github.com/SlienceLove/portfolio-fullstack`
- ⚠️ 代码未推送到远程（需要认证）

### 推送到 GitHub

```bash
cd D:/Project/A_MyProject
git push -u origin main
```

如果提示需要认证，在浏览器中登录 GitHub 并授权。

### 日常开发流程

```bash
# 拉取最新代码
git pull origin main

# 创建功能分支
git checkout -b feature/your-feature

# 提交更改
git add .
git commit -m "feat: add your feature"

# 推送分支
git push origin feature/your-feature

# 在 GitHub 创建 Pull Request
```

---

## 🧪 测试

### 手动测试

**后端 API 测试：**
```bash
# 健康检查
curl http://localhost:3000/health

# 获取项目
curl http://localhost:3000/api/projects

# 获取技能
curl http://localhost:3000/api/skills

# 发送留言
curl -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -d '{"name":"测试","email":"test@example.com","content":"测试留言"}'
```

**前端测试：**
1. 访问 `http://localhost:5173`
2. 验证页面加载
3. 测试技能和项目数据显示
4. 测试留言表单提交
5. 测试响应式布局（调整浏览器窗口）

---

## 📚 文档清单

| 文档 | 路径 | 说明 |
|------|------|------|
| README | `/README.md` | 项目概述和快速指南 |
| 快速启动 | `/QUICKSTART.md` | 详细的本地开发指南 |
| API 文档 | `/docs/API.md` | API 接口详细说明 |
| 数据库文档 | `/docs/DATABASE.md` | 数据库结构和配置 |
| 部署指南 | `/docs/DEPLOYMENT.md` | 生产环境部署步骤 |
| 配置总结 | `/CONFIGURATION.md` | 本文档 |

---

## ✅ 完成清单

### 已完成

- [x] 项目结构创建
- [x] 前端 Vue 3 项目搭建
- [x] 后端 Express 服务器搭建
- [x] MongoDB 数据模型定义
- [x] API 路由实现
- [x] 前端页面组件开发
- [x] TailwindCSS 样式配置
- [x] 数据初始化脚本
- [x] Git 仓库初始化
- [x] GitHub 远程仓库关联
- [x] 完整项目文档

### 待完成

- [ ] 推送代码到 GitHub
- [ ] 配置 MongoDB Atlas
- [ ] 本地运行测试
- [ ] 添加实际项目内容
- [ ] 部署到阿里云
- [ ] 配置自定义域名
- [ ] 配置 HTTPS

---

## 🔗 重要链接

- **GitHub 仓库：** https://github.com/SlienceLove/portfolio-fullstack
- **MongoDB Atlas：** https://www.mongodb.com/cloud/atlas
- **阿里云控制台：** https://home.console.aliyun.com
- **Vue 文档：** https://vuejs.org
- **Express 文档：** https://expressjs.com
- **Mongoose 文档：** https://mongoosejs.com

---

## 💡 下一步行动

### 立即执行

1. **推送代码到 GitHub**
   ```bash
   cd D:/Project/A_MyProject
   git push -u origin main
   ```

2. **配置 MongoDB Atlas**
   - 创建免费集群
   - 获取连接字符串
   - 配置 `backend/.env`

3. **本地测试**
   ```bash
   # 终端 1 - 后端
   cd backend
   npm install
   npm run seed
   npm run dev

   # 终端 2 - 前端
   cd frontend
   npm install
   npm run dev
   ```

4. **访问测试**
   - 前端：http://localhost:5173
   - 后端：http://localhost:3000/health

### 后续任务

5. **内容填充**
   - 替换占位图片为实际项目截图
   - 更新个人信息和联系方式
   - 添加更多项目和技能

6. **功能增强**
   - 添加项目详情弹窗
   - 实现图片上传到 OSS
   - 添加管理后台

7. **部署上线**
   - 部署前端到阿里云 OSS
   - 部署后端到阿里云 ECS
   - 配置域名和 HTTPS

---

## 📞 技术支持

如遇问题，请参考：
- 项目文档（`docs/` 目录）
- 快速启动指南（`QUICKSTART.md`）
- GitHub Issues：https://github.com/SlienceLove/portfolio-fullstack/issues

---

**文档版本：** 1.0  
**最后更新：** 2026-06-12  
**维护者：** SlienceLove
