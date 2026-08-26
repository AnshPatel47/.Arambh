export interface Blog {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt?: string;
  description?: string;
  content?: string;
  readTime?: string;
  
  author?: {
    name: string;
    avatar: string;
    role?: string;
  };
}