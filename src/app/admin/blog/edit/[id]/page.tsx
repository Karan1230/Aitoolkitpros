import React from 'react';
import { notFound } from 'next/navigation';
import { getStoredBlogPosts } from '@/lib/server-storage';
import { PostEditor } from '@/components/admin/post-editor';

export default async function AdminEditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const posts = getStoredBlogPosts();
  const post = posts.find((p) => p.id === id || p.slug === id);

  if (!post) {
    notFound();
  }

  return <PostEditor initialPost={post} isEditMode={true} />;
}
