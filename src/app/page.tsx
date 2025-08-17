'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BrainCircuit, CheckCircle, PenLine, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { allTools } from "@/lib/tools";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const featuredTools = allTools.filter(t => ["AI Script Writer", "AI Image Generator", "Text-to-Speech Converter", "AI Logo Maker", "Hashtag Generator", "Product Description Generator"].includes(t.name));

const faqs = [
  {
    question: "1. Are all the AI tools on this app free to use?",
    answer: "Yes, absolutely! All tools available on AI Toolkit Pro are 100% free to use. We believe in making powerful AI technology accessible to everyone without any hidden costs, subscriptions, or sign-ups."
  },
  {
    question: "2. Can I use the generated content for commercial purposes?",
    answer: "Generally, yes. The content you generate (e.g., images, scripts, logos) is royalty-free. However, we recommend checking the terms of the underlying AI models for any specific restrictions, as they may vary."
  },
  {
    question: "3. Which languages do the AI tools support?",
    answer: "Many of our tools, especially those for text generation and translation, support a wide variety of languages. You can typically select your desired language from a dropdown menu within the tool itself."
  },
  {
    question: "4. Is my data safe when using these tools?",
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

export default function Home() {
  const autoplayPlugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-16 pb-8 text-center">
        <div className="container px-6">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter gradient-text">
            Unlock Creativity with Free AI Tools
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
            Generate ideas, write content, design logos, create scripts, and more with our suite of free AI tools.
          </p>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section id="popular-tools" className="py-8">
        <div className="container px-6">
          <h2 className="font-headline text-2xl font-bold text-left mb-4">Popular Tools</h2>
          <div className="grid grid-cols-2 gap-4">
            {featuredTools.slice(0, 4).map((tool) => (
              <Link href={tool.href} key={tool.name} className="group flex">
                <Card className="w-full transition-all duration-300 hover:bg-white/5 flex flex-col shadow-lg">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center flex-grow">
                     <div className="p-3 mb-2 rounded-lg bg-primary/10 text-primary">
                      {tool.icon}
                    </div>
                    <p className="font-semibold text-sm">{tool.name}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-8">
        <div className="container px-6">
           <h2 className="font-headline text-2xl font-bold text-left mb-4">How It Works</h2>
          <div className="grid grid-cols-3 gap-3 text-center">
            <Card className="p-4 bg-secondary">
                <div className="flex justify-center mb-2">
                    <PenLine className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xs">1. Select Tool</h3>
            </Card>
            <Card className="p-4 bg-secondary">
                 <div className="flex justify-center mb-2">
                    <BrainCircuit className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xs">2. AI Generates</h3>
            </Card>
            <Card className="p-4 bg-secondary">
                 <div className="flex justify-center mb-2">
                    <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xs">3. Use Result</h3>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-8">
        <div className="container px-6">
           <h2 className="font-headline text-2xl font-bold text-left mb-4">What Users Say</h2>
          <Carousel
             plugins={[autoplayPlugin.current]}
             opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4">
                    <Card className="h-full flex flex-col bg-secondary shadow-lg">
                      <CardContent className="p-6 flex-grow flex flex-col justify-center">
                        <p className="text-muted-foreground italic text-sm mb-4 flex-grow">"{testimonial.quote}"</p>
                        <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10 border-2 border-primary/20">
                                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h4 className="font-bold text-sm">{testimonial.name}</h4>
                                <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                            </div>
                        </div>
                      </CardContent>
                    </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-8">
        <div className="container px-6">
           <h2 className="font-headline text-2xl font-bold text-left mb-4">FAQs</h2>
           <Accordion type="single" collapsible className="w-full space-y-2">
                {faqs.map((faq, index) => (
                <AccordionItem 
                    value={`item-${index + 1}`} 
                    key={index} 
                    className="bg-secondary border-none rounded-xl"
                >
                    <AccordionTrigger className="text-sm text-left px-4 py-3 hover:no-underline">
                      <span className="flex-1">{faq.question.substring(faq.question.indexOf('.') + 2)}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 text-muted-foreground text-sm">
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
