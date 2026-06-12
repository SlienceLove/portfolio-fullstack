const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const mockData = require('../mockData');

// 获取所有技能
router.get('/', async (req, res, next) => {
  try {
    if (global.useMockData) {
      return res.json({
        success: true,
        data: mockData.skills,
      });
    }

    const skills = await Skill.find().sort({ category: 1, order: 1 });
    res.json({
      success: true,
      data: skills,
    });
  } catch (error) {
    next(error);
  }
});

// 创建新技能
router.post('/', async (req, res, next) => {
  try {
    if (global.useMockData) {
      return res.status(503).json({
        success: false,
        error: '模拟数据模式下无法创建数据',
      });
    }

    const skill = await Skill.create(req.body);
    res.status(201).json({
      success: true,
      data: skill,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
