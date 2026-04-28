# EdgeOne Pages 部署指南

## 📋 什么是 EdgeOne Pages？

EdgeOne Pages 是腾讯云提供的静态网站托管服务，可以自动从 GitHub 仓库部署前端项目。

**优势：**
- ✅ 免费额度充足
- ✅ 自动 HTTPS
- ✅ 全球 CDN 加速
- ✅ 自动构建部署
- ✅ 自定义域名

---

## 🚀 部署步骤

### 步骤 1：推送代码到 GitHub

由于网络问题，请手动推送代码：

```bash
cd "E:\WUsiwei\Personal Homepage"
git push origin master
```

如果遇到问题，检查网络连接或使用代理。

---

### 步骤 2：访问 EdgeOne Pages 控制台

1. 打开腾讯云 EdgeOne 控制台：
   https://console.cloud.tencent.com/edgeone

2. 登录你的腾讯云账号

---

### 步骤 3：创建新项目

1. 点击 **"新建项目"** 或 **"创建站点"**

2. 选择 **"从 Git 仓库导入"**

3. 选择 **GitHub** 作为仓库源

4. 授权 EdgeOne 访问你的 GitHub 账号

5. 选择仓库：`keke-0750/Personal-Homepage`

---

### 步骤 4：配置构建选项

**项目配置：**

| 配置项 | 值 |
|--------|-----|
| **框架预设** | Vite |
| **构建命令** | `npm run build` |
| **输出目录** | `dist` |
| **Node.js 版本** | 20 |
| **安装命令** | `npm install` |

**环境变量（重要！）：**

在 EdgeOne 控制台添加以下环境变量：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `VITE_AI_API_KEY` | `sk-64c739172a694f818d25123d75aad3f3` | DeepSeek API Key |
| `VITE_AI_API_URL` | `https://api.deepseek.com/v1` | API 地址 |
| `VITE_AI_MODEL` | `deepseek-chat` | 模型名称 |
| `VITE_SUPABASE_URL` | `你的 Supabase URL` | Supabase 地址 |
| `VITE_SUPABASE_ANON_KEY` | `你的 Supabase Key` | Supabase 密钥 |

⚠️ **重要提示：**
- 不要将 `.env` 文件提交到 Git
- 所有敏感环境变量都要在 EdgeOne 控制台设置
- API Key 等敏感信息要保密

---

### 步骤 5：开始部署

1. 点击 **"创建并部署"**

2. EdgeOne 会自动：
   - 克隆你的 GitHub 仓库
   - 安装依赖（`npm install`）
   - 执行构建（`npm run build`）
   - 部署到 CDN

3. 等待构建完成（通常 2-5 分钟）

---

### 步骤 6：访问网站

部署成功后，你会获得一个域名：
```
https://xxx.edgeone.app
```

点击即可访问你的个人主页！

---

## 🔧 高级配置

### 自定义域名

1. 在 EdgeOne 控制台进入你的项目

2. 点击 **"自定义域名"**

3. 添加你的域名（如 `www.wusiwei.com`）

4. 按照提示配置 DNS：
   - 添加 CNAME 记录
   - 指向 EdgeOne 提供的域名

5. 等待 DNS 生效（通常几分钟到几小时）

6. EdgeOne 会自动配置 HTTPS 证书

---

### 自动部署

EdgeOne 会自动监听 GitHub 仓库的更改：

- ✅ 推送代码到 `master` 分支 → 自动部署生产环境
- ✅ 创建 Pull Request → 自动部署预览环境
- ✅ 部署失败 → 发送通知

---

### 构建配置说明

项目已包含 `edgeone-config.toml` 配置文件：

```toml
[build]
  build_command = "npm run build"
  publish = "dist"
  node_version = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**重定向规则说明：**
- 将所有路径重定向到 `index.html`
- 这是 SPA（单页应用）必需的
- 确保刷新页面不会 404

---

## 📊 免费额度

EdgeOne Pages 免费额度（每月）：

- ✅ **构建次数**：500 次/月
- ✅ **带宽**：50 GB/月
- ✅ **请求数**：100 万次/月
- ✅ **存储空间**：10 GB

对于个人网站完全够用！

---

## 🐛 常见问题

### Q: 构建失败怎么办？

**A:** 检查构建日志，常见原因：
1. Node.js 版本不兼容 → 设置为 20
2. 依赖安装失败 → 检查网络
3. 构建命令错误 → 确认 `npm run build` 可用
4. 环境变量缺失 → 在控制台添加

---

### Q: 页面空白或报错？

**A:** 打开浏览器控制台检查错误：
1. API Key 未配置 → 检查环境变量
2. 路由错误 → 检查重定向配置
3. 资源加载失败 → 检查 CDN 配置

---

### Q: 如何查看部署日志？

**A:** 
1. 登录 EdgeOne 控制台
2. 进入项目详情
3. 点击 **"部署记录"**
4. 查看每次部署的日志

---

### Q: 如何回滚到之前的版本？

**A:** 
1. 在部署记录中找到要回滚的版本
2. 点击 **"回滚"**
3. 确认后即可恢复

---

### Q: AI 功能在生产环境能用吗？

**A:** 可以，但要注意：
1. ✅ 环境变量要在 EdgeOne 控制台配置
2. ⚠️ API Key 会暴露在客户端（适合个人项目）
3. 📊 监控 API 用量，避免超出配额

---

## 🔒 安全提示

### 环境变量安全

**✅ 正确做法：**
- 在 EdgeOne 控制台设置环境变量
- 使用 `.env.example` 模板
- `.env` 文件添加到 `.gitignore`

**❌ 错误做法：**
- 将 `.env` 提交到 Git
- 在代码中硬编码 API Key
- 公开分享 API Key

---

### API Key 保护

当前项目使用客户端直接调用 AI API：
- ✅ 适合：个人项目、演示、低流量
- ❌ 不适合：商业项目、高流量

**生产环境建议：**
- 使用后端服务器代理
- 添加访问频率限制
- 实施用户认证

---

## 📈 监控与分析

### 访问统计

EdgeOne 控制台提供：
- 访问量统计
- 带宽使用
- 请求数统计
- 地理分布

### 性能监控

- 页面加载时间
- CDN 命中率
- 错误率统计

---

## 🎯 完整部署清单

- [ ] 1. 推送代码到 GitHub
- [ ] 2. 登录 EdgeOne 控制台
- [ ] 3. 创建新项目
- [ ] 4. 连接 GitHub 仓库
- [ ] 5. 配置构建选项
- [ ] 6. 添加环境变量
- [ ] 7. 开始部署
- [ ] 8. 验证部署成功
- [ ] 9. （可选）配置自定义域名
- [ ] 10. 分享你的网站！

---

## 🌐 项目链接

- **GitHub 仓库**：https://github.com/keke-0750/Personal-Homepage
- **EdgeOne 控制台**：https://console.cloud.tencent.com/edgeone
- **EdgeOne 文档**：https://docs.cloud.tencent.com/edgeone

---

## 💡 下一步

部署成功后：
1. 测试 AI 对话功能
2. 检查所有页面是否正常
3. 配置自定义域名（如有）
4. 分享给朋友和 HR！

---

**祝你部署成功！** 🎉

如有问题，查看 EdgeOne 官方文档或联系腾讯云客服。
