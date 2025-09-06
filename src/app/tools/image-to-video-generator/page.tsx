
import { type Metadata } from 'next';
import { ImageToVideoGeneratorClient } from '@/components/image-to-video-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


export const metadata: Metadata = {
  title: 'Free AI Image to Video Generator | Bring Your Images to Life',
  description: 'Create stunning videos from your images with our free AI-powered tool. Turn static pictures into dynamic video clips in seconds. No login required.',
};

const benefits = [
    "Animate your static images effortlessly.",
    "Create engaging content for social media.",
    "No complex video editing software needed.",
    "Generate short video clips from your favorite photos."
];

const faqs = [
    {
        question: "What is an AI image to video generator?",
        answer: "An AI image to video generator is a tool that uses artificial intelligence to animate a static image, turning it into a short video clip. You can upload a picture and provide a text prompt describing the desired motion, and the AI will generate a dynamic video."
    },
    {
        question: "How does the AI create a video from a single picture?",
        answer: "The AI model analyzes the objects and scenery in your photo. Based on your prompt (e.g., 'slow zoom in,' 'wind blowing through the trees'), it generates new frames that create the illusion of motion, effectively bringing your static image to life."
    },
    {
        question: "Is this image to video AI generator free?",
        answer: "Yes, our image to video generator is completely free to use. It's a powerful tool for content creators, marketers, and anyone looking to create engaging video content from their photos without any cost or watermarks."
    },
    {
        question: "What kind of videos can I create with this tool?",
        answer: "You can create a wide variety of short video clips. It's perfect for making cinemagraphs, animating portraits, creating moving backgrounds, or generating dynamic product showcases for social media platforms like Instagram, TikTok, and Facebook."
    },
    {
        question: "Do I need any video editing skills?",
        answer: "Not at all. This tool is designed to be incredibly user-friendly. You don't need any knowledge of complex video editing software. All you need is an image and an idea for the motion you want to see."
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "AI Image to Video Generator",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Web",
      "description": "A free AI-powered tool to create stunning videos from images. Turn static pictures into dynamic video clips in seconds.",
      "url": "https://aitoolkitpro.netlify.app/tools/image-to-video-generator",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.6",
        "reviewCount": "145"
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

export default function ImageToVideoGeneratorPage() {
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
                  AI Image to Video Generator
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Bring your images to life with our <strong>AI image to video generator</strong>. This tool, powered by advanced AI, lets you generate captivating videos from a single image. Turn your static content into a dynamic story with our <strong>image to video AI generator free</strong>. As the <strong>best AI image to video generator</strong>, it provides high-quality animations that are perfect for social media. Use this <strong>picture to video AI generator</strong> to create engaging content and capture your audience's attention.
                </p>
              </div>

              <div className="mt-8">
                  <ImageToVideoGeneratorClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Upload Image:</strong> Start by uploading the image you want to animate.</p>
                      <p><strong>2. Enter Prompt:</strong> Describe the motion you want to see in the video (e.g., "camera zooms in slowly").</p>
                      <p><strong>3. Generate:</strong> Click the "Run" button and wait for the AI to create your video.</p>
                      <p><strong>4. Download:</strong> Once generated, you can download the video directly from the player.</p>
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
                <h2>Animate Your Photos with an AI Image to Video Generator</h2>
                <p>Static images are great, but video content is more engaging. An <strong>AI image to video generator</strong> is a powerful tool that can transform your still photos into dynamic, eye-catching videos. Our platform offers a state-of-the-art <strong>image to video AI generator free</strong> of charge, allowing you to create stunning animations with just a few clicks. It's the perfect solution for content creators, marketers, and anyone who wants to add a new dimension to their visuals. To generate images from scratch, use our <Link href="/tools/ai-image-generator">AI Image Generator</Link>.</p>
                
                <p>Our tool is designed to be the <strong>best AI image to video generator</strong> by providing high-quality results and a user-friendly experience. The <strong>AI video generator from image</strong> technology can animate your photos in a variety of ways, from subtle movements to dramatic effects. This makes it a versatile <strong>picture to video AI generator</strong> for a wide range of applications. The <strong>image to video AI free</strong> tool is accessible to everyone, so you can start creating amazing videos right away. For more on video marketing, check out guides from <a href="https://vimeo.com/blog/category/video-marketing/" target="_blank" rel="noopener noreferrer">Vimeo's blog</a>.</p>

                <h3>From Still Image to Moving Story</h3>
                <p>The process of using our <strong>image to video maker AI</strong> is incredibly simple. Just upload your image, provide a prompt describing the desired motion, and let the AI do the rest. The <strong>photo to video AI generator free</strong> tool will create a short video clip that you can use on social media, in presentations, or on your website. It's a great way to make your content more engaging and memorable. The <strong>free AI image to video generator</strong> is also a fun tool for personal projects, allowing you to bring your favorite photos to life. You can also generate longer videos with our <Link href="/tools/ltx-ai-video-generator">LTX AI Video Generator</Link>.</p>
                
                <p>Whether you're looking to create an animated logo, a looping background, or a dynamic social media post, our <strong>make image into video AI</strong> tool has you covered. It's a powerful <strong>AI image to video free</strong> solution that can help you create professional-looking videos without any editing skills. Stop using static images and start creating dynamic content that captivates your audience. Try our <strong>image to video AI generator no watermark</strong> tool today and see the difference it can make.</p>
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
