import { Post } from './blog-data';
import { getStoredBlogPosts } from './server-storage';
import { notFound } from 'next/navigation';

export async function getAllPosts(): Promise<Post[]> {
  try {
    const posts = getStoredBlogPosts();
    return posts.filter(p => p.status === 'published').sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime());
  } catch (e) {
    return [];
  }
}

export async function getAllAdminPosts(): Promise<Post[]> {
  try {
    const posts = getStoredBlogPosts();
    return posts.sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime());
  } catch (e) {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const posts = getStoredBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }
  return post;
}

export async function getRelatedPosts(currentPost: Post): Promise<Post[]> {
  const posts = getStoredBlogPosts();
  return posts
    .filter(p => 
      p.status === 'published' &&
      p.slug !== currentPost.slug && 
      (p.category === currentPost.category || p.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .slice(0, 3);
}
