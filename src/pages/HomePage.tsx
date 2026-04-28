import React from 'react';
import ProfileCard from '@/components/ProfileCard';
import ChatInterface from '@/components/ChatInterface';
import { Card, CardContent } from '@/components/ui/card';
import { ProfileInfo } from '@/types/types';
import { Mail, Phone, MapPin, Github, ExternalLink, Bot } from 'lucide-react';

const personalInfo: ProfileInfo = {
  name: '吴思炜',
  intro: '能扛事、重落地，于有限条件中持续自我精进的跨界产品人。',
  avatar: 'https://miaoda-conversation-file.cdn.bcebos.com/user-b8o9ucw6sl4w/conv-b8o9v8i8we80/20260427/file-b8onrisd18u8.jpg',
  role: '产品经理兼 UI 设计师',
  currentTask: '正在学习用 AI 整理自己的作品集',
  interests: ['阅读', '写作', '视觉设计'],
  traits: ['乐意多角度思考', '学习新东西'],
  recentWork: '搭自己的个人主页，整理作品集',
  expertise: ['项目开发', 'AI 应用', '知识整理'],
};

// 联系方式数据
const contactInfo = {
  email: '2549275929@qq.com',
  phone: '+86 13828023267',
  location: '广东 · 江门',
  github: 'wusiwei1234',
};

// 作品数据
const portfolioItems = [
  {
    title: '个人主页设计',
    description: '使用 React + Vite + Tailwind CSS 构建的现代化个人主页，集成数字分身聊天功能。',
    tags: ['React', 'Vite', 'Tailwind CSS'],
    link: '#',
  },
  {
    title: 'AI 知识库整理工具',
    description: '基于 AI 的知识整理与归档系统，支持多格式文档处理和智能分类。',
    tags: ['AI', 'Python', '知识管理'],
    link: '#',
  },
  {
    title: '产品设计作品集',
    description: '包含多个产品从 0 到 1 的完整设计案例，涵盖用户研究、原型设计到落地全流程。',
    tags: ['产品设计', 'UI/UX', '案例研究'],
    link: '#',
  },
];

const HomePage: React.FC = () => {
  const scrollToContent = () => {
    document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Hero Section - Cover */}
      <section className="min-h-screen flex items-center relative overflow-hidden px-6 md:px-12 lg:px-24">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl opacity-60" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-primary/15 to-transparent rounded-full blur-3xl opacity-60" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-full blur-3xl opacity-40" />
        </div>

        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left - Text Content */}
          <div className="text-left space-y-6 order-2 lg:order-1">
            {/* Label */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">个人介绍</span>
            </div>

            {/* Title */}
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                你好，我是
                <br />
                <span className="text-primary">{personalInfo.name}</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                {personalInfo.role}
              </p>
            </div>

            {/* Divider */}
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent rounded-full" />

            {/* Intro */}
            <p className="text-base md:text-lg text-muted-foreground/90 leading-relaxed max-w-lg">
              {personalInfo.intro}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {personalInfo.expertise.map((skill) => (
                <span 
                  key={skill}
                  className="px-4 py-2 bg-background/80 backdrop-blur-sm border border-primary/20 text-primary rounded-lg text-sm font-medium shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button 
                onClick={scrollToContent}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>了解更多</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right - Avatar Image */}
          <div className="flex items-center justify-center order-1 lg:order-2">
            <div className="relative">
              {/* Background shape */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 rounded-3xl transform rotate-6 scale-105 blur-sm" />
              <div className="absolute inset-0 border-2 border-primary/20 rounded-3xl transform -rotate-3 scale-105" />
              
              {/* Avatar container */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl overflow-hidden border border-primary/20 shadow-2xl">
                <img 
                  src={personalInfo.avatar} 
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="main-content" className="p-4 md:p-8 lg:p-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Profile, Contact, Portfolio */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">
          <ProfileCard info={personalInfo} />
          
          {/* Contact Section */}
          <Card className="tech-card">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                联系方式
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                  <Mail className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">邮箱</h4>
                    <a href={`mailto:${contactInfo.email}`} className="text-foreground hover:text-primary transition-colors">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                  <Phone className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">电话</h4>
                    <a href={`tel:${contactInfo.phone}`} className="text-foreground hover:text-primary transition-colors">
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">所在地</h4>
                    <p className="text-foreground">{contactInfo.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                  <Github className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">GitHub</h4>
                    <a 
                      href={`https://github.com/${contactInfo.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                    >
                      @{contactInfo.github}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Portfolio Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-primary" />
              作品展示
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolioItems.map((item, index) => (
                <Card key={index} className="tech-card hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-5">
                    <h4 className="font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-2 py-1 bg-primary/5 text-primary rounded text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a 
                      href={item.link}
                      className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      查看详情
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="hidden lg:block p-8 border border-dashed rounded-2xl border-primary/20 bg-primary/5">
             <h4 className="text-primary font-bold mb-2">💡 关于本主页</h4>
             <p className="text-sm text-muted-foreground leading-relaxed">
               这是一个使用 AI 辅助生成的个人主页原型。旨在通过数字分身和结构化展示，
               为 HR 提供一个高效、清爽的信息获取窗口。欢迎与右侧的"数字分身"进行互动。
             </p>
          </div>
        </div>

        {/* Right Column - Chat */}
        <div className="lg:col-span-5 xl:col-span-4 sticky top-8 h-fit space-y-4">
          {/* Chat entrance highlight */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-primary mb-1">与数字分身互动</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  向右滑动或向下滚动，与我的 AI 数字分身聊天，快速获取信息或留言。
                </p>
              </div>
            </div>
          </div>
          
          <ChatInterface profile={personalInfo} />
          
          <div className="text-center lg:text-left">
            <p className="text-xs text-muted-foreground">
              © 2026 吴思炜 | Powered by Miaoda AI
            </p>
          </div>
        </div>
      </div>
      </section>
    </div>
  );
};

export default HomePage;
