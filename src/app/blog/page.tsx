
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts, Post } from '@/lib/posts';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlogSidebar } from '@/components/blog-sidebar';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"


const POSTS_PER_PAGE = 6;

const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (page: number) => void }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center items-center gap-2 mt-12">
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>
            {pageNumbers.map(number => (
                <Button
                    key={number}
                    variant={currentPage === number ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </Button>
            ))}
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default function BlogPage() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  useEffect(() => {
    const posts = getAllPosts();
    setAllPosts(posts);

    if (posts.length > 0) {
      const recent = posts[0];
      const popular = posts[1] || recent; // Fallback for fewer than 2 posts
      
      let randomPost = posts[Math.floor(Math.random() * posts.length)];
      // Ensure random is not same as recent or popular if possible
      while (posts.length > 2 && (randomPost.slug === recent.slug || randomPost.slug === popular.slug)) {
        randomPost = posts[Math.floor(Math.random() * posts.length)];
      }

      const uniqueFeaturedPosts = [...new Set([recent, popular, randomPost])];
      setFeaturedPosts(uniqueFeaturedPosts);
    }
  }, []);

  const categories = ['All', ...Array.from(new Set(allPosts.map(post => post.category)))];
  
  const searchedPosts = allPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPosts = filter === 'All'
    ? searchedPosts
    : searchedPosts.filter(post => post.category === filter);
  
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const postsForCurrentPage = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );
  
  const handleFilterChange = (category: string) => {
    setFilter(category);
    setCurrentPage(1);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
                className="w-full h-12 pl-12 pr-4 text-lg rounded-full transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <Search className={cn("absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground transition-all duration-300", isSearchFocused && "translate-x-full opacity-0")} />
            </div>
          </div>
      </div>

       {/* Featured Posts Carousel */}
      {featuredPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="font-headline text-3xl font-bold mb-8 text-center">Featured Posts</h2>
          <Carousel
            plugins={[autoplayPlugin.current]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {featuredPosts.map((post) => (
                <CarouselItem key={post.slug}>
                  <div className="p-1">
                     <Link href={`/blog/${post.slug}`} className="group block">
                      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary">
                        <div className="grid md:grid-cols-2">
                            <div className="relative min-h-[250px] md:min-h-full">
                                <Image
                                    src={post.featuredImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={post.dataAiHint}
                                    priority
                                />
                            </div>
                            <div className="p-8 flex flex-col justify-center">
                                <Badge variant="secondary" className="w-fit mb-4">{post.category}</Badge>
                                <CardTitle className="font-headline text-3xl mb-4 group-hover:text-primary">{post.title}</CardTitle>
                                <CardDescription className="mb-4">{post.description}</CardDescription>
                                <div className="text-sm text-muted-foreground">
                                    <span>{format(new Date(post.datePublished), 'MMMM d, yyyy')}</span> by <span>{post.author}</span>
                                </div>
                            </div>
                        </div>
                      </Card>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      )}


      {/* Main Content */}
      <div className="mt-16 grid lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3">
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
            {postsForCurrentPage.map((post) => (
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

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
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
