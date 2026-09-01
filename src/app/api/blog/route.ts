import { NextRequest, NextResponse } from 'next/server';
import { getStoredBlogPosts, saveStoredBlogPosts, BlogPost } from '@/lib/server-storage';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');
    const includeDrafts = searchParams.get('includeDrafts') === 'true';

    let posts = getStoredBlogPosts();

    if (!includeDrafts) {
      posts = posts.filter(p => p.status === 'published');
    }

    if (category) {
      posts = posts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (tag) {
      posts = posts.filter(p => p.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
    }

    if (search) {
      const q = search.toLowerCase();
      posts = posts.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    posts.sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime());

    return NextResponse.json({ success: true, posts });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      slug,
      description,
      content,
      featuredImage,
      featuredImageAlt,
      thumbnailHighlightText,
      thumbnailBadge,
      showThumbnailOverlay = true,
      inArticleImages = [],
      tags,
      author,
      authorRole,
      authorAvatar,
      category,
      status = 'published',
      readTime,
      metaTitle,
      metaDescription,
      focusKeywords,
      featured = false,
      relatedToolHref,
      relatedToolName
    } = body;

    if (!title || !content) {
      return NextResponse.json({ success: false, error: 'Title and Content are required' }, { status: 400 });
    }

    const calculatedSlug = slug?.trim()
      ? slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const posts = getStoredBlogPosts();
    
    // Check if slug already exists
    const existingIndex = posts.findIndex(p => p.slug === calculatedSlug);
    const finalSlug = existingIndex >= 0 ? `${calculatedSlug}-${Date.now().toString().slice(-4)}` : calculatedSlug;

    // Estimate read time if not provided
    const wordCount = content.split(/\s+/).length;
    const estimatedReadTime = readTime || `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      title,
      slug: finalSlug,
      description: description || title,
      content,
      featuredImage: featuredImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
      featuredImageAlt: featuredImageAlt || `${title} - Visual Masterclass Guide`,
      thumbnailHighlightText: thumbnailHighlightText || '',
      thumbnailBadge: thumbnailBadge || '⚡ 2025 MASTERCLASS',
      showThumbnailOverlay: showThumbnailOverlay !== false,
      inArticleImages: Array.isArray(inArticleImages) ? inArticleImages : [],
      tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
      author: author || 'AI Toolkit Pro Team',
      authorRole: authorRole || 'Editor',
      authorAvatar: authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      category: category || 'AI Tutorials',
      status: status as 'published' | 'draft',
      readTime: estimatedReadTime,
      metaTitle: metaTitle || `${title} | AI Toolkit Pro`,
      metaDescription: metaDescription || description || title,
      focusKeywords: Array.isArray(focusKeywords) ? focusKeywords : typeof focusKeywords === 'string' ? focusKeywords.split(',').map((k: string) => k.trim()).filter(Boolean) : [],
      featured: Boolean(featured),
      relatedToolHref: relatedToolHref || '',
      relatedToolName: relatedToolName || ''
    };

    posts.unshift(newPost);
    saveStoredBlogPosts(posts);

    return NextResponse.json({ success: true, post: newPost });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
