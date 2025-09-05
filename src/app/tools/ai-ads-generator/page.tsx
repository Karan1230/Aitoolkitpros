
import { type Metadata } from 'next';
import { AiAdsGeneratorClient } from '@/components/ai-ads-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


export const metadata: Metadata = {
  title: 'Free AI Video Ad Generator | Create Ads Instantly',
  description: 'Generate professional video ads for your products in minutes. Create content for Shorts, Reels, TikTok, Facebook, and YouTube with our free AI tool.',
};

const benefits = [
    "Create professional video ads in minutes.",
    "No video editing skills required.",
    "Generate content for all major social platforms.",
    "Perfect for e-commerce, marketing, and dropshipping."
];

const faqs = [
    {
        question: "What is an AI ads generator?",
        answer: "An AI ads generator is a tool that automatically creates video advertisements from minimal input, such as a product name or description. It uses artificial intelligence to generate scripts, select visuals, add voiceovers, and produce a finished video ad, saving significant time and resources."
    },
    {
        question: "How long does it take to create a video with the AI ad creator?",
        answer: "Our AI ads generator is designed for speed and efficiency. On average, it takes just 2 to 4 minutes to generate a complete, professional-quality video ad. This allows you to produce content for your campaigns very quickly."
    },
    {
        question: "Can I use this AI video ad generator for dropshipping products?",
        answer: "Yes, absolutely. This tool is perfect for creating dropshipping video ads. You can quickly generate unique and engaging video content for your products without needing to order them yourself, which is ideal for testing new items and scaling your business."
    },
    {
        question: "Is this really a free AI ad generator?",
        answer: "Yes, our AI ad generator is completely free to use. We aim to provide powerful marketing tools to everyone, from small business owners to large marketing teams, without the high cost typically associated with video production."
    },
    {
        question: "What platforms can I use these AI-generated video ads on?",
        answer: "The videos generated are optimized for all major social media platforms. You can use it as a TikTok ad generator, a Facebook video ad generator, or for Instagram Reels and YouTube Shorts. The tool can create videos in various aspect ratios to fit each platform's requirements."
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "AI Ads Generator",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Web",
      "description": "A free AI tool to generate professional video ads for products in minutes, suitable for various social media platforms.",
      "url": "https://ai-toolkit-pro.vercel.app/tools/ai-ads-generator",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.7",
        "reviewCount": "135"
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

export default function AiAdsGeneratorPage() {
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
                  AI Ads Generator
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Create high-quality video ads based on your product name. Our <strong>AI ads generator</strong> can generate stunning content for Shorts, Reels, TikTok, Facebook, and YouTube in minutes. This powerful <strong>AI video ad generator</strong> helps you produce professional-looking advertisements without needing any video editing skills. Simply enter your product name, and our <strong>free AI ad generator</strong> will handle the rest, delivering engaging videos that are ready to be shared across all your social media platforms.
                </p>
              </div>

              <div className="mt-8">
                  <AiAdsGeneratorClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Enter Product Name:</strong> Provide the name of the product you want to advertise.</p>
                      <p><strong>2. Select Dimension:</strong> Choose the video format you need (e.g., Shorts, Square).</p>
                      <p><strong>3. Generate:</strong> Click the "Generate Ad" button and wait for the AI (2-4 minutes).</p>
                      <p><strong>4. Download:</strong> Once generated, you can download your video ad.</p>
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
                  <h2>Revolutionize Your Marketing with an AI Ads Generator</h2>
                  <p>In the fast-paced world of digital marketing, video content is king. However, creating high-quality video ads can be time-consuming and expensive. That's where our <strong>AI ads generator</strong> comes in. This cutting-edge tool allows you to create professional video advertisements in just a few minutes, all for free. The <strong>free AI video ad generator</strong> is perfect for small businesses, dropshippers, and marketers who want to create engaging content without breaking the bank. For compelling ad copy to go with your video, try our <Link href="/tools/ad-copy-generator">AI Ad Copy Generator</Link>.</p>
                  
                  <p>Our platform is more than just a simple video maker; it's a comprehensive <strong>AI ad creator</strong> designed to optimize your content for various social media platforms. Whether you need a <strong>TikTok ad generator</strong>, a <strong>Facebook video ad generator</strong>, or a tool to create YouTube Shorts, our system has you covered. The <strong>AI YouTube ad generator</strong> feature ensures your ads meet the specific requirements and best practices for the world's largest video platform, as detailed in <a href="https://support.google.com/google-ads/answer/2375424?hl=en" target="_blank" rel="noopener noreferrer">Google's own ad specifications</a>, helping you reach a wider audience and maximize your impact. Learn more about our mission on our <Link href="/about">About Us</Link> page.</p>
                  
                  <h3>Create Ads for Any Platform Instantly</h3>
                  <p>The versatility of our <strong>AI ad generator free</strong> tool is one of its greatest strengths. It functions as an effective <strong>Instagram ad generator</strong> and <strong>Facebook ad generator</strong>, producing visually appealing content that stops the scroll. For e-commerce businesses, the <strong>AI product ad video generator</strong> is a game-changer. Simply input your product name, and the AI will create a dynamic video that highlights its key features and benefits, driving traffic and sales to your store. This is especially useful for creating <strong>dropshipping video ads</strong> that look polished and professional. You can even generate a unique brand identity with our <Link href="/tools/ai-logo-maker">AI Logo Maker</Link>.</p>
                  
                  <p>Stop spending hours on complicated video editing software. With our <strong>AI video ad generator free</strong> tool, you can produce stunning advertisements with just a few clicks. It's the <strong>best free AI video ad generator</strong> on the market, offering a seamless experience from start to finish. Embrace the future of advertising and let our <strong>AI generate video ad</strong> content that captivates your audience and grows your business. Try the <strong>free AI ads generator</strong> today and see the difference for yourself.</p>
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
