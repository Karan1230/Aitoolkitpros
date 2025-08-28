
import { type Metadata } from 'next';
import { ImageTo3dModelClient } from '@/components/image-to-3d-model-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Image to 3D Model Converter | Create 3D Models from Images',
  description: 'Convert your 2D images into detailed 3D models with our free AI-powered tool. Bring your pictures to life in three dimensions instantly. No login required.',
};

const benefits = [
    "Transform static images into interactive 3D assets.",
    "Create models for use in games, AR/VR, and design.",
    "No complex 3D modeling software needed.",
    "Generate 3D objects from multiple 2D views."
];

export default function ImageTo3dModelPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Image to 3D Model Converter
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Upload your images and let our AI generate a 3D model. This tool uses advanced algorithms to create detailed 3D objects from multiple 2D pictures.
              </p>
            </div>

            <div className="mt-8">
                <ImageTo3dModelClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Upload Images:</strong> Start by uploading the images you want to convert.</p>
                    <p><strong>2. Generate:</strong> Click the "Run" button and wait for the AI to create your 3D model.</p>
                    <p><strong>3. View & Download:</strong> Once generated, you can view the 3D model and download it.</p>
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
