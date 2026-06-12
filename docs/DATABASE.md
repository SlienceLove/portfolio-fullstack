# 数据库结构文档

## 概述

本项目使用 MongoDB 作为数据库，通过 Mongoose ODM 进行数据建模和操作。

数据库名称：`portfolio`

---

## 集合（Collections）

### 1. projects - 项目集合

存储个人项目作品信息。

**Schema 定义：**

```javascript
{
  title: String,              // 项目标题 (必填)
  description: String,        // 项目描述 (必填)
  coverImage: String,         // 封面图URL (必填)
  techStack: [String],        // 技术栈数组
  features: [String],         // 功能特性数组
  screenshots: [String],      // 截图URL数组
  links: {
    github: String,           // GitHub仓库链接
    demo: String              // 在线演示链接
  },
  createdAt: Date,            // 创建时间 (自动生成)
  updatedAt: Date             // 更新时间 (自动生成)
}
```

**索引：**
- `createdAt: -1` - 按创建时间倒序排列

**示例数据：**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Unity 3D船闸学习系统",
  "description": "基于Unity的交互式学习平台，包含教师编辑界面和学生学习模块",
  "coverImage": "https://oss.aliyun.com/projects/ship-lock-cover.jpg",
  "techStack": ["Unity", "C#", "TCP", "MongoDB"],
  "features": [
    "教师端编辑界面 - 创建和管理学习模块",
    "学生端学习模块 - 浏览内容、观看视频",
    "实时数据同步 - 基于TCP的内容分发"
  ],
  "screenshots": [
    "https://oss.aliyun.com/projects/ship-lock-1.jpg",
    "https://oss.aliyun.com/projects/ship-lock-2.jpg"
  ],
  "links": {
    "github": "https://github.com/SlienceLove/ship-lock",
    "demo": ""
  },
  "createdAt": "2026-06-12T00:00:00.000Z",
  "updatedAt": "2026-06-12T00:00:00.000Z"
}
```

---

### 2. skills - 技能集合

存储个人技能和熟练度信息。

**Schema 定义：**

```javascript
{
  name: String,               // 技能名称 (必填)
  category: String,           // 分类 (必填，枚举值: frontend/backend/other)
  proficiency: Number,        // 熟练度 (必填，0-100)
  icon: String,               // 图标名称或URL
  order: Number,              // 显示排序 (默认: 0)
  createdAt: Date             // 创建时间 (自动生成)
}
```

**分类说明：**
- `frontend` - 前端技能（Vue.js, React, HTML/CSS等）
- `backend` - 后端技能（Node.js, Express, MongoDB等）
- `other` - 其他技能（Unity, Git, Docker等）

**索引：**
- `{ category: 1, order: 1 }` - 按分类和排序字段升序排列

**示例数据：**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Vue.js",
  "category": "frontend",
  "proficiency": 90,
  "icon": "vue-icon.svg",
  "order": 1,
  "createdAt": "2026-06-12T00:00:00.000Z"
}
```

---

### 3. messages - 留言集合

存储访客留言信息。

**Schema 定义：**

```javascript
{
  name: String,               // 访客姓名 (必填)
  email: String,              // 访客邮箱 (必填)
  content: String,            // 留言内容 (必填)
  isRead: Boolean,            // 是否已读 (默认: false)
  createdAt: Date,            // 创建时间 (自动生成)
  updatedAt: Date             // 更新时间 (自动生成)
}
```

**索引：**
- `createdAt: -1` - 按创建时间倒序排列
- `isRead: 1` - 按是否已读排序

