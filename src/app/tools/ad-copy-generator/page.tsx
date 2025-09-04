
import { type Metadata } from 'next';
import { AdCopyGeneratorClient } from '@/components/ad-copy-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Free AI Ad Copy Generator | Create High-Converting Ads',
  description: 'Generate effective ad copy for Google, Facebook, Instagram, and more with our free AI tool. Create headlines, body text, and CTAs in seconds.',
};

const benefits = [
    "Create high-converting ad copy in seconds.",
    "Optimize your ads for different platforms.",
    "A/B test multiple variations to find the winner.",
    "Save time and money on copywriting."
];

const faqs = [
    {
        question: "What is an AI ad copy generator?",
        answer: "An AI ad copy generator is a tool that uses artificial intelligence to create persuasive and effective advertising text for various platforms like Google, Facebook, and Instagram. It helps marketers quickly generate multiple versions of headlines, body text, and calls-to-action, saving time and improving campaign performance."
    },
    {
        question: "How can this free ad copy generator improve my ROI?",
        answer: "Our tool improves your Return on Investment (ROI) by allowing you to rapidly A/B test numerous ad copy variations. By identifying the most effective messaging faster, you can optimize your campaigns for higher conversion rates and lower customer acquisition costs, all without spending money on professional copywriters."
    },
    {
        question: "Is the generated ad copy unique and plagiarism-free?",
        answer: "Yes, the AI generates unique ad copy based on your specific inputs, including product details, target audience, and key points. The content is original and tailored to your campaign, ensuring it is distinct from other ads."
    },
    {
        question: "Can I use this tool to generate ads for any platform?",
        answer: "Absolutely. Our ad-copy-generator is designed to create optimized content for a wide range of platforms, including Google Ads, Facebook Ads, Instagram Ads, and LinkedIn. Simply select your desired platform, and the AI will tailor the format and style accordingly."
    },
    {
        question: "Do I need any marketing experience to use this ad copy generator?",
        answer: "No, you don't need any prior marketing experience. The tool is designed to be user-friendly and intuitive. Just provide the necessary information about your product and audience, and the AI will guide you by generating professional-quality ad copy."
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "AI Ad Copy Generator",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "description": "A free AI tool to generate effective ad copy for Google, Facebook, Instagram, and more. Create headlines, body text, and CTAs in seconds.",
      "url": "https://www.aitoolkitpro.com/tools/ad-copy-generator",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "150"
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

export default function AdCopyGeneratorPage() {
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
                  AI Ad Copy Generator
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Our free <strong>ad-copy-generator</strong> is your ultimate solution for creating compelling and high-converting ad copy. Whether you need an <strong>AI ad copy generator</strong> for Google Ads, Facebook, Instagram, or LinkedIn, our tool is designed to meet your needs. By leveraging advanced artificial intelligence, this tool helps you craft persuasive headlines, engaging body text, and powerful calls-to-action in just seconds. It is the perfect assistant for marketers, business owners, and content creators looking to enhance their advertising campaigns without the high cost of a professional copywriter.
                </p>
              </div>

              <div className="mt-8">
                  <AdCopyGeneratorClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card className="bg-card/50">
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm md:text-base">
                      <p><strong>1. Enter Details:</strong> Provide product info, your target audience, and key selling points.</p>
                      <p><strong>2. Select Platform & Tone:</strong> Choose the ad platform and the tone of voice for your copy.</p>
                      <p><strong>3. Generate:</strong> Click the "Generate Ad Copy" button to get multiple ad variations.</p>
                      <p><strong>4. Copy & Use:</strong> Copy your favorite ad variation and use it in your campaign.</p>
                  </CardContent>
              </Card>

              {/* Ad Placeholder */}
              <div className="mx-auto w-full max-w-[300px] h-[250px] bg-muted/50 border border-dashed rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Demo Ad (300x250)</span>
              </div>

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
                <h2>Unlock High-Converting Ads with an AI Ad Copy Generator</h2>
                <p>In today's competitive digital landscape, crafting ad copy that not only grabs attention but also converts is more critical than ever. This is where an <strong>AI ad copy generator</strong> becomes an invaluable asset for any marketer. Our tool is designed to be the <strong>best ad copy generator</strong> available for free, providing you with everything you need to launch a successful campaign. Whether you're a seasoned professional or just starting, our platform simplifies the creative process, allowing you to focus on strategy while the AI handles the writing. For a great campaign, you also need a powerful brand identity, which you can create with our <Link href="/tools/ai-logo-maker">AI Logo Maker</Link>.</p>
                <p>One of the biggest challenges in advertising is creating platform-specific content. An effective Google ad is vastly different from a compelling Instagram post. Our <strong>free ad copy generator</strong> takes this into account, optimizing the text for your chosen platform. Are you running a campaign on Facebook? The <strong>Facebook ad copy generator</strong> will produce longer, more narrative-driven content. For Google Ads, the focus will be on concise, keyword-rich headlines and descriptions. This level of customization ensures your message resonates with the right audience in the right context, as explained by marketing experts at <a href="https://neilpatel.com/blog/ad-copy/" target="_blank" rel="noopener noreferrer">Neil Patel's blog</a>. Explore our full suite of <Link href="/tools">AI tools</Link> to see how we can help your business grow.</p>
                
                <h3>How Does the Ad Copy Generator Work?</h3>
                <p>Using our <strong>ad-copy-generator</strong> is incredibly simple. You start by inputting key details about your product or service, your target audience, and the main selling points. The AI then analyzes this information to understand your brand's voice and objectives. From there, it generates multiple ad copy variations, giving you a range of options to A/B test. This data-driven approach helps you identify what works best, improving your ROI and lowering your cost per acquisition. The tool functions as a <strong>free ad copy writer</strong>, saving you countless hours and significant budget that would otherwise be spent on manual copywriting. To further enhance your social media presence, pair your ad copy with the right hashtags using our <Link href="/tools/hashtag-generator">Hashtag Generator</Link>.</p>
                <p>The applications are limitless. Use it as an <strong>Instagram ad copy generator</strong> to create visually-driven text that complements your images and videos. Leverage it as a <strong>Google ad copy generator</strong> to dominate search results with perfectly crafted headlines. No matter your goal—be it increasing brand awareness, driving traffic, or boosting sales—our <strong>AI ad copy generator</strong> is engineered to deliver results. Stop guessing and start generating ad copy that converts with the power of artificial intelligence. If you have any questions, feel free to <Link href="/contact">contact us</Link>.</p>
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
