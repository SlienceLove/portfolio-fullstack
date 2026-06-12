# Portfolio Fullstack Application

个人作品集全栈应用 - 使用 Vue 3 + Express + MongoDB 构建

## 技术栈

### 前端
- Vue 3 (Composition API)
- Vite
- Vue Router
- Axios
- TailwindCSS

### 后端
- Node.js
- Express
- MongoDB (Mongoose)
- 阿里云OSS

## 本地运行

### 前端

```bash
cd frontend
npm install
npm run dev
```

前端将运行在 `http://localhost:5173`

### 后端

1. 复制环境变量文件：
```bash
cd backend
cp .env.example .env
```

2. 编辑 `.env` 文件，填入您的MongoDB和阿里云OSS配置

3. 启动后端服务：
```bash
npm install
npm run dev
```

后端将运行在 `http://localhost:3000`

## 功能特性

- ✅ 响应式设计 - 支持移动端、平板和桌面端
- ✅ 技能展示 - 可视化展示技能熟练度
- ✅ 项目作品展示 - 展示个人项目和技术栈
- ✅ 在线留言 - 访客可以发送留言
- ✅ REST API - 完整的后端API接口
- ✅ MongoDB数据库 - 数据持久化存储

## API文档

详见 [docs/API.md](docs/API.md)

## 部署

详见 [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## 在线演示

- 前端: [待部署]
- GitHub: https://github.com/SlienceLove/portfolio-fullstack

## 作者

SlienceLove

## License

MIT
