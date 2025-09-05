
import { type Metadata } from 'next';
import { AiReelShortsGeneratorClient } from '@/components/ai-reel-shorts-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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

const faqs = [
    {
        question: "What is an AI reel/shorts generator?",
        answer: "An AI reel/shorts generator is a tool that uses artificial intelligence to create short-form videos for platforms like Instagram Reels, YouTube Shorts, and TikTok. You can describe your idea in text, and the AI will generate a complete video, often including visuals, music, and text overlays."
    },
    {
        question: "How does the AI create a video from text?",
        answer: "The AI analyzes your text prompt to understand the theme, mood, and content. It then selects or generates relevant visual clips, adds background music, and can even include text animations to produce a finished short video that matches your description."
    },
    {
        question: "Is this AI video generator for reels free?",
        answer: "Yes, our AI reel and shorts generator is completely free to use. It's a fantastic resource for content creators and marketers who want to produce a high volume of video content without the associated costs."
    },
    {
        question: "Can I use this for my business's social media?",
        answer: "Absolutely. This tool is perfect for creating quick, engaging video ads, product showcases, or informational clips for your business's Instagram, TikTok, or YouTube channels. It helps you stay active and relevant in the fast-paced world of social media."
    },
    {
        question: "What makes a good prompt for the AI shorts generator?",
        answer: "A good prompt is descriptive. Instead of 'a cat video,' try 'a funny video of a clumsy orange cat trying to jump onto a shelf and failing hilariously.' The more detail you provide about the action, setting, and mood, the better the AI can bring your vision to life."
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "AI Reel/Shorts Generator",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Web",
      "description": "A free AI tool to generate stunning short-form videos for TikTok, Instagram Reels, and YouTube Shorts from text prompts.",
      "url": "https://www.aitoolkitpro.com/tools/ai-reel-shorts-generator",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.7",
        "reviewCount": "185"
      },
      "author": {
        "@type": "Organization",
        "name": "AI Toolkit Pro"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  ]
};

export default function AiReelShortsGeneratorPage() {
  return (
    <>
     <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
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

              <div className="my-8">
                <div className="mx-auto w-full max-w-[728px] h-[90px] bg-muted/50 border border-dashed rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Demo Banner Ad (728x90)</span>
                </div>
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
                      <p><strong>3. Download:</strong> Once generated, you can download the video directly from the player.</p>
                  </CardContent>
              </Card>

              <div className="mx-auto w-full max-w-[300px] h-[250px] bg-muted/50 border border-dashed rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Demo Ad (300x250)</span>
              </div>

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

              <div className="mx-auto w-full max-w-[300px] h-[250px] bg-muted/50 border border-dashed rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Demo Ad (300x250)</span>
              </div>
          </div>
        </div>
      </div>
      <section className="py-16">
        <div className="container max-w-4xl">
            <div className="prose dark:prose-invert mx-auto">
                <h2>Create Viral Videos with an AI Reel/Shorts Generator</h2>
                <p>In the world of social media, short-form video is king. Platforms like Instagram Reels, YouTube Shorts, and TikTok have created a massive demand for engaging, fast-paced content. An <strong>AI reel/shorts generator</strong> is the ultimate tool for meeting this demand. Our platform offers a powerful <strong>AI video generator for reels</strong> that allows you to create stunning videos from simple text prompts. There's no need for expensive equipment or complicated software; just describe your idea, and the AI will handle the rest.</p>
                
                 <div className="my-8">
                    <div className="mx-auto w-full max-w-[728px] h-[90px] bg-muted/50 border border-dashed rounded-lg flex items-center justify-center">
                        <span className="text-muted-foreground text-sm">Demo Banner Ad (728x90)</span>
                    </div>
                </div>

                <p>Our tool is designed to be the <strong>best AI reel generator</strong> by offering a seamless and intuitive creative process. It functions as an <strong>AI reel maker</strong> that can generate a wide variety of content, from funny skits to motivational clips. The <strong>AI YouTube shorts generator</strong> feature is perfect for creators who want to tap into YouTube's growing short-form video audience. And because it's a <strong>free AI shorts generator</strong>, it's accessible to everyone, from individual creators to large marketing teams.</p>

                <h3>Effortless Content Creation for Social Media</h3>
                <p>The magic of our <strong>AI generated shorts</strong> lies in its simplicity. You can use our <strong>AI reel generator from text</strong> to turn a simple idea into a fully realized video in minutes. This makes it an invaluable <strong>Instagram reel generator AI</strong> for social media managers who need to produce a high volume of content. The <strong>free AI reel generator from text</strong> is also a great tool for brainstorming and experimenting with new video concepts.</p>
                
                 <div className="my-8">
                    <div className="mx-auto w-full max-w-[728px] h-[90px] bg-muted/50 border border-dashed rounded-lg flex items-center justify-center">
                        <span className="text-muted-foreground text-sm">Demo Banner Ad (728x90)</span>
                    </div>
                </div>

                <p>Whether you're looking to create a viral dance video or an informative tutorial, our <strong>reels AI generator</strong> is up to the task. It's the <strong>best free AI reel generator</strong> for creating high-quality, engaging content that will captivate your audience. Stop spending hours on video production and start creating amazing content with the power of AI. Try our <strong>AI shorts generator free</strong> tool today and take your social media presence to the next level.</p>
            </div>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <h2 className="font-headline text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
                <AccordionItem 
                    value={`item-${index}`} 
                    key={index}
                    className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl px-6 animate-pop-in"
                    style={{ animationDelay: `${index * 0.1}s`}}
                >
                    <AccordionTrigger className="font-headline text-lg text-left hover:no-underline">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                        {faq.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
