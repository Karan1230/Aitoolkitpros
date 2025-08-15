import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/posts';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TableOfContents } from '@/components/table-of-contents';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronRight } from 'lucide-react';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {};
  }

  const siteUrl = 'https://your-domain.com'; // Replace with your actual domain
  const fullUrl = `${siteUrl}/blog/${post.slug}`;
  
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: fullUrl,
      type: 'article',
      publishedTime: new Date(post.datePublished).toISOString(),
      modifiedTime: new Date(post.dateModified).toISOString(),
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 600,
          alt: post.title,
        },
      ],
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.featuredImage],
    },
  };
}

const JsonLd = ({ post, url }: { post: any, url: string }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.featuredImage,
    "url": url,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "AI Toolkit Pro",
      "logo": {
        "@type": "ImageObject",
        "url": "https://your-domain.com/logo.png" // Replace with your logo URL
      }
    },
    "datePublished": new Date(post.datePublished).toISOString(),
    "dateModified": new Date(post.dateModified).toISOString(),
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};


export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  const relatedPosts = getRelatedPosts(post);
  const siteUrl = 'https://your-domain.com';
  const fullUrl = `${siteUrl}/blog/${post.slug}`;


  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLd post={post} url={fullUrl} />
      <div className="container py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm text-muted-foreground mb-8">
                <Link href="/" className="hover:text-primary">Home</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link href="/blog" className="hover:text-primary">Blog</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-foreground">{post.title}</span>
            </nav>

            <div className="grid lg:grid-cols-4 gap-12">
                <article className="lg:col-span-3 prose dark:prose-invert max-w-none">
                     <div className="mb-8">
                        <Badge variant="secondary">{post.category}</Badge>
                    </div>

                    <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
                    <div className="flex items-center gap-4 mb-8 text-muted-foreground">
                        <div className="flex items-center gap-2">
                             <Avatar className="h-8 w-8">
                                <AvatarImage src={`https://i.pravatar.cc/40?u=${post.author}`} alt={post.author} />
                                <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{post.author}</span>
                        </div>
                        <span>&middot;</span>
                        <time dateTime={post.datePublished}>
                            {format(new Date(post.datePublished), 'MMMM d, yyyy')}
                        </time>
                    </div>

                    <Image
                        src={post.featuredImage}
                        alt={post.title}
                        width={1200}
                        height={600}
                        className="rounded-lg mb-8 object-cover aspect-video"
                        priority
                    />

                    <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
                    
                     <div className="mt-12 flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                            <Badge key={tag} variant="outline"># {tag}</Badge>
                        ))}
                    </div>
                </article>

                <aside className="lg:col-span-1">
                    <TableOfContents content={post.content} />
                </aside>
            </div>

            {/* Author Bio */}
            <Card className="mt-16 bg-muted/50">
                <CardContent className="p-6 flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={`https://i.pravatar.cc/80?u=${post.author}`} alt={post.author} />
                        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h4 className="font-headline text-xl font-bold">{post.author}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                            {post.author} is a content strategist at AI Toolkit Pro, dedicated to exploring how AI can enhance creativity and productivity for everyone.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <div className="mt-16">
                    <h2 className="font-headline text-3xl font-bold mb-8 text-center">Related Posts</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {relatedPosts.map(related => (
                             <Link href={`/blog/${related.slug}`} key={related.slug} className="group flex">
                                <Card className="w-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary flex flex-col">
                                <CardHeader className="p-0">
                                    <Image
                                    src={related.featuredImage}
                                    alt={related.title}
                                    width={600}
                                    height={300}
                                    className="rounded-t-lg object-cover aspect-video"
                                    data-ai-hint={related.dataAiHint}
                                    />
                                </CardHeader>
                                <CardContent className="flex flex-col flex-grow p-6">
                                    <CardTitle className="font-headline text-xl mb-2 group-hover:text-primary">{related.title}</CardTitle>
                                    <CardDescription className="flex-grow text-sm">{related.description}</CardDescription>
                                </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </div>
    </>
  );
}
