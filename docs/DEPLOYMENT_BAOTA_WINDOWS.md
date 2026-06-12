# 宝塔Windows面板部署方案

本方案使用腾讯云Windows Server + 宝塔Windows面板部署全栈作品集应用。

---

## 服务器信息

- **公网IP**: 1.14.193.193
- **操作系统**: Windows Server 2022 DataCenter 64bit中文版
- **配置**: 2核2GB, 40GB SSD, 3Mbps带宽
- **面板**: 宝塔Windows面板 8.5.0
- **管理员账号**: Administrator
- **管理员密码**: f95kMG_bV!,.%hT

---

## 一、访问宝塔面板

### 1. 登录面板

在浏览器中打开：
```
http://1.14.193.193:8888
```

**宝塔账号信息（面板初次访问时会显示）：**
- 如果已经设置过账号密码，使用您设置的账号密码登录
- 如果是首次访问，按照面板提示设置账号密码

### 2. 绑定宝塔账号

首次登录可能要求绑定宝塔官网账号：
- 如果有账号：直接登录绑定
- 如果没有账号：注册一个免费账号并绑定

---

## 二、安装运行环境

### 1. 安装Node.js

在宝塔面板中：
1. 点击左侧菜单 **软件商店**
2. 搜索 **Node版本管理器**
3. 点击 **安装**
4. 安装完成后，点击 **设置**
5. 安装 **Node.js 18.x** 版本
6. 等待安装完成

### 2. 验证Node.js安装

1. 点击左侧菜单 **终端**
2. 输入命令验证：
```bash
node --version
npm --version
```

应该看到类似输出：
```
v18.x.x
9.x.x
```

### 3. 安装PM2

在终端中执行：
```bash
npm install -g pm2
```

验证安装：
```bash
pm2 --version
```

---

## 三、上传项目代码

### 方法一：使用宝塔面板上传（推荐）

#### 1. 创建项目目录

1. 点击左侧菜单 **文件**
2. 进入 `C:\wwwroot` 目录（如果没有则创建）
3. 创建新文件夹 `portfolio`

#### 2. 上传后端代码

1. 在本地电脑，进入 `D:\Project\A_MyProject\backend`
2. 选择所有文件（排除 `node_modules` 文件夹）
3. 压缩成 `backend.zip`
4. 在宝塔面板文件管理中，进入 `C:\wwwroot\portfolio`
5. 点击 **上传**，选择 `backend.zip`
6. 上传完成后，右键点击 `backend.zip`，选择 **解压**
7. 解压后重命名文件夹为 `backend`

#### 3. 上传前端构建文件

**先在本地构建前端：**

在本地电脑 PowerShell 中执行：
```powershell
cd D:\Project\A_MyProject\frontend

# 创建生产环境配置
echo "VITE_API_URL=http://1.14.193.193/api" > .env.production

# 构建
npm run build
```

构建完成后：
1. 进入 `D:\Project\A_MyProject\frontend\dist` 目录
2. 选择所有文件，压缩成 `frontend.zip`
3. 在宝塔面板文件管理中，进入 `C:\wwwroot\portfolio`
4. 上传 `frontend.zip`
5. 解压后重命名文件夹为 `frontend`

### 方法二：使用Git克隆（需要先安装Git）

1. 在宝塔面板，点击 **软件商店**，搜索并安装 **Git**
2. 在终端中执行：
```bash
cd C:\wwwroot
git clone https://github.com/SlienceLove/portfolio-fullstack.git portfolio
cd portfolio
```

---

## 四、配置后端

### 1. 安装后端依赖

在宝塔终端中：
```bash
cd C:\wwwroot\portfolio\backend
npm install --production
```

### 2. 配置环境变量

1. 在文件管理中，进入 `C:\wwwroot\portfolio\backend`
2. 找到 `.env.example` 文件
3. 复制一份，重命名为 `.env`
4. 点击 `.env` 文件，选择 **编辑**
5. 修改内容为：

