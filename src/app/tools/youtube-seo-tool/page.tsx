
import { type Metadata } from 'next';
import { YoutubeSeoToolClient } from '@/components/youtube-seo-tool-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


export const metadata: Metadata = {
  title: 'Free AI YouTube SEO Tool | Boost Your Video Rankings',
  description: 'Analyze your YouTube videos, channels, and keywords with our free AI SEO tool. Get optimized titles, descriptions, tags, and an SEO score to rank higher.',
};

const benefits = [
    "Increase video visibility and reach.",
    "Get a data-driven SEO score for your content.",
    "Find high-ranking keywords from competitors.",
    "Optimize titles, descriptions, and tags instantly."
];

const faqs = [
    {
        question: "What is an AI YouTube SEO tool?",
        answer: "An AI YouTube SEO tool is a platform that uses artificial intelligence to analyze your YouTube content and provide data-driven recommendations to improve its ranking in search results. It can analyze videos, channels, or keywords to give you an SEO score and suggest optimized titles, descriptions, and tags."
    },
    {
        question: "How does the YouTube keyword tool work?",
        answer: "Our YouTube keyword tool analyzes top-ranking videos for a given keyword to identify the most frequently used and effective keywords. This allows you to understand what terms are helping your competitors rank, so you can incorporate them into your own strategy."
    },
    {
        question: "Is this YouTube SEO tool free?",
        answer: "Yes, our comprehensive YouTube SEO tool is completely free to use. We believe every creator should have access to the tools they need to grow their channel, which is why we offer this as the best free YouTube SEO tool available."
    },
    {
        question: "What does the SEO Score mean?",
        answer: "The SEO Score is a metric from 0 to 100 that estimates the overall SEO health of a video based on factors like title length, description quality, tag relevance, and comparison to competitor data. A higher score indicates that the video is well-optimized for YouTube's search algorithm."
    },
    {
        question: "Why do I need a YouTube tag generator?",
        answer: "Tags are a crucial part of YouTube SEO. They help YouTube's algorithm understand what your video is about and who to show it to. A good YouTube tag generator provides relevant keywords that can help your video appear in more search results and suggested video feeds, ultimately driving more views."
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "AI YouTube SEO Tool",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "description": "A free AI SEO tool to analyze YouTube videos, channels, and keywords, providing optimized titles, descriptions, tags, and an SEO score to rank higher.",
      "url": "https://www.aitoolkitpro.com/tools/youtube-seo-tool",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "310"
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

export default function YoutubeSeoToolPage() {
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
                  AI YouTube SEO Tool
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Get everything you need to rank higher on YouTube with our <strong>AI YouTube SEO tool</strong>. Analyze videos, channels, or keywords to get an instant SEO score and AI-powered recommendations. This <strong>free YouTube SEO tool</strong> is the <strong>best YouTube SEO tool</strong> for creators looking to grow their audience. Use our <strong>YouTube keyword tool</strong> to find high-ranking keywords and optimize your content for maximum visibility.
                </p>
              </div>

              <div className="mt-8">
                  <YoutubeSeoToolClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card className="bg-card/50">
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Choose Analysis Type:</strong> Select whether you want to analyze a video, channel, or keyword.</p>
                      <p><strong>2. Enter Input:</strong> Paste a YouTube URL or type a keyword.</p>
                      <p><strong>3. Generate Report:</strong> Click "Analyze" to get your comprehensive SEO report.</p>
                      <p><strong>4. Apply Suggestions:</strong> Copy the optimized title, description, and tags to improve your video's performance.</p>
                  </CardContent>
              </Card>

               <Card className="bg-card/50">
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
                <h2>Optimize Your Videos with an AI YouTube SEO Tool</h2>
                <p>YouTube is the second largest search engine in the world, making SEO a critical component of any successful channel. An <strong>AI YouTube SEO tool</strong> is a powerful asset that can help you optimize your videos for maximum visibility and reach. Our platform offers a comprehensive <strong>free YouTube SEO tool</strong> that provides you with everything you need to improve your rankings, from keyword analysis to title and description optimization. For more on YouTube SEO, check out <a href="https://backlinko.com/how-to-rank-youtube-videos" target="_blank" rel="noopener noreferrer">Backlinko's guide</a>.</p>
                <p>Our tool is designed to be the <strong>best YouTube SEO tool</strong> by offering a suite of features that are both powerful and easy to use. The <strong>YouTube keyword tool</strong> helps you find high-ranking keywords that your target audience is searching for. The <strong>YouTube tag generator</strong> provides you with a list of relevant tags to help your videos get discovered. With our <strong>YouTube SEO tool free</strong> of charge, you can take your channel to the next level without breaking the bank. You can also generate great thumbnails with our <Link href="/tools/youtube-thumbnail-generator">YouTube Thumbnail Generator</Link>.</p>

                <h3>From Analysis to Optimization in Minutes</h3>
                <p>The <strong>AI YouTube title generator</strong> can help you craft compelling titles that grab attention and entice viewers to click. The <strong>YouTube description generator</strong> creates keyword-rich descriptions that help YouTube's algorithm understand what your video is about. Our <strong>YouTube tag extractor</strong> allows you to see the tags that your competitors are using, giving you a competitive edge. This makes our tool the <strong>best free YouTube tag generator</strong> on the market. Once you have your SEO strategy, write the perfect script with our <Link href="/tools/ai-script-writer">AI Script Writer</Link>.</p>
                <p>Whether you're a seasoned YouTuber or just starting, our <strong>YouTube keyword research tool</strong> can help you grow your audience. It's a versatile <strong>YouTube SEO software</strong> that can be used to optimize individual videos or your entire channel. Stop guessing what works and start using a data-driven approach to YouTube SEO. Try our <strong>best YouTube keyword tool</strong> today and see the difference it can make in your video performance.</p>
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
