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
  authorName?: string;
  authorAvatar?: string;
}