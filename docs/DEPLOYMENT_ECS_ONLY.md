# 阿里云 ECS 部署方案（无需OSS）

本方案使用单台ECS服务器同时部署前后端，使用Nginx托管静态文件。

---

## 部署架构

```
用户访问
   ↓
ECS服务器 (Nginx)
   ├── 静态文件 (前端) → /var/www/frontend
   └── API请求 → Node.js (3000端口)
          ↓
   MongoDB Atlas (云数据库)
```

---

## 一、准备工作

### 1. 购买阿里云ECS

**最低配置：**
- CPU：1核
- 内存：2GB
- 带宽：1Mbps
- 系统盘：40GB
- 操作系统：CentOS 7.9 或 Ubuntu 20.04

**安全组规则：**
- 开放端口：22（SSH）、80（HTTP）、443（HTTPS）

### 2. 获取服务器信息

- 公网IP：`your-ecs-ip`
- SSH密码或密钥

---

## 二、连接服务器并安装环境

### 1. 连接到服务器

```bash
ssh root@your-ecs-ip
```

### 2. 安装必要软件

```bash
# 更新系统
yum update -y  # CentOS
# 或 apt update && apt upgrade -y  # Ubuntu

# 安装Node.js 18
curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
yum install -y nodejs  # CentOS
# 或 apt install -y nodejs  # Ubuntu

# 验证安装
node --version
npm --version

# 安装PM2
npm install -g pm2

# 安装Nginx
yum install -y nginx  # CentOS
# 或 apt install -y nginx  # Ubuntu

# 安装Git
yum install -y git  # CentOS
# 或 apt install -y git  # Ubuntu
```

---

## 三、部署后端

### 1. 克隆代码到服务器

```bash
# 创建项目目录
mkdir -p /var/www
cd /var/www

# 克隆GitHub仓库
git clone https://github.com/SlienceLove/portfolio-fullstack.git
cd portfolio-fullstack
```

### 2. 配置后端

```bash
cd backend

# 安装依赖
npm install --production

# 配置环境变量
cp .env.example .env
vi .env
```

编辑`.env`文件（按`i`进入编辑模式）：
```env
MONGODB_URI=mongodb+srv://332062948_db_user:6Wp5pMpaPLNUyFO4@portfolio.evw9rw1.mongodb.net/portfolio?retryWrites=true&w=majority&appName=portfolio
PORT=3000
```

保存并退出（按`Esc`，输入`:wq`，回车）

### 3. 初始化数据库

```bash
# 运行种子脚本
node seed.js
```

**预期输出：**
```
MongoDB connected
Existing data cleared
Skills data seeded
Projects data seeded
✅ Database seeded successfully!
```

### 4. 使用PM2启动后端

```bash
# 启动后端服务
pm2 start server.js --name portfolio-api

# 查看状态
pm2 status

# 查看日志
pm2 logs portfolio-api

# 设置开机自启
pm2 startup
pm2 save
```

### 5. 测试后端

```bash
# 在服务器上测试
curl http://localhost:3000/health

# 应该返回：
# {"status":"ok","message":"Server is running","mode":"database"}
```

---

## 四、部署前端

### 1. 在本地构建前端

**在本地电脑（Windows）执行：**

```bash
cd D:\Project\A_MyProject\frontend

# 创建生产环境配置
echo VITE_API_URL=http://your-ecs-ip/api > .env.production

# 构建生产版本
npm run build
```

构建完成后，`dist`目录包含所有静态文件。

### 2. 上传前端文件到服务器

**方法一：使用SCP（推荐）**

在本地电脑执行：
```bash
# 上传dist目录到服务器
scp -r D:\Project\A_MyProject\frontend\dist root@your-ecs-ip:/var/www/portfolio-fullstack/frontend/
```

**方法二：使用Git推送后在服务器构建**

```bash
# 在服务器上
cd /var/www/portfolio-fullstack/frontend
npm install
npm run build
```

### 3. 移动前端文件到Nginx目录

