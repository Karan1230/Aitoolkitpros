
import { type Metadata } from 'next';
import { BackgroundRemoverClient } from '@/components/background-remover-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free AI Image Background Remover | Remove Backgrounds Instantly',
  description: 'Easily remove the background from any image with our free AI-powered tool. Get a transparent PNG or add a custom color background in seconds. No login required.',
};

const benefits = [
    "Save time on manual photo editing.",
    "Create professional product photos for e-commerce.",
    "Make stunning profile pictures and social media posts.",
    "Isolate subjects for graphic design projects."
];

export default function BackgroundRemoverPage() {
  return (
    <>
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
              <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                  AI Image Background Remover
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Upload any image and let our <strong>AI background remover</strong> automatically remove the background. This <strong>free background remover</strong> is fast, incredibly simple, and creates transparent PNGs for any project in seconds. Our <strong>background remover from image</strong> tool is perfect for e-commerce, graphic design, and social media. As the <strong>best free background remover</strong>, it offers high-quality results without any cost, making it an essential <strong>AI background removal</strong> tool for professionals and hobbyists alike.
                </p>
              </div>

              <div className="mt-8">
                  <BackgroundRemoverClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Upload Your Image:</strong> Click the upload area and select an image from your device.</p>
                      <p><strong>2. Choose a Background:</strong> Select "Transparent" or pick a solid color for your new background.</p>
                      <p><strong>3. Process:</strong> Click the "Remove Background" button and let the AI do the work.</p>
                      <p><strong>4. Download:</strong> Click the download button on the resulting image to save your new, background-free photo.</p>
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
      <section className="py-16">
        <div className="container max-w-4xl">
            <div className="prose dark:prose-invert mx-auto">
                <h2>Effortlessly Remove Backgrounds with an AI Background Remover</h2>
                <p>In the world of digital imagery, clean, professional photos are essential. A cluttered background can distract from the main subject and diminish the overall quality of an image. An <strong>AI background remover</strong> is a powerful tool that allows you to instantly remove the background from any photo, leaving you with a clean, isolated subject. Our platform offers a <strong>free background remover</strong> that is perfect for e-commerce sellers, graphic designers, and anyone who needs to create high-quality visuals. For more advanced editing, try our <Link href="/tools/ai-image-editor">AI Image Editor</Link>.</p>
                <p>The <strong>background remover from image</strong> technology uses advanced AI to accurately detect the subject and erase the background. This makes it the <strong>best free background remover</strong> for achieving professional results without the need for complex software like Photoshop. Our <strong>AI background removal</strong> tool is designed to be fast and efficient, saving you valuable time and effort. It's the ultimate <strong>photo background remover free</strong> solution for all your creative needs. Major e-commerce platforms like <a href="https://www.shopify.com/blog/product-photography" target="_blank" rel="noopener noreferrer">Shopify</a> emphasize the importance of clean product images.</p>

                <h3>Create Stunning Visuals with a Transparent Background</h3>
                <p>One of the most common uses for our tool is to <strong>remove background from image free</strong> of charge to create a transparent background. This is incredibly useful for creating product photos for e-commerce websites, as it allows you to place your product on any background you choose. The <strong>picture background remover free</strong> tool is also great for creating professional headshots and social media profile pictures. Our <strong>image background remover free</strong> service is designed to be as user-friendly as possible. After removing the background, you can <Link href="/tools/image-upscaler">upscale your image</Link> for better quality.</p>
                <p>With our <strong>background remover AI free</strong> tool, you can also add a new background to your image. Choose from a solid color or upload your own custom background to create a unique and eye-catching visual. The <strong>free background remover from image</strong> is a versatile tool that can be used for a wide range of applications. Stop struggling with manual selection tools and start using the power of AI to create stunning images. Try our <strong>best background remover free</strong> tool today and see the difference for yourself.</p>
            </div>
        </div>
      </section>
    </>
  );
}
