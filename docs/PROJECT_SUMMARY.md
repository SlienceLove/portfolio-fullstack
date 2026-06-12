# 项目开发总结

## 项目信息

- **项目名称：** Portfolio Fullstack Application
- **在线地址：** http://1.14.193.193
- **GitHub仓库：** https://github.com/SlienceLove/portfolio-fullstack
- **开发时间：** 2026年6月
- **开发者：** Slience996

## 技术栈

### 前端
- Vue 3 (Composition API)
- Vite 8.0.16
- Vue Router
- Axios
- TailwindCSS

### 后端
- Node.js v20.19.1
- Express
- MongoDB (Mongoose)
- 模拟数据支持（数据库不可用时自动降级）

### 部署环境
- 宝塔面板（Windows Server）
- Nginx（反向代理）
- 前端部署路径：`C:\BtSoft\wwwroot\portfolio\dist`
- 后端部署路径：`C:\BtSoft\wwwroot\portfolio\Backend`

## 开发历程

### 第一阶段：项目初始化
1. 创建Vue 3前端项目（使用Vite）
2. 搭建Express后端服务
3. 配置MongoDB数据库连接
4. 实现基础的API路由（skills、projects、messages）

### 第二阶段：功能开发
1. **前端首页开发**
   - Hero Section（个人介绍区域）
   - Skills Section（技能展示）
   - Projects Section（项目作品展示）
   - Contact Section（联系方式）

2. **后端API开发**
   - GET /api/skills - 获取技能列表
   - GET /api/projects - 获取项目列表
   - POST /api/messages - 提交留言

3. **数据模拟系统**
   - 创建mockData.js提供模拟数据
   - 数据库连接失败时自动切换到模拟数据模式
   - 支持9个技能和4个项目的展示

### 第三阶段：UI优化
1. **页面样式调整**
   - 添加Slience996标识，调整字体大小（text-3xl）
   - 全栈开发工程师标题字号优化（text-3xl）
   - 添加个人头像（圆形显示，带阴影效果）
   - 更新技能描述：C# | Python | Vue.js | MySQL | Redis

2. **内容更新**
   - **技能专长（9个）：**
     - C# (90%)
     - Python (85%)
     - JavaScript (88%)
     - Vue.js (90%)
     - MySQL (85%)
     - Redis (80%)
     - Unity 3D (90%)
     - RAG (85%)
     - AI Agent (82%)
   
   - **项目作品（4个）：**
     - RAGFlow智能问答助手
     - Hermes多Agent编程工作流
     - Unity 3D船闸学习系统
     - Vue 3 个人作品集

### 第四阶段：部署配置

1. **Nginx配置**
   - 修复默认server块冲突
   - 配置站点监听80端口（default_server）
   - 配置root路径：`C:/BtSoft/wwwroot/portfolio/dist`
   - 设置API反向代理：`/api/` → `http://127.0.0.1:3000/api/`

2. **后端部署**
   - 安装依赖包（express、mongoose、cors、dotenv等）
   - 配置环境变量（.env文件）
   - 使用Node.js v20.19.1运行服务
   - 监听端口：3000

3. **部署问题解决**
   - 修复Nginx root路径错误（Frontend → dist）
   - 更新后端mockData.js到生产环境
   - 配置API代理路由（api.conf）
   - 解决Node.js模块缓存问题

### 第五阶段：文档完善

1. **多语言README支持**
   - README.md - English（默认）
   - README.zh-CN.md - 简体中文
   - README.zh-TW.md - 繁體中文
   - README.ja.md - 日本語
   - 所有版本包含语言切换链接

2. **部署文档**
   - 创建宝塔Windows部署文档
   - API文档说明
   - 通用部署指南

3. **项目总结文档**
   - 开发历程记录
   - 技术栈说明
   - 遇到的问题及解决方案

## 遇到的问题及解决方案

### 1. Nginx配置冲突
**问题：** 默认nginx.conf中已有default_server，导致站点配置冲突

**解决：** 注释掉nginx.conf中的默认server块，在站点配置中启用default_server

### 2. API反向代理配置
**问题：** 前端无法访问后端API（跨域问题）

**解决：** 
- 在Nginx中配置反向代理：`/api/` → `http://127.0.0.1:3000/api/`
- 创建api.conf配置文件
- 在站点配置中include代理配置

### 3. 后端数据未更新
**问题：** 更新mockData.js后，API返回的仍是旧数据

**解决：** 
- Node.js会缓存已加载的模块
- 需要完全停止并重启Node.js进程（taskkill + 重新启动）
- 确保更新了生产环境的mockData.js文件

### 4. 前端文件未生效
**问题：** 更新前端代码后，网站显示"站点暂停"

**解决：** 
- 检查Nginx的root路径配置
- 修正路径：`Frontend` → `dist`
- 确保前端文件正确复制到部署目录
- 重启Nginx使配置生效

### 5. Git推送网络问题
**问题：** 推送到GitHub时出现连接重置或内存溢出

**解决：** 
- 增加Git缓冲区：`git config http.postBuffer 524288000`
- 网络问题时先本地提交，稍后重试推送
- 避免一次性推送过大的文件

## 项目特色

1. **响应式设计** - 适配移动端、平板和桌面端
2. **模拟数据降级** - 数据库不可用时自动使用模拟数据
3. **多语言文档** - 支持4种语言的README
4. **完整的部署文档** - 详细的宝塔Windows部署指南
5. **RESTful API** - 标准的后端API接口设计
6. **技能可视化** - 进度条展示技能熟练度
7. **项目展示** - 卡片式布局展示项目作品

## 后续优化建议

1. **功能扩展**
   - 添加后台管理系统（技能和项目的CRUD操作）
   - 实现留言功能并展示在页面上
   - 添加图片上传到阿里云OSS
   - 集成GitHub API展示真实项目数据

2. **性能优化**
   - 启用Nginx gzip压缩
   - 添加CDN加速
   - 图片懒加载
   - 代码分割优化

3. **安全加固**
   - 配置SSL证书（HTTPS）
   - 添加API访问频率限制
   - 输入数据验证和过滤
   - XSS和CSRF防护

4. **用户体验**
   - 添加页面加载动画
   - 技能和项目的过渡动画
   - 深色模式支持
   - 国际化（i18n）支持

5. **监控运维**
   - 使用PM2管理Node.js进程
   - 配置日志系统
   - 添加性能监控
   - 错误上报系统

## 项目成果

✅ 完成全栈个人作品集网站开发  
✅ 成功部署到生产环境（http://1.14.193.193）  
✅ 完整的多语言文档支持  
✅ 代码托管到GitHub并保持更新  
✅ 展示9种核心技能和4个项目作品  
✅ 响应式设计，支持多设备访问  

## 技术成长

通过本项目，掌握了以下技术要点：

1. Vue 3 Composition API的实际应用
2. Express框架的RESTful API设计
3. Nginx反向代理配置
4. 宝塔面板的Windows部署流程
5. Git版本控制和GitHub协作
6. 前后端分离架构
7. 模拟数据和降级方案设计
8. TailwindCSS响应式布局

---

**文档更新时间：** 2026年6月12日  
**文档维护者：** Slience996
