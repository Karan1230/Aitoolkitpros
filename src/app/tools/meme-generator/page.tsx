
import { type Metadata } from 'next';
import { MemeGeneratorClient } from '@/components/meme-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Meme Generator | Create Funny Memes Instantly',
  description: 'Generate hilarious, shareable memes from text or images with our free AI Meme Generator. No login required. Go viral with your creativity!',
};

const benefits = [
    "Instantly create viral-worthy memes.",
    "Generate funny content for social media.",
    "No graphic design skills needed.",
    "Turn your ideas into humorous images."
];

export default function MemeGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Meme Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Unleash your inner comedian. Describe a topic or upload an image, and let our AI create the perfect, shareable meme for you in seconds.
              </p>
            </div>

            <div className="mt-8">
                <MemeGeneratorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Enter a Topic:</strong> Be descriptive about the meme you want to create.</p>
                    <p><strong>2. (Optional) Upload Image:</strong> Upload your own image to use as the meme background.</p>
                    <p><strong>3. Generate:</strong> Click "Generate Meme" and let the AI work its magic.</p>
                    <p><strong>4. Download:</strong> Click the download button on your generated meme and share it with the world!</p>
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
