const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// 提交留言
router.post('/', async (req, res, next) => {
  try {
    const { name, email, content } = req.body;

    // 验证必填字段
    if (!name || !email || !content) {
      return res.status(400).json({
        success: false,
        error: '所有字段都是必填的',
      });
    }

    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: '邮箱格式不正确',
      });
    }

    const message = await Message.create({ name, email, content });
    res.status(201).json({
      success: true,
      data: message,
    });
  } catch (error) {
    next(error);
  }
});

// 获取所有留言
router.get('/', async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
