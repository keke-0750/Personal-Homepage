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
      content: `你好！我是吴思炜的数字分身。很高兴见到你！你可以问我关于我的职业、项目或如何联系我。`,
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
    
    if (query.includes('做什么') || query.includes('最近')) {
      return `我最近正在搭建自己的个人主页，并尝试利用 AI 来整理和优化我的作品集。这对我来说是一个很有趣的跨界尝试！`;
    }
    if (query.includes('作品') || query.includes('案例')) {
      return `作为一名产品经理兼 UI 设计师，我有很多涵盖项目开发、AI 应用和知识整理的作品。由于主页还在完善中，你可以通过私信或邮件联系我，我会非常乐意分享我的作品集。`;
    }
    if (query.includes('联系') || query.includes('微信') || query.includes('邮件')) {
      return `你可以通过我的个人主页留言或直接加我微信（建议在 HR 渠道获取具体联系方式）。我很期待与你交流！`;
    }
    if (query.includes('擅长') || query.includes('领域')) {
      return `我擅长项目开发全流程管理，对 AI 应用落地和知识整理也有深厚的兴趣和实战经验。我始终追求在有限条件下实现产品价值的最大化。`;
    }
    if (query.includes('职业') || query.includes('身份')) {
      return `我是一名跨界产品人，目前身兼产品经理和 UI 设计师双重身份，能够从设计思维和产品逻辑两个维度去思考问题。`;
    }
    
    return `这是一个很好的问题！作为吴思炜的数字分身，我主要了解他的职业背景（产品/UI）、最近在做的 AI 作品集项目，以及他擅长的项目开发和知识整理方向。你可以试着问我：“你最近在做什么？”或者“你有哪些作品？”`;
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
