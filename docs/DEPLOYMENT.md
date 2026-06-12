# 部署指南

本文档详细说明如何将项目部署到生产环境。

---

## 部署架构

```
┌─────────────┐
│   用户访问   │
└──────┬──────┘
       │
       ├─── 静态资源 ──→ ┌──────────────┐
       │                 │ 阿里云OSS     │
       │                 │ (前端托管)    │
       │                 └──────────────┘
       │
       └─── API请求 ──→ ┌──────────────┐
                        │ 阿里云ECS     │
                        │ (后端API)     │
                        └──────┬───────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
            ┌───────▼────────┐   ┌───────▼────────┐
            │ MongoDB Atlas  │   │  阿里云OSS     │
            │ (数据存储)      │   │  (图片存储)     │
            └────────────────┘   └────────────────┘
```

---

## 前置准备

### 1. MongoDB Atlas 配置

详见 [DATABASE.md](DATABASE.md) 文档。

简要步骤：
1. 注册 MongoDB Atlas 账号
2. 创建免费集群（512MB）
3. 创建数据库用户
4. 配置网络访问（添加 ECS 服务器IP）
5. 获取连接字符串
6. 运行数据初始化脚本

### 2. 阿里云账号准备

需要开通以下服务：
- **OSS 对象存储** - 用于前端静态托管和图片存储
- **ECS 云服务器** - 用于后端API部署（或使用轻量应用服务器）

---

## 一、前端部署（阿里云OSS）

### 1.1 构建前端项目

```bash
cd D:/Project/A_MyProject/frontend

# 设置生产环境API地址
# 创建 .env.production 文件
echo "VITE_API_URL=http://your-ecs-ip:3000/api" > .env.production

# 构建生产版本
npm run build
```

构建完成后，`dist` 目录包含所有静态文件。

### 1.2 创建 OSS Bucket

1. **登录阿里云控制台**
   - 访问 https://oss.console.aliyun.com

2. **创建 Bucket**
   - 点击"创建 Bucket"
   - Bucket 名称：`portfolio-frontend`（全局唯一）
   - 区域：选择离您最近的区域（如华东1-杭州）
   - 存储类型：标准存储
   - 读写权限：**公共读**
   - 其他保持默认

3. **配置静态网站托管**
   - 进入 Bucket → 基础设置 → 静态页面
   - 默认首页：`index.html`
   - 默认404页：`index.html`（用于Vue Router）
   - 点击保存

4. **配置跨域规则（CORS）**
   - 进入 Bucket → 权限管理 → 跨域设置
   - 点击"创建规则"
   - 来源：`*`
   - 允许Methods：`GET, POST, PUT, DELETE, HEAD`
   - 允许Headers：`*`
   - 暴露Headers：`ETag`

### 1.3 上传文件到 OSS

**方法一：使用阿里云控制台**
1. 进入 Bucket → 文件管理
2. 点击"上传文件"
3. 选择 `frontend/dist` 目录下的所有文件
4. 上传完成

**方法二：使用 ossutil 工具**

1. 安装 ossutil：
```bash
# Windows
# 下载 https://gosspublic.alicdn.com/ossutil/ossutil64.exe
# 重命名为 ossutil.exe 并添加到 PATH
```

2. 配置 ossutil：
```bash
ossutil config
# 输入以下信息：
# Endpoint: oss-cn-hangzhou.aliyuncs.com (根据您的区域调整)
# Access Key ID: 您的AccessKey ID
# Access Key Secret: 您的AccessKey Secret
```

3. 上传文件：
```bash
cd D:/Project/A_MyProject/frontend
ossutil cp -r dist/ oss://portfolio-frontend/ -u
```

### 1.4 获取访问地址

上传完成后，访问地址为：
```
http://portfolio-frontend.oss-cn-hangzhou.aliyuncs.com/index.html
```

或者简化为：
```
http://portfolio-frontend.oss-cn-hangzhou.aliyuncs.com
```

### 1.5 绑定自定义域名（可选）

1. **域名备案**（中国大陆必须）
   - 需要在阿里云完成ICP备案

2. **绑定域名**
   - Bucket → 传输管理 → 域名管理
   - 点击"绑定域名"
   - 输入您的域名（如 `www.yourportfolio.com`）

