
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BrainCircuit, CheckCircle, Paintbrush, PenLine, Search, Sparkles, Wand2, Star } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { allTools, toolCategories } from "@/lib/tools";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const featuredTools = allTools.filter(t => ["AI Script Writer", "AI Image Generator", "Text-to-Speech Converter", "AI Logo Maker", "Hashtag Generator", "Product Description Generator"].includes(t.name));

const faqs = [
  {
    question: "Are all the AI tools on this website free to use?",
    answer: "Yes, absolutely! All tools available on AI Toolkit Pro are 100% free to use. We believe in making powerful AI technology accessible to everyone without any hidden costs, subscriptions, or sign-ups."
  },
  {
    question: "Can I use the generated content for commercial purposes?",
    answer: "Generally, yes. The content you generate (e.g., images, scripts, logos) is royalty-free. However, we recommend checking the terms of the underlying AI models for any specific restrictions, as they may vary."
  },
  {
    question: "Which languages do the AI tools support?",
    answer: "Many of our tools, especially those for text generation and translation, support a wide variety of languages. You can typically select your desired language from a dropdown menu within the tool itself."
  },
  {
    question: "Is my data safe when using these tools?",
    answer: "Your privacy is our priority. We do not store your inputs (like text prompts or uploaded images) on our servers. Your data is sent to the respective third-party AI provider for processing and the result is returned directly to you."
  }
];

const testimonials = [
    {
        name: "Alex Rivera",
        title: "Content Creator",
        quote: "The AI Script Writer is a game-changer! I went from spending hours on a video script to drafting one in minutes. My productivity has skyrocketed.",
        avatar: "https://i.pravatar.cc/150?u=alex",
        rating: 5,
    },
    {
        name: "Samantha Lee",
        title: "Small Business Owner",
        quote: "I created a professional logo for my new business in under 60 seconds using the AI Logo Maker. It's free, fast, and the results are stunning. Highly recommend!",
        avatar: "https://i.pravatar.cc/150?u=samantha",
        rating: 5,
    },
    {
        name: "Mike Chen",
        title: "Digital Marketer",
        quote: "The Ad Copy and Hashtag Generators are my go-to tools for every campaign. They save me so much time on research and consistently deliver great results.",
        avatar: "https://i.pravatar.cc/150?u=mike",
        rating: 5,
    }
];

const TestimonialSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "AI Toolkit Pro",
        "url": "https://your-domain.com",
        "review": testimonials.map(testimonial => ({
            "@type": "Review",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": testimonial.rating,
                "bestRating": "5"
            },
            "author": {
                "@type": "Person",
                "name": testimonial.name
            },
            "reviewBody": testimonial.quote
        }))
    };
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};


export default function Home() {
  const autoplayPlugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  return (
    <div className="flex flex-col">
      <TestimonialSchema />
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 lg:py-40 text-center overflow-hidden">
        <div className="container px-4 md:px-6 relative">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter gradient-text">
            Unlock Creativity with Free AI Tools in Seconds
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Generate ideas, write content, design logos, create scripts, and more – all powered by AI.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/tools">
                Explore All Tools <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/tools/idea-generator">
                Generate Idea Now <Sparkles className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section id="popular-tools" className="py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">Most Popular AI Tools</h2>
          <p className="mt-4 max-w-2xl mx-auto text-center text-muted-foreground">
            Get started with our most popular tools, designed for power and simplicity.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTools.map((tool) => (
              <Link href={tool.href} key={tool.name} className="group flex">
                <Card className="w-full transition-all duration-300 hover:shadow-xl hover:border-primary/50 flex flex-col bg-card/50 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center gap-4 pb-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      {tool.icon}
                    </div>
                    <CardTitle className="font-headline text-xl">{tool.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{tool.description.split('.')[0] + '.'}</CardDescription>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <div className="text-sm font-semibold text-primary group-hover:text-accent flex items-center">
                      Try Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/tools">
                See All 29 Tools <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 md:py-28 bg-card/50">
        <div className="container">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">How Our AI Tools Work</h2>
          <p className="mt-4 max-w-2xl mx-auto text-center text-muted-foreground">
              Achieve amazing results in three simple steps.
          </p>
          <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
            <Card className="p-8 border-transparent shadow-none bg-transparent">
                <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-primary/10">
                        <PenLine className="h-10 w-10 text-primary" />
                    </div>
                </div>
                <h3 className="font-headline text-xl font-bold">1. Select Tool & Enter Input</h3>
                <p className="text-muted-foreground mt-2">Choose from our suite of 29 specialized AI tools and provide your prompt, text, or image.</p>
            </Card>
            <Card className="p-8 border-transparent shadow-none bg-transparent">
                 <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-primary/10">
                        <BrainCircuit className="h-10 w-10 text-primary" />
                    </div>
                </div>
                <h3 className="font-headline text-xl font-bold">2. AI Generates Results</h3>
                <p className="text-muted-foreground mt-2">Our advanced AI gets to work instantly, processing your request to generate high-quality content.</p>
            </Card>
            <Card className="p-8 border-transparent shadow-none bg-transparent">
                 <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-primary/10">
                        <CheckCircle className="h-10 w-10 text-primary" />
                    </div>
                </div>
                <h3 className="font-headline text-xl font-bold">3. Copy, Download, or Share</h3>
                <p className="text-muted-foreground mt-2">Your results are ready in seconds. Copy the text, download the image, or share your new creation.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">What Our Users Say</h2>
          <p className="mt-4 max-w-2xl mx-auto text-center text-muted-foreground">
            Trusted by creators, marketers, and businesses worldwide.
          </p>
          <Carousel
             plugins={[autoplayPlugin.current]}
             opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto mt-12"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-4">
                    <Card className="h-full flex flex-col bg-card/50 backdrop-blur-sm">
                      <CardContent className="p-6 flex-grow flex flex-col justify-center items-center text-center">
                        <Avatar className="w-20 h-20 mb-4 border-2 border-primary/20">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                        <div className="mt-4">
                            <h4 className="font-bold">{testimonial.name}</h4>
                            <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                            <div className="flex justify-center mt-2">
                                {Array(testimonial.rating).fill(0).map((_, i) => (
                                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 md:py-28 bg-card/50">
        <div className="container max-w-3xl">
           <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">Frequently Asked Questions</h2>
           <p className="mt-4 max-w-2xl mx-auto text-center text-muted-foreground">
              Have questions? We've got answers. Here are some common queries about our platform.
           </p>
           <Accordion type="single" collapsible className="w-full mt-12">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index + 1}`} key={index}>
                <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

    </div>
  );
}
