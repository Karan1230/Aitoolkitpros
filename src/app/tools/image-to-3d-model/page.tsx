
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
    <>
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
              <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                  AI Image to 3D Model Converter
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Upload your images and let our <strong>AI image to 3D model converter</strong> generate a 3D object. This <strong>AI 3D model generator from image</strong> uses advanced algorithms to create detailed 3D models from 2D pictures. Our <strong>free AI 3D model generator</strong> is perfect for game developers, designers, and hobbyists. As the <strong>best AI 3D model generator</strong>, it provides a seamless experience for transforming your images into three-dimensional assets.
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
      <section className="py-16">
        <div className="container max-w-4xl">
            <div className="prose dark:prose-invert mx-auto">
                <h2>Bring Your Images to Life with an AI Image to 3D Model Converter</h2>
                <p>The world of 3D modeling has traditionally been complex and time-consuming. An <strong>AI image to 3D model converter</strong> is a groundbreaking tool that changes this narrative. Our platform offers a powerful <strong>AI 3D model generator from image</strong> that can transform your 2D pictures into detailed 3D assets. This is a game-changer for game developers, animators, and designers who need to create 3D models quickly and efficiently.</p>
                <p>Our tool is designed to be the <strong>best AI 3D model generator</strong> by providing high-quality results with minimal effort. The <strong>free AI 3D model generator</strong> is accessible to everyone, regardless of their technical skills. You can use our <strong>image to 3D model AI free</strong> tool to create assets for your games, animations, or virtual reality experiences. It's a versatile <strong>AI 3D generator</strong> that can handle a wide range of image types and produce impressive 3D models.</p>
                
                <h3>From 2D Picture to 3D Asset in Minutes</h3>
                <p>The process of using our <strong>picture to 3D model AI</strong> is simple. Just upload one or more images of your object from different angles, and the AI will do the rest. The <strong>turn image into 3D model AI</strong> technology analyzes the images and reconstructs the object in three dimensions. This makes it an incredibly efficient <strong>photo to 3D model AI free</strong> tool for creating realistic and detailed models. It’s also a powerful <strong>2D to 3D model converter AI</strong> for turning your flat designs into tangible 3D assets.</p>
                <p>Whether you're a professional designer or a hobbyist, our <strong>AI 3D model creator</strong> can help you bring your ideas to life. The <strong>free 3D model generator</strong> is perfect for experimenting with different designs and creating prototypes. Stop spending hours on manual 3D modeling and start using the power of AI to create stunning 3D assets. Try our <strong>AI from image 3D model</strong> converter today and experience the future of 3D creation.</p>
            </div>
        </div>
      </section>
    </>
  );
}