3. **配置DNS解析**
   - 进入阿里云DNS控制台
   - 添加CNAME记录：
     - 记录类型：CNAME
     - 主机记录：www
     - 记录值：`portfolio-frontend.oss-cn-hangzhou.aliyuncs.com`

4. **配置HTTPS（推荐）**
   - 申请免费SSL证书
   - 在OSS中上传证书
   - 强制HTTPS访问

---

## 二、后端部署（阿里云ECS）

### 2.1 购买ECS服务器

1. **选择配置**
   - 地域：选择与OSS相同的区域
   - 实例规格：1核2GB（入门配置）
   - 操作系统：CentOS 7.9 或 Ubuntu 20.04
   - 网络：按流量计费或包年包月

2. **配置安全组**
   - 开放端口：22（SSH）、80（HTTP）、443（HTTPS）、3000（Node.js）

### 2.2 连接服务器

```bash
ssh root@your-ecs-ip
```

### 2.3 安装环境

```bash
# 更新系统
yum update -y  # CentOS
# 或
apt update && apt upgrade -y  # Ubuntu

# 安装Node.js 18
curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
yum install -y nodejs  # CentOS
# 或
apt install -y nodejs  # Ubuntu

# 验证安装
node --version
npm --version

# 安装PM2（进程管理器）
npm install -g pm2

# 安装Git
yum install -y git  # CentOS
# 或
apt install -y git  # Ubuntu
```

### 2.4 部署后端代码

```bash
# 创建项目目录
mkdir -p /var/www
cd /var/www

# 克隆代码（需要先推送到GitHub）
git clone https://github.com/SlienceLove/portfolio-fullstack.git
cd portfolio-fullstack/backend

# 安装依赖
npm install --production

# 创建环境变量文件
cp .env.example .env
vi .env
```

编辑 `.env` 文件：
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
PORT=3000

# 如果使用阿里云OSS上传图片
OSS_REGION=oss-cn-hangzhou
OSS_ACCESS_KEY_ID=your-access-key-id
OSS_ACCESS_KEY_SECRET=your-access-key-secret
OSS_BUCKET=your-bucket-name
```

### 2.5 初始化数据库

```bash
node seed.js
```

### 2.6 使用PM2启动服务

```bash
# 启动应用
pm2 start server.js --name portfolio-api

# 设置开机自启
pm2 startup
pm2 save

# 查看状态
pm2 status

# 查看日志
pm2 logs portfolio-api
```

**PM2 常用命令：**
```bash
pm2 restart portfolio-api  # 重启
pm2 stop portfolio-api      # 停止
pm2 delete portfolio-api    # 删除
pm2 logs portfolio-api      # 查看日志
pm2 monit                   # 监控
```

### 2.7 配置防火墙

```bash
# CentOS 7
firewall-cmd --zone=public --add-port=3000/tcp --permanent
firewall-cmd --zone=public --add-port=80/tcp --permanent
firewall-cmd --zone=public --add-port=443/tcp --permanent
firewall-cmd --reload

# Ubuntu
ufw allow 3000/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

### 2.8 配置Nginx反向代理（推荐）

```bash
# 安装Nginx
yum install -y nginx  # CentOS
# 或
apt install -y nginx  # Ubuntu

# 创建配置文件
vi /etc/nginx/conf.d/portfolio.conf
```

配置内容：
```nginx
server {
    listen 80;
    server_name your-domain.com;  # 或使用IP地址

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
```

启动Nginx：
```bash
# 测试配置
nginx -t

# 启动Nginx
systemctl start nginx
systemctl enable nginx

# 重启Nginx
systemctl restart nginx
```

现在API可以通过以下方式访问：
- 直接访问：`http://your-ecs-ip:3000/api`
- Nginx代理：`http://your-ecs-ip/api`

### 2.9 配置HTTPS（可选但推荐）

使用 Let's Encrypt 免费证书：

```bash
# 安装certbot
yum install -y certbot python3-certbot-nginx  # CentOS
# 或
apt install -y certbot python3-certbot-nginx  # Ubuntu

# 申请证书
certbot --nginx -d your-domain.com

# 自动续期
certbot renew --dry-run
```

---

## 三、阿里云OSS图片存储配置

