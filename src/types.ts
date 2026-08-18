export type MaterialType = 'Lecture Notes' | 'Textbook' | 'Lab Manual' | 'Previous Papers' | 'Cheat Sheet';

export type SubjectCategory = 'Computer Science' | 'Mathematics' | 'Physics' | 'Literature' | 'Economics' | 'Engineering' | 'General';

export interface StudyMaterial {
  id: string;
  title: string;
  subject: SubjectCategory;
  type: MaterialType;
  author: string;
  uploadDate: string;
  downloads: number;
  upvotes: number;
  description: string;
  fileSize: string;
  tags: string[];
  fileUrl?: string;
  contentSnippet?: string;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  createdAt: string;
  upvotes: number;
}

export interface DiscussionThread {
  id: string;
  title: string;
  category: SubjectCategory | 'Exam Help' | 'Career Advice' | 'Project Collab' | 'General Q&A';
  author: string;
  avatar: string;
  createdAt: string;
  upvotes: number;
  repliesCount: number;
  content: string;
  tags: string[];
  comments: Comment[];
  solved?: boolean;
}

export type EventType = 'Academic' | 'Tech' | 'Cultural' | 'Sports' | 'Exams' | 'Workshop';

export interface CampusEvent {
  id: string;
  title: string;
  category: EventType;
  date: string;
  time: string;
  location: string;
  organizer: string;
  description: string;
  attendeesCount: number;
  image?: string;
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
