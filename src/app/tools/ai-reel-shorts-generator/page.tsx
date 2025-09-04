
import { type Metadata } from 'next';
import { AiReelShortsGeneratorClient } from '@/components/ai-reel-shorts-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Reel & Shorts Generator | Create Viral Videos Instantly',
  description: 'Generate stunning short-form videos for TikTok, Instagram Reels, and YouTube Shorts from text prompts with our free AI tool.',
};

const benefits = [
    "Create engaging video content in seconds.",
    "Turn your ideas into viral-worthy clips.",
    "No video editing skills required.",
    "Perfect for social media marketers and content creators."
];

export default function AiReelShortsGeneratorPage() {
  return (
    <>
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
              <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                  AI Reel/Shorts Generator
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Instantly create engaging, short-form videos with our <strong>AI reel/shorts generator</strong>. This powerful tool is perfect for generating content for Reels, TikTok, and YouTube Shorts. Simply describe your idea, and our <strong>AI shorts generator</strong> will bring it to life. As the <strong>best AI reel generator</strong>, it helps you produce high-quality videos without any editing skills. Use this <strong>free AI reel generator</strong> to create viral content and grow your audience on social media.
                </p>
              </div>

              <div className="mt-8">
                  <AiReelShortsGeneratorClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Enter Prompt:</strong> Describe the video you want to create in the text box.</p>
                      <p><strong>2. Generate:</strong> Click the "Run" button and wait for the AI to create your video.</p>
                      <p><strong>3. Download:</strong> Once generated, you can download the video directly.</p>
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
                <h2>Create Viral Videos with an AI Reel/Shorts Generator</h2>
                <p>In the world of social media, short-form video is king. Platforms like Instagram Reels, YouTube Shorts, and TikTok have created a massive demand for engaging, fast-paced content. An <strong>AI reel/shorts generator</strong> is the ultimate tool for meeting this demand. Our platform offers a powerful <strong>AI video generator for reels</strong> that allows you to create stunning videos from simple text prompts. There's no need for expensive equipment or complicated software; just describe your idea, and the AI will handle the rest.</p>
                <p>Our tool is designed to be the <strong>best AI reel generator</strong> by offering a seamless and intuitive creative process. It functions as an <strong>AI reel maker</strong> that can generate a wide variety of content, from funny skits to motivational clips. The <strong>AI YouTube shorts generator</strong> feature is perfect for creators who want to tap into YouTube's growing short-form video audience. And because it's a <strong>free AI shorts generator</strong>, it's accessible to everyone, from individual creators to large marketing teams.</p>

                <h3>Effortless Content Creation for Social Media</h3>
                <p>The magic of our <strong>AI generated shorts</strong> lies in its simplicity. You can use our <strong>AI reel generator from text</strong> to turn a simple idea into a fully realized video in minutes. This makes it an invaluable <strong>Instagram reel generator AI</strong> for social media managers who need to produce a high volume of content. The <strong>free AI reel generator from text</strong> is also a great tool for brainstorming and experimenting with new video concepts.</p>
                <p>Whether you're looking to create a viral dance video or an informative tutorial, our <strong>reels AI generator</strong> is up to the task. It's the <strong>best free AI reel generator</strong> for creating high-quality, engaging content that will captivate your audience. Stop spending hours on video production and start creating amazing content with the power of AI. Try our <strong>AI shorts generator free</strong> tool today and take your social media presence to the next level.</p>
            </div>
        </div>
      </section>
    </>
  );
}
