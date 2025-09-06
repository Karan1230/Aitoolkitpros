
import { type Metadata } from 'next';
import { ReelShortsScriptWriterClient } from '@/components/reel-shorts-script-writer-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


export const metadata: Metadata = {
  title: 'Free AI Reel/Shorts Script Writer | Go Viral Instantly',
  description: 'Generate engaging short-form video scripts for TikTok, Instagram Reels, and YouTube Shorts. Get hooks, content ideas, and CTAs in seconds.',
};

const benefits = [
    "Create viral-worthy video scripts in seconds.",
    "Get attention-grabbing hooks for your videos.",
    "Receive structured content ideas with a clear CTA.",
    "Save time brainstorming and writing scripts."
];

const faqs = [
    {
        question: "What is an AI reel/shorts script writer?",
        answer: "An AI reel/shorts script writer is a specialized tool that generates short-form video scripts (typically 15-60 seconds) for platforms like Instagram Reels, YouTube Shorts, and TikTok. It provides a complete script structure, including a powerful hook, main content points, and a call-to-action."
    },
    {
        question: "How can this tool help me go viral?",
        answer: "The AI is trained on the elements of viral video content. It focuses on creating a strong, attention-grabbing hook for the first 3 seconds, which is crucial for retaining viewers. It then provides a concise and engaging content structure designed to maximize watch time and interaction."
    },
    {
        question: "Is this AI script generator for videos free?",
        answer: "Yes, our reel/shorts script writer is completely free to use. You can generate unlimited script ideas for all your short-form video content without any cost."
    },
    {
        question: "Can I use this for my YouTube Shorts and TikTok videos?",
        answer: "Absolutely. The tool is optimized to generate scripts for all major short-form video platforms. You can select your target platform (Instagram Reels, YouTube Shorts, or TikTok) to get scripts that are tailored to its specific audience and style."
    },
    {
        question: "Does the AI provide hashtags and a caption?",
        answer: "Yes, it does. In addition to the script itself, the AI also generates a suggested caption for your post and a list of relevant hashtags to help increase your video's discoverability and reach."
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "AI Reel/Shorts Script Writer",
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Web",
      "description": "A free AI tool to generate engaging short-form video scripts for TikTok, Instagram Reels, and YouTube Shorts, complete with hooks, content ideas, and CTAs.",
      "url": "https://aitoolkitpro.netlify.app/tools/reel-shorts-script-writer",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "195"
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

export default function ReelShortsScriptWriterPage() {
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
                  AI Reel/Shorts Script Writer
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Turn your ideas into engaging, short-form video scripts with our <strong>AI reel/shorts script writer</strong>. Designed to help you go viral on TikTok, Reels, and YouTube Shorts, this <strong>AI script writer</strong> provides catchy hooks and structured content instantly. As the <strong>best AI script writer for reels</strong>, it streamlines your creative process. Use this <strong>free AI script generator</strong> to produce high-quality video scripts that captivate your audience.
                </p>
              </div>

              <div className="mt-8">
                  <ReelShortsScriptWriterClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Enter Your Idea:</strong> Provide a topic or the main idea for your short video.</p>
                      <p><strong>2. Select Platform & Tone:</strong> Choose your platform and the tone of voice for the script.</p>
                      <p><strong>3. Generate:</strong> Click the "Generate Scripts" button to get multiple script variations.</p>
                      <p><strong>4. Copy & Film:</strong> Copy your favorite script and start filming your next viral video!</p>
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
                <h2>Create Viral Content with an AI Reel/Shorts Script Writer</h2>
                <p>In the age of short-form video, creating content that grabs attention in the first few seconds is crucial. An <strong>AI reel/shorts script writer</strong> is a powerful tool that can help you craft viral-worthy scripts for platforms like Instagram Reels, YouTube Shorts, and TikTok. Our platform offers a state-of-the-art <strong>AI script writer</strong> that can generate catchy hooks, engaging content, and effective calls-to-action in minutes. It's the perfect solution for creators who want to produce high-quality content without spending hours on brainstorming and writing. For more creator tips, check out <a href="https://www.tubebuddy.com/blog/" target="_blank" rel="noopener noreferrer">TubeBuddy's blog</a>.</p>
                
                <p>Our tool is designed to be the <strong>best AI script writer for reels</strong> by providing a combination of creativity and strategy. The <strong>AI video script generator free</strong> tool analyzes your topic and suggests scripts that are optimized for maximum engagement. This makes it an invaluable <strong>AI reel script writer</strong> for social media managers and marketers who need to create a high volume of content. The <strong>free AI script generator</strong> is also a great way to experiment with different video formats and find what works best for your audience. For longer scripts, use our full <Link href="/tools/ai-script-writer">AI Script Writer</Link>.</p>
                
                <h3>From Idea to Viral Video in a Few Clicks</h3>
                <p>Using our <strong>AI shorts script generator</strong> is incredibly simple. Just enter your video idea, and the AI will provide you with several script variations to choose from. This makes it an efficient <strong>YouTube shorts script generator</strong> for creators who want to maintain a consistent posting schedule. The <strong>Instagram reel script generator</strong> is perfect for creating content that is both entertaining and informative. Our <strong>TikTok script writer</strong> can help you tap into the latest trends and create videos that have the potential to go viral. You can even generate video content directly with our <Link href="/tools/ltx-ai-video-generator">LTX AI Video Generator</Link>.</p>
                
                <p>Whether you're a seasoned content creator or just starting, our <strong>AI script generator for videos</strong> can help you take your content to the next level. It's a versatile <strong>script generator for youtube video free</strong> tool that can adapt to any niche or style. Stop struggling with writer's block and start creating amazing short-form videos with the power of AI. Try our <strong>best free AI script writer</strong> today and see the difference it can make in your content creation process.</p>
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
