import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { supabase } from '@/db/supabase';
import { ChatMessage, ProfileInfo } from '@/types/types';
import { toast } from 'sonner';

interface ChatInterfaceProps {
  profile: ProfileInfo;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ profile }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial greeting
    const greeting: ChatMessage = {
      id: 'greeting',
      role: 'assistant',
      content: `你好！我是吴思炜的数字分身 👋

很高兴见到你！我了解思炜的职业背景、项目经历和兴趣爱好。

你可以问我：
• 他的职业和工作内容
• 最近在做的项目
• 擅长技能和作品
• 兴趣爱好和特点
• 如何联系他

或者直接开始聊天，我会尽力回答！`,
      created_at: new Date().toISOString(),
    };
    setMessages([greeting]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isTyping]);

  const generateResponse = (userQuery: string): string => {
    const query = userQuery.toLowerCase();
    
    // 基本信息类
    if (query.includes('名字') || query.includes('称呼') || query.includes('是谁')) {
      return `我叫吴思炜，朋友们也叫我思炜。我是一名跨界产品人，目前专注于产品管理和 UI 设计领域。很高兴认识你！`;
    }
    
    if (query.includes('哪里人') || query.includes('家乡') || query.includes('所在地') || query.includes('城市')) {
      return `我目前在广东江门生活和工作。这是一座美丽的侨乡城市，生活节奏舒适，很适合静心做事和思考。`;
    }
    
    // 职业相关
    if (query.includes('职业') || query.includes('身份') || query.includes('工作')) {
      return `我是一名产品经理兼 UI 设计师，这是一个很有意思的跨界角色。我能够从设计思维和产品逻辑两个维度去思考问题，既能理解用户需求，又能把控技术可行性。这种双重视角让我在项目中能够更好地协调各方资源，推动产品落地。`;
    }
    
    if (query.includes('做什么') || query.includes('最近') || query.includes('当前')) {
      return `我最近正在做两件主要的事情：
1. 搭建自己的个人主页，用 React + Vite + Tailwind CSS 技术栈，这是一个很好的实践项目
2. 学习用 AI 整理和优化自己的作品集，探索 AI 在知识管理方面的应用

这个过程让我对前端开发和 AI 应用有了更深的理解，也发现了很多有趣的可能性。`;
    }
    
    // 技能和擅长
    if (query.includes('擅长') || query.includes('技能') || query.includes('能力') || query.includes('专长')) {
      return `我主要的擅长领域包括：

1. **项目开发**：熟悉从需求分析到上线的全流程管理，能够协调设计、开发、测试等多方资源
2. **AI 应用**：积极探索 AI 工具在实际工作中的应用，比如用 AI 整理知识、生成内容等
3. **知识整理**：擅长将复杂的信息结构化，建立清晰的知识体系

我相信在有限条件中持续自我精进，以产品之心驱动价值落地。`;
    }
    
    // 作品和项目
    if (query.includes('作品') || query.includes('项目') || query.includes('案例') || query.includes('做过什么')) {
      return `我的作品主要集中在以下几个方向：

1. **个人主页**：正在搭建的这个网站，使用现代化的技术栈，集成数字分身聊天功能
2. **AI 知识库整理工具**：探索用 AI 进行知识管理和内容归档
3. **产品设计案例**：多个从 0 到 1 的产品设计项目，涵盖用户研究、原型设计到落地全流程

如果你想了解更多详情，可以通过首页的联系方式与我交流，我很乐意分享更多细节！`;
    }
    
    // 兴趣爱好
    if (query.includes('兴趣') || query.includes('爱好') || query.includes('喜欢') || query.includes('业余')) {
      return `工作之余，我主要的兴趣爱好包括：

1. **阅读**：喜欢阅读产品管理、设计思维、心理学等方面的书籍
2. **写作**：偶尔会写一些产品思考和经验总结
3. **视觉设计**：享受设计的过程，这也能帮助我更好地理解 UI/UX

这些爱好让我的思维更加开阔，也能为工作带来不同的视角。`;
    }
    
    // 个人特点
    if (query.includes('特点') || query.includes('性格') || query.includes('为人') || query.includes('怎样的人')) {
      return `了解我的人通常会这样评价我：

1. **能扛事、重落地**：做事靠谱，能够承担责任，注重实际结果
2. **乐意多角度思考**：不喜欢局限于单一视角，善于从不同维度分析问题
3. **持续学习**：保持好奇心，愿意学习新东西，尤其是在 AI 和跨界领域

我相信"于有限条件中持续自我精进"，这是我一直以来的人生信条。`;
    }
    
    // 联系方式
    if (query.includes('联系') || query.includes('微信') || query.includes('邮件') || query.includes('电话') || query.includes('找到你')) {
      return `你可以通过以下方式联系我：

📧 邮箱：2549275929@qq.com
📱 电话：+86 13828023267
📍 所在地：广东 · 江门
💻 GitHub：@keke-0750

你也可以直接在首页下方找到联系方式区域。我很期待与你交流！`;
    }
    
    // 工作经历/经验
    if (query.includes('经历') || query.includes('经验') || query.includes('背景')) {
      return `我有多年的产品管理和 UI 设计经验，参与过多个项目从 0 到 1 的全过程。

我的优势在于能够同时理解业务需求、用户体验和技术实现，这让我能够更好地平衡各方诉求，推动项目顺利落地。

目前我正在探索 AI 在产品工作流中的应用，这是一个很有前景的方向。`;
    }
    
    // 求职/合作
    if (query.includes('求职') || query.includes('工作机会') || query.includes('合作') || query.includes('招聘')) {
      return `感谢你对我感兴趣！我目前对新的机会持开放态度，尤其是能够发挥我产品管理和 UI 设计双重优势的角色。

如果你有合适的机会或合作想法，欢迎通过以下方式联系我：
- 邮箱：2549275929@qq.com
- 电话：+86 13828023267

我很期待与你深入交流！`;
    }
    
    // 教育/学习
    if (query.includes('学习') || query.includes('教育') || query.includes('学校') || query.includes('专业')) {
      return `我一直保持着持续学习的状态。除了在工作中积累经验，我也会通过阅读、在线课程、实践项目等方式不断提升自己。

最近我主要在学习：
- 前端开发技术（React、Vite、Tailwind CSS）
- AI 工具的应用和落地
- 产品管理和设计思维的深度融合

我相信学习是一个终身的过程。`;
    }
    
    // 价值观/理念
    if (query.includes('理念') || query.includes('价值观') || query.includes('信念') || query.includes('追求')) {
      return `我的工作和人生理念可以概括为：

**"能扛事、重落地，于有限条件中持续自我精进的跨界产品人"**

我相信：
- 产品工作要为用户创造真实价值
- 在有限条件下做到最好是一种能力
- 跨界思维能带来独特的竞争优势
- 持续学习和自我迭代是成长的关键`;
    }
    
    // 数字分身相关
    if (query.includes('数字分身') || query.includes('AI') || query.includes('机器人') || query.includes(' bots')) {
      return `我是吴思炜的数字分身，基于 AI 技术构建。我了解思炜的职业背景、项目经历、技能特长等信息。

我的主要作用是：
- 快速回答关于思炜的基本信息
- 帮助访客了解思炜的专业能力
- 提供联系方式和合作咨询

当然，如果需要深入交流，建议直接联系思炜本人哦！`;
    }
    
    // 默认回复
    return `感谢你的提问！作为吴思炜的数字分身，我主要了解以下方面的信息：

📌 职业背景：产品经理兼 UI 设计师
📌 擅长领域：项目开发、AI 应用、知识整理
📌 当前项目：搭建个人主页、整理作品集
📌 个人特点：能扛事、重落地、持续学习

你可以问我：
- "你最近做什么？"
- "你有哪些作品？"
- "你的联系方式？"
- "你的兴趣爱好？"

或者直接联系本人：2549275929@qq.com`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Save to Supabase (optional, but good for persistence)
    try {
      await supabase.from('chat_messages').insert([
        { role: 'user', content: userMessage.content },
      ]);
    } catch (error) {
      console.error('Error saving message:', error);
    }

    // Simulate AI thinking
    setTimeout(async () => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateResponse(userMessage.content),
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);

      try {
        await supabase.from('chat_messages').insert([
          { role: 'assistant', content: botResponse.content },
        ]);
      } catch (error) {
        console.error('Error saving bot message:', error);
      }
    }, 1000);
  };

  const quickQuestions = [
    "你现在在做什么？",
    "你有哪些作品？",
    "怎么联系你？"
  ];

  return (
    <Card className="tech-card flex flex-col h-[500px]">
      <CardHeader className="border-b bg-muted/30 py-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          数字分身聊天区
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Avatar className="w-8 h-8 border">
                    {msg.role === 'assistant' ? (
                      <>
                        <AvatarImage src={profile.avatar} />
                        <AvatarFallback><Bot className="w-4 h-4" /></AvatarFallback>
                      </>
                    ) : (
                      <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                    )}
                  </Avatar>
                  <div
                    className={`rounded-2xl px-4 py-2 text-sm shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 bg-muted rounded-2xl px-4 py-2">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">正在思考...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="p-4 border-t flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => { setInput(q); }}
              className="text-xs bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3 py-1.5 rounded-full transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex w-full items-center space-x-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="向吴思炜提问..."
            className="flex-1 bg-background"
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatInterface;
