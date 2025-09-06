
import { type Metadata } from 'next';
import { PersonalFinanceAssistantClient } from '@/components/personal-finance-assistant-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Free AI Personal Finance Assistant | Budgeting & Expense Tracking',
  description: 'Your free AI-powered assistant for managing personal finances. Get help with budgeting, creating savings plans, and analyzing your expenses.',
};

const benefits = [
    "Create a personalized monthly budget in seconds.",
    "Get smart savings suggestions to reach your goals.",
    "Analyze your spending habits with AI-powered insights.",
    "Ask any finance-related question and get clear answers."
];

const faqs = [
    {
        question: "What is an AI Personal Finance Assistant?",
        answer: "An AI Personal Finance Assistant is a tool that uses artificial intelligence to help you manage your money. It can answer your financial questions, help you create a budget, suggest ways to save, and analyze your spending patterns to provide insights."
    },
    {
        question: "Is my financial data safe?",
        answer: "Yes, your privacy is our priority. This tool is designed to be stateless, meaning we do not save or store any of the financial information you provide. Each session is private and your data is cleared after you leave."
    },
    {
        question: "How do I create a budget with this tool?",
        answer: "Simply ask the assistant to help you create a budget. You can provide your monthly income and a list of your typical expenses. The AI will then generate a personalized budget plan for you, often using popular methods like the 50/30/20 rule."
    },
    {
        question: "Can the AI help me track my expenses?",
        answer: "While the tool doesn't connect to your bank accounts to track expenses automatically, you can paste a list of your recent transactions or spending, and the AI will categorize them for you. It can then analyze this data to show you where your money is going."
    },
    {
        question: "Is the financial advice reliable?",
        answer: "The AI provides information and suggestions based on common financial principles. However, it is not a certified financial advisor, and its advice should be considered as educational and for informational purposes only. Always consult with a qualified professional for major financial decisions."
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "AI Personal Finance Assistant",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "description": "A free AI-powered assistant for managing personal finances, including budgeting, savings plans, and expense analysis.",
      "url": "https://aitoolkitpro.netlify.app/tools/personal-finance-assistant",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.7",
        "reviewCount": "80"
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

export default function PersonalFinanceAssistantPage() {
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
                  AI Personal Finance Assistant
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Take control of your financial future with our <strong>AI Personal Finance Assistant</strong>. Get personalized advice on <strong>budgeting</strong>, create effective <strong>savings plans</strong>, and gain insights from our smart <strong>expense tracker</strong>. This free tool is your go-to resource for making informed financial decisions.
                </p>
              </div>

              <div className="mt-8">
                  <PersonalFinanceAssistantClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card className="bg-card/50">
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm md:text-base">
                      <p><strong>1. Ask a Question:</strong> Start by asking any finance-related question, like "How can I save more money?" or "Create a budget for a $5000 monthly income."</p>
                      <p><strong>2. Provide Details:</strong> For personalized advice, provide details like your income, expenses, and financial goals.</p>
                      <p><strong>3. Analyze Expenses:</strong> Paste a list of your expenses, and the AI will categorize them and provide a spending breakdown.</p>
                      <p><strong>4. Iterate:</strong> Continue the conversation to refine your budget or explore different savings strategies.</p>
                  </CardContent>
              </Card>

               <Card className="bg-card/50">
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">Features</CardTitle>
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
