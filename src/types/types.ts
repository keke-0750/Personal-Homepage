export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
};

export type ProfileInfo = {
  name: string;
  intro: string;
  avatar: string;
  role: string;
  currentTask: string;
  interests: string[];
  traits: string[];
  recentWork: string;
  expertise: string[];
};