```env
MONGODB_URI=mongodb+srv://332062948_db_user:6Wp5pMpaPLNUyFO4@portfolio.evw9rw1.mongodb.net/portfolio?retryWrites=true&w=majority&appName=portfolio
PORT=3000
```

保存文件。

### 3. 初始化数据库

在终端中执行：
```bash
cd C:\wwwroot\portfolio\backend
node seed.js
```

**预期输出：**
```
✅ MongoDB connected successfully
Existing data cleared
Skills data seeded
Projects data seeded
✅ Database seeded successfully!
```

如果看到 MongoDB 连接错误，应用会自动使用模拟数据模式，依然可以正常运行。

### 4. 使用PM2启动后端

在终端中执行：
```bash
cd C:\wwwroot\portfolio\backend
pm2 start server.js --name portfolio-api
pm2 save
pm2 startup
```

**查看运行状态：**
```bash
pm2 status
pm2 logs portfolio-api
```

应该看到：
```
┌─────┬─────────────────┬─────────┬─────────┐
│ id  │ name            │ status  │ restart │
├─────┼─────────────────┼─────────┼─────────┤
│ 0   │ portfolio-api   │ online  │ 0       │
└─────┴─────────────────┴─────────┴─────────┘
```

### 5. 测试后端API

在终端中测试：
```bash
curl http://localhost:3000/health
```

应该返回：
```json
{"status":"ok","message":"Server is running","mode":"database"}
```

---

## 五、配置Nginx反向代理

宝塔Windows面板使用Nginx作为Web服务器。

### 1. 创建网站

1. 点击左侧菜单 **网站**
2. 点击 **添加站点**
3. 填写信息：
   - **域名**: `1.14.193.193`（使用IP地址）
   - **根目录**: `C:\wwwroot\portfolio\frontend`
   - **PHP版本**: 纯静态
   - **数据库**: 不创建
4. 点击 **提交**

### 2. 配置反向代理

1. 在网站列表中，找到刚创建的网站
2. 点击 **设置**
3. 点击左侧 **反向代理**
4. 点击 **添加反向代理**
5. 填写信息：
   - **代理名称**: `portfolio-api`
   - **目标URL**: `http://127.0.0.1:3000`
   - **发送域名**: `$host`
   - **代理目录**: `/api`
6. 点击 **提交**

### 3. 配置伪静态（支持Vue Router）

1. 在网站设置中，点击左侧 **伪静态**
2. 输入以下规则：

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

3. 点击 **保存**

---

## 六、配置防火墙

### 1. 配置Windows防火墙

宝塔面板通常会自动配置防火墙规则，但需要确认：

1. 点击左侧菜单 **安全**
2. 确认以下端口已开放：
   - **80** (HTTP)
   - **8888** (宝塔面板)
   - **3000** (Node.js后端，仅本地访问)

如果没有开放，点击 **添加端口规则**。

### 2. 配置腾讯云安全组

1. 登录腾讯云控制台
2. 进入 **轻量应用服务器** → **防火墙**
3. 确认以下规则已添加：
   - **HTTP (80)** - 允许所有IP访问
   - **HTTPS (443)** - 允许所有IP访问（可选，用于以后配置SSL）

---

## 七、访问测试

### 1. 访问网站

在浏览器中打开：
```
http://1.14.193.193
```

您应该能看到：
- ✅ 完整的作品集页面
- ✅ 技能展示（Vue.js, React, Node.js等）
- ✅ 项目作品（Unity船闸系统等）
- ✅ 联系表单

### 2. 测试API

在浏览器中打开：
```
http://1.14.193.193/api/projects
http://1.14.193.193/api/skills
http://1.14.193.193/api/health
```

应该看到JSON格式的数据返回。

### 3. 测试留言功能

在网站上填写联系表单并提交，应该能成功提交。

---

