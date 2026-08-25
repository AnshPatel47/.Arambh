
export interface PrismaBlogPost {
  id: string;
  title: string;
  category: string;
  excerpt?: string | null;
  content?: string | null;
  date: string;
  readTime?: string | null;
  authorName?: string | null;
  authorAvatar?: string | null;
  authorRole?: string | null;
  image: string;
}

export interface LegacyBlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  image: string;
}


export function transformDbToLegacyPost(dbPost: PrismaBlogPost): LegacyBlogPost {
  return {
    id: dbPost.id,
    title: dbPost.title,
    category: dbPost.category,
    excerpt: dbPost.excerpt || "",
    content: dbPost.content || "",
    date: dbPost.date,
    readTime: dbPost.readTime || "5 min read",
    author: {
      name: dbPost.authorName || "Arambh Editorial Team",
      avatar: dbPost.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
      role: dbPost.authorRole || "Corporate Advisory Group",
    },
    image: dbPost.image || "/assets/images/placeholder.jpg",
  };
}