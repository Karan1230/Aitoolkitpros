
import { type Metadata } from 'next';
import { ImageUpscalerClient } from '@/components/image-upscaler-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


export const metadata: Metadata = {
  title: 'Free AI Image Upscaler | Enhance & Enlarge Images',
  description: 'Upscale your images to a higher resolution without losing quality with our free AI-powered Image Upscaler tool. Enlarge photos for print or digital use.',
};

const benefits = [
    "Increase image resolution without quality loss.",
    "Enhance details for sharper, clearer photos.",
    "Upscale images for high-quality printing.",
    "No complex software needed to improve your images."
];

const faqs = [
    {
        question: "What is an AI image upscaler?",
        answer: "An AI image upscaler is a tool that uses artificial intelligence to increase the resolution and quality of an image. Unlike traditional resizing which can make images blurry, an AI upscaler intelligently adds new details to create a sharp, clear, and high-resolution version of your original photo."
    },
    {
        question: "How does the AI photo upscaler work?",
        answer: "The AI is trained on millions of high- and low-resolution image pairs. It learns how to intelligently reconstruct details and textures when enlarging an image. This process, often called super-resolution, results in a much higher quality upscale than simple pixel stretching."
    },
    {
        question: "Is this free AI image upscaler really free?",
        answer: "Yes, our AI image upscaler is completely free to use. You can enhance and enlarge your images without any costs, subscriptions, or watermarks, making it an accessible tool for everyone."
    },
    {
        question: "What is the maximum resolution I can upscale to?",
        answer: "Our tool can significantly increase the resolution of your images, often up to 4k or higher, depending on the original file. It's perfect for turning a standard photo into a high-quality image suitable for large prints or high-definition displays."
    },
    {
        question: "When should I use an AI image enhancer?",
        answer: "You should use an AI image upscaler whenever you have a low-resolution image that you need to use in a larger format. This is common for old photos, images downloaded from the web, or pictures taken with older cameras. It's ideal for preparing images for printing, web design, or professional presentations."
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "AI Image Upscaler",
      "applicationCategory": "DesignApplication",
      "operatingSystem": "Web",
      "description": "A free AI-powered tool to upscale images to a higher resolution without losing quality. Enlarge photos for print or digital use.",
      "url": "https://ai-toolkit-pro.vercel.app/tools/image-upscaler",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "230"
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

export default function ImageUpscalerPage() {
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
                  AI Image Upscaler
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Enhance your images with our advanced <strong>AI image upscaler</strong>. This tool, powered by Flux.1-dev, lets you upscale and improve the quality of your pictures effortlessly. Our <strong>AI photo upscaler</strong> is perfect for photographers, designers, and anyone who needs to enlarge images without losing detail. As the <strong>best AI image upscaler</strong>, it offers a free and user-friendly solution for all your image enhancement needs. Use this <strong>free AI image upscaler</strong> to create stunning, high-resolution visuals.
                </p>
              </div>

              <div className="mt-8">
                  <ImageUpscalerClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Upload Image:</strong> Start by uploading the image you want to upscale.</p>
                      <p><strong>2. Adjust Settings:</strong> Use the controls to set the desired upscaling factor and other enhancements.</p>
                      <p><strong>3. Run:</strong> Click the "Run" button and wait for the AI to process your image.</p>
                      <p><strong>4. Download:</strong> Once generated, you can view and download your enhanced image.</p>
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
                <h2>Enhance Your Images with an AI Image Upscaler</h2>
                <p>Low-resolution images can be a major roadblock for any creative project. An <strong>AI image upscaler</strong> is a powerful tool that can increase the resolution of your images without sacrificing quality. Our platform offers a state-of-the-art <strong>AI photo upscaler</strong> that uses advanced algorithms to enhance details and create stunning, high-resolution visuals. It's the perfect solution for anyone who needs to enlarge images for print, web, or any other application. For more on image resolution, check out <a href="https://www.adobe.com/creativecloud/photography/discover/image-resolution.html" target="_blank" rel="noopener noreferrer">Adobe's guide</a>.</p>
                
                <p>Our tool is designed to be the <strong>best AI image upscaler</strong> by providing professional-grade results for free. The <strong>free AI image upscaler</strong> is easy to use; simply upload your image, and the AI will do the rest. This makes it an invaluable <strong>photo enlarger AI</strong> for photographers who need to print their work in large formats, or for designers who need to work with high-resolution assets. The <strong>AI image enhancer free</strong> tool is a must-have for any creative professional. You can create original images with our <Link href="/tools/ai-image-generator">AI Image Generator</Link> first.</p>
                
                <h3>From Low-Res to High-Def in Seconds</h3>
                <p>The <strong>AI image resolution increaser</strong> technology behind our tool is what sets it apart. It doesn't just stretch the pixels; it intelligently adds new details to create a sharp and clear image. This makes it a powerful <strong>4k image upscaler</strong> for creating visuals that look great on any screen. The <strong>free online image upscaler</strong> is accessible from any device, so you can enhance your images on the go. You can also edit your images before upscaling with our <Link href="/tools/ai-image-editor">AI Image Editor</Link>.</p>
                
                <p>Whether you're working with old family photos or modern digital images, our <strong>photo resolution increaser free online</strong> tool can help you achieve the best possible quality. It's a versatile <strong>picture upscaler</strong> that can be used for a wide range of applications. Stop struggling with blurry, low-resolution images and start using the power of AI to create stunning, high-definition visuals. Try our <strong>best free image upscaler</strong> today and see the difference for yourself.</p>
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
