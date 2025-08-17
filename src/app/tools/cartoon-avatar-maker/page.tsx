
import { type Metadata } from 'next';
import { CartoonAvatarMakerClient } from '@/components/cartoon-avatar-maker-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Cartoon & Avatar Maker | Turn Your Photo into Art',
  description: 'Create a unique cartoon or avatar from your photo with our free AI tool. Choose from styles like Anime, 3D, and Comic Book. No login required.',
};

const benefits = [
    "Create a unique profile picture for social media.",
    "No artistic skills needed to get a professional avatar.",
    "Generate multiple styles to find your perfect look.",
    "Download high-resolution, transparent PNGs."
];

export default function CartoonAvatarMakerPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Cartoon & Avatar Maker
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Upload your photo and let our AI transform it into a stunning avatar. Choose from various styles like anime, 3D, or comic book to get a unique profile picture.
              </p>
            </div>

            <div className="mt-8">
                <CartoonAvatarMakerClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Upload Photo:</strong> Click to upload a clear, front-facing photo of yourself.</p>
                    <p><strong>2. Choose Style:</strong> Select an artistic style like 3D Avatar, Anime, or Comic Book.</p>
                    <p><strong>3. Select Background:</strong> Pick a transparent, solid color, or custom scene background.</p>
                    <p><strong>4. Generate:</strong> Click the "Generate Avatars" button and watch the AI work its magic.</p>
                    <p><strong>5. Download:</strong> Click your favorite avatar to download the high-resolution PNG.</p>
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
