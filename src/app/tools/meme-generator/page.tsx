
import { type Metadata } from 'next';
import { MemeGeneratorClient } from '@/components/meme-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free AI Meme Generator | Create Funny Memes Instantly',
  description: 'Generate hilarious, shareable memes from text or images with our free AI Meme Generator. No login required. Go viral with your creativity!',
};

const benefits = [
    "Instantly create viral-worthy memes.",
    "Generate funny content for social media.",
    "No graphic design skills needed.",
    "Turn your ideas into humorous images."
];

export default function MemeGeneratorPage() {
  return (
    <>
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
              <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                  AI Meme Generator
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Unleash your inner comedian with our <strong>AI meme generator</strong>. Describe a topic or upload an image, and let our <strong>free meme generator</strong> create the perfect, shareable meme for you in seconds. This <strong>AI meme creator</strong> is designed to be fun and easy to use, making it the <strong>best meme generator</strong> for creating viral content. Use our <strong>meme maker AI</strong> to generate hilarious images and captions that will have your friends and followers laughing.
                </p>
              </div>

              <div className="mt-8">
                  <MemeGeneratorClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Enter a Topic:</strong> Be descriptive about the meme you want to create.</p>
                      <p><strong>2. (Optional) Upload Image:</strong> Upload your own image to use as the meme background.</p>
                      <p><strong>3. Generate:</strong> Click "Generate Meme" and let the AI work its magic.</p>
                      <p><strong>4. Download:</strong> Click the download button on your generated meme and share it with the world!</p>
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
                <h2>Go Viral with an AI Meme Generator</h2>
                <p>Memes are the language of the internet, a fun and engaging way to connect with people and share ideas. An <strong>AI meme generator</strong> is a fantastic tool that allows you to create your own hilarious memes in seconds. Our platform offers a powerful <strong>free meme generator</strong> that can turn your ideas into viral-worthy content. Whether you're a social media manager, a content creator, or just someone who loves to make people laugh, our <strong>AI meme creator</strong> is the perfect tool for you. For more on meme culture, check out <a href="https://knowyourmeme.com/" target="_blank" rel="noopener noreferrer">Know Your Meme</a>.</p>
                <p>Our tool is designed to be the <strong>best meme generator</strong> by offering a combination of creativity and ease of use. The <strong>meme maker AI</strong> can generate memes from text prompts, or you can upload your own image to use as a template. This makes it a versatile <strong>meme generator from image</strong> tool that can be used to create a wide variety of content. The <strong>free online meme generator</strong> is accessible from any device, so you can create memes on the go. You can also generate jokes and roasts with our <Link href="/tools/roast-joke-generator">Roast/Joke Generator</Link>.</p>

                <h3>Create Hilarious Memes in Seconds</h3>
                <p>Using our <strong>AI meme generator free</strong> tool is a breeze. Simply enter a topic or a funny situation, and the AI will generate a meme that is sure to get a laugh. This makes it a great <strong>funny meme generator</strong> for creating content that will resonate with your audience. The <strong>meme creator free</strong> tool is also a great way to stay on top of current trends and create timely content that is relevant to what's happening in the world. You can even create animated memes with our <Link href="/tools/image-to-video-generator">Image to Video Generator</Link>.</p>
                <p>Whether you're looking to create a meme for your personal social media accounts or for a professional marketing campaign, our <strong>meme maker free online</strong> tool has you covered. It's a powerful <strong>online meme maker</strong> that can help you create engaging content that drives likes, shares, and comments. Stop using generic meme templates and start creating your own unique and hilarious content. Try our <strong>AI generated memes</strong> tool today and let your creativity shine.</p>
            </div>
        </div>
      </section>
    </>
  );
}
