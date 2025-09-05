
import { type Metadata } from 'next';
import { SloganGeneratorClient } from '@/components/slogan-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


export const metadata: Metadata = {
  title: 'Free AI Slogan & Tagline Generator | Create Catchy Taglines',
  description: 'Generate memorable slogans and taglines for your brand with our free AI tool. Create catchy, professional, or funny taglines in any language.',
};

const benefits = [
    "Create a memorable brand identity instantly.",
    "Generate dozens of creative options in seconds.",
    "Craft the perfect tagline for marketing campaigns.",
    "Define your brand's message with clarity."
];

const faqs = [
    {
        question: "What is an AI slogan generator?",
        answer: "An AI slogan generator is a tool that uses artificial intelligence to create short, catchy, and memorable taglines for a business, product, or campaign. You provide information about your brand, and the AI generates a list of creative slogans for you to use."
    },
    {
        question: "How does the tagline generator create slogans?",
        answer: "Our slogan maker analyzes your brand name, industry, key message, and desired tone. It then uses its understanding of language, marketing, and branding to generate slogans that are not only catchy but also aligned with your brand's identity."
    },
    {
        question: "Is this slogan creator free to use?",
        answer: "Yes, our AI slogan generator is completely free. You can generate unlimited slogans for your business or projects without any cost, making it the best slogan generator for startups and small businesses."
    },
    {
        question: "What is an 'SEO-Friendly' slogan?",
        answer: "An SEO-friendly slogan is one that incorporates relevant keywords that your target audience might use when searching for products or services like yours. By enabling this option, our business slogan generator will try to include these keywords naturally, which can help improve your online visibility."
    },
    {
        question: "Can I use the generated slogan for my company?",
        answer: "Absolutely. The slogans generated are for you to use as you see fit. They are a great starting point for your branding efforts and can be used on your website, in advertising campaigns, and on your marketing materials."
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "AI Slogan & Tagline Generator",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "description": "A free AI tool to generate memorable slogans and taglines for your brand. Create catchy, professional, or funny taglines in any language.",
      "url": "https://ai-toolkit-pro.vercel.app/tools/slogan-generator",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.7",
        "reviewCount": "155"
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

export default function SloganGeneratorPage() {
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
                  AI Slogan/Tagline Generator
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Describe your brand and let our <strong>AI slogan generator</strong> create short, memorable slogans that capture your message. This <strong>free slogan generator</strong> is perfect for branding and marketing campaigns. As the <strong>best slogan generator</strong>, it provides creative and catchy options. Use our <strong>tagline generator</strong> to find the perfect phrase to represent your business. This <strong>AI tagline generator</strong> helps you craft a powerful brand identity effortlessly.
                </p>
              </div>

              <div className="mt-8">
                  <SloganGeneratorClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Enter Brand Details:</strong> Fill in your brand name, industry, product details, and key message.</p>
                      <p><strong>2. Choose Tone & Language:</strong> Select the tone that fits your brand and your desired language.</p>
                      <p><strong>3. Generate:</strong> Click the "Generate Slogans" button to get a list of creative taglines.</p>
                      <p><strong>4. Copy & Download:</strong> Use the buttons to copy your favorite slogans or download the entire list.</p>
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
                <h2>Craft the Perfect Tagline with an AI Slogan Generator</h2>
                <p>A great slogan can make your brand unforgettable. An <strong>AI slogan generator</strong> is a powerful tool that can help you create a catchy and memorable tagline for your business. Our platform offers a sophisticated <strong>slogan maker</strong> that can generate a wide variety of slogans based on your brand's identity and key message. It's the perfect solution for startups, small businesses, and anyone who wants to create a strong brand presence. For more on branding, check out <a href="https://www.entrepreneur.com/topic/branding" target="_blank" rel="noopener noreferrer">Entrepreneur's branding resources</a>.</p>
                
                <p>Our tool is designed to be the <strong>best slogan generator</strong> by providing creative and relevant suggestions. The <strong>free slogan generator</strong> is easy to use; simply enter your brand details, and the AI will do the rest. This makes it an invaluable <strong>business slogan generator</strong> for entrepreneurs who want to create a professional brand identity without the high cost of a marketing agency. The <strong>slogan creator</strong> is also a great tool for brainstorming and exploring different marketing angles. Once you have a slogan, you can create a <Link href="/tools/ai-logo-maker">logo</Link> to match.</p>
                
                <h3>From Brand Name to Catchy Slogan in Seconds</h3>
                <p>The <strong>AI tagline generator</strong> can create slogans in a variety of styles, from professional and serious to fun and playful. This makes it a versatile <strong>company slogan generator</strong> that can be used for any type of business. The <strong>catchy slogan generator</strong> is perfect for creating taglines that will stick in your customers' minds. Our <strong>free slogan maker</strong> is a must-have for any marketer who wants to create a strong and memorable brand. You can also generate <Link href="/tools/ad-copy-generator">ad copy</Link> to use with your new slogan.</p>
                
                <p>Whether you need a new slogan for your website, a tagline for a marketing campaign, or a motto for your company, our <strong>slogan generator from keywords</strong> can help you achieve your goals. It's a powerful <strong>business name and slogan generator</strong> that can help you create a cohesive brand identity. Stop struggling to come up with the perfect slogan and start using the power of AI to create a tagline that truly represents your brand. Try our <strong>slogan generator free online</strong> today and see the difference it can make.</p>
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
