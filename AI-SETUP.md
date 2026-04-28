# AI 数字分身配置指南

## 🎯 功能说明

数字分身现已接入真实的 AI 模型，能够智能回答访客问题。AI 会读取"数字分身说明书"文档，以吴思炜的第一人称进行自然对话。

---

## 📋 配置步骤

### 1. 获取 AI API Key

**推荐使用 DeepSeek（深度求索）**

#### 为什么选择 DeepSeek？
- ✅ **免费额度高**：新用户注册送 200 万 tokens（约 1000 次对话）
- ✅ **价格便宜**：约 ¥0.002/千 tokens，一次对话不到 1 分钱
- ✅ **中文能力强**：专门优化的中文对话模型
- ✅ **API 简单**：兼容 OpenAI 格式，易于集成

#### 注册步骤：
1. 访问 https://platform.deepseek.com/
2. 点击"注册"或"登录"
3. 使用手机号或邮箱注册账号
4. 完成实名认证（需要，为了防滥用）
5. 进入控制台：https://platform.deepseek.com/api_keys
6. 点击"创建 API Key"
7. 复制生成的 API Key（格式类似：`sk-xxxxxxxxxxxxxxxx`）

#### 其他可选 AI 服务商：

| 服务商 | 免费额度 | 价格 | 官网 |
|--------|---------|------|------|
| 智谱 AI（GLM） | 100 万 tokens | ¥0.001/千 tokens | https://open.bigmodel.cn/ |
| Moonshot AI | 新用户体验金 | ¥0.006/千 tokens | https://platform.moonshot.cn/ |
| 通义千问 | 新用户试用 | 按模型定价 | https://dashscope.console.aliyun.com/ |

---

### 2. 配置环境变量

打开项目根目录的 `.env` 文件：

```bash
# AI 模型 API 配置（推荐使用 DeepSeek）
# 获取 API Key: https://platform.deepseek.com/
# 新用户注册送 200 万 tokens 免费额度
VITE_AI_API_KEY=your_api_key_here
VITE_AI_API_URL=https://api.deepseek.com/v1
VITE_AI_MODEL=deepseek-chat
```

**将 `your_api_key_here` 替换为你刚才复制的 API Key**

例如：
```bash
VITE_AI_API_KEY=sk-1234567890abcdef1234567890abcdef
VITE_AI_API_URL=https://api.deepseek.com/v1
VITE_AI_MODEL=deepseek-chat
```

---

### 3. 重启开发服务器

配置完成后，需要重启开发服务器使配置生效：

1. 在终端按 `Ctrl + C` 停止当前服务器
2. 重新运行：
   ```bash
   cd "E:\WUsiwei\Personal Homepage"
   npx vite --host 127.0.0.1
   ```

---

### 4. 测试 AI 对话

打开浏览器访问 http://127.0.0.1:5173/

在聊天窗口中尝试提问：
- "你好，请介绍一下你自己"
- "你最近在做什么项目？"
- "你的联系方式是什么？"
- "你有什么兴趣爱好？"

如果 AI 能够正常回答，说明配置成功！🎉

---

## 🔧 高级配置

### 更换 AI 模型

如果使用其他 AI 服务商，修改 `.env` 配置：

**智谱 AI（GLM）示例：**
```bash
VITE_AI_API_KEY=你的智谱 API Key
VITE_AI_API_URL=https://open.bigmodel.cn/api/paas/v4
VITE_AI_MODEL=glm-4-flash
```

**Moonshot AI 示例：**
```bash
VITE_AI_API_KEY=你的 Moonshot API Key
VITE_AI_API_URL=https://api.moonshot.cn/v1
VITE_AI_MODEL=moonshot-v1-8k
```

---

## 💰 费用说明

### DeepSeek 计费示例

**免费额度：**
- 新用户：200 万 tokens
- 约等于 1000 次完整对话
- 个人使用足够很久

**超出后价格：**
- 输入：¥0.0005/千 tokens
- 输出：¥0.002/千 tokens
- 一次典型对话（500 tokens）约 ¥0.001

**月度成本估算：**
- 每天 10 次对话：约 ¥0.3/天 = ¥9/月
- 每天 50 次对话：约 ¥1.5/天 = ¥45/月

---

## 🔒 安全提示

### ⚠️ 重要：不要将 API Key 提交到 Git

`.env` 文件应该被添加到 `.gitignore`，防止 API Key 泄露。

检查 `.gitignore` 是否包含：
```
.env
.env.local
.env.*.local
```

### 生产环境部署建议

当前配置是**客户端直接调用 AI API**，适合个人项目或演示。

**生产环境建议：**
1. 使用后端服务器代理 AI 请求
2. API Key 保存在服务器端
3. 添加请求频率限制
4. 添加用户认证

---

## 📚 数字分身说明书

AI 会读取 `public/digital-twin-instruction.md` 文件来了解吴思炜的详细信息。

如需修改人设或补充信息，编辑这个文件即可。

文件内容包括：
- 基本信息
- 职业身份
- 擅长领域
- 当前项目
- 兴趣爱好
- 个人特点
- 联系方式
- 对话风格指引

---

## 🐛 常见问题

### Q: AI 不回复或报错？
**A:** 检查以下几点：
1. API Key 是否正确配置
2. 是否有网络问题
3. API Key 是否还有余额
4. 查看浏览器控制台错误信息

### Q: 回复速度慢？
**A:** 可能原因：
1. 网络连接问题
2. AI 服务商服务器繁忙
3. 对话历史太长（已自动限制为最近 10 轮）

### Q: 如何控制成本？
**A:** 建议：
1. 定期查看 API 使用量
2. 设置余额提醒
3. 限制对话轮数（当前已限制为 10 轮）
4. 减少不必要的调用

### Q: 可以自定义 AI 的回答风格吗？
**A:** 可以，修改两个地方：
1. `src/services/ai.ts` 中的 `SYSTEM_PROMPT`
2. `public/digital-twin-instruction.md` 文档内容

---

## 📞 技术支持

如遇到问题，可以：
1. 查看浏览器控制台错误信息
2. 检查 AI 服务商的控制台使用量
3. 参考 AI 服务商的官方文档

---

**最后更新**：2026 年 4 月  
**文档版本**：1.0.0
