
'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlogSidebar } from '@/components/blog-sidebar';

// export const metadata: Metadata = {
//   title: 'Blog | AI Toolkit Pro',
//   description: 'Read the latest articles, tutorials, and news from the AI Toolkit Pro team. Discover how to leverage free AI tools for your projects.',
// };

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const allPosts = getAllPosts();
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);

  const categories = ['All', ...Array.from(new Set(allPosts.map(post => post.category)))];
  
  const searchedPosts = allPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredPost = searchQuery ? null : searchedPosts[0];
  const recentPosts = searchQuery ? searchedPosts : searchedPosts.slice(1);

  const filteredPosts = filter === 'All'
    ? recentPosts
    : recentPosts.filter(post => post.category === filter);
  
  const loadMorePosts = () => {
    setVisiblePosts(prev => prev + POSTS_PER_PAGE);
  };
  
  const handleFilterChange = (category: string) => {
    setFilter(category);
    setVisiblePosts(POSTS_PER_PAGE);
  }

  return (
    <div className="container py-12 md:py-20">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          The AI Toolkit Pro Blog
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Your source for the latest news, tutorials, and insights on AI tools and technology.
        </p>
        <div className="mt-8 max-w-lg mx-auto">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search articles..."
                className="w-full h-12 pl-12 pr-4 text-lg rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
            </div>
          </div>
      </div>

      {/* Main Content */}
      <div className="mt-16 grid lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3">

            {/* Featured Post */}
            {featuredPost && (
                <>
                <h2 className="font-headline text-3xl font-bold mb-8">Featured Post</h2>
                <Link href={`/blog/${featuredPost.slug}`} className="group block mb-16">
                    <Card className="w-full transition-all duration-300 hover:shadow-lg hover:border-primary">
                        <div className="grid md:grid-cols-2">
                            <div className="p-8">
                                <Badge variant="secondary" className="w-fit mb-4">{featuredPost.category}</Badge>
                                <CardTitle className="font-headline text-3xl mb-4 group-hover:text-primary">{featuredPost.title}</CardTitle>
                                <CardDescription className="mb-4">{featuredPost.description}</CardDescription>
                                <div className="text-sm text-muted-foreground">
                                    <span>{format(new Date(featuredPost.datePublished), 'MMMM d, yyyy')}</span> by <span>{featuredPost.author}</span>
                                </div>
                            </div>
                            <div className="relative min-h-[250px] md:min-h-full">
                                <Image
                                    src={featuredPost.featuredImage}
                                    alt={featuredPost.title}
                                    fill
                                    className="object-cover rounded-r-lg"
                                    data-ai-hint={featuredPost.dataAiHint}
                                    priority
                                />
                            </div>
                        </div>
                    </Card>
                </Link>
                </>
            )}

          {/* Category Filters */}
            <div className="mb-8 flex flex-wrap gap-2">
                {categories.map(category => (
                <Button
                    key={category}
                    variant={filter === category ? 'default' : 'outline'}
                    onClick={() => handleFilterChange(category)}
                >
                    {category}
                </Button>
                ))}
            </div>

          {/* Recent Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {filteredPosts.slice(0, visiblePosts).map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="group flex">
                <Card className="w-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary flex flex-col">
                  <CardHeader className="p-0">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="rounded-t-lg object-cover aspect-[3/2]"
                      data-ai-hint={post.dataAiHint}
                      loading="lazy"
                    />
                  </CardHeader>
                  <CardContent className="flex flex-col flex-grow p-6">
                    <Badge variant="secondary" className="w-fit mb-2">{post.category}</Badge>
                    <CardTitle className="font-headline text-xl mb-2 group-hover:text-primary flex-grow">{post.title}</CardTitle>
                    <div className="text-sm text-muted-foreground mt-4">
                      <span>{format(new Date(post.datePublished), 'MMMM d, yyyy')}</span> by <span>{post.author}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4" />
              <p>No posts found for "{searchQuery}".</p>
              <p>Try searching for something else.</p>
            </div>
          )}

          {/* Load More Button */}
          {visiblePosts < filteredPosts.length && (
            <div className="mt-12 text-center">
                <Button onClick={loadMorePosts} size="lg" variant="secondary">
                    Load More Posts
                </Button>
            </div>
          )}

        </div>
        
        {/* Sidebar */}
        <aside className="lg:col-span-1">
            <BlogSidebar popularPosts={allPosts.slice(0, 5)} />
        </aside>

      </div>
    </div>
  );
}
