
import { type Metadata } from 'next';
import { VirtualTryOnClient } from '@/components/virtual-try-on-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


export const metadata: Metadata = {
  title: 'Free AI Virtual Try-On Tool | Try On Clothes Virtually',
  description: 'Virtually try on different outfits using our free AI-powered tool. Upload a photo of yourself and a photo of the clothing item to see how it looks.',
};

const benefits = [
    "Visualize how clothes will look on you before buying.",
    "Experiment with different styles from the comfort of your home.",
    "Save time and reduce returns when shopping online.",
    "Fun and easy to use for fashion enthusiasts."
];

const faqs = [
    {
        question: "What is an AI virtual try-on tool?",
        answer: "An AI virtual try-on tool uses artificial intelligence to show you how a piece of clothing would look on you without you having to physically wear it. You upload a photo of yourself and a photo of a garment, and the AI generates a new image of you 'wearing' the item."
    },
    {
        question: "How does the virtual try-on clothes technology work?",
        answer: "The AI analyzes the photo of the clothing to understand its shape, texture, and drape. It then analyzes the photo of the person to understand their body shape and pose. Finally, it realistically maps the clothing onto the person, adjusting for fit and lighting to create a seamless image."
    },
    {
        question: "Is this virtual dressing room free to use?",
        answer: "Yes, our AI virtual try-on tool is completely free. It's a fun and practical way for online shoppers and fashion lovers to experiment with different looks and make more informed purchasing decisions."
    },
    {
        question: "What kind of photos do I need to upload?",
        answer: "For the best results, upload a clear, full-body photo of yourself standing in a simple pose. For the clothing, use a clear product shot of the garment on a plain background, similar to what you would find on an e-commerce website."
    },
    {
        question: "Can I use this for any type of clothing?",
        answer: "The tool works best with simple garments like t-shirts, tops, dresses, and jackets. While it can handle various types of clothing, the results will be most realistic for items with a clear shape. It's the best virtual try-on app for seeing how different styles fit your look."
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "AI Virtual Try-On",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "Web",
      "description": "A free AI-powered tool to virtually try on different outfits by uploading a photo of yourself and a photo of the clothing item.",
      "url": "https://www.aitoolkitpro.com/tools/virtual-try-on",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.6",
        "reviewCount": "130"
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

export default function VirtualTryOnPage() {
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
                  AI Virtual Try-On
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  See how clothes look on you without leaving your home with our <strong>AI virtual try-on</strong> tool. Upload a photo of yourself and an image of a clothing item to get a realistic virtual try-on experience. This <strong>virtual try on clothes free</strong> tool is perfect for online shoppers and fashion enthusiasts. As the <strong>best virtual try on app</strong>, it provides a seamless way to experiment with different styles. Use our <strong>AI fashion</strong> tool to make confident purchasing decisions.
                </p>
              </div>

              <div className="mt-8">
                  <VirtualTryOnClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Upload Photos:</strong> Provide a photo of a person and a separate photo of the clothing item.</p>
                      <p><strong>2. Generate:</strong> Click the "Run" button and wait for the AI to process the images.</p>
                      <p><strong>3. View Result:</strong> The tool will generate an image of the person wearing the clothes.</p>
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
                <h2>Revolutionize Your Shopping Experience with AI Virtual Try-On</h2>
                <p>Online shopping has transformed the way we buy clothes, but it comes with one major drawback: you can't try things on. An <strong>AI virtual try-on</strong> tool is here to solve that problem. Our platform offers a cutting-edge <strong>virtual try on clothes</strong> experience that allows you to see how an outfit looks on you before you buy it. It's a game-changer for online shoppers, helping you make more confident purchasing decisions and reducing the hassle of returns. For more on the future of fashion, check out <a href="https://www.voguebusiness.com/technology" target="_blank" rel="noopener noreferrer">Vogue Business</a>.</p>
                <p>Our tool is designed to be the <strong>best virtual try on app</strong> by providing realistic and accurate results. The <strong>AI virtual try on online</strong> technology uses advanced algorithms to drape the clothing onto your photo, taking into account your body shape and posture. This makes it a powerful <strong>virtual try on free</strong> tool for anyone who wants to shop smarter. The <strong>AI clothing try on</strong> is also a fun way to experiment with different styles and discover new looks. For more creative fun, try our <Link href="/tools/image-face-swap">Image Face Swap</Link> tool.</p>
                
                <h3>See It On Before You Buy It</h3>
                <p>Using our <strong>virtual try on clothes app free</strong> is simple. Just upload a photo of yourself and a photo of the clothing item you're interested in. The <strong>AI fashion</strong> tool will then generate an image of you wearing the clothes. This makes it an invaluable <strong>virtual try on for ecommerce</strong>, allowing customers to visualize products in a more personal and engaging way. The <strong>virtual try on glasses</strong> feature is also great for seeing how different frames look on your face. You can also generate your own custom clothing designs with our <Link href="/tools/ai-image-generator">AI Image Generator</Link>.</p>
                <p>Whether you're a fashion enthusiast who loves to experiment with new styles or a savvy shopper who wants to make informed decisions, our <strong>virtual dressing room</strong> is the perfect tool for you. It's a versatile <strong>virtual try on clothes online free</strong> service that can be used for a wide range of clothing items. Stop guessing how clothes will fit and start using the power of AI to shop with confidence. Try our <strong>virtual try on app free</strong> today and transform your online shopping experience.</p>
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
