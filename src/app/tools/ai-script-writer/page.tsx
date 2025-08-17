
import { type Metadata } from 'next';
import { AiScriptWriterClient } from '@/components/ai-script-writer-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Script Writer | Generate Scripts for Videos & More',
  description: 'Effortlessly create compelling scripts for YouTube videos, podcasts, and presentations with our free AI Script Writer. No login required. Get started now!',
};

const benefits = [
    "Overcome writer's block instantly.",
    "Save hours of brainstorming and writing time.",
    "Structure your content professionally.",
    "Generate ideas for various formats and topics."
];

export default function AiScriptWriterPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                AI Script Writer
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Generate high-quality, engaging scripts for any purpose. Just provide a prompt, and our AI script writer will handle the rest, from video outlines to full podcast dialogues.
              </p>
            </div>

            <div className="mt-8">
                <AiScriptWriterClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Describe Your Script:</strong> Enter a detailed prompt describing the script you need. Include the topic, format (e.g., YouTube video, podcast), desired length, and tone.</p>
                    <p><strong>2. Generate:</strong> Click the "Generate Script" button.</p>
                    <p><strong>3. Review & Refine:</strong> Copy the generated script and use it as a starting point. Feel free to edit and adapt it to your unique voice.</p>
                </CardContent>
            </Card>

             <Card className="bg-card/50">
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
