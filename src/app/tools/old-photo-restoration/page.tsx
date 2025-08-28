
import { type Metadata } from 'next';
import { OldPhotoRestorationClient } from '@/components/old-photo-restoration-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Old Photo Restoration Tool | Restore Your Photos Instantly',
  description: 'Restore old, damaged, and faded photos with our free AI-powered tool. Bring your memories back to life with enhanced quality and color.',
};

const benefits = [
    "Restore faded colors and improve contrast.",
    "Fix scratches, tears, and other damage.",
    "Enhance facial details for clearer portraits.",
    "Preserve your family history for generations."
];

export default function OldPhotoRestorationPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Old Photo Restoration
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Breathe new life into your old memories. Upload a photo, and let our AI restore its quality, fix damages, and enhance its colors and details in seconds.
              </p>
            </div>

            <div className="mt-8">
                <OldPhotoRestorationClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Upload Photo:</strong> Click to upload an old or damaged photo from your device.</p>
                    <p><strong>2. Restore:</strong> Click the "Submit" button and wait for the AI to process and restore your image.</p>
                    <p><strong>3. Compare & Download:</strong> View the before-and-after comparison and download your restored photo.</p>
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
