
import { type Metadata } from 'next';
import { FluxProImageGeneratorClient } from '@/components/flux-pro-image-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Flux Pro Image Generator | High-Quality AI Images',
  description: 'Generate stunning, high-quality images from text prompts with our free Flux Pro Image Generator. Create photorealistic or artistic visuals in seconds.',
};

const benefits = [
    "Create photorealistic and artistic images.",
    "Generate unique visuals for any creative project.",
    "Experiment with different styles and concepts.",
    "Completely free to use, no login required."
];

export default function FluxProImageGeneratorPage() {
  return (
    <>
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
              <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                  Flux Pro Image Generator
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Harness the power of our <strong>Flux Pro image generator</strong> to transform your text prompts into breathtaking images. This advanced <strong>AI image generator</strong> is fast, efficient, and capable of generating stunning visuals for any project. As a premier <strong>free AI image generator</strong>, it offers professional-grade results. Whether you need a <strong>text to image AI</strong> for photorealistic scenes or complex artistic pieces, our <strong>Flux Pro art generator</strong> stands as the <strong>best AI image generator</strong> for quality and speed.
                </p>
              </div>

              <div className="mt-8">
                  <FluxProImageGeneratorClient />
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
                <h2>Unleash Pro-Level Creativity with the Flux Pro Image Generator</h2>
                <p>The <strong>Flux Pro image generator</strong> is a state-of-the-art tool that brings professional-level AI image creation to your fingertips. This is not just another <strong>AI image generator</strong>; it's a high-performance engine designed to produce exceptionally detailed and high-quality visuals. If you're looking for the <strong>best AI image generator</strong> that combines speed with artistic excellence, Flux Pro is the answer. Our <strong>free AI image generator</strong> makes this advanced technology accessible to everyone, from seasoned designers to aspiring artists.</p>
                <p>Powered by a sophisticated <strong>text to image AI</strong> model, the Flux Pro generator excels at interpreting complex prompts and creating nuanced, lifelike images. Use it as a <strong>realistic AI image generator</strong> to produce photos that are indistinguishable from reality, or as a creative <strong>AI art generator</strong> to explore imaginative and abstract concepts. The level of detail and coherence in the generated images makes it a top-tier <strong>AI image creator</strong> for any professional application.</p>
                
                <h3>Why Choose Flux Pro for Your Creative Projects?</h3>
                <p>The <strong>Flux Pro art generator</strong> is more than just a tool; it's a creative partner. It functions as a powerful <strong>AI photo generator</strong> and <strong>AI picture generator</strong>, capable of producing a wide array of visual content. Whether you need a stunning landscape, a detailed character portrait, or a unique abstract piece, this <strong>AI image generator online</strong> tool delivers consistently impressive results. The quality of the output makes it an ideal <strong>AI image generator HD</strong> solution for projects that require high-resolution assets.</p>
                <p>With our <strong>free AI image creator</strong>, you have access to a tool that is both powerful and user-friendly. The <strong>free text to image AI</strong> interface allows you to start creating right away, without a steep learning curve. Experiment with different prompts and styles to see the full potential of this incredible technology. Whether you're an artist, a designer, or a marketer, the Flux Pro image generator is the ultimate tool for bringing your creative ideas to life. Experience the future of image generation today.</p>
            </div>
        </div>
      </section>
    </>
  );
}
