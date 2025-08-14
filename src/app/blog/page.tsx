import { type Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest articles, news, and updates from the AI Toolkit Pro team.',
};

const blogPosts = [
  {
    title: 'The Future of AI in Content Creation',
    description: 'Explore how artificial intelligence is revolutionizing the way we create content, from writing scripts to generating images.',
    href: '#',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'AI future',
    date: 'October 26, 2023',
    author: 'Jane Doe',
  },
  {
    title: '5 Time-Saving AI Tools for Developers',
    description: 'Discover AI-powered tools that can help you code faster, debug more efficiently, and streamline your development workflow.',
    href: '#',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'developer coding',
    date: 'October 24, 2023',
    author: 'John Smith',
  },
   {
    title: 'How to Generate Viral Ideas with AI',
    description: 'Learn the secrets of using AI to brainstorm, analyze, and refine ideas that have the potential to go viral on social media.',
    href: '#',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'social media',
    date: 'October 22, 2023',
    author: 'Alex Ray',
  },
];

export default function BlogPage() {
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
        {blogPosts.map((post) => (
           <Link href={post.href} key={post.title} className="group flex">
            <Card className="w-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary flex flex-col">
              <CardHeader className="p-0">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="rounded-t-lg object-cover"
                  data-ai-hint={post.dataAiHint}
                />
              </CardHeader>
              <CardContent className="flex flex-col flex-grow p-6">
                <CardTitle className="font-headline text-2xl mb-2 group-hover:text-primary">{post.title}</CardTitle>
                <CardDescription className="flex-grow">{post.description}</CardDescription>
                <div className="text-sm text-muted-foreground mt-4">
                  <span>{post.date}</span> by <span>{post.author}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
