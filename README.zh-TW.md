# Portfolio Fullstack Application

[English](./README.en.md) | [简体中文](./README.md) | [繁體中文](./README.zh-TW.md) | [日本語](./README.ja.md)

個人作品集全端應用 - 使用 Vue 3 + Express + MongoDB 構建

## 🌐 線上展示

**網站地址：** http://1.14.193.193

## 技術棧

### 前端
- Vue 3 (Composition API)
- Vite
- Vue Router
- Axios
- TailwindCSS

### 後端
- Node.js
- Express
- MongoDB (Mongoose)
- 阿里雲OSS

## 本地運行

### 前端

```bash
cd frontend
npm install
npm run dev
```

前端將運行在 `http://localhost:5173`

### 後端

1. 複製環境變數文件：
```bash
cd backend
cp .env.example .env
```

2. 編輯 `.env` 文件，填入您的MongoDB和阿里雲OSS配置

3. 啟動後端服務：
```bash
npm install
npm run dev
```

後端將運行在 `http://localhost:3000`

## 功能特性

- ✅ 響應式設計 - 支持移動端、平板和桌面端
- ✅ 技能展示 - 展示9種核心技能（C#, Python, JavaScript, Vue.js, MySQL, Redis, Unity 3D, RAG, AI Agent）
- ✅ 項目作品展示 - 展示個人項目和技術棧
- ✅ 線上留言 - 訪客可以發送留言
- ✅ REST API - 完整的後端API接口
- ✅ MongoDB數據庫 - 數據持久化存儲

## API文檔

詳見 [docs/API.md](docs/API.md)

## 部署

- 寶塔Windows部署：[docs/DEPLOYMENT_BAOTA_WINDOWS.md](docs/DEPLOYMENT_BAOTA_WINDOWS.md)
- 通用部署指南：[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## 作者

**Slience996** - 全端開發工程師

熟練掌握：C# | Python | Vue.js | MySQL | Redis

## License

MIT
