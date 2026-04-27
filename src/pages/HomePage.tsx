import React from 'react';
import ProfileCard from '@/components/ProfileCard';
import ChatInterface from '@/components/ChatInterface';
import { ProfileInfo } from '@/types/types';

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

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen gradient-bg p-4 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Profile */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">
          <ProfileCard info={personalInfo} />
          
          <div className="hidden lg:block p-8 border border-dashed rounded-2xl border-primary/20 bg-primary/5">
             <h4 className="text-primary font-bold mb-2">💡 关于本主页</h4>
             <p className="text-sm text-muted-foreground leading-relaxed">
               这是一个使用 AI 辅助生成的个人主页原型。旨在通过数字分身和结构化展示，
               为 HR 提供一个高效、清爽的信息获取窗口。欢迎与右侧的“数字分身”进行互动。
             </p>
          </div>
        </div>

        {/* Right Column - Chat */}
        <div className="lg:col-span-5 xl:col-span-4 sticky top-8 h-fit">
          <ChatInterface profile={personalInfo} />
          
          <div className="mt-6 text-center lg:text-left">
            <p className="text-xs text-muted-foreground">
              © 2026 吴思炜 | Powered by Miaoda AI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
