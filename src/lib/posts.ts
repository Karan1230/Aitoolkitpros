import { allPosts, Post } from './blog-data';
import { notFound } from 'next/navigation';

export function getPostBySlug(slug: string): Post {
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }
  return post;
}

export function getAllPosts(): Post[] {
  return allPosts.sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime());
}

export function getRelatedPosts(currentPost: Post): Post[] {
    return allPosts
      .filter(p => 
        p.slug !== currentPost.slug && 
        (p.category === currentPost.category || p.tags.some(tag => currentPost.tags.includes(tag)))
      )
      .slice(0, 3);
}
