
import { type Metadata } from 'next';
import { AiImageEditorClient } from '@/components/ai-image-editor-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Image Editor | Edit Photos with Text Prompts',
  description: 'Edit your images using simple text prompts with our free AI Image Editor. Modify, enhance, and transform your photos effortlessly. No login required.',
};

const benefits = [
    "Edit images with natural language.",
    "Make complex changes without technical skills.",
    "Quickly prototype different visual ideas.",
    "Perfect for artists, marketers, and photographers."
];

export default function AiImageEditorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                AI Image Editor
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Edit your images with the power of AI. Simply upload a photo and use text prompts to describe the changes you want to make.
              </p>
            </div>

            <div className="mt-8">
                <AiImageEditorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Upload Image:</strong> Start by uploading the image you want to edit.</p>
                    <p><strong>2. Describe Changes:</strong> Use the text prompt to tell the AI what you want to change (e.g., "change hair color to blue").</p>
                    <p><strong>3. Generate:</strong> Click the "Run" button and wait for the AI to process your request.</p>
                    <p><strong>4. Download:</strong> Once generated, you can download your edited image.</p>
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
