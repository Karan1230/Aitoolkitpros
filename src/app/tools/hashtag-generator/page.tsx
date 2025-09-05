
import { type Metadata } from 'next';
import { HashtagGeneratorClient } from '@/components/hashtag-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


export const metadata: Metadata = {
  title: 'Free AI Hashtag Generator | Boost Your Social Media Reach',
  description: 'Generate relevant, trending, and niche-specific hashtags for Instagram, TikTok, YouTube, and more with our free AI Hashtag Generator.',
};

const benefits = [
    "Increase the visibility and reach of your posts.",
    "Attract your target audience more effectively.",
    "Save time on hashtag research.",
    "Discover trending and niche hashtags in your industry."
];

const faqs = [
    {
        question: "What is an AI hashtag generator?",
        answer: "An AI hashtag generator is a tool that uses artificial intelligence to find the most relevant and effective hashtags for your social media posts. You provide a topic or keyword, and the AI generates a list of hashtags optimized to increase your content's visibility and reach."
    },
    {
        question: "How does the hashtag generator AI work?",
        answer: "The AI analyzes your topic and cross-references it with current trends and data from social media platforms. It identifies a mix of popular, niche, and related hashtags to create a balanced list that can help your post get discovered by a broader, yet relevant, audience."
    },
    {
        question: "Is this a free hashtag generator for Instagram?",
        answer: "Yes, our tool is a completely free hashtag generator that works perfectly for Instagram, as well as other platforms like TikTok, YouTube, and Twitter/X. You can generate unlimited hashtag lists without any cost."
    },
    {
        question: "Why is it important to use a mix of popular and niche hashtags?",
        answer: "Popular hashtags have high search volume but are also very competitive. Niche hashtags have lower volume but connect you with a more targeted and engaged audience. The best hashtag strategy, which our tool provides, uses a mix of both to maximize both broad reach and community engagement."
    },
    {
        question: "What makes this the best hashtag generator?",
        answer: "Our tool is considered the best hashtag generator because it offers platform-specific optimization, different style options (popular, niche, or mixed), and generates a comprehensive list of relevant hashtags in seconds. It saves you hours of manual research and helps you implement a data-driven hashtag strategy for free."
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "AI Hashtag Generator",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "description": "A free AI tool to generate relevant, trending, and niche-specific hashtags for Instagram, TikTok, YouTube, and more.",
      "url": "https://www.aitoolkitpro.com/tools/hashtag-generator",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "190"
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

export default function HashtagGeneratorPage() {
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
                  AI Hashtag Generator
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Enter a topic and let our <strong>AI hashtag generator</strong> find the perfect hashtags to boost your social media presence. This <strong>free hashtag generator</strong> works for platforms like Instagram, TikTok, and more. As the <strong>best hashtag generator</strong>, it provides relevant and trending options to increase your reach. Use this <strong>Instagram hashtag generator</strong> to connect with a larger audience and enhance your content's visibility.
                </p>
              </div>

              <div className="my-8">
                <div className="mx-auto w-full max-w-[728px] h-[90px] bg-muted/50 border border-dashed rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Demo Banner Ad (728x90)</span>
                </div>
              </div>

              <div className="mt-8">
                  <HashtagGeneratorClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Enter Your Topic:</strong> Provide a keyword, niche, or a short description of your post.</p>
                      <p><strong>2. Select Platform:</strong> Choose the social media platform you're posting on.</p>
                      <p><strong>3. Choose Style:</strong> Select the type of hashtags you need.</p>
                      <p><strong>4. Generate:</strong> Click the "Generate Hashtags" button to get a list of optimized hashtags.</p>
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
                <h2>Boost Your Reach with an AI Hashtag Generator</h2>
                <p>Hashtags are a vital component of any successful social media strategy. They help categorize your content and make it discoverable to a wider audience. An <strong>AI hashtag generator</strong> is a powerful tool that simplifies the process of finding the right hashtags for your posts. Our platform offers a <strong>free hashtag generator</strong> that can provide you with a list of relevant, trending, and niche-specific hashtags in seconds. It's the perfect tool for marketers, influencers, and anyone who wants to grow their social media presence. For more on hashtag strategy, check out <a href="https://later.com/blog/ultimate-guide-to-using-instagram-hashtags/" target="_blank" rel="noopener noreferrer">Later's blog</a>.</p>
                
                <div className="my-8">
                    <div className="mx-auto w-full max-w-[728px] h-[90px] bg-muted/50 border border-dashed rounded-lg flex items-center justify-center">
                        <span className="text-muted-foreground text-sm">Demo Banner Ad (728x90)</span>
                    </div>
                </div>

                <p>Our tool is designed to be the <strong>best hashtag generator</strong> by offering a combination of accuracy and ease of use. The <strong>hashtag generator AI</strong> analyzes your topic and suggests hashtags that are most likely to increase your reach and engagement. This makes it an invaluable <strong>Instagram hashtag generator</strong> for creating posts that connect with your target audience. The <strong>free hashtag generator for Instagram</strong> is also a great way to discover new trends and stay ahead of the competition. Pair your hashtags with great content using our <Link href="/tools/social-media-post-generator">Social Media Post Generator</Link>.</p>

                <h3>Find the Perfect Hashtags for Any Platform</h3>
                <p>The versatility of our <strong>hashtag suggestion tool</strong> is one of its key strengths. It can be used as a <strong>TikTok hashtag generator</strong> to help your videos go viral, or as a <strong>YouTube hashtag generator</strong> to improve the discoverability of your content. The <strong>hashtag finder</strong> is designed to work across all major social media platforms, so you can maintain a consistent and effective hashtag strategy. Our <strong>free hashtag generator tool</strong> is a must-have for any serious content creator. You can also generate <Link href="/tools/ad-copy-generator">ad copy</Link> to go along with your posts.</p>
                
                <div className="my-8">
                    <div className="mx-auto w-full max-w-[728px] h-[90px] bg-muted/50 border border-dashed rounded-lg flex items-center justify-center">
                        <span className="text-muted-foreground text-sm">Demo Banner Ad (728x90)</span>
                    </div>
                </div>
                
                <p>Using our <strong>hashtag creator</strong> is simple. Just enter your topic, and the AI will do the rest. The <strong>AI hashtag generator free</strong> tool will provide you with a list of hashtags that you can copy and paste directly into your posts. Stop guessing which hashtags to use and start using a data-driven approach. Try our <strong>best free hashtag generator</strong> today and see the difference it can make in your social media performance.</p>
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