```bash
# 在服务器上执行
mkdir -p /var/www/html/portfolio
cp -r /var/www/portfolio-fullstack/frontend/dist/* /var/www/html/portfolio/
```

---

## 五、配置Nginx

### 1. 创建Nginx配置文件

```bash
vi /etc/nginx/conf.d/portfolio.conf
```

输入以下内容：

```nginx
server {
    listen 80;
    server_name your-ecs-ip;  # 或您的域名

    # 前端静态文件
    location / {
        root /var/www/html/portfolio;
        index index.html;
        try_files $uri $uri/ /index.html;  # SPA路由支持
    }

    # 后端API代理
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $http_x_forwarded_proto;
        proxy_cache_bypass $http_upgrade;
    }

    # 健康检查
    location /health {
        proxy_pass http://localhost:3000;
    }

    # Gzip压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

保存并退出（`:wq`）

### 2. 测试并启动Nginx

```bash
# 测试配置
nginx -t

# 启动Nginx
systemctl start nginx
systemctl enable nginx

# 如果Nginx已启动，重新加载配置
systemctl reload nginx
```

### 3. 配置防火墙

```bash
# CentOS 7
firewall-cmd --zone=public --add-port=80/tcp --permanent
firewall-cmd --zone=public --add-port=443/tcp --permanent
firewall-cmd --reload

# Ubuntu
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

---

## 六、访问测试

### 1. 访问网站

在浏览器中打开：
```
http://your-ecs-ip
```

您应该能看到：
- ✅ 完整的作品集页面
- ✅ 技能展示
- ✅ 项目作品
- ✅ 联系表单

### 2. 测试API

```
http://your-ecs-ip/api/projects
http://your-ecs-ip/api/skills
```

### 3. 测试留言功能

在网站上填写联系表单并提交。

---

## 七、图片处理方案（无OSS）

### 方案一：使用服务器本地存储

1. **创建图片目录：**
```bash
mkdir -p /var/www/html/portfolio/uploads
chmod 755 /var/www/html/portfolio/uploads
```

2. **上传图片：**
```bash
# 从本地上传项目截图
scp D:\Project\船闸项目\Screenshots\*.png root@your-ecs-ip:/var/www/html/portfolio/uploads/
```

3. **更新数据库中的图片URL：**
```
http://your-ecs-ip/uploads/image1.png
```

### 方案二：使用阿里云NAS

1. **挂载NAS到ECS：**
```bash
# 安装NFS客户端
yum install -y nfs-utils  # CentOS
# 或 apt install -y nfs-common  # Ubuntu

# 创建挂载点
mkdir -p /mnt/nas

# 挂载NAS（在NAS控制台获取挂载命令）
mount -t nfs -o vers=3 your-nas-address:/ /mnt/nas

# 创建图片目录
mkdir -p /mnt/nas/portfolio/images
ln -s /mnt/nas/portfolio/images /var/www/html/portfolio/uploads
```

2. **配置Nginx访问NAS图片：**
```nginx
location /uploads {
    alias /mnt/nas/portfolio/images;
    expires 30d;
    add_header Cache-Control "public, immutable";
}
```

### 方案三：使用外部图床

使用免费图床服务：
- Imgur: https://imgur.com
- imgbb: https://imgbb.com
- SM.MS: https://sm.ms

---

## 八、配置HTTPS（推荐）

### 使用Let's Encrypt免费证书

```bash
# 安装certbot
yum install -y certbot python3-certbot-nginx  # CentOS
# 或 apt install -y certbot python3-certbot-nginx  # Ubuntu

# 申请证书（需要域名）
certbot --nginx -d yourdomain.com

# 自动续期测试
certbot renew --dry-run
```

---

## 九、更新部署

### 更新代码

```bash
cd /var/www/portfolio-fullstack

# 拉取最新代码
git pull origin main

# 更新后端
cd backend
npm install --production
pm2 restart portfolio-api

# 更新前端
cd ../frontend
npm run build
cp -r dist/* /var/www/html/portfolio/
```

---

