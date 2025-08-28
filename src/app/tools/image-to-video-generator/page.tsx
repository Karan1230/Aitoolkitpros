
import { type Metadata } from 'next';
import { ImageToVideoGeneratorClient } from '@/components/image-to-video-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Image to Video Generator | Bring Your Images to Life',
  description: 'Create stunning videos from your images with our free AI-powered tool. Turn static pictures into dynamic video clips in seconds. No login required.',
};

const benefits = [
    "Animate your static images effortlessly.",
    "Create engaging content for social media.",
    "No complex video editing software needed.",
    "Generate short video clips from your favorite photos."
];

export default function ImageToVideoGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Image to Video Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Bring your images to life. This tool, powered by advanced AI, lets you generate captivating videos from a single image, turning your static content into a dynamic story.
              </p>
            </div>

            <div className="mt-8">
                <ImageToVideoGeneratorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Upload Image:</strong> Start by uploading the image you want to animate.</p>
                    <p><strong>2. Enter Prompt:</strong> Describe the motion you want to see in the video (e.g., "camera zooms in slowly").</p>
                    <p><strong>3. Generate:</strong> Click the "Run" button and wait for the AI to create your video.</p>
                    <p><strong>4. Download:</strong> Once generated, you can download the video directly from the player.</p>
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
