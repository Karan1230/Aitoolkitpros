
import { type Metadata } from 'next';
import { HumanizerClient } from '@/components/humanizer-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Free AI Text Humanizer | Make AI Text Sound Human',
  description: 'Convert robotic-sounding AI text into natural, engaging, human-like content. Our free AI humanizer adds warmth and personality to your writing.',
};

const benefits = [
    "Make your content more relatable and trustworthy.",
    "Improve readability and engagement.",
    "Remove the robotic, generic feel of AI text.",
    "Add personality and a natural flow to your writing."
];

const faqs = [
    {
        question: "What is an AI text humanizer?",
        answer: "An AI text humanizer is a tool that rewrites AI-generated text to make it sound more like it was written by a person. It focuses on improving the tone, flow, and personality of the content to make it more engaging and less robotic."
    },
    {
        question: "Why should I humanize AI-generated text?",
        answer: "While AI is great at generating content quickly, it can often sound generic or lack personality. Humanizing the text makes it more relatable to your audience, can improve SEO by providing more unique content, and builds more trust with your readers."
    },
    {
        question: "Is this AI humanizer free to use?",
        answer: "Yes, our AI text humanizer is completely free. You can process your text to add a human touch without any cost or subscription."
    },
    {
        question: "Will the humanized text be plagiarism-free?",
        answer: "The tool rewrites the original text to be more natural, which results in a new version of the content. While it significantly alters the structure and tone, we always recommend running any content through a plagiarism checker if originality is a primary concern."
    },
    {
        question: "Can I use this tool for languages other than English?",
        answer: "Yes. Our tool is multilingual. You can paste your text and select the corresponding language to get a humanized version in that language, preserving cultural and linguistic nuances."
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "AI Text Humanizer",
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Web",
      "description": "A free AI tool to convert robotic-sounding AI text into natural, engaging, human-like content.",
      "url": "https://ai-toolkit-pro.vercel.app/tools/humanizer",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "120"
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

export default function HumanizerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-3">
              <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                  AI Text Humanizer
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Transform robotic AI-generated text into content that sounds like it was written by a human. Our <strong>AI text humanizer</strong> adds warmth, nuance, and a natural flow to your articles, emails, and social media posts. With this <strong>free AI humanizer</strong>, you can make your content more engaging and authentic.
                </p>
              </div>

              <div className="mt-8">
                  <HumanizerClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card className="bg-card/50">
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm md:text-base">
                      <p><strong>1. Paste Your Text:</strong> Enter the AI-generated text you want to humanize.</p>
                      <p><strong>2. Select Language:</strong> Choose the language of your text.</p>
                      <p><strong>3. Humanize:</strong> Click the "Humanize Text" button to get the rewritten version.</p>
                      <p><strong>4. Copy & Use:</strong> Copy the improved text and use it wherever you need it.</p>
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
                              <span className="text-sm md:text-base">{benefit}</span>
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
                <h2>Why Humanize AI-Generated Text?</h2>
                <p>AI content generation is a powerful tool, but it often lacks the subtle touches that make writing feel authentic. An <strong>AI text humanizer</strong> bridges that gap. It takes machine-generated text and refines it, adding a conversational tone and natural sentence structures. This process is crucial for blogs, marketing copy, and any content where connecting with a human audience is key. For more on creating authentic content, explore resources from the <a href="https://contentmarketinginstitute.com/" target="_blank" rel="noopener noreferrer">Content Marketing Institute</a>.</p>
                
                <h3>From Robotic to Relatable</h3>
                <p>Our <strong>free AI humanizer</strong> works by analyzing the input text and rewriting it to eliminate common AI tells, such as repetitive phrasing and overly formal language. The goal is to make the text sound like it came from a person, not a machine. This can significantly improve reader engagement and make your content more persuasive and trustworthy. You can first generate content with our <Link href="/tools/social-media-post-generator">Social Media Post Generator</Link> and then humanize it here.</p>
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
