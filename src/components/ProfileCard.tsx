import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ProfileInfo } from '@/types/types';
import { User, Briefcase, Sparkles, Heart, Zap } from 'lucide-react';

interface ProfileCardProps {
  info: ProfileInfo;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ info }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <Card className="tech-card overflow-hidden">
        <div className="h-24 bg-primary/10 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
        </div>
        <CardContent className="pt-0 relative">
          <div className="flex flex-col md:flex-row items-center md:items-end -mt-12 md:space-x-6 pb-6 border-b">
            <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
              <AvatarImage src={info.avatar} alt={info.name} />
              <AvatarFallback>{info.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="mt-4 md:mt-0 text-center md:text-left space-y-1">
              <h1 className="text-3xl font-bold text-foreground">{info.name}</h1>
              <p className="text-muted-foreground font-medium">{info.intro}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Briefcase className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">职业身份</h3>
                  <p className="text-foreground font-medium">{info.role}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">最近在做</h3>
                  <p className="text-foreground font-medium">{info.currentTask}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Heart className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">兴趣爱好</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {info.interests.map((interest) => (
                      <Badge key={interest} variant="secondary" className="font-normal">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Zap className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">个人特点</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {info.traits.map((trait) => (
                      <Badge key={trait} variant="outline" className="text-primary border-primary/20 font-normal">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expertise Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="tech-card">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              擅长与关心
            </h3>
            <div className="flex flex-wrap gap-2">
              {info.expertise.map((exp) => (
                <Badge 
                  key={exp} 
                  variant="outline" 
                  className="bg-primary/5 border-primary/20 text-primary hover:bg-primary/10 transition-colors py-1 px-3 rounded-full font-normal"
                >
                  {exp}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="tech-card">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              成长格言
            </h3>
            <p className="text-muted-foreground italic leading-relaxed">
              "在有限条件中持续自我精进，以产品之心驱动价值落地。"
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileCard;
