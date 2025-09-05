
import { type Metadata } from 'next';
import { AiLogoMakerClient } from '@/components/ai-logo-maker-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


export const metadata: Metadata = {
  title: 'Free AI Logo Maker | Design Your Brand Logo Instantly',
  description: 'Create a unique, professional logo for your business with our free AI Logo Maker. Generate and download high-quality logos in seconds. No design skills needed.',
};

const benefits = [
    "Get a professional logo without hiring a designer.",
    "Create a unique identity for your brand.",
    "Receive multiple design options instantly.",
    "Download high-quality files for web and print."
];

const faqs = [
    {
        question: "What is an AI logo maker?",
        answer: "An AI logo maker is a tool that uses artificial intelligence to generate unique logo designs based on your input. You provide your company name, industry, style preferences, and color choices, and the AI creates a variety of professional logos for you to choose from."
    },
    {
        question: "Is this AI logo generator free?",
        answer: "Yes, our AI logo maker is 100% free to use. You can generate unlimited logo designs and download your favorite ones in high-quality formats (including transparent backgrounds) without any cost."
    },
    {
        question: "Do I need design skills to use this tool?",
        answer: "Not at all! Our free AI logo maker is designed for everyone, especially entrepreneurs and small business owners who may not have design experience. The process is simple and intuitive—if you can describe your brand, you can create a logo."
    },
    {
        question: "What files do I receive when I download a logo?",
        answer: "When you download a logo, you will receive two high-resolution PNG files: one with a standard solid background and one with a transparent background. The transparent version is perfect for use on websites, marketing materials, and merchandise."
    },
    {
        question: "What makes this the best free AI logo generator?",
        answer: "Our tool stands out because it combines ease of use with professional-quality results. It doesn't just use templates; it generates truly unique logos tailored to your brand. The ability to receive multiple options and download high-resolution transparent files for free makes it the best choice for new and existing brands."
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "AI Logo Maker",
      "applicationCategory": "DesignApplication",
      "operatingSystem": "Web",
      "description": "A free AI tool to create unique, professional logos for businesses. Generate and download high-quality logos in seconds.",
      "url": "https://ai-toolkit-pro.vercel.app/tools/ai-logo-maker",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "320"
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

export default function AiLogoMakerPage() {
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
                  AI Logo Maker
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Describe your brand, and let our <strong>AI logo maker</strong> design the perfect logo for you. It's fast, free, and surprisingly creative, giving you a professional brand identity in seconds. This <strong>free AI logo maker</strong> is the ideal solution for startups, small businesses, and anyone in need of a high-quality logo without the high cost. Our <strong>AI logo generator free</strong> tool allows you to create and download logos instantly, making it the <strong>best free AI logo generator</strong> available online.
                </p>
              </div>
              
              <div className="mt-8">
                  <AiLogoMakerClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card className="bg-card/50">
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Describe Your Brand:</strong> Enter your brand name, slogan, and industry.</p>
                      <p><strong>2. Choose Your Style:</strong> Select a design style and color preferences that match your brand's vibe.</p>
                      <p><strong>3. Generate:</strong> Click the "Generate Logos" button and watch the AI create unique designs.</p>
                      <p><strong>4. Download:</strong> Click on your favorite logo to download both the standard and transparent versions.</p>
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
                <h2>Craft a Professional Brand Identity with an AI Logo Maker</h2>
                <p>A strong logo is the cornerstone of any successful brand. It's the first impression you make and a powerful symbol of your company's identity. But hiring a professional designer can be expensive and time-consuming. That's where an <strong>AI logo maker</strong> comes in. Our platform provides a <strong>free AI logo maker</strong> that empowers you to design a professional logo in minutes. There's no need for design experience; just provide some basic information about your brand, and our AI will do the rest. For branding insights, check out <a href="https://www.brandingmag.com/" target="_blank" rel="noopener noreferrer">Branding Magazine</a>.</p>
                
                <p>Our tool is widely regarded as the <strong>best free AI logo generator</strong> because of its combination of quality, speed, and ease of use. The <strong>AI logo generator free</strong> tool analyzes your input—including your company name, industry, and style preferences—to create a variety of unique and relevant designs. This is not a template-based system; every logo is generated by a creative AI, ensuring your brand stands out from the competition. The entire process is designed to be intuitive, making professional design accessible to everyone. Once you have your logo, generate a catchy tagline with our <Link href="/tools/slogan-generator">Slogan Generator</Link>.</p>
                
                <h3>How to Create Your Perfect Logo with AI</h3>
                <p>Using our <strong>AI logo creator</strong> is a straightforward process. First, you'll enter your brand details. Then, you'll choose a style and color palette that reflects your brand's personality. The <strong>AI logo maker from text</strong> technology will then generate a selection of custom logos for you to choose from. You can experiment with different options until you find the perfect one. Once you've made your choice, you can download high-resolution files, including a version with a transparent background, all for free. You can also create matching <Link href="/tools/custom-icon-generator">custom icons</Link> for a complete brand kit.</p>
                
                <p>Whether you're launching a new startup or rebranding an existing business, our <strong>AI business logo generator</strong> is the perfect solution. It's a powerful <strong>company logo maker</strong> that delivers professional results without the professional price tag. Our commitment is to provide the <strong>best AI logo maker free</strong> of charge, helping entrepreneurs and creators build strong, memorable brands. Stop settling for generic designs and create a logo that truly represents your vision with our <strong>free logo maker AI</strong>. Your brand's new look is just a few clicks away.</p>
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
