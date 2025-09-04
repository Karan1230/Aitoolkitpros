
import { type Metadata } from 'next';
import { AiImageEditorClient } from '@/components/ai-image-editor-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free AI Image Editor | Edit Photos with Text Prompts',
  description: 'Edit your images using simple text prompts with our free AI Image Editor. Modify, enhance, and transform your photos effortlessly. No login required.',
};

const benefits = [
    "Edit images with natural language.",
    "Make complex changes without technical skills.",
    "Quickly prototype different visual ideas.",
    "Perfect for artists, marketers, and photographers."
];

export default function AiImageEditorPage() {
  return (
    <>
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
              <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                  AI Image Editor
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Edit your images with the power of AI. Our <strong>AI image editor</strong> allows you to make complex changes using simple text prompts. Whether you want to alter colors, add objects, or change the background, this <strong>AI photo editor</strong> makes it possible with just a few words. This <strong>free AI photo editor</strong> is designed for everyone, from professional photographers to social media enthusiasts. Experience the future of photo manipulation and transform your images with our intuitive <strong>AI picture editor</strong>.
                </p>
              </div>

              <div className="mt-8">
                  <AiImageEditorClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Upload Image:</strong> Start by uploading the image you want to edit.</p>
                      <p><strong>2. Describe Changes:</strong> Use the text prompt to tell the AI what you want to change (e.g., "change hair color to blue").</p>
                      <p><strong>3. Generate:</strong> Click the "Run" button and wait for the AI to process your request.</p>
                      <p><strong>4. Download:</strong> Once generated, you can download your edited image.</p>
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
                <h2>Transform Your Photos with an AI Image Editor</h2>
                <p>Welcome to the next generation of photo editing. An <strong>AI image editor</strong> is a revolutionary tool that simplifies the way we modify images. Forget complicated software and steep learning curves; with our <strong>AI photo editor</strong>, all you need are your words. Describe the changes you want to see, and the AI will bring them to life. This makes it the <strong>best AI photo editor</strong> for users of all skill levels who want to achieve professional results without the hassle. For more advanced background modifications, check out our dedicated <Link href="/tools/background-remover">Background Remover</Link>.</p>
                <p>Our platform offers a powerful <strong>AI photo editor free</strong> of charge, putting advanced capabilities at your fingertips. You can use it as an <strong>AI background editor</strong> to seamlessly change the scenery of your photos or remove unwanted objects. The <strong>AI picture editor</strong> can also be used for more creative tasks, such as adding fantastical elements or changing the artistic style of an image. The possibilities are endless, and the intuitive interface makes it easy to experiment and have fun, a topic often explored by tech journals like <a href="https://www.theverge.com/t/ai" target="_blank" rel="noopener noreferrer">The Verge</a>.</p>

                <h3>How AI is Changing Photo Editing</h3>
                <p>Traditional photo editing often requires precise selections and manual adjustments. An <strong>AI photo editor online</strong> streamlines this process by interpreting natural language commands. For instance, instead of manually selecting a person's hair to change its color, you can simply type, "make the hair blonde." This makes our tool an incredibly efficient <strong>photo editor AI</strong>. It’s also a powerful <strong>photo enhancer AI free</strong> tool, capable of improving lighting, sharpening details, and correcting colors automatically. If you'd rather create an image from scratch, our <Link href="/tools/ai-image-generator">AI Image Generator</Link> is the perfect tool.</p>
                <p>If you're looking for a specific type of transformation, our <strong>AI image editor free</strong> tool has you covered. Use it as an <strong>AI cartoon photo editor</strong> to give your pictures a fun, animated look. The <strong>free AI picture editor</strong> is perfect for creating unique social media content, marketing materials, or personal art projects. Experience the power and simplicity of an <strong>AI editor</strong> and unlock your creative potential. Try the <strong>best free AI photo editor</strong> today and see how easy it is to create stunning visuals.</p>
            </div>
        </div>
      </section>
    </>
  );
}
