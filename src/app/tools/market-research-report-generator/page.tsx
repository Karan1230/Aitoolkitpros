import { type Metadata } from 'next';
import { MarketResearchReportGeneratorClient } from '@/components/market-research-report-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Free AI Market Research Report Generator',
  description: 'Generate detailed market research reports on any industry, product, or region. Get analysis on market size, trends, competitors, and more.',
};

const benefits = [
    "Get a comprehensive market overview in minutes.",
    "Understand your target audience and competitors.",
    "Identify key opportunities and challenges.",
    "Make data-driven business decisions."
];

const faqs = [
    {
        question: "What is an AI Market Research Report Generator?",
        answer: "It's a tool that uses AI to create a structured market research report. You provide the industry, target market, and region, and the AI generates a detailed analysis covering market size, trends, competitors, SWOT analysis, and more."
    },
    {
        question: "How accurate is the data in the report?",
        answer: "The AI synthesizes information from its vast training data to provide plausible estimates and identify common trends and key players. While it's a powerful tool for initial research and strategy, it should not be used as a substitute for in-depth, real-time statistical data for financial decisions."
    },
    {
        question: "Is this market analysis tool free?",
        answer: "Yes, our AI Market Research Report Generator is completely free to use. It's designed to help startups, students, and businesses get a quick and comprehensive understanding of a market without the high cost of traditional research."
    },
    {
        question: "Can I choose how detailed the report is?",
        answer: "Yes. The tool allows you to choose between a 'Detailed' report, which provides in-depth analysis across all sections, and a 'Summary' report, which gives a high-level overview of the key findings."
    },
    {
        question: "What can I use these reports for?",
        answer: "These reports are perfect for business planning, developing marketing strategies, preparing for investor pitches, understanding a new market before entry, or for academic projects and case studies."
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "AI Market Research Report Generator",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "description": "A free AI tool to generate detailed market research reports on any industry, product, or region.",
      "url": "https://ai-toolkit-pro.vercel.app/tools/market-research-report-generator",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "95"
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

export default function MarketResearchReportGeneratorPage() {
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
                  Market Research Report Generator
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Quickly generate a comprehensive <strong>market research report</strong> for any industry. Our <strong>AI market analysis tool</strong> provides detailed insights into market size, trends, competition, and more, helping you make informed decisions.
                </p>
              </div>

              <div className="mt-8">
                  <MarketResearchReportGeneratorClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card className="bg-card/50">
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm md:text-base">
                      <p><strong>1. Define Scope:</strong> Enter the Industry/Product, Target Market, and Region.</p>
                      <p><strong>2. Select Style:</strong> Choose between a Detailed or Summary report.</p>
                      <p><strong>3. Generate:</strong> Click "Generate Report" to get your AI-powered analysis.</p>
                      <p><strong>4. Review & Use:</strong> Copy or download the structured report for your business plan or strategy.</p>
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
