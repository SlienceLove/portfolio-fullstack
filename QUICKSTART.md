# 快速启动指南

本指南帮助您快速启动项目进行本地开发。

---

## 前置要求

- Node.js 16+ 已安装
- npm 或 yarn 已安装
- MongoDB Atlas 账号（免费）

---

## 步骤 1：克隆项目

```bash
git clone https://github.com/SlienceLove/portfolio-fullstack.git
cd portfolio-fullstack
```

---

## 步骤 2：配置 MongoDB

1. 访问 https://www.mongodb.com/cloud/atlas
2. 注册并创建免费集群（M0 Sandbox）
3. 创建数据库用户
4. 配置网络访问（Allow Access from Anywhere: 0.0.0.0/0）
5. 获取连接字符串

---

## 步骤 3：配置后端

```bash
cd backend

# 复制环境变量模板
cp .env.example .env

# 编辑 .env 文件
# 将 MONGODB_URI 替换为您的实际连接字符串
```

`.env` 文件示例：
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
PORT=3000
```

安装依赖：
```bash
npm install
```

初始化数据库：
```bash
npm run seed
```

预期输出：
```
MongoDB connected
Existing data cleared
Skills data seeded
Projects data seeded
✅ Database seeded successfully!
```

---

## 步骤 4：启动后端

```bash
npm run dev
```

后端将运行在 `http://localhost:3000`

验证：访问 `http://localhost:3000/health` 应该看到：
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

---

## 步骤 5：配置前端

打开新终端：

```bash
cd frontend

# 安装依赖
npm install
```

创建环境变量文件（可选）：
```bash
# 创建 .env.local 文件
echo "VITE_API_URL=http://localhost:3000/api" > .env.local
```

---

## 步骤 6：启动前端

```bash
npm run dev
```

前端将运行在 `http://localhost:5173`

---

## 步骤 7：访问应用

打开浏览器访问：`http://localhost:5173`

您应该看到：
- 首页 Hero 区域
- 技能展示（从数据库加载）
- 项目作品展示（3个初始项目）
- 联系表单

---

## 测试 API

### 获取所有项目
```bash
curl http://localhost:3000/api/projects
```

### 获取所有技能
```bash
curl http://localhost:3000/api/skills
```

### 发送留言
```bash
curl -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -d '{"name":"测试用户","email":"test@example.com","content":"测试留言"}'
```

---

## 常见问题

### Q: 后端启动失败，提示 MongoDB 连接错误
**A:** 
- 检查 `.env` 文件中的 `MONGODB_URI` 是否正确
- 确认 MongoDB Atlas 网络访问允许 0.0.0.0/0
- 检查数据库用户名和密码是否正确

### Q: 前端无法调用后端 API
**A:**
- 确认后端已启动并运行在 3000 端口
- 检查浏览器控制台是否有 CORS 错误
- 确认 `.env.local` 中的 API 地址正确

### Q: 页面显示空数据
**A:**
- 确认已运行 `npm run seed` 初始化数据库
- 打开浏览器开发者工具查看 Network 请求是否成功
- 检查后端日志是否有错误

### Q: npm install 失败
**A:**
- 检查 Node.js 版本（需要 16+）
- 尝试清除缓存：`npm cache clean --force`
- 删除 `node_modules` 和 `package-lock.json` 后重新安装

---

## 下一步

- 阅读 [API 文档](docs/API.md) 了解接口详情
- 阅读 [数据库文档](docs/DATABASE.md) 了解数据结构
- 阅读 [部署指南](docs/DEPLOYMENT.md) 了解如何部署到生产环境

---

## 项目结构

```
portfolio-fullstack/
├── frontend/              # Vue 3 前端
│   ├── src/
│   │   ├── views/        # 页面组件
│   │   ├── components/   # 可复用组件
│   │   ├── api/          # API 调用
│   │   └── router/       # 路由配置
│   └── package.json
│
├── backend/              # Express 后端
│   ├── routes/          # API 路由
│   ├── models/          # 数据模型
│   ├── middleware/      # 中间件
│   ├── config/          # 配置文件
│   ├── server.js        # 入口文件
│   └── seed.js          # 数据初始化
│
└── docs/                # 文档
    ├── API.md
    ├── DATABASE.md
    └── DEPLOYMENT.md
```

---

## 开发提示

### 修改后端代码
- 使用 `npm run dev` 启动（nodemon 会自动重启）
- 查看日志排查问题
- 修改路由后无需重启

### 修改前端代码
- Vite 会自动热更新
- 修改样式立即生效
- 修改组件自动刷新

### 添加新的 API 接口
1. 在 `backend/routes/` 中创建或修改路由文件
2. 在 `backend/server.js` 中注册路由
3. 在 `frontend/src/api/index.js` 中添加 API 调用函数

### 添加新的数据模型
1. 在 `backend/models/` 中创建模型文件
2. 在 `backend/seed.js` 中添加初始数据（可选）
3. 创建对应的路由和控制器

---

## 开发工具推荐

- **VS Code** - 代码编辑器
- **Postman** - API 测试
- **MongoDB Compass** - 数据库可视化管理
- **Vue DevTools** - Vue 调试工具（浏览器插件）

---

## Git 工作流

```bash
# 创建新分支
git checkout -b feature/your-feature

# 提交更改
git add .
git commit -m "feat: add your feature"

# 推送到远程
git push origin feature/your-feature

# 在 GitHub 上创建 Pull Request
```

---

## 需要帮助？

- 查看 [GitHub Issues](https://github.com/SlienceLove/portfolio-fullstack/issues)
- 阅读完整文档 `docs/` 目录
- 检查浏览器控制台和终端日志
