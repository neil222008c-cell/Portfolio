export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  role: string;
  client?: string;
  duration?: string;
  stats?: { label: string; value: string }[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'tools' | 'other';
  iconName: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}
