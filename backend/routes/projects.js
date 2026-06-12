const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const mockData = require('../mockData');

// 获取所有项目
router.get('/', async (req, res, next) => {
  try {
    if (global.useMockData) {
      return res.json({
        success: true,
        data: mockData.projects,
      });
    }

    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
});

// 获取单个项目详情
router.get('/:id', async (req, res, next) => {
  try {
    if (global.useMockData) {
      const project = mockData.projects.find(p => p._id === req.params.id);
      if (!project) {
        return res.status(404).json({
          success: false,
          error: '项目不存在',
        });
      }
      return res.json({
        success: true,
        data: project,
      });
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: '项目不存在',
      });
    }
    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
});

// 创建新项目
router.post('/', async (req, res, next) => {
  try {
    if (global.useMockData) {
      return res.status(503).json({
        success: false,
        error: '模拟数据模式下无法创建数据',
      });
    }

    const project = await Project.create(req.body);
    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
