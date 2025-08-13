import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, AudioLines, FileText, ImageIcon, Laugh, Search, Wrench } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const toolCategories = [
  {
    name: "Content Tools",
    icon: <FileText className="h-8 w-8 text-primary" />,
    description: "AI writers for scripts, articles, and social media.",
  },
  {
    name: "Image Tools",
    icon: <ImageIcon className="h-8 w-8 text-primary" />,
    description: "Generate and edit images with the power of AI.",
  },
  {
    name: "Audio Tools",
    icon: <AudioLines className="h-8 w-8 text-primary" />,
    description: "Create voiceovers and transcribe audio effortlessly.",
  },
  {
    name: "Fun Tools",
    icon: <Laugh className="h-8 w-8 text-primary" />,
    description: "Generate memes, quotes, and more for entertainment.",
  },
  {
    name: "Utilities",
    icon: <Wrench className="h-8 w-8 text-primary" />,
    description: "Handy tools for translation, analysis, and quizzes.",
  },
];

const featuredTools = [
  {
    name: "AI Script Writer",
    description: "Generate engaging scripts for videos, podcasts, and more.",
    href: "/tools/ai-script-writer",
    icon: <FileText className="h-6 w-6" />,
  },
  {
    name: "AI Image Generator",
    description: "Turn your text prompts into stunning visual art.",
    href: "/tools/ai-image-generator",
    icon: <ImageIcon className="h-6 w-6" />,
  },
  {
    name: "Text-to-Speech Converter",
    description: "Convert any text into natural-sounding audio.",
    href: "/tools/text-to-speech",
    icon: <AudioLines className="h-6 w-6" />,
  },
  {
    name: "Voice-to-Text Converter",
    description: "Transcribe speech from audio files with high accuracy.",
    href: "/tools/voice-to-text",
    icon: <Wrench className="h-6 w-6" />,
  },
];

const ToolCard = ({ name, description, href, icon }: { name: string; description: string; href: string; icon: ReactNode }) => (
  <Link href={href} className="group">
    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="rounded-lg bg-primary/10 p-3 text-primary">
          {icon}
        </div>
        <CardTitle className="font-headline text-xl">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  </Link>
);


export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="py-24 md:py-32 lg:py-40 text-center bg-card">
        <div className="container px-4 md:px-6">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
            Unlock Your Creativity with <span className="text-primary">AI Toolkit Pro</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Your all-in-one suite of free AI tools. No subscriptions, no sign-ups. Just pure creative power at your fingertips.
          </p>
          <div className="mt-8 max-w-lg mx-auto">
            <div className="relative">
              <Input
                type="search"
                placeholder="Find a tool (e.g., 'image generator')"
                className="w-full h-12 pl-12 pr-4 text-lg rounded-full"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">Explore by Category</h2>
          <p className="mt-4 max-w-2xl mx-auto text-center text-muted-foreground">
            Find the perfect AI tool for any task, organized for your convenience.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {toolCategories.map((category) => (
              <Card key={category.name} className="text-center p-6">
                <div className="flex justify-center mb-4">{category.icon}</div>
                <h3 className="font-headline text-xl font-semibold">{category.name}</h3>
                <p className="mt-2 text-muted-foreground text-sm">{category.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="featured-tools" className="py-20 md:py-28 bg-card">
        <div className="container px-4 md:px-6">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">Featured AI Tools</h2>
          <p className="mt-4 max-w-2xl mx-auto text-center text-muted-foreground">
            Get started with our most popular tools, designed for power and simplicity.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>
          <div className="mt-16 text-center">
            <Button asChild size="lg" className="rounded-full bg-accent hover:bg-accent/90">
              <Link href="/tools">
                See All Tools <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
