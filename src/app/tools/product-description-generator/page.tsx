
import { type Metadata } from 'next';
import { ProductDescriptionGeneratorClient } from '@/components/product-description-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Product Description Generator | SEO-Optimized Copy',
  description: 'Generate compelling, high-converting product descriptions for your e-commerce store. Our AI tool creates SEO-friendly copy for any product.',
};

const benefits = [
    "Increase conversions with persuasive copy.",
    "Improve SEO with keyword-rich descriptions.",
    "Save hours of writing time.",
    "Create a consistent brand voice across all products."
];

export default function ProductDescriptionGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                AI Product Description Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Turn product features into compelling descriptions that sell. Let our AI craft the perfect, SEO-friendly copy for your e-commerce store and boost your conversions.
              </p>
            </div>

            <div className="mt-8">
                <ProductDescriptionGeneratorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Enter Details:</strong> Provide the product name, category, features, and target audience.</p>
                    <p><strong>2. Select Tone:</strong> Choose a tone that matches your brand (e.g., Professional, SEO-optimized).</p>
                    <p><strong>3. Generate:</strong> Click the "Generate Description" button to let the AI create the copy.</p>
                    <p><strong>4. Copy & Use:</strong> Copy the generated description and paste it directly into your e-commerce platform.</p>
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
