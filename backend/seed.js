require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Skill = require('./models/Skill');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // 清空现有数据
    await Project.deleteMany({});
    await Skill.deleteMany({});
    console.log('Existing data cleared');

    // 添加技能数据
    const skills = [
      // 前端技能
      { name: 'Vue.js', category: 'frontend', proficiency: 90, order: 1 },
      { name: 'React', category: 'frontend', proficiency: 75, order: 2 },
      { name: 'HTML/CSS', category: 'frontend', proficiency: 95, order: 3 },
      { name: 'JavaScript', category: 'frontend', proficiency: 90, order: 4 },
      { name: 'TypeScript', category: 'frontend', proficiency: 80, order: 5 },
      { name: 'TailwindCSS', category: 'frontend', proficiency: 85, order: 6 },

      // 后端技能
      { name: 'Node.js', category: 'backend', proficiency: 85, order: 1 },
      { name: 'Express', category: 'backend', proficiency: 90, order: 2 },
      { name: 'MongoDB', category: 'backend', proficiency: 80, order: 3 },
      { name: 'MySQL', category: 'backend', proficiency: 75, order: 4 },
      { name: 'RESTful API', category: 'backend', proficiency: 90, order: 5 },

      // 其他技能
      { name: 'Unity 3D', category: 'other', proficiency: 85, order: 1 },
      { name: 'C#', category: 'other', proficiency: 80, order: 2 },
      { name: 'Git', category: 'other', proficiency: 85, order: 3 },
      { name: '阿里云', category: 'other', proficiency: 70, order: 4 },
      { name: 'Docker', category: 'other', proficiency: 65, order: 5 },
    ];

    await Skill.insertMany(skills);
    console.log('Skills data seeded');

    // 添加项目数据
    const projects = [
      {
        title: 'Unity 3D船闸学习系统',
        description: '基于Unity的交互式学习平台，包含教师编辑界面和学生学习模块',
        coverImage: 'https://via.placeholder.com/400x300?text=Ship+Lock+System',
        techStack: ['Unity', 'C#', 'TCP', 'MongoDB'],
        features: [
          '教师端编辑界面 - 创建和管理学习模块',
          '学生端学习模块 - 浏览内容、观看视频',
          '实时数据同步 - 基于TCP的内容分发',
          '多媒体资源管理 - 图片和视频上传',
        ],
        screenshots: [
          'https://via.placeholder.com/800x600?text=Screenshot+1',
          'https://via.placeholder.com/800x600?text=Screenshot+2',
        ],
        links: {
          github: 'https://github.com/SlienceLove',
          demo: '',
        },
      },
      {
        title: 'Vue 3 个人作品集',
        description: '使用Vue 3 + Express + MongoDB构建的全栈作品集网站',
        coverImage: 'https://via.placeholder.com/400x300?text=Portfolio+Website',
        techStack: ['Vue 3', 'Express', 'MongoDB', 'TailwindCSS', 'Vite'],
        features: [
          '响应式设计 - 支持移动端和桌面端',
          '技能展示 - 可视化熟练度展示',
          '项目作品展示 - 动态加载项目数据',
          '在线留言功能 - 访客可以发送留言',
          'RESTful API - 完整的后端接口',
        ],
        screenshots: [
          'https://via.placeholder.com/800x600?text=Portfolio+Home',
          'https://via.placeholder.com/800x600?text=Portfolio+Projects',
        ],
        links: {
          github: 'https://github.com/SlienceLove/portfolio-fullstack',
          demo: '',
        },
      },
      {
        title: 'Todo List应用',
        description: '简洁高效的任务管理应用，支持任务分类和优先级管理',
        coverImage: 'https://via.placeholder.com/400x300?text=Todo+App',
        techStack: ['Vue 3', 'Vite', 'LocalStorage'],
        features: [
          '任务添加和删除',
          '任务完成状态切换',
          '任务分类管理',
          '本地存储持久化',
        ],
        screenshots: [
          'https://via.placeholder.com/800x600?text=Todo+List',
        ],
        links: {
          github: 'https://github.com/SlienceLove',
          demo: '',
        },
      },
    ];

    await Project.insertMany(projects);
    console.log('Projects data seeded');

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
