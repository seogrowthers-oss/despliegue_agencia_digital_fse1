
export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: 'AI' | 'Dev' | 'Tech' | 'Hardware' | 'Shock';
  imageUrl: string;
  content?: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  type: 'Tutorial' | 'Guide' | 'Documentation' | 'Course';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  link: string;
  imageUrl?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