## 八、图片资源处理

### 方案一：使用服务器本地存储

#### 1. 创建图片目录

在文件管理中：
1. 进入 `C:\wwwroot\portfolio\frontend`
2. 创建文件夹 `uploads`

#### 2. 上传项目截图

将您的项目截图（如 `D:\Project\船闸项目\Screenshots\*.png`）上传到：
```
C:\wwwroot\portfolio\frontend\uploads\
```

#### 3. 更新数据库中的图片URL

在数据库或seed.js中，将图片URL修改为：
```
http://1.14.193.193/uploads/your-image.png
```

### 方案二：使用外部图床

使用免费图床服务：
- **Imgur**: https://imgur.com
- **imgbb**: https://imgbb.com
- **SM.MS**: https://sm.ms

上传图片后，复制链接地址，更新到数据库中。

---

## 九、域名配置（可选）

如果您有域名，可以将域名解析到服务器IP。

### 1. 域名解析

在您的域名服务商处：
1. 添加 **A记录**
2. 主机记录：`@` 或 `www`
3. 记录值：`1.14.193.193`
4. TTL：默认

### 2. 修改宝塔网站配置

1. 在宝塔面板，进入 **网站** → **设置**
2. 点击 **域名管理**
3. 添加您的域名（如 `yourdomain.com`）
4. 保存

### 3. 配置HTTPS（推荐）

1. 在网站设置中，点击 **SSL**
2. 选择 **Let's Encrypt** 免费证书
3. 输入邮箱地址
4. 勾选域名
5. 点击 **申请**
6. 申请成功后，开启 **强制HTTPS**

---

## 十、更新部署

### 更新代码

#### 方法一：重新上传（简单）

1. 在本地修改代码
2. 前端：重新构建后上传 `dist` 目录内容
3. 后端：上传修改的文件

#### 方法二：使用Git拉取（推荐）

在宝塔终端中：
```bash
cd C:\wwwroot\portfolio

# 拉取最新代码
git pull origin main

# 更新后端
cd backend
npm install --production
pm2 restart portfolio-api

# 更新前端（如果使用Git方式）
cd ../frontend
npm install
npm run build
# 将 dist 内容复制到网站根目录
xcopy /E /Y dist\* C:\wwwroot\portfolio\frontend\
```

---

## 十一、监控和维护

### 1. 查看后端日志

在宝塔终端中：
```bash
pm2 logs portfolio-api
pm2 monit
```

### 2. 查看Nginx日志

在宝塔面板：
1. 点击 **网站** → **设置**
2. 点击 **日志**
3. 查看访问日志和错误日志

### 3. 重启服务

**重启后端：**
```bash
pm2 restart portfolio-api
```

**重启Nginx：**
在宝塔面板，点击 **软件商店** → 找到 **Nginx** → 点击 **重启**

### 4. 系统资源监控

在宝塔面板首页可以看到：
- CPU使用率
- 内存使用率
- 磁盘使用率
- 网络流量

---

## 十二、故障排查

### 问题1：网站无法访问

**检查清单：**
- [ ] 腾讯云防火墙是否开放80端口
- [ ] 宝塔防火墙是否开放80端口
- [ ] Nginx是否运行正常
- [ ] 网站根目录文件是否存在

**解决方法：**
```bash
# 检查Nginx状态
# 在宝塔面板 → 软件商店 → Nginx → 查看状态

# 重启Nginx
# 在宝塔面板 → 软件商店 → Nginx → 重启
```

### 问题2：API调用失败

**检查清单：**
- [ ] PM2进程是否运行
- [ ] 反向代理配置是否正确
- [ ] 后端端口是否正确（3000）

**解决方法：**
```bash
# 查看PM2状态
pm2 status

# 查看PM2日志
pm2 logs portfolio-api

# 重启后端
pm2 restart portfolio-api

# 测试后端直接访问
curl http://localhost:3000/health
```

