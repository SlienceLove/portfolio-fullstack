# Portfolio Fullstack Application

[English](./README.md) | [简体中文](./README.zh-CN.md) | [繁體中文](./README.zh-TW.md) | [日本語](./README.ja.md)

個人ポートフォリオフルスタックアプリケーション - Vue 3 + Express + MongoDB で構築

## 🌐 オンラインデモ

**ウェブサイト：** http://1.14.193.193

## 技術スタック

### フロントエンド
- Vue 3 (Composition API)
- Vite
- Vue Router
- Axios
- TailwindCSS

### バックエンド
- Node.js
- Express
- MongoDB (Mongoose)
- Aliyun OSS

## ローカル開発

### フロントエンド

```bash
cd frontend
npm install
npm run dev
```

フロントエンドは `http://localhost:5173` で実行されます

### バックエンド

1. 環境変数ファイルをコピー：
```bash
cd backend
cp .env.example .env
```

2. `.env` ファイルを編集し、MongoDBとAliyun OSSの設定を入力

3. バックエンドサーバーを起動：
```bash
npm install
npm run dev
```

バックエンドは `http://localhost:3000` で実行されます

## 機能

- ✅ レスポンシブデザイン - モバイル、タブレット、デスクトップに対応
- ✅ スキル表示 - 9つのコアスキルを表示（C#、Python、JavaScript、Vue.js、MySQL、Redis、Unity 3D、RAG、AI Agent）
- ✅ プロジェクトポートフォリオ - 個人プロジェクトと技術スタックを展示
- ✅ お問い合わせフォーム - 訪問者がメッセージを送信可能
- ✅ REST API - 完全なバックエンドAPIエンドポイント
- ✅ MongoDBデータベース - データ永続化ストレージ

## APIドキュメント

詳細は [docs/API.md](docs/API.md) を参照

## デプロイ

- Baota Windowsデプロイ：[docs/DEPLOYMENT_BAOTA_WINDOWS.md](docs/DEPLOYMENT_BAOTA_WINDOWS.md)
- 一般的なデプロイガイド：[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## 著者

**Slience996** - フルスタックエンジニア

スキル：C# | Python | Vue.js | MySQL | Redis

## ライセンス

MIT
