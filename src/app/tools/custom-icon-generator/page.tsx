
import { type Metadata } from 'next';
import { CustomIconGeneratorClient } from '@/components/custom-icon-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


export const metadata: Metadata = {
  title: 'Free AI Custom Icon Generator | Create Unique Icons Instantly',
  description: 'Generate custom, high-quality icons from a text description with our free AI tool. Choose styles like flat, 3D, outline, and more for your brand or project.',
};

const benefits = [
    "Create unique icons perfectly matched to your brand.",
    "No design skills needed to get a professional icons.",
    "Generate multiple styles to find the perfect look.",
    "Download high-resolution PNGs for web and apps."
];

const faqs = [
    {
        question: "What is an AI custom icon generator?",
        answer: "An AI custom icon generator is a tool that creates unique icons from your text descriptions. You describe the concept, choose a style (like 3D, Flat, or Outline), and a color scheme, and the AI generates a set of custom icons for you to use."
    },
    {
        question: "Is this AI icon generator free to use?",
        answer: "Yes, our custom icon generator is completely free. You can create and download high-resolution icons for your websites, apps, presentations, or any other project without any cost."
    },
    {
        question: "Do I need to be a designer to create icons?",
        answer: "Not at all. This tool is designed for everyone. You don't need any design skills or complex software. If you have an idea, you can describe it in text to create a professional-quality icon."
    },
    {
        question: "What kind of icons can I create?",
        answer: "You can create a wide variety of icons for any purpose. Whether you need a simple 'settings' gear icon, a complex 'friendly robot' mascot, or an abstract concept, the AI can generate it. You can also specify styles like 'Pixel Art' or 'Cartoon' for unique results."
    },
    {
        question: "Can I use these icons for my business logo or app?",
        answer: "Yes, the generated icons are perfect for use as part of a logo, as app icons, or for your website's user interface. Since they are custom-generated, you can create a cohesive and unique visual identity for your brand."
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "AI Custom Icon Generator",
      "applicationCategory": "DesignApplication",
      "operatingSystem": "Web",
      "description": "A free AI tool to generate custom, high-quality icons from a text description in various styles.",
      "url": "https://www.aitoolkitpro.com/tools/custom-icon-generator",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.7",
        "reviewCount": "140"
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

export default function CustomIconGeneratorPage() {
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
                  AI Custom Icon Generator
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Describe the icon you need, and our <strong>AI custom icon generator</strong> will design it in various styles. This <strong>AI icon generator</strong> is perfect for creating unique, high-quality icons for websites, apps, and presentations. With our <strong>free AI icon generator</strong>, you can produce professional icons without any design skills. As the <strong>best AI icon generator</strong>, it offers a seamless and intuitive experience for all your creative projects.
                </p>
              </div>

              <div className="mt-8">
                  <CustomIconGeneratorClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Describe Your Icon:</strong> Enter a clear description of the icon concept (e.g., "a friendly robot waving").</p>
                      <p><strong>2. Choose Style & Colors:</strong> Select a design style and describe your preferred color scheme.</p>
                      <p><strong>3. Generate:</strong> Click the "Generate Icons" button and see the AI-created designs.</p>
                      <p><strong>4. Download:</strong> Click your favorite icon to download the high-resolution PNG file.</p>
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
                <h2>Design Unique Icons with an AI Custom Icon Generator</h2>
                <p>Icons are a crucial element of modern design, conveying information and enhancing the user experience. An <strong>AI custom icon generator</strong> is a powerful tool that allows you to create unique and professional icons in minutes. Our platform offers a <strong>free AI icon generator</strong> that can produce icons in a variety of styles, from flat and minimalist to 3D and cartoonish. It's the perfect solution for designers, developers, and marketers who need high-quality icons for their projects. For more on icon design principles, check out <a href="https://m2.material.io/design/iconography/system-icons.html" target="_blank" rel="noopener noreferrer">Google's Material Design documentation</a>.</p>
                <p>Our tool is designed to be the <strong>best AI icon generator</strong> by providing a combination of quality, speed, and ease of use. The <strong>AI icon generator from text</strong> technology allows you to simply describe the icon you want, and the AI will generate a selection of designs that match your vision. This makes it an incredibly efficient <strong>custom icon maker</strong>, saving you time and effort on manual design work. The <strong>AI generated icons</strong> are high-resolution and suitable for both web and print applications. Pair your new icons with a fresh logo from our <Link href="/tools/ai-logo-maker">AI Logo Maker</Link>.</p>

                <h3>From Text to Icon in a Few Clicks</h3>
                <p>Using our <strong>AI icon creator</strong> is a simple process. First, you provide a text prompt describing the icon you need. Then, you can choose a style and color palette to match your brand's identity. The <strong>free icon maker</strong> will then generate a variety of icons for you to choose from. You can experiment with different prompts and styles until you find the perfect design. It's a versatile <strong>app icon generator</strong> that can be used to create icons for any type of application. You can also generate larger images with our <Link href="/tools/ai-image-generator">AI Image Generator</Link>.</p>
                <p>Whether you need a new set of icons for your website, a custom icon for a presentation, or a unique app icon, our <strong>AI icon generator free</strong> tool has you covered. It's a powerful <strong>logo and icon generator</strong> that can help you create a cohesive and professional brand identity. Stop using generic stock icons and start creating custom designs that truly represent your brand. Try our <strong>best free AI icon generator</strong> today and experience the future of icon design.</p>
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
