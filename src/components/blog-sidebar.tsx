
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';
import { Rss, Twitter, Linkedin, Github } from 'lucide-react';
import { Post } from '@/lib/blog-data';

interface BlogSidebarProps {
    popularPosts: Post[];
}

export function BlogSidebar({ popularPosts }: BlogSidebarProps) {
    return (
        <div className="sticky top-24 space-y-8">
            {/* About Me */}
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">About Us</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center text-center">
                     <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src="https://i.pravatar.cc/150?u=aitoolkitpro" alt="AI Toolkit Pro" />
                        <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <p className="text-muted-foreground">
                        AI Toolkit Pro is dedicated to making powerful AI tools accessible to everyone. We believe in empowering creativity and innovation through technology.
                    </p>
                </CardContent>
            </Card>

            {/* Popular Posts */}
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Popular Posts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {popularPosts.map(post => (
                         <Link href={`/blog/${post.slug}`} key={post.slug} className="group flex items-center gap-4">
                           <div className="text-3xl font-bold text-muted-foreground group-hover:text-primary">
                                {String(popularPosts.indexOf(post) + 1).padStart(2, '0')}
                           </div>
                           <div>
                            <p className="font-semibold leading-tight group-hover:text-primary">{post.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{post.category}</p>
                           </div>
                         </Link>
                    ))}
                </CardContent>
            </Card>

            {/* Social Media */}
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Follow Us</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-around">
                    <Button variant="ghost" size="icon" asChild>
                        <a href="#" aria-label="Twitter"><Twitter /></a>
                    </Button>
                     <Button variant="ghost" size="icon" asChild>
                        <a href="#" aria-label="LinkedIn"><Linkedin /></a>
                    </Button>
                     <Button variant="ghost" size="icon" asChild>
                        <a href="#" aria-label="GitHub"><Github /></a>
                    </Button>
                     <Button variant="ghost" size="icon" asChild>
                        <a href="#" aria-label="RSS Feed"><Rss /></a>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
