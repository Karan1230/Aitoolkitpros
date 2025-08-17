'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, PenLine } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { allTools } from "@/lib/tools";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

const INITIAL_TOOL_COUNT = 8;

export default function Home() {
  const autoplayPlugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  const [visibleTools, setVisibleTools] = useState(INITIAL_TOOL_COUNT);

  const loadMoreTools = () => {
    setVisibleTools(prev => Math.min(prev + INITIAL_TOOL_COUNT, allTools.length));
  };

  return (
    <div className="flex flex-col">
      {/* Tools Section */}
      <section id="tools" className="py-8">
        <div className="container px-4">
          <div className="grid grid-cols-2 gap-4">
            {allTools.slice(0, visibleTools).map((tool) => (
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
          {visibleTools < allTools.length && (
            <div className="mt-6 text-center">
              <Button onClick={loadMoreTools}>Load More Tools</Button>
            </div>
          )}
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-8">
        <div className="container px-4">
           <h2 className="font-headline text-2xl font-bold text-center mb-4">How to Use</h2>
          <div className="grid grid-cols-3 gap-3 text-center">
            <Card className="p-4 bg-secondary">
                <div className="flex justify-center mb-2">
                    <PenLine className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xs">1. Select Tool</h3>
            </Card>
            <Card className="p-4 bg-secondary">
                 <div className="flex justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M9.064 2.147a10.965 10.965 0 0 1 5.872 0C18.353 3.341 20 6.035 20 8c0 .784-.13 1.54-.368 2.246l-1.332 4.024a2 2 0 0 1-3.23.95l-3.07-3.07A2 2 0 0 1 12 11a2 2 0 0 1 .157-.768l3.07-3.07a2 2 0 0 1-.95-3.23L10.254 2.6c-.696-.233-1.462-.361-2.246-.361 0-1.965 1.647-4.659 4.056-5.853Z"/><path d="M12 13a2 2 0 0 1 .768.157l3.07 3.07a2 2 0 0 1 .95 3.23l-4.024 1.332A10.965 10.965 0 0 1 16 20c-1.965 0-4.659-1.647-5.853-4.056a10.965 10.965 0 0 1 0-5.872C11.341 6.647 14.035 5 16 5c.784 0 1.54.13 2.246.368l1.332 4.024a2 2 0 0 1-3.23.95l-3.07-3.07A2 2 0 0 1 13 12a2 2 0 0 1-.768.157Z"/></svg>
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
        <div className="container px-4">
           <h2 className="font-headline text-2xl font-bold text-center mb-4">What Users Say</h2>
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
    </div>
  );
}
