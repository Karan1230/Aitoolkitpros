
import { type Metadata } from 'next';
import { AiInteriorDesignerClient } from '@/components/ai-interior-designer-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Interior Designer | Redesign Your Space Instantly',
  description: 'Upload a photo of your room and let our AI Interior Designer generate new design ideas. Visualize different styles and layouts for free.',
};

const benefits = [
    "Visualize new designs for any room.",
    "Experiment with different styles like Modern or Scandinavian.",
    "Save time and money on interior design mockups.",
    "Get instant inspiration for your home renovation."
];

export default function AiInteriorDesignerPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Interior Designer
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Redesign your space with AI. Upload a photo of any room, choose a new style, and watch as our tool generates stunning, realistic redesigns in seconds.
              </p>
            </div>

            <div className="mt-8">
                <AiInteriorDesignerClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Upload Your Room:</strong> Click to upload a clear photo of the room you want to redesign.</p>
                    <p><strong>2. Select Options:</strong> Choose the room type (e.g., Living Room) and the design style (e.g., Modern).</p>
                    <p><strong>3. Generate:</strong> Click the "Run" button and wait for the AI to generate your new interior design.</p>
                    <p><strong>4. Download:</strong> Save the generated image to your device.</p>
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