## 十、监控和维护

### 1. 查看服务状态

```bash
# PM2状态
pm2 status
pm2 logs portfolio-api

# Nginx状态
systemctl status nginx

# 查看Nginx日志
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### 2. 重启服务

```bash
# 重启后端
pm2 restart portfolio-api

# 重启Nginx
systemctl restart nginx
```

### 3. 监控资源

```bash
# 查看系统资源
pm2 monit

# 查看磁盘空间
df -h

# 查看内存使用
free -h
```

---

## 十一、成本估算

### ECS服务器

- **入门配置**：1核2GB，1Mbps带宽
- **价格**：约60-100元/月（按量付费或包年包月）

### NAS文件存储（可选）

- **按量付费**：约0.35元/GB/月
- **性能型**：0.6元/GB/月
- **10GB存储**：约3.5-6元/月

### 域名（可选）

- **.com域名**：约50-80元/年
- **.cn域名**：约29元/年

**总计：** 约65-110元/月

---

## 十二、故障排查

### 问题1：前端显示404

**解决：**
- 检查Nginx配置中的`root`路径
- 确认前端文件已正确上传
- 重启Nginx：`systemctl restart nginx`

### 问题2：API调用失败

**解决：**
- 检查PM2状态：`pm2 status`
- 查看后端日志：`pm2 logs portfolio-api`
- 测试后端：`curl http://localhost:3000/health`

### 问题3：MongoDB连接失败

**解决：**
- 检查`.env`文件配置
- 确认MongoDB Atlas网络访问包含ECS IP
- 测试DNS：`ping portfolio.evw9rw1.mongodb.net`

### 问题4：样式丢失

**解决：**
- 清除浏览器缓存
- 检查前端构建：`npm run build`
- 确认静态文件权限：`chmod -R 755 /var/www/html/portfolio`

---

## 十三、检查清单

部署前：
- [ ] ECS服务器已购买
- [ ] 安全组已配置（80、443端口开放）
- [ ] MongoDB Atlas已配置
- [ ] 代码已推送到GitHub

部署后：
- [ ] 后端服务运行正常
- [ ] 前端页面可访问
- [ ] API接口正常响应
- [ ] 数据正确显示
- [ ] 留言功能可用
- [ ] 移动端显示正常

---

## 快速部署脚本

将以下脚本保存为`deploy.sh`，上传到服务器执行：

```bash
#!/bin/bash
# 快速部署脚本

echo "开始部署..."

# 1. 安装环境
echo "安装环境..."
curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
yum install -y nodejs nginx git
npm install -g pm2

# 2. 克隆代码
echo "克隆代码..."
cd /var/www
git clone https://github.com/SlienceLove/portfolio-fullstack.git
cd portfolio-fullstack

# 3. 部署后端
echo "部署后端..."
cd backend
npm install --production
cp .env.example .env
echo "请手动编辑 /var/www/portfolio-fullstack/backend/.env 文件"
read -p "编辑完成后按回车继续..."
node seed.js
pm2 start server.js --name portfolio-api
pm2 save
pm2 startup

# 4. 部署前端
echo "部署前端..."
cd ../frontend
npm install
npm run build
mkdir -p /var/www/html/portfolio
cp -r dist/* /var/www/html/portfolio/

# 5. 配置Nginx
echo "配置Nginx..."
cat > /etc/nginx/conf.d/portfolio.conf << 'EOF'
server {
    listen 80;
    server_name _;
    
    location / {
        root /var/www/html/portfolio;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
EOF

nginx -t && systemctl restart nginx
systemctl enable nginx

echo "部署完成！"
echo "访问地址：http://$(curl -s ifconfig.me)"
```

使用方法：
```bash
chmod +x deploy.sh
./deploy.sh
```

---

**需要帮助？**
- 查看日志：`pm2 logs`
- 重启服务：`pm2 restart all`
- Nginx日志：`/var/log/nginx/`

**文档版本：** 1.0（ECS单服务器部署方案）  
**最后更新：** 2026-06-12
