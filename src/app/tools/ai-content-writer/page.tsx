
import { type Metadata } from 'next';
import { AiContentWriterClient } from '@/components/ai-content-writer-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Content Writer | Generate SEO Articles & Blog Posts',
  description: 'Create high-quality, SEO-optimized articles and blog posts in multiple languages. Our AI content writer includes image generation, linking, and formatting options.',
};

const benefits = [
    "Generate full articles from a single keyword.",
    "Optimize content for SEO to rank higher.",
    "Includes AI-generated images and links.",
    "Supports multiple languages and content types.",
    "Save hours of research and writing time."
];

export default function AiContentWriterPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Content Writer
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Generate complete, SEO-friendly articles and blog posts with AI-powered images and links. Customize every detail, from word count and tone to image style and language.
              </p>
            </div>

            <div className="mt-8">
                <AiContentWriterClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Define Your Content:</strong> Enter a title or keywords and select the content type, style, tone, and language.</p>
                    <p><strong>2. Customize Images & Links:</strong> Choose the number of images, their style, and add any specific links you want included.</p>
                    <p><strong>3. Generate:</strong> Click the "Generate Content" button and let the AI build your complete article or blog post.</p>
                    <p><strong>4. Export & Publish:</strong> Copy the text or download the full HTML file to publish on your website.</p>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                            <span>{benefit}</span>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
