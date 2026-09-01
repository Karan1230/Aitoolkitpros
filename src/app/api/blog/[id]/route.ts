import { NextRequest, NextResponse } from 'next/server';
import { getStoredBlogPosts, saveStoredBlogPosts, BlogPost } from '@/lib/server-storage';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const posts = getStoredBlogPosts();
    const post = posts.find(p => p.id === id || p.slug === id);

    if (!post) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const posts = getStoredBlogPosts();
    const index = posts.findIndex(p => p.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
    }

    const currentPost = posts[index];
    const wordCount = (body.content || currentPost.content).split(/\s+/).length;
    const estimatedReadTime = body.readTime || `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

    const updatedPost: BlogPost = {
      ...currentPost,
      ...body,
      dateModified: new Date().toISOString(),
      readTime: estimatedReadTime,
      tags: Array.isArray(body.tags) ? body.tags : typeof body.tags === 'string' ? body.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : currentPost.tags,
      focusKeywords: Array.isArray(body.focusKeywords) ? body.focusKeywords : typeof body.focusKeywords === 'string' ? body.focusKeywords.split(',').map((k: string) => k.trim()).filter(Boolean) : currentPost.focusKeywords,
    };

    posts[index] = updatedPost;
    saveStoredBlogPosts(posts);

    return NextResponse.json({ success: true, post: updatedPost });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    let posts = getStoredBlogPosts();
    const initialLength = posts.length;
    posts = posts.filter(p => p.id !== id && p.slug !== id);

    if (posts.length === initialLength) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
    }

    saveStoredBlogPosts(posts);
    return NextResponse.json({ success: true, message: 'Post deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