### 问题3：MongoDB连接失败

**检查清单：**
- [ ] `.env` 文件是否存在
- [ ] MongoDB URI是否正确
- [ ] 服务器网络是否正常

**解决方法：**
应用已内置模拟数据模式，MongoDB连接失败会自动切换，不影响使用。

如果需要使用真实数据库：
1. 确认MongoDB Atlas网络访问白名单包含服务器IP `1.14.193.193`
2. 测试DNS解析：`ping portfolio.evw9rw1.mongodb.net`

### 问题4：前端页面空白

**检查清单：**
- [ ] 构建时是否使用了生产环境配置
- [ ] `VITE_API_URL` 是否正确
- [ ] 浏览器控制台是否有报错

**解决方法：**
1. 按F12打开浏览器开发者工具
2. 查看Console和Network标签
3. 确认 `.env.production` 文件内容：
   ```
   VITE_API_URL=http://1.14.193.193/api
   ```
4. 重新构建：`npm run build`

---

## 十三、成本估算

### 腾讯云轻量应用服务器

- **配置**: 2核2GB, 40GB SSD, 3Mbps, 200GB/月流量
- **首月**: 免费试用
- **后续**: 约50-80元/月（按量付费或包年包月）

### 域名（可选）

- **.com域名**: 约50-80元/年
- **.cn域名**: 约29元/年

### SSL证书（可选）

- **Let's Encrypt**: 免费
- **付费证书**: 500-2000元/年

**总计**: 首月免费，后续约50-160元/月（含域名SSL则更高）

---

## 十四、备份策略

### 1. 手动备份

在宝塔面板：
1. 点击 **计划任务**
2. 选择任务类型：**备份网站** 或 **备份数据库**
3. 设置执行周期（如每天凌晨3点）
4. 选择备份保留份数
5. 点击 **添加任务**

### 2. 代码备份

定期将代码推送到GitHub：
```bash
cd C:\wwwroot\portfolio
git add .
git commit -m "Update: production deployment"
git push origin main
```

---

## 十五、性能优化建议

### 1. 启用Gzip压缩

在网站设置中：
1. 点击 **配置文件**
2. 在 `server` 块中添加：

```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
gzip_min_length 1000;
```

3. 保存并重启Nginx

### 2. 启用浏览器缓存

在网站设置 → 配置文件中添加：

```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2)$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
}
```

### 3. 优化Node.js内存

如果内存不足，可以限制PM2进程内存：

```bash
pm2 start server.js --name portfolio-api --max-memory-restart 150M
pm2 save
```

---

## 快速命令参考

```bash
# 查看PM2状态
pm2 status

# 查看日志
pm2 logs portfolio-api

# 重启后端
pm2 restart portfolio-api

# 停止后端
pm2 stop portfolio-api

# 删除PM2进程
pm2 delete portfolio-api

# 更新代码
cd C:\wwwroot\portfolio
git pull origin main

# 查看Node版本
node --version
npm --version

# 查看磁盘空间
wmic logicaldisk get size,freespace,caption
```

---

## 检查清单

部署前：
- [ ] 腾讯云服务器已购买
- [ ] 宝塔面板已安装
- [ ] Node.js 18.x 已安装
- [ ] PM2 已安装
- [ ] 防火墙规则已配置

部署后：
- [ ] 后端PM2进程运行正常
- [ ] 前端页面可访问
- [ ] API接口正常响应
- [ ] 技能和项目数据正确显示
- [ ] 联系表单可以提交
- [ ] 移动端显示正常

---

**需要帮助？**
- 宝塔面板官方文档: https://www.bt.cn/bbs/
- PM2文档: https://pm2.keymetrics.io/docs/
- Nginx配置参考: https://nginx.org/en/docs/

**文档版本**: 1.0（宝塔Windows面板部署方案）  
**最后更新**: 2026-06-12  
**服务器IP**: 1.14.193.193
