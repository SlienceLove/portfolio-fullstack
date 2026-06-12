# API 接口文档

## 基础信息

**Base URL:** `http://localhost:3000/api` (本地开发)

**响应格式:** 所有API返回统一的JSON格式

成功响应：
```json
{
  "success": true,
  "data": { ... }
}
```

失败响应：
```json
{
  "success": false,
  "error": "错误信息"
}
```

---

## 项目 API

### 1. 获取所有项目

**请求:**
```
GET /api/projects
```

**响应示例:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Unity 3D船闸学习系统",
      "description": "基于Unity的交互式学习平台",
      "coverImage": "https://...",
      "techStack": ["Unity", "C#", "TCP", "MongoDB"],
      "features": ["教师端编辑界面", "学生端学习模块"],
      "screenshots": ["https://..."],
      "links": {
        "github": "https://github.com/...",
        "demo": "https://..."
      },
      "createdAt": "2026-06-12T00:00:00.000Z",
      "updatedAt": "2026-06-12T00:00:00.000Z"
    }
  ]
}
```

### 2. 获取单个项目详情

**请求:**
```
GET /api/projects/:id
```

**参数:**
- `id` (路径参数) - 项目ID

**响应示例:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Unity 3D船闸学习系统",
    "description": "基于Unity的交互式学习平台",
    "coverImage": "https://...",
    "techStack": ["Unity", "C#", "TCP", "MongoDB"],
    "features": ["教师端编辑界面", "学生端学习模块"],
    "screenshots": ["https://..."],
    "links": {
      "github": "https://github.com/...",
      "demo": "https://..."
    },
    "createdAt": "2026-06-12T00:00:00.000Z",
    "updatedAt": "2026-06-12T00:00:00.000Z"
  }
}
```

### 3. 创建新项目

**请求:**
```
POST /api/projects
Content-Type: application/json
```

**请求体:**
```json
{
  "title": "项目标题",
  "description": "项目描述",
  "coverImage": "https://封面图URL",
  "techStack": ["技术栈1", "技术栈2"],
  "features": ["特性1", "特性2"],
  "screenshots": ["https://截图URL"],
  "links": {
    "github": "https://github.com/...",
    "demo": "https://..."
  }
}
```

**响应:**
```json
{
  "success": true,
  "data": {
    "_id": "新创建的项目ID",
    ...
  }
}
```

---

## 技能 API

### 1. 获取所有技能

**请求:**
```
GET /api/skills
```

**响应示例:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Vue.js",
      "category": "frontend",
      "proficiency": 90,
      "icon": "vue-icon.svg",
      "order": 1,
      "createdAt": "2026-06-12T00:00:00.000Z"
    }
  ]
}
```

**技能分类:**
- `frontend` - 前端技能
- `backend` - 后端技能
- `other` - 其他技能

### 2. 创建新技能

**请求:**
```
POST /api/skills
Content-Type: application/json
```

**请求体:**
```json
{
  "name": "技能名称",
  "category": "frontend",
  "proficiency": 90,
  "icon": "icon.svg",
  "order": 1
}
```

**响应:**
```json
{
  "success": true,
  "data": {
    "_id": "新创建的技能ID",
    ...
  }
}
```

---

## 留言 API

### 1. 提交留言

**请求:**
```
POST /api/messages
Content-Type: application/json
```

**请求体:**
```json
{
  "name": "访客姓名",
  "email": "visitor@example.com",
  "content": "留言内容"
}
```

**验证规则:**
- `name` - 必填，字符串
- `email` - 必填，符合邮箱格式
- `content` - 必填，字符串

**响应:**
```json
{
  "success": true,
  "data": {
    "_id": "留言ID",
    "name": "访客姓名",
    "email": "visitor@example.com",
    "content": "留言内容",
    "isRead": false,
    "createdAt": "2026-06-12T00:00:00.000Z"
  }
}
```

### 2. 获取所有留言

**请求:**
```
GET /api/messages
```

**响应:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "留言ID",
      "name": "访客姓名",
      "email": "visitor@example.com",
      "content": "留言内容",
      "isRead": false,
      "createdAt": "2026-06-12T00:00:00.000Z"
    }
  ]
}
```

---

## 错误处理

### 常见错误码

- `400` - 请求参数错误
- `404` - 资源不存在
- `500` - 服务器内部错误

### 错误响应示例

```json
{
  "success": false,
  "error": "邮箱格式不正确"
}
```

---

## 测试建议

使用 Postman 或 curl 测试API：

```bash
# 获取所有项目
curl http://localhost:3000/api/projects

# 提交留言
curl -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -d '{"name":"测试用户","email":"test@example.com","content":"测试留言"}'

# 获取所有技能
curl http://localhost:3000/api/skills
```
