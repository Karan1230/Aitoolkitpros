import { type Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, AudioLines, FileText, ImageIcon, Laugh, Wrench, Bot, Share2, Youtube, HelpCircle, ScanSearch, Lightbulb, PenTool, ShoppingCart, BookMarked, Hash } from 'lucide-react';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'All AI Tools',
  description: 'Browse our complete collection of free AI tools for content creation, image generation, audio processing, and more. Find the perfect tool for your needs.',
};

const allTools = [
  {
    name: "AI Script Writer",
    description: "Generate engaging scripts for videos, podcasts, and more based on your prompts.",
    href: "/tools/ai-script-writer",
    icon: <FileText className="h-8 w-8 text-primary" />,
    category: "Content"
  },
  {
    name: "Product Description Generator",
    description: "Create compelling descriptions for your e-commerce products.",
    href: "/tools/product-description-generator",
    icon: <ShoppingCart className="h-8 w-8 text-primary" />,
    category: "Content"
  },
  {
    name: "Story Plot Generator",
    description: "Generate unique story plots, characters, and settings for any genre.",
    href: "/tools/story-plot-generator",
    icon: <BookMarked className="h-8 w-8 text-primary" />,
    category: "Content"
  },
  {
    name: "AI Image Generator",
    description: "Turn your text prompts into stunning, unique visual art and graphics.",
    href: "/tools/ai-image-generator",
    icon: <ImageIcon className="h-8 w-8 text-primary" />,
    category: "Image"
  },
    {
    name: "AI Background Remover",
    description: "Automatically remove the background from any image with a single click.",
    href: "/tools/background-remover",
    icon: <ScanSearch className="h-8 w-8 text-primary" />,
    category: "Image"
  },
   {
    name: "AI Logo Maker",
    description: "Design a unique, professional logo for your brand in seconds.",
    href: "/tools/ai-logo-maker",
    icon: <PenTool className="h-8 w-8 text-primary" />,
    category: "Image"
  },
  {
    name: "Meme Generator",
    description: "Create funny memes from text or images, powered by AI.",
    href: "/tools/meme-generator",
    icon: <Laugh className="h-8 w-8 text-primary" />,
    category: "Fun"
  },
  {
    name: "YouTube Thumbnail Generator",
    description: "Create click-worthy YouTube thumbnails with bold text and vibrant colors.",
    href: "/tools/youtube-thumbnail-generator",
    icon: <Youtube className="h-8 w-8 text-primary" />,
    category: "Image"
  },
  {
    name: "Text-to-Speech Converter",
    description: "Convert any written text into natural-sounding, high-quality audio.",
    href: "/tools/text-to-speech",
    icon: <AudioLines className="h-8 w-8 text-primary" />,
    category: "Audio"
  },
  {
    name: "Voice-to-Text Converter",
    description: "Transcribe speech from audio recordings with exceptional accuracy.",
    href: "/tools/voice-to-text",
    icon: <Wrench className="h-8 w-8 text-primary" />,
    category: "Audio"
  },
  {
    name: "ChatGPT AI Tools",
    description: "A suite of tools for Q&A, coding help, grammar correction, and text rewriting.",
    href: "/tools/chatgpt-ai-tools",
    icon: <Bot className="h-8 w-8 text-primary" />,
    category: "Assistant"
  },
  {
    name: "Social Media Post Generator",
    description: "Create engaging posts and captions for your social media channels in seconds.",
    href: "/tools/social-media-post-generator",
    icon: <Share2 className="h-8 w-8 text-primary" />,
    category: "Content"
  },
  {
    name: "Quiz Generator",
    description: "Create quizzes on any topic with various question types and difficulty levels.",
    href: "/tools/quiz-generator",
    icon: <HelpCircle className="h-8 w-8 text-primary" />,
    category: "Education"
  },
  {
    name: "Idea Generator",
    description: "Generate creative ideas for business, content, marketing, and more.",
    href: "/tools/idea-generator",
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    category: "Business"
  },
  {
    name: "Hashtag Generator",
    description: "Generate relevant, trending, and niche-specific hashtags for social media.",
    href: "/tools/hashtag-generator",
    icon: <Hash className="h-8 w-8 text-primary" />,
    category: "Marketing"
  },
];


export default function AllToolsPage() {
  return (
    <div className="container py-12 md:py-20">
      <h1 className="font-headline text-4xl md:text-5xl font-bold text-center">
        All AI Tools
      </h1>
      <p className="mt-6 text-lg text-center text-muted-foreground max-w-3xl mx-auto">
        Explore our full suite of AI-powered tools designed to be simple, powerful, and completely free. Find the perfect assistant for your next creative project.
      </p>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allTools.sort((a,b) => a.name.localeCompare(b.name)).map((tool) => (
          <Link href={tool.href} key={tool.name} className="group flex">
            <Card className="w-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                    {tool.icon}
                    <div className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">{tool.category}</div>
                </div>
                <CardTitle className="font-headline text-2xl pt-4">{tool.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{tool.description}</CardDescription>
              </CardContent>
              <div className="p-6 pt-0">
                 <div className="text-sm font-semibold text-primary group-hover:text-accent flex items-center">
                    Use Tool <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                 </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
