// 临时模拟数据 - 用于测试前端
const mockData = {
  skills: [
    { _id: '1', name: 'C#', category: 'language', proficiency: 90, order: 1 },
    { _id: '2', name: 'Python', category: 'language', proficiency: 85, order: 2 },
    { _id: '3', name: 'JavaScript', category: 'language', proficiency: 70, order: 3 },
    { _id: '4', name: 'Vue.js', category: 'frontend', proficiency: 70, order: 1 },
    { _id: '5', name: 'MySQL', category: 'database', proficiency: 85, order: 1 },
    { _id: '6', name: 'Redis', category: 'database', proficiency: 80, order: 2 },
    { _id: '7', name: 'Unity 3D', category: 'framework', proficiency: 90, order: 1 },
    { _id: '8', name: 'RAG', category: 'ai', proficiency: 85, order: 1 },
    { _id: '9', name: 'AI Agent', category: 'ai', proficiency: 70, order: 2 },
  ],
  projects: [
    {
      _id: '1',
      title: 'RAGFlow智能问答助手',
      description: '基于RAGFlow框架的智能文档问答系统，支持多种文档格式的知识库构建与检索',
      coverImage: 'https://placehold.co/400x300/6366F1/FFFFFF/png?text=RAGFlow+Assistant',
      techStack: ['RAGFlow', 'Python', 'LLM', 'Vector DB'],
      features: ['文档解析', '向量检索', '智能问答', '知识库管理'],
    },
    {
      _id: '2',
      title: 'Hermes多Agent编程工作流',
      description: '使用Hermes框架搭建的多智能体协作编程系统，实现代码生成、审查、测试的自动化流程',
      coverImage: 'https://placehold.co/400x300/8B5CF6/FFFFFF/png?text=Hermes+Workflow',
      techStack: ['Hermes', 'Python', 'AI Agent', 'LangChain'],
      features: ['多Agent协作', '代码生成', '自动测试', '代码审查'],
    },
    {
      _id: '3',
      title: 'Unity 3D船闸学习系统',
      description: '基于Unity的交互式学习平台，模拟船闸运行机制',
      coverImage: 'https://placehold.co/400x300/4F46E5/FFFFFF/png?text=Ship+Lock+System',
      techStack: ['Unity', 'C#', 'TCP', 'MongoDB'],
      features: ['教师端编辑界面', '学生端学习模块', '3D可视化', '网络同步'],
    },
    {
      _id: '4',
      title: 'Vue 3 个人作品集',
      description: '全栈作品集网站，展示个人技能与项目经验',
      coverImage: 'https://placehold.co/400x300/10B981/FFFFFF/png?text=Portfolio',
      techStack: ['Vue 3', 'Express', 'MongoDB', 'Nginx'],
      features: ['响应式设计', '技能展示', '项目展示', 'API反向代理'],
    },
  ]
};

module.exports = mockData;
