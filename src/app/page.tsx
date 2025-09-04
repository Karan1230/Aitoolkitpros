
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, PenLine } from "lucide-react";
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
  const autoplayPlugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
  const [visibleTools, setVisibleTools] = useState(INITIAL_TOOL_COUNT);

  const loadMoreTools = () => {
    setVisibleTools(prev => Math.min(prev + INITIAL_TOOL_COUNT, allTools.length));
  };

  return (
    <div className="flex flex-col">
      <section className="py-16 md:py-24 text-center">
        <div className="container">
          <h1 className="font-headline text-4xl md:text-6xl font-bold gradient-text animate-float-in">
            All-in-One AI Toolkit for Creators
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground animate-float-in" style={{ animationDelay: '0.1s' }}>
            Unlock a full suite of free AI tools designed to help you write, design, and market better. From SEO-friendly content to stunning visuals, level up your creative workflow.
          </p>
          <div className="mt-8 flex justify-center gap-4 animate-float-in" style={{ animationDelay: '0.2s' }}>
            <Button asChild size="lg">
              <Link href="/tools">
                Browse All Tools <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-12">
        <div className="container px-4">
          <h2 className="font-headline text-3xl font-bold text-center mb-8">
            <span className="gradient-text">Popular AI Tools</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {allTools.slice(0, visibleTools).map((tool, index) => (
              <Link href={tool.href} key={tool.name} className="group flex animate-float-in" style={{ animationDelay: `${0.1 + index * 0.05}s`}}>
                <Card className="w-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/50 flex flex-col bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center flex-grow">
                     <div className="p-3 mb-3 rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                      {tool.icon}
                    </div>
                    <p className="font-semibold text-sm">{tool.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{tool.category}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          {visibleTools < allTools.length && (
            <div className="mt-10 text-center">
              <Button onClick={loadMoreTools} variant="secondary" size="lg">Load More Tools</Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container px-4">
           <h2 className="font-headline text-3xl font-bold text-center mb-8">What Our Users Say</h2>
          <Carousel
             plugins={[autoplayPlugin.current]}
             opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="h-full flex flex-col bg-card/50 backdrop-blur-sm shadow-lg">
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
