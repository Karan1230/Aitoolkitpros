
import { type Metadata } from 'next';
import { VideoFaceSwapClient } from '@/components/video-face-swap-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Video Face Swap Tool | Swap Faces in Videos Instantly',
  description: 'Swap faces in any video with our free AI-powered tool. Upload a source image and a target video to create a realistic face swap in seconds. No login required.',
};

const benefits = [
    "Create funny videos and GIFs for social media.",
    "Make creative video projects with ease.",
    "Protect privacy by swapping faces in video clips.",
    "No complex video editing skills are required."
];

export default function VideoFaceSwapPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                AI Video Face Swap
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Easily swap a face in any video with our advanced AI tool. Upload a source image (with the face you want to use) and a target video to create seamless and realistic face swaps instantly.
              </p>
            </div>

            <div className="mt-8">
                <VideoFaceSwapClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Upload Content:</strong> Provide a source image (with the face you want) and a target video (where the face will be placed).</p>
                    <p><strong>2. Run Swap:</strong> Click the "Swap Face" button and let the AI perform the swap.</p>
                    <p><strong>3. View & Download:</strong> The video with the swapped face will appear. You can then download your newly created video.</p>
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
