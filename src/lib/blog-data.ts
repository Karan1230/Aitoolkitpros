export interface Post {
  title: string;
  slug: string;
  description: string;
  content: string;
  featuredImage: string;
  dataAiHint: string;
  tags: string[];
  author: string;
  datePublished: string;
  dateModified: string;
  category: string;
}

export const allPosts: Post[] = [];
