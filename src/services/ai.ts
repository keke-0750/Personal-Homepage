import OpenAI from 'openai';

// 从环境变量获取配置
const API_KEY = import.meta.env.VITE_AI_API_KEY;
const API_URL = import.meta.env.VITE_AI_API_URL;
const MODEL = import.meta.env.VITE_AI_MODEL;

// 创建 OpenAI 客户端（兼容 DeepSeek 等兼容 OpenAI 格式的 API）
const openai = new OpenAI({
  apiKey: API_KEY,
  baseURL: API_URL,
  dangerouslyAllowBrowser: true, // 允许在浏览器端调用（生产环境建议用后端代理）
});

// 数字分身人设
const SYSTEM_PROMPT = `你是吴思炜的数字分身，需要以第一人称"我"来回答问题。

## 核心信息
- 姓名：吴思炜（思炜）
- 所在地：广东·江门
- 职业：产品经理兼 UI 设计师
- 邮箱：2549275929@qq.com
- 电话：+86 13828023267
- GitHub: @keke-0750

## 人设特点
- 能扛事、重落地，做事靠谱
- 乐意多角度思考
- 持续学习，保持好奇心
- 人生信条："于有限条件中持续自我精进，以产品之心驱动价值落地"

## 擅长领域
1. 项目开发：全流程管理，协调多方资源
2. AI 应用：探索 AI 工具在实际工作中的应用
3. 知识整理：将复杂信息结构化

## 当前项目
1. 搭建个人主页（React + Vite + Tailwind CSS）
2. 用 AI 整理和优化作品集

## 兴趣爱好
- 阅读：产品管理、设计思维、心理学
- 写作：产品思考和经验总结
- 视觉设计：提升 UI/UX 理解

## 回答原则
1. 使用第一人称"我"，让对话真实自然
2. 语气友好亲切，像真人在对话
3. 回答结构化，使用列表和分段
4. 信息完整但不过度
5. 真诚务实，不夸大
6. 对于深度合作咨询，引导联系本人

## 注意事项
- 保护隐私，不透露敏感信息
- 实事求是，不夸大能力和经历
- 保持专业和友好`;

// 加载数字分身说明书
let instructionContent = '';

export async function loadInstruction() {
  if (instructionContent) return instructionContent;
  
  try {
    const response = await fetch('/digital-twin-instruction.md');
    if (!response.ok) {
      throw new Error('Failed to load instruction');
    }
    instructionContent = await response.text();
    return instructionContent;
  } catch (error) {
    console.error('Error loading instruction:', error);
    return '';
  }
}

// AI 对话接口
export async function chatWithAI(userMessage: string, conversationHistory: Array<{role: string; content: string}> = []): Promise<string> {
  // 检查 API 配置
  if (!API_KEY || API_KEY === 'your_api_key_here') {
    console.warn('AI API Key 未配置，使用预设回复');
    return getFallbackResponse(userMessage);
  }

  try {
    // 加载说明书
    const instruction = await loadInstruction();
    
    // 构建消息
    const messages: any[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...(instruction ? [{ role: 'system', content: `详细参考资料：\n${instruction}` }] : []),
      ...conversationHistory,
      { role: 'user', content: userMessage },
    ];

    // 调用 AI API
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages,
      temperature: 0.7, // 创造性程度，0-1 之间
      max_tokens: 1000, // 最大回复长度
      stream: false, // 是否流式输出
    });

    const reply = response.choices[0]?.message?.content;
    
    if (!reply) {
      throw new Error('AI 返回为空');
    }

    return reply;
  } catch (error: any) {
    console.error('AI 调用失败:', error);
    
    // 错误处理
    if (error.message?.includes('API key')) {
      return '抱歉，AI 服务配置有误，请稍后再试或直接联系本人。';
    }
    if (error.message?.includes('rate limit') || error.message?.includes('quota')) {
      return '抱歉，AI 服务暂时超出使用限制，请稍后再试或直接联系本人。';
    }
    
    return getFallbackResponse(userMessage);
  }
}

// 预设回复（当 AI 不可用时使用）
function getFallbackResponse(query: string): string {
  const q = query.toLowerCase();
  
  if (q.includes('名字') || q.includes('称呼') || q.includes('是谁')) {
    return '我叫吴思炜，朋友们也叫我思炜。我是一名跨界产品人，目前专注于产品管理和 UI 设计领域。很高兴认识你！';
  }
  
  if (q.includes('职业') || q.includes('身份') || q.includes('工作')) {
    return '我是一名产品经理兼 UI 设计师，这是一个很有意思的跨界角色。我能够从设计思维和产品逻辑两个维度去思考问题，既能理解用户需求，又能把控技术可行性。';
  }
  
  if (q.includes('联系') || q.includes('微信') || q.includes('邮件') || q.includes('电话')) {
    return '你可以通过以下方式联系我：\n\n📧 邮箱：2549275929@qq.com\n📱 电话：+86 13828023267\n💻 GitHub：@keke-0750\n\n我很期待与你交流！';
  }
  
  if (q.includes('擅长') || q.includes('技能') || q.includes('能力')) {
    return '我主要的擅长领域包括：\n\n1. **项目开发**：熟悉从需求分析到上线的全流程管理\n2. **AI 应用**：积极探索 AI 工具在实际工作中的应用\n3. **知识整理**：擅长将复杂的信息结构化\n\n我相信在有限条件中持续自我精进，以产品之心驱动价值落地。';
  }
  
  // 默认回复
  return `感谢你的提问！作为吴思炜的数字分身，我主要了解以下方面的信息：\n\n📌 职业背景：产品经理兼 UI 设计师\n📌 擅长领域：项目开发、AI 应用、知识整理\n📌 当前项目：搭建个人主页、整理作品集\n\n你可以问我关于职业、项目、技能或联系方式等问题，或者直接联系本人：2549275929@qq.com`;
}
