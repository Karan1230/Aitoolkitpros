
import { type Metadata } from 'next';
import { AiImageGeneratorClient } from '@/components/ai-image-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


export const metadata: Metadata = {
  title: 'Free AI Image Generator | Create Art from Text',
  description: 'Generate stunning, high-quality images from text prompts with our free AI Image Generator. No login required. Turn your creative ideas into visual art instantly.',
};

const benefits = [
    "Unleash creativity without artistic skills.",
    "Generate unique assets for blogs and social media.",
    "Visualize concepts and ideas in seconds.",
    "Create royalty-free images for any project."
];

const faqs = [
    {
        question: "What is an AI image generator?",
        answer: "An AI image generator is a tool that creates images from written descriptions, also known as prompts. You can describe anything you can imagine, and the AI will generate a unique visual representation of your text. It's a powerful way to create art, illustrations, and photos without any artistic skill."
    },
    {
        question: "How does the text to image AI work?",
        answer: "Text-to-image AI models are trained on vast datasets of images and their corresponding text descriptions. When you enter a prompt, the AI uses this knowledge to understand the concepts, styles, and objects you've described and then synthesizes a new image that matches your description."
    },
    {
        question: "Is this AI image generator free to use?",
        answer: "Yes, our AI image generator is completely free. We believe in making creative tools accessible to everyone, so you can generate high-quality images without any subscription or fees. It's a free AI image creator for all your needs."
    },
    {
        question: "Can I use the generated images for commercial purposes?",
        answer: "The images you create are generally considered royalty-free. However, the specifics can depend on the terms of the underlying AI model. We recommend reviewing our copyright disclaimer. For most use cases, like blogs, social media, and marketing, the images are safe to use."
    },
    {
        question: "What makes this the best AI image generator?",
        answer: "Our tool is considered one of the best AI image generators because it combines high-quality output, a user-friendly interface, multiple style options, and is completely free. We use advanced models to ensure you get stunning, AI-generated HD quality images every time."
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "AI Image Generator",
      "applicationCategory": "DesignApplication",
      "operatingSystem": "Web",
      "description": "A free AI tool to generate stunning, high-quality images from text prompts. Turn creative ideas into visual art instantly.",
      "url": "https://ai-toolkit-pro.vercel.app/tools/ai-image-generator",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "250"
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

export default function AiImageGeneratorPage() {
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
                  AI Image Generator
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                    Transform your words into breathtaking images. Our <strong>ai image generator</strong> will bring your vision to life in seconds. As the <strong>best ai image generator</strong> on the market, it provides a seamless experience for creating stunning visuals from text. This <strong>free ai image generator</strong> is designed for both beginners and professionals, offering a powerful yet user-friendly platform. Whether you need a <strong>realistic ai image generator</strong> or a creative <strong>ai art generator</strong>, our tool has you covered.
                </p>
              </div>

              <div className="mt-8">
                  <AiImageGeneratorClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card className="bg-card/50">
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Write a Prompt:</strong> Be descriptive. The more detail you provide, the better the result. Think about the subject, style, colors, and mood.</p>
                      <p><strong>2. Generate:</strong> Click the "Generate Image" button and wait for the AI to work its magic.</p>
                      <p><strong>3. Download:</strong> Right-click and save your generated image. Use it for your projects, social media, or just for fun!</p>
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
                <h2>Unleash Your Creativity with an AI Image Generator</h2>
                <p>In a world driven by visual content, the ability to create stunning images quickly is a significant advantage. An <strong>ai image generator</strong> is a revolutionary tool that allows anyone to become a digital artist. By simply describing what you want to see, you can generate breathtaking visuals in seconds. Our platform offers a <strong>free ai image generator</strong> that is both powerful and easy to use, making it the perfect choice for content creators, marketers, and artists alike. There's no need for complicated software or design skills; if you can describe it, our AI can create it. Learn more about the technology behind it on <a href="https://en.wikipedia.org/wiki/Generative_art" target="_blank" rel="noopener noreferrer">Wikipedia</a>.</p>
                
                <p>The core technology behind this is <strong>text to image ai</strong>, which interprets your written prompts and translates them into visual art. This opens up a world of possibilities. You can use our <strong>ai art generator</strong> to create unique pieces for your blog, social media, or personal projects. Looking for something specific? Our <strong>ai image generator from text</strong> can produce everything from photorealistic landscapes to abstract art. This flexibility makes it the <strong>best ai art generator</strong> for a wide range of creative needs. For more specific design needs, you can also try our <Link href="/tools/ai-logo-maker">AI Logo Maker</Link>. And for any questions about our services, please see our <Link href="/contact">contact page</Link>.</p>
                
                <h3>Endless Possibilities with a Free AI Image Creator</h3>
                <p>One of the most exciting aspects of our tool is its versatility. It's not just an <strong>ai photo generator</strong>; it's a complete creative suite. You can use it as an <strong>ai cartoon generator</strong> to create fun and engaging characters, or as an <strong>ai anime generator</strong> to bring your own anime-style visions to life. The <strong>ai picture generator</strong> can also produce high-quality avatars for your online profiles, making it a powerful <strong>ai avatar generator</strong>. All of these features are available for free, making it the ultimate <strong>free ai art generator</strong>. You can even use it to design unique <Link href="/tools/custom-icon-generator">custom icons</Link> for your projects.</p>
                
                <p>Quality is paramount, which is why our tool is designed to be an <strong>ai image generator hd quality</strong> platform. The images you create are high-resolution and suitable for both digital and print use. As a leading <strong>ai image generator online</strong>, we are committed to providing a seamless and enjoyable experience. Whether you need a quick graphic for a presentation or a masterpiece for your portfolio, our <strong>ai image creator</strong> is here to help. Explore the limitless potential of AI and start creating stunning visuals today with the <strong>best ai image generator free</strong> tool on the web.</p>
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
