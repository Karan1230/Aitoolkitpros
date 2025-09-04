
import { type Metadata } from 'next';
import { ImageUpscalerClient } from '@/components/image-upscaler-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Image Upscaler | Enhance & Enlarge Images',
  description: 'Upscale your images to a higher resolution without losing quality with our free AI-powered Image Upscaler tool. Enlarge photos for print or digital use.',
};

const benefits = [
    "Increase image resolution without quality loss.",
    "Enhance details for sharper, clearer photos.",
    "Upscale images for high-quality printing.",
    "No complex software needed to improve your images."
];

export default function ImageUpscalerPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                AI Image Upscaler
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Enhance your images with our advanced AI. This tool, powered by Flux.1-dev, lets you upscale and improve the quality of your pictures effortlessly.
              </p>
            </div>

            <div className="mt-8">
                <ImageUpscalerClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Upload Image:</strong> Start by uploading the image you want to upscale.</p>
                    <p><strong>2. Adjust Settings:</strong> Use the controls to set the desired upscaling factor and other enhancements.</p>
                    <p><strong>3. Run:</strong> Click the "Run" button and wait for the AI to process your image.</p>
                    <p><strong>4. Download:</strong> Once generated, you can view and download your enhanced image.</p>
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