### 3.1 创建OSS Bucket（图片存储）

1. 创建新的Bucket：`portfolio-images`
2. 读写权限：**公共读**
3. 配置跨域规则（同前端Bucket）

### 3.2 获取AccessKey

1. 访问 https://ram.console.aliyun.com/users
2. 创建RAM用户
3. 授权策略：`AliyunOSSFullAccess`
4. 创建AccessKey并保存

### 3.3 配置后端环境变量

在 `backend/.env` 中添加：
```env
OSS_REGION=oss-cn-hangzhou
OSS_ACCESS_KEY_ID=your-access-key-id
OSS_ACCESS_KEY_SECRET=your-access-key-secret
OSS_BUCKET=portfolio-images
```

### 3.4 测试图片上传

上传测试图片到OSS，然后在项目数据中使用OSS URL。

---

## 四、更新部署

### 4.1 更新前端

```bash
# 本地构建
cd D:/Project/A_MyProject/frontend
npm run build

# 上传到OSS
ossutil cp -r dist/ oss://portfolio-frontend/ -u
```

### 4.2 更新后端

```bash
# 在服务器上
cd /var/www/portfolio-fullstack
git pull origin main

cd backend
npm install --production

# 重启服务
pm2 restart portfolio-api
```

---

## 五、监控和维护

### 5.1 查看应用状态

```bash
# PM2状态
pm2 status

# 应用日志
pm2 logs portfolio-api

# 系统资源
pm2 monit
```

### 5.2 查看Nginx日志

```bash
# 访问日志
tail -f /var/log/nginx/access.log

# 错误日志
tail -f /var/log/nginx/error.log
```

### 5.3 数据库备份

```bash
# 使用mongodump备份
mongodump --uri="mongodb+srv://username:password@cluster.mongodb.net/portfolio" --out=/backup/$(date +%Y%m%d)
```

建议设置定时任务每天备份。

---

## 六、故障排查

### 6.1 前端无法访问

- 检查OSS Bucket权限是否为"公共读"
- 检查文件是否正确上传
- 检查静态网站托管是否启用
- 清除浏览器缓存

### 6.2 后端API报错

```bash
# 查看PM2日志
pm2 logs portfolio-api

# 检查进程状态
pm2 status

# 手动启动测试
cd /var/www/portfolio-fullstack/backend
node server.js
```

### 6.3 数据库连接失败

- 检查MongoDB Atlas网络访问白名单
- 确认连接字符串正确
- 检查数据库用户权限
- 测试网络连接：`ping cluster.mongodb.net`

### 6.4 跨域问题

- 检查后端CORS配置
- 检查OSS跨域规则
- 确认前端API_URL配置正确

---

## 七、性能优化

### 7.1 前端优化

- 启用OSS CDN加速
- 配置浏览器缓存
- 压缩静态资源
- 使用图片懒加载

### 7.2 后端优化

- 使用PM2集群模式：`pm2 start server.js -i max`
- 添加Redis缓存
- 数据库查询优化
- API响应压缩

### 7.3 安全加固

- 配置HTTPS
- 限制API请求频率
- 隐藏敏感信息
- 定期更新依赖

---

## 八、成本估算

### 免费/低成本方案

- **MongoDB Atlas**: 512MB 免费
- **阿里云OSS**: 前5GB存储免费，流量0.5元/GB
- **阿里云ECS**: 轻量应用服务器约60元/月（1核2GB）

**预估月成本**: 约70-100元人民币

---

## 九、检查清单

部署前检查：
- [ ] MongoDB Atlas配置完成
- [ ] 数据库初始化完成
- [ ] 阿里云OSS创建完成
- [ ] ECS服务器购买完成
- [ ] 域名备案完成（如需要）
- [ ] SSL证书申请完成（如需要）

部署后检查：
- [ ] 前端页面可以访问
- [ ] API接口正常响应
- [ ] 数据正确显示
- [ ] 留言功能可用
- [ ] 图片正常加载
- [ ] 移动端显示正常

---

## 联系与支持

如有问题，请参考：
- [API文档](API.md)
- [数据库文档](DATABASE.md)
- GitHub Issues: https://github.com/SlienceLove/portfolio-fullstack/issues
