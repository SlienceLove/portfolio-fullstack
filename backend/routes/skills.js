const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');

// 获取所有技能
router.get('/', async (req, res, next) => {
  try {
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
