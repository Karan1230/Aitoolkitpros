import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/posts';
import { getStoredSeoSettings } from '@/lib/server-storage';
import { Calendar, Clock, User, ArrowRight, Sparkles, Tag, Search, BookOpen, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FeaturedThumbnail } from '@/components/blog/featured-thumbnail';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = getStoredSeoSettings();
  const siteUrl = seo.canonicalUrl || 'https://aitoolkitpro.netlify.app';

  return {
    title: 'AI Blog & Tutorials – Master Content Creation, SEO & Productivity',
    description: 'Read the latest guides, tutorials, and insights on generative AI tools, digital marketing, viral short scripts, and automated design.',
    keywords: ['AI blog', 'AI tutorials', 'content creation guide', 'how to write ad copy', 'free ai tools blog'],
    alternates: {
      canonical: `${siteUrl}/blog`,
    },
    openGraph: {
      title: 'AI Toolkit Pro Official Blog & Knowledge Base',
      description: 'Explore actionable AI tutorials and step-by-step guides for creators, developers, and entrepreneurs.',
      url: `${siteUrl}/blog`,
      siteName: seo.siteTitle,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AI Toolkit Pro Blog',
      description: 'Explore actionable AI tutorials and step-by-step guides.',
    }
  };
}

export default async function BlogPage({
  searchParams
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const { category: selectedCategory, search: searchQuery } = await searchParams;
  const allPosts = await getAllPosts();

  // Categories list
  const categories = ['All', ...Array.from(new Set(allPosts.map(p => p.category)))];

  // Filter posts
  let filteredPosts = allPosts;
  if (selectedCategory && selectedCategory !== 'All') {
    filteredPosts = filteredPosts.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredPosts = filteredPosts.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  const featuredPost = filteredPosts.find(p => p.featured) || filteredPosts[0];
  const regularPosts = featuredPost ? filteredPosts.filter(p => p.id !== featuredPost.id) : filteredPosts;

  const seo = getStoredSeoSettings();
  const siteUrl = seo.canonicalUrl || 'https://aitoolkitpro.netlify.app';

  // Schema.org structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'AI Toolkit Pro Blog',
    description: 'Actionable tutorials and guides on AI tools, marketing, and productivity.',
    url: `${siteUrl}/blog`,
    publisher: {
      '@type': 'Organization',
      name: seo.organizationName,
      logo: {
        '@type': 'ImageObject',
        url: seo.organizationLogo
      }
    },
    blogPost: allPosts.map(p => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      url: `${siteUrl}/blog/${p.slug}`,
      datePublished: p.datePublished,
      dateModified: p.dateModified,
      image: p.featuredImage,
      author: {
        '@type': 'Person',
        name: p.author
      }
    }))
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      {/* Inject Structured Data for Google SERP */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Knowledge Base & Tutorials</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Master AI Tools & Boost Your Workflow
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg">
            Practical strategies, in-depth tutorials, and proven frameworks to generate viral content, rank on Google, and automate your creative stack.
          </p>

          {/* Search Form */}
          <form method="GET" action="/blog" className="pt-2 flex max-w-md mx-auto gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                name="search"
                defaultValue={searchQuery || ''}
                placeholder="Search articles, guides & topics..."
                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button type="submit" size="default">
              Search
            </Button>
          </form>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = (!selectedCategory && cat === 'All') || selectedCategory === cat;
            return (
              <Link
                key={cat}
                href={cat === 'All' ? '/blog' : `/blog?category=${encodeURIComponent(cat)}`}
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {/* Featured Post Hero Card */}
        {featuredPost && (!selectedCategory || selectedCategory === 'All') && !searchQuery && (
          <div className="mb-14 rounded-2xl border border-border bg-card overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[400px]">
                <FeaturedThumbnail
                  src={featuredPost.featuredImage}
                  alt={featuredPost.featuredImageAlt || featuredPost.title}
                  title={featuredPost.title}
                  highlightText={featuredPost.thumbnailHighlightText}
                  badge={featuredPost.thumbnailBadge || '🔥 FEATURED MASTERCLASS'}
                  category={featuredPost.category}
                  showOverlay={featuredPost.showThumbnailOverlay !== false}
                  priority
                  size="lg"
                  className="h-full min-h-[300px] lg:min-h-[400px] rounded-none rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none"
                />
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="font-semibold text-primary">{featuredPost.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`}>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight hover:text-primary transition-colors line-clamp-2">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {featuredPost.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {featuredPost.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-border mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {featuredPost.authorAvatar && (
                      <Image
                        src={featuredPost.authorAvatar}
                        alt={featuredPost.author}
                        width={32}
                        height={32}
                        unoptimized={true}
                        className="rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <div>
                      <div className="text-xs font-semibold">{featuredPost.author}</div>
                      <div className="text-[11px] text-muted-foreground">
                        {new Date(featuredPost.datePublished).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`}>
                    <Button variant="default" size="sm" className="gap-1 font-semibold">
                      Read Article <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">
              {searchQuery ? `Search Results for "${searchQuery}"` : selectedCategory ? `${selectedCategory} Articles` : 'Latest Articles'}
            </h2>
            <span className="text-xs text-muted-foreground">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 rounded-2xl border border-dashed border-border bg-card/50">
              <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-semibold">No articles found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Try searching with different keywords or browse all categories.
              </p>
              <Link href="/blog" className="mt-4 inline-block">
                <Button variant="outline" size="sm">
                  View All Posts
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <article
                  key={post.id}
                  className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-video w-full overflow-hidden bg-muted">
                      <FeaturedThumbnail
                        src={post.featuredImage}
                        alt={post.featuredImageAlt || post.title}
                        title={post.title}
                        highlightText={post.thumbnailHighlightText}
                        badge={post.thumbnailBadge}
                        category={post.category}
                        showOverlay={post.showThumbnailOverlay !== false}
                        size="sm"
                        className="rounded-none rounded-t-xl"
                      />
                    </div>

                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{new Date(post.datePublished).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span>•</span>
                        <Clock className="h-3.5 w-3.5" />
                        <span>{post.readTime}</span>
                      </div>

                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h3>
                      </Link>

                      <p className="text-muted-foreground text-xs line-clamp-3 leading-relaxed">
                        {post.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 mt-auto border-t border-border/40 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {post.authorAvatar && (
                        <Image
                          src={post.authorAvatar}
                          alt={post.author}
                          width={24}
                          height={24}
                          unoptimized={true}
                          className="rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <span className="text-xs text-muted-foreground">{post.author}</span>
                    </div>

                    <Link href={`/blog/${post.slug}`} className="text-xs font-semibold text-primary group-hover:underline flex items-center gap-1">
                      Read <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Bottom CTA Box */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-primary/10 via-indigo-500/10 to-violet-500/10 border border-primary/20 p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold">Ready to Put These AI Strategies to Work?</h3>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Experience our full suite of free AI generators for ad copy, YouTube scripts, brand logos, code generation, and media processing.
          </p>
          <Link href="/tools">
            <Button size="lg" className="font-semibold gap-2">
              <Sparkles className="h-4 w-4" />
              <span>Explore All Free AI Tools</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
