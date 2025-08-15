import { type Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { allTools, toolCategories } from '@/lib/tools';

export const metadata: Metadata = {
  title: 'All AI Tools',
  description: 'Browse our complete collection of free AI tools for content creation, image generation, audio processing, and more. Find the perfect tool for your needs.',
};

export default function AllToolsPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
          All AI Tools
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Explore our full suite of AI-powered tools designed to be simple, powerful, and completely free. Find the perfect assistant for your next creative project.
        </p>
      </div>

      {toolCategories.map((category) => (
        <section key={category.id} className="mt-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-full bg-primary/10">
              {category.icon}
            </div>
            <div>
              <h2 className="font-headline text-3xl font-bold">{category.name}</h2>
              <p className="text-muted-foreground">{category.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allTools
              .filter(tool => tool.category === category.name || (category.name === "Writing & Content" && tool.category === "Content") || (category.name === "Design & Image" && tool.category === "Image") || (category.name === "Business & Marketing" && tool.category === "Business") || (category.name === "Education & Learning" && tool.category === "Education") || (category.name === "Audio & Voice" && tool.category === "Audio") || (category.name === "Fun & Lifestyle" && tool.category === "Fun"))
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((tool) => (
                <Link href={tool.href} key={tool.name} className="group flex">
                  <Card className="w-full transition-all duration-300 hover:shadow-xl hover:border-primary/50 flex flex-col bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit">
                          {tool.icon}
                        </div>
                        <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                      </div>
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
        </section>
      ))}
    </div>
  );
}