**示例数据：**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "name": "张三",
  "email": "zhangsan@example.com",
  "content": "您的作品集网站做得非常棒！",
  "isRead": false,
  "createdAt": "2026-06-12T10:30:00.000Z",
  "updatedAt": "2026-06-12T10:30:00.000Z"
}
```

---

## 数据库配置

### MongoDB Atlas 配置步骤

1. **注册账号**
   - 访问 https://www.mongodb.com/cloud/atlas
   - 注册免费账号

2. **创建集群**
   - 选择免费的 M0 Sandbox 层级（512MB 存储）
   - 选择区域（推荐：AWS Singapore 或 GCP Taiwan）

3. **创建数据库用户**
   - Database Access → Add New Database User
   - 用户名：`portfolio_user`
   - 密码：生成强密码并保存

4. **配置网络访问**
   - Network Access → Add IP Address
   - 开发环境：选择 "Allow Access from Anywhere" (0.0.0.0/0)
   - 生产环境：添加服务器IP地址

5. **获取连接字符串**
   - Cluster → Connect → Connect your application
   - Driver: Node.js, Version: 5.5 or later
   - 复制连接字符串：
   ```
   mongodb+srv://portfolio_user:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   ```
   - 替换 `<password>` 为实际密码

6. **配置后端环境变量**
   - 创建 `backend/.env` 文件
   - 添加连接字符串：
   ```env
   MONGODB_URI=mongodb+srv://portfolio_user:your_password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

---

## 数据初始化

### 运行种子脚本

项目提供了数据初始化脚本 `backend/seed.js`。

**执行步骤：**

1. 确保已配置 MongoDB 连接：
```bash
cd backend
# 确保 .env 文件中有 MONGODB_URI
```

2. 运行种子脚本：
```bash
node seed.js
```

3. 预期输出：
```
MongoDB connected
Existing data cleared
Skills data seeded
Projects data seeded
✅ Database seeded successfully!
```

**种子数据包含：**
- 16 个技能数据（前端、后端、其他）
- 3 个项目数据（Unity船闸项目、作品集、Todo应用）

---

## 数据库操作

### 使用 MongoDB Compass 可视化管理

1. **下载安装**
   - 访问 https://www.mongodb.com/products/compass
   - 下载并安装 MongoDB Compass

2. **连接数据库**
   - 打开 Compass
   - 粘贴 MongoDB Atlas 连接字符串
   - 点击 Connect

3. **查看数据**
   - 选择 `portfolio` 数据库
   - 浏览 `projects`, `skills`, `messages` 集合

### 使用 Mongoose 查询

```javascript
// 查询所有项目
const projects = await Project.find().sort({ createdAt: -1 });

// 按分类查询技能
const frontendSkills = await Skill.find({ category: 'frontend' }).sort({ order: 1 });

// 查询未读留言
const unreadMessages = await Message.find({ isRead: false }).sort({ createdAt: -1 });

// 更新留言为已读
await Message.findByIdAndUpdate(messageId, { isRead: true });
```

---

## 数据备份

### 使用 mongodump 备份

```bash
# 备份整个数据库
mongodump --uri="mongodb+srv://username:password@cluster.mongodb.net/portfolio"

# 备份到指定目录
mongodump --uri="mongodb+srv://username:password@cluster.mongodb.net/portfolio" --out=./backup
```

### 使用 mongorestore 恢复

```bash
# 恢复数据库
mongorestore --uri="mongodb+srv://username:password@cluster.mongodb.net/portfolio" ./backup/portfolio
```

---

## 性能优化

### 索引优化

项目已配置必要的索引：

```javascript
// projects 集合
db.projects.createIndex({ createdAt: -1 });

// skills 集合
db.skills.createIndex({ category: 1, order: 1 });

// messages 集合
db.messages.createIndex({ createdAt: -1 });
db.messages.createIndex({ isRead: 1 });
```

### 查询优化建议

1. **使用投影（Projection）**
   - 只查询需要的字段
   ```javascript
   Project.find({}, 'title description coverImage techStack');
   ```

2. **使用分页**
   - 避免一次性加载大量数据
   ```javascript
   Project.find().limit(10).skip(0);
   ```

3. **使用 lean()**
   - 返回纯 JavaScript 对象，提升性能
   ```javascript
   Project.find().lean();
   ```

---

## 常见问题

### 1. 连接超时
- 检查网络访问白名单
- 确认连接字符串正确
- 检查防火墙设置

### 2. 认证失败
- 确认用户名和密码正确
- 检查用户权限设置

### 3. 数据库不存在
- MongoDB 会在首次插入数据时自动创建数据库
- 运行 seed.js 脚本初始化数据

### 4. 查询速度慢
- 检查是否创建了索引
- 使用 explain() 分析查询性能
- 考虑使用分页
