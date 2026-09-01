import { BlogPost, INITIAL_BLOG_POSTS, getStoredBlogPosts } from './server-storage';

export type Post = BlogPost;

export const allPosts: Post[] = INITIAL_BLOG_POSTS;
