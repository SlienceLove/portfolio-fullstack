# Portfolio Fullstack Application

[English](./README.en.md) | [简体中文](./README.md) | [繁體中文](./README.zh-TW.md) | [日本語](./README.ja.md)

Personal portfolio fullstack application - Built with Vue 3 + Express + MongoDB

## 🌐 Live Demo

**Website:** http://1.14.193.193

## Tech Stack

### Frontend
- Vue 3 (Composition API)
- Vite
- Vue Router
- Axios
- TailwindCSS

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- Aliyun OSS

## Local Development

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

### Backend

1. Copy environment variables file:
```bash
cd backend
cp .env.example .env
```

2. Edit `.env` file with your MongoDB and Aliyun OSS credentials

3. Start backend server:
```bash
npm install
npm run dev
```

Backend will run on `http://localhost:3000`

## Features

- ✅ Responsive Design - Supports mobile, tablet and desktop
- ✅ Skills Showcase - Display 9 core skills (C#, Python, JavaScript, Vue.js, MySQL, Redis, Unity 3D, RAG, AI Agent)
- ✅ Projects Portfolio - Showcase personal projects and tech stack
- ✅ Contact Form - Visitors can send messages
- ✅ REST API - Complete backend API endpoints
- ✅ MongoDB Database - Data persistence storage

## API Documentation

See [docs/API.md](docs/API.md)

## Deployment

- Baota Windows Deployment: [docs/DEPLOYMENT_BAOTA_WINDOWS.md](docs/DEPLOYMENT_BAOTA_WINDOWS.md)
- General Deployment Guide: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## Author

**Slience996** - Full Stack Developer

Skills: C# | Python | Vue.js | MySQL | Redis

## License

MIT
