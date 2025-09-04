
import { type Metadata } from 'next';
import { FluxImageGeneratorClient } from '@/components/flux-image-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Flux Image Generator | High-Quality AI Images',
  description: 'Generate stunning, high-quality images from text prompts with our free Flux Image Generator. Create photorealistic or artistic visuals in seconds.',
};

const benefits = [
    "Create photorealistic and artistic images.",
    "Generate unique visuals for any creative project.",
    "Experiment with different styles and concepts.",
    "Completely free to use, no login required."
];

export default function FluxImageGeneratorPage() {
  return (
    <>
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
              <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                  Flux Image Generator
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Harness the power of our <strong>Flux image generator</strong> to transform your text prompts into breathtaking images. This <strong>AI image generator</strong> is fast, efficient, and capable of generating stunning visuals for any project. As a top-tier <strong>free AI image generator</strong>, it offers a seamless experience for creating high-quality art. Whether you need a <strong>text to image AI</strong> for realistic photos or artistic creations, our <strong>Flux art generator</strong> delivers exceptional results.
                </p>
              </div>

              <div className="mt-8">
                  <FluxImageGeneratorClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Enter Prompt:</strong> Describe the image you want to create.</p>
                      <p><strong>2. Generate:</strong> Click the "Run" button and wait for the AI to create your image.</p>
                      <p><strong>3. Download:</strong> Once generated, you can download the image directly.</p>
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
                <h2>Create Stunning Visuals with the Flux Image Generator</h2>
                <p>The <strong>Flux image generator</strong> represents the next wave of AI-powered creativity. This advanced <strong>AI image generator</strong> is engineered for both speed and quality, allowing you to produce stunning visuals from text prompts in record time. Whether you're a digital artist, a marketer, or a content creator, this tool is designed to be your go-to resource for high-impact images. Our <strong>free AI image generator</strong> harnesses the power of Flux to deliver photorealistic and artistic results that will elevate your projects.</p>
                <p>As a leading <strong>text to image AI</strong>, the Flux generator offers unparalleled control and flexibility. You can create everything from detailed character portraits to sweeping landscapes with just a few descriptive words. This makes it the <strong>best AI image generator</strong> for users who demand high quality without the complexity. The <strong>AI art generator</strong> capabilities of this tool allow you to experiment with various styles, from classic to contemporary, ensuring that your creative vision is always realized.</p>

                <h3>Experience the Next Generation of AI Art</h3>
                <p>Our platform provides a powerful <strong>AI image creator</strong> that is accessible to everyone. The <strong>free AI image creator</strong> is designed to be intuitive, so you can start generating images right away. It's an excellent <strong>AI photo generator</strong> for creating realistic images that can be used in a wide range of applications, from marketing materials to personal art projects. The <strong>AI picture generator</strong> is also perfect for creating unique visuals that will make your content stand out.</p>
                <p>With the <strong>Flux art generator</strong>, you're not just creating images; you're creating art. This <strong>AI image generator online</strong> tool is constantly learning and improving, so you can always expect the best possible results. Whether you need an <strong>AI drawing generator</strong> for a creative project or a <strong>free text to image AI</strong> for a professional one, our Flux generator is the perfect choice. Unlock your creativity and start generating stunning, high-quality images today.</p>
            </div>
        </div>
      </section>
    </>
  );
}
