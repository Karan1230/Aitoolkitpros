
import { type Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { allTools, toolCategories } from '@/lib/tools';

export const metadata: Metadata = {
  title: 'All AI Tools | Free AI Toolkit',
  description: 'Browse our complete collection of free AI tools for content creation, image generation, audio processing, business, and more. Find the perfect tool for your needs.',
  keywords: ['all ai tools', 'ai tool directory', 'free ai tools', 'content creation tools', 'design tools', 'marketing tools', 'business tools'],
  openGraph: {
    title: 'Complete Directory of Free AI Tools | AI Toolkit Pro',
    description: 'Explore all the free AI-powered tools offered by AI Toolkit Pro, categorized for easy browsing.',
    url: 'https://aitoolkitpro.netlify.app/tools',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'All AI Tools on AI Toolkit Pro',
    description: 'Browse our extensive collection of free AI tools.',
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "All AI Tools at AI Toolkit Pro",
  "description": "A complete directory of all free AI tools available on AI Toolkit Pro, categorized for easy browsing.",
  "url": "https://aitoolkitpro.netlify.app/tools",
  "publisher": {
    "@type": "Organization",
    "name": "AI Toolkit Pro",
    "logo": {
      "@type": "ImageObject",
      "url": "https://aitoolkitpro.netlify.app/logo.png"
    }
  },
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": allTools.map((tool, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": tool.name,
        "url": `https://aitoolkitpro.netlify.app${tool.href}`,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "description": tool.description,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    }))
  }
};

export default function AllToolsPage() {
  // A mapping for broader category matching
  const categoryMap: { [key: string]: string[] } = {
    "Writing & Content": ["Content"],
    "Design & Image": ["Image"],
    "Business & Marketing": ["Business"],
    "Education & Learning": ["Education"],
    "Audio & Voice": ["Audio"],
    "Fun & Lifestyle": ["Fun"],
    "Assistant": ["Assistant"]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="container py-12 md:py-20">
        <div className="text-center mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                All AI Tools
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                Explore our full suite of free AI tools, designed to help you create, innovate, and grow.
            </p>
        </div>

        {toolCategories.map((category) => {
          // Filter tools based on the category name and its associated mappings
          const filteredTools = allTools
            .filter(tool => {
              const mainCategory = category.name;
              const mappedCategories = categoryMap[mainCategory] || [];
              return tool.category === mainCategory || mappedCategories.includes(tool.category);
            })
            .sort((a, b) => a.name.localeCompare(b.name));

          // Skip rendering the category if no tools match
          if (filteredTools.length === 0) {
            return null;
          }
          
          return (
            <section key={category.id} className="mt-12 first:mt-0">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                <div className="p-3 rounded-full bg-primary/10 w-fit">
                  {category.icon}
                </div>
                <div>
                  <h2 className="font-headline text-3xl font-bold">{category.name}</h2>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredTools.map((tool) => (
                  <Link href={tool.href} key={tool.name + tool.href} className="group flex">
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
          );
        })}
      </div>
    </>
  );
}
