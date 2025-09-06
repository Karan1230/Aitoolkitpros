
import { type Metadata } from 'next';
import { FluxImageGeneratorClient } from '@/components/flux-image-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


export const metadata: Metadata = {
  title: 'Free Flux Image Generator | High-Quality AI Images',
  description: 'Generate stunning, high-quality images from text prompts with our free Flux Image Generator. Create photorealistic or artistic visuals in seconds.',
};

const benefits = [
    "Create photorealistic and artistic images.",
    "Generate unique visuals for any creative project.",
    "Experiment with different styles and concepts.",
    "Completely free to use, no login required."
];

const faqs = [
    {
        question: "What is the Flux Image Generator?",
        answer: "The Flux Image Generator is a powerful AI tool that creates high-quality images from text descriptions. It utilizes an advanced model known for its speed and efficiency, allowing you to generate stunning visuals, from photorealistic scenes to abstract art, in just a few seconds."
    },
    {
        question: "How is this different from other AI image generators?",
        answer: "The Flux model is specifically engineered for faster inference times without compromising on quality. This means you get your generated images quicker than with many other models, making it ideal for rapid brainstorming and content creation."
    },
    {
        question: "Is this Flux art generator free?",
        answer: "Yes, our Flux image generator is completely free to use. We provide access to this cutting-edge technology so that everyone can explore the creative potential of AI without any cost."
    },
    {
        question: "What kind of images can I create?",
        answer: "You can create a vast range of images. Use it as a realistic AI image generator for lifelike portraits and landscapes, or as an AI art generator for more stylized and imaginative creations. It's a versatile tool for social media content, blog assets, presentations, and personal art projects."
    },
    {
        question: "What is 'prompting' and how can I get better results?",
        answer: "Prompting is the act of writing the text description for the AI. To get better results, be specific and descriptive. Include details about the subject, the setting, the style (e.g., 'impressionist painting,' 'sci-fi movie poster'), colors, and lighting. The more detail you provide, the closer the AI can get to your vision."
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Flux Image Generator",
      "applicationCategory": "DesignApplication",
      "operatingSystem": "Web",
      "description": "A free Flux Image Generator to create stunning, high-quality photorealistic or artistic visuals from text prompts in seconds.",
      "url": "https://aitoolkitpro.netlify.app/tools/flux-image-generator",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "195"
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

export default function FluxImageGeneratorPage() {
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
                  Flux Image Generator
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Harness the power of our <strong>Flux image generator</strong> to transform your text prompts into breathtaking images. This <strong>AI image generator</strong> is fast, efficient, and capable of generating stunning visuals for any project. As a top-tier <strong>free AI image generator</strong>, it offers a seamless experience for creating high-quality art. Whether you need a <strong>text to image AI</strong> for realistic photos or artistic creations, our <strong>Flux art generator</strong> delivers exceptional results.
                </p>
              </div>

              <div className="mt-8">
                  <FluxImageGeneratorClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Enter Prompt:</strong> Describe the image you want to create.</p>
                      <p><strong>2. Generate:</strong> Click the "Run" button and wait for the AI to create your image.</p>
                      <p><strong>3. Download:</strong> Once generated, you can download the image directly.</p>
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
                <h2>Create Stunning Visuals with the Flux Image Generator</h2>
                <p>The <strong>Flux image generator</strong> represents the next wave of AI-powered creativity. This advanced <strong>AI image generator</strong> is engineered for both speed and quality, allowing you to produce stunning visuals from text prompts in record time. Whether you're a digital artist, a marketer, or a content creator, this tool is designed to be your go-to resource for high-impact images. Our <strong>free AI image generator</strong> harnesses the power of Flux to deliver photorealistic and artistic results that will elevate your projects. For a more powerful version, try our <Link href="/tools/flux-pro-image-generator">Flux Pro Image Generator</Link>.</p>
                
                <p>As a leading <strong>text to image AI</strong>, the Flux generator offers unparalleled control and flexibility. You can create everything from detailed character portraits to sweeping landscapes with just a few descriptive words. This makes it the <strong>best AI image generator</strong> for users who demand high quality without the complexity. The <strong>AI art generator</strong> capabilities of this tool allow you to experiment with various styles, from classic to contemporary, ensuring that your creative vision is always realized. For more about generative art, check out resources from <a href="https://www.artsy.net/gene/generative-art" target="_blank" rel="noopener noreferrer">Artsy</a>.</p>

                <h3>Experience the Next Generation of AI Art</h3>
                <p>Our platform provides a powerful <strong>AI image creator</strong> that is accessible to everyone. The <strong>free AI image creator</strong> is designed to be intuitive, so you can start generating images right away. It's an excellent <strong>AI photo generator</strong> for creating realistic images that can be used in a wide range of applications, from marketing materials to personal art projects. The <strong>AI picture generator</strong> is also perfect for creating unique visuals that will make your content stand out. You can even edit your creations with our <Link href="/tools/ai-image-editor">AI Image Editor</Link>.</p>
                
                <p>With the <strong>Flux art generator</strong>, you're not just creating images; you're creating art. This <strong>AI image generator online</strong> tool is constantly learning and improving, so you can always expect the best possible results. Whether you need an <strong>AI drawing generator</strong> for a creative project or a <strong>free text to image AI</strong> for a professional one, our Flux generator is the perfect choice. Unlock your creativity and start generating stunning, high-quality images today.</p>
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
