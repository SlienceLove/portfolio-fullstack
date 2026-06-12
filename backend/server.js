require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// 全局变量：是否使用模拟数据
global.useMockData = false;

// 尝试连接数据库
connectDB().then(connected => {
  if (!connected) {
    global.useMockData = true;
    console.log('📦 使用模拟数据模式');
  }
});

// 路由
app.use('/api/projects', require('./routes/projects'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/messages', require('./routes/messages'));

// 健康检查
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Server is running',
    mode: global.useMockData ? 'mock-data' : 'database'
  });
});

// 错误处理
app.use(errorHandler);

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Mode: ${global.useMockData ? '模拟数据' : '数据库连接'}`);
});
