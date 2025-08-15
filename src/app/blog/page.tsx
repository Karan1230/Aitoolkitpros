import { type Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Blog | AI Toolkit Pro',
  description: 'Read the latest articles, tutorials, and news from the AI Toolkit Pro team. Discover how to leverage free AI tools for your projects.',
};


export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          Our Blog
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Stay up-to-date with the latest news, tool releases, and articles from the AI Toolkit Pro team.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
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
                />
              </CardHeader>
              <CardContent className="flex flex-col flex-grow p-6">
                 <Badge variant="secondary" className="w-fit mb-2">{post.category}</Badge>
                <CardTitle className="font-headline text-2xl mb-2 group-hover:text-primary">{post.title}</CardTitle>
                <CardDescription className="flex-grow">{post.description}</CardDescription>
                <div className="text-sm text-muted-foreground mt-4">
                  <span>{format(new Date(post.datePublished), 'MMMM d, yyyy')}</span> by <span>{post.author}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
