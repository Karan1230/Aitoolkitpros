
import { type Metadata } from 'next';
import { ImageFaceSwapClient } from '@/components/image-face-swap-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Image Face Swap Tool | Swap Faces in Photos Instantly',
  description: 'Swap faces in any photo with our free AI-powered tool. Upload two images and let the AI perform a realistic face swap in seconds. No login required.',
};

const benefits = [
    "Create funny memes and social media content.",
    "Visualize different hairstyles or looks on yourself.",
    "Protect privacy by swapping faces in photos.",
    "Easy to use with no technical skills required."
];

export default function ImageFaceSwapPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                AI Image Face Swap
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Easily swap faces between two images with our advanced AI tool. Upload a source image and a target image to create seamless and realistic face swaps instantly.
              </p>
            </div>

            <div className="mt-8">
                <ImageFaceSwapClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Upload Images:</strong> Provide a source image (with the face you want to use) and a target image (where the face will be placed).</p>
                    <p><strong>2. Run:</strong> Click the "Run" button and let the AI work its magic.</p>
                    <p><strong>3. View Result:</strong> The image with the swapped face will appear in the output area.</p>
                    <p><strong>4. Download:</strong> You can download your newly created image directly.</p>
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
