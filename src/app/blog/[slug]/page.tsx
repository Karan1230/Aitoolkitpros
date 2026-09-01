import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPostBySlug, getRelatedPosts, getAllPosts } from '@/lib/posts';
import { getStoredSeoSettings } from '@/lib/server-storage';
import { Calendar, Clock, User, ArrowLeft, Share2, Tag, Sparkles, ChevronRight, CheckCircle2, Bookmark, ArrowRight, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShareButtons } from '@/components/blog/share-buttons';
import { MarkdownRenderer } from '@/components/blog/markdown-renderer';
import { FeaturedThumbnail } from '@/components/blog/featured-thumbnail';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const seo = getStoredSeoSettings();
  const siteUrl = seo.canonicalUrl || 'https://aitoolkitpro.netlify.app';

  try {
    const post = await getPostBySlug(slug);
    const title = post.metaTitle || `${post.title} | ${seo.siteTitle}`;
    const description = post.metaDescription || post.description;

    return {
      title,
      description,
      keywords: post.focusKeywords && post.focusKeywords.length > 0 ? post.focusKeywords : post.tags,
      alternates: {
        canonical: `${siteUrl}/blog/${post.slug}`,
      },
      openGraph: {
        title,
        description,
        url: `${siteUrl}/blog/${post.slug}`,
        siteName: seo.siteTitle,
        images: [
          {
            url: post.featuredImage,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        type: 'article',
        publishedTime: post.datePublished,
        modifiedTime: post.dateModified,
        authors: [post.author],
        tags: post.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [post.featuredImage],
        creator: seo.twitterHandle || '@AIToolkitPro',
      },
    };
  } catch (e) {
    return {
      title: 'Article Not Found | AI Toolkit Pro',
      description: 'The requested blog article could not be found.',
    };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post;
  try {
    post = await getPostBySlug(slug);
  } catch (e) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post);
  const seo = getStoredSeoSettings();
  const siteUrl = seo.canonicalUrl || 'https://aitoolkitpro.netlify.app';
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  // Structured JSON-LD for Google Rich Results
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: [post.featuredImage],
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorRole || 'Author',
    },
    publisher: {
      '@type': 'Organization',
      name: seo.organizationName,
      logo: {
        '@type': 'ImageObject',
        url: seo.organizationLogo,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    keywords: post.tags.join(', '),
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      {/* Schema.org BlogPosting Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/blog" className="hover:text-foreground">Blog</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/blog?category=${encodeURIComponent(post.category)}`} className="hover:text-foreground">
            {post.category}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-xs">{post.title}</span>
        </nav>

        {/* Back Link */}
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary mb-6 transition-colors font-medium">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to All Articles</span>
        </Link>

        {/* Article Header */}
        <header className="space-y-4 mb-8">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary border border-primary/20">
              {post.category}
            </Badge>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {post.description}
          </p>

          {/* Author & Date Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-y border-border py-4">
            <div className="flex items-center gap-3">
              {post.authorAvatar && (
                <Image
                  src={post.authorAvatar}
                  alt={post.author}
                  width={44}
                  height={44}
                  unoptimized={true}
                  className="rounded-full object-cover border border-border"
                  referrerPolicy="no-referrer"
                />
              )}
              <div>
                <div className="text-sm font-bold">{post.author}</div>
                <div className="text-xs text-muted-foreground">
                  {post.authorRole || 'Author'} • Published {new Date(post.datePublished).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            </div>

            {/* Social Share Buttons */}
            <ShareButtons title={post.title} url={postUrl} />
          </div>
        </header>

        {/* Featured Image with Eye-Catching Highlight Keyword Banner */}
        <div className="mb-10 shadow-lg rounded-2xl overflow-hidden border border-border">
          <FeaturedThumbnail
            src={post.featuredImage}
            alt={post.featuredImageAlt || post.title}
            title={post.title}
            highlightText={post.thumbnailHighlightText}
            badge={post.thumbnailBadge}
            category={post.category}
            showOverlay={post.showThumbnailOverlay !== false}
            priority={true}
            size="lg"
          />
        </div>

        {/* In-article Related Tool Banner (if configured) */}
        {post.relatedToolHref && (
          <div className="mb-10 p-5 rounded-xl border border-primary/30 bg-primary/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-primary">Interactive Tool Mentioned</div>
                <h4 className="text-base font-bold">{post.relatedToolName || 'Try Our Free AI Generator'}</h4>
              </div>
            </div>
            <Link href={post.relatedToolHref}>
              <Button size="sm" className="font-semibold gap-1.5 shrink-0">
                <span>Launch Tool Free</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        )}

        {/* Main Content Body */}
        <div className="prose prose-neutral dark:prose-invert max-w-none mb-12">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-6 pb-8 border-t border-border">
          <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1 mr-1">
            <Tag className="h-3.5 w-3.5" />
            Tags:
          </span>
          {post.tags.map((tag) => (
            <Link key={tag} href={`/blog?search=${encodeURIComponent(tag)}`}>
              <Badge variant="outline" className="text-xs font-normal hover:bg-muted transition-colors cursor-pointer">
                #{tag}
              </Badge>
            </Link>
          ))}
        </div>

        {/* Author Bio Box */}
        <div className="p-6 rounded-xl border border-border bg-card mb-12 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          {post.authorAvatar && (
            <Image
              src={post.authorAvatar}
              alt={post.author}
              width={64}
              height={64}
              unoptimized={true}
              className="rounded-full object-cover shrink-0 border border-border"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="space-y-1">
            <div className="text-base font-bold">{post.author}</div>
            <div className="text-xs text-primary font-medium">{post.authorRole || 'Contributor at AI Toolkit Pro'}</div>
            <p className="text-xs text-muted-foreground leading-relaxed pt-1">
              Passionate about making artificial intelligence accessible, practical, and highly productive for creators, marketers, and developers around the globe.
            </p>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="space-y-6 pt-6 border-t border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold tracking-tight">Related Articles</h3>
              <Link href="/blog" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {relatedPosts.map((rPost) => (
                <Link
                  key={rPost.id}
                  href={`/blog/${rPost.slug}`}
                  className="group block rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-md transition-all"
                >
                  <div className="relative h-36 w-full bg-muted">
                    <Image
                      src={rPost.featuredImage}
                      alt={rPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-4 space-y-1.5">
                    <div className="text-[11px] text-primary font-semibold">{rPost.category}</div>
                    <h4 className="text-sm font-bold group-hover:text-primary transition-colors line-clamp-2">
                      {rPost.title}
                    </h4>
                    <div className="text-[11px] text-muted-foreground pt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {rPost.readTime}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
