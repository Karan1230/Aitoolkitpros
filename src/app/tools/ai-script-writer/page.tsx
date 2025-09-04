
import { type Metadata } from 'next';
import { AiScriptWriterClient } from '@/components/ai-script-writer-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


export const metadata: Metadata = {
  title: 'Free AI Script Writer | Generate Scripts for Videos & More',
  description: 'Effortlessly create compelling scripts for YouTube videos, podcasts, and presentations with our free AI Script Writer. No login required. Get started now!',
};

const benefits = [
    "Overcome writer's block instantly.",
    "Save hours of brainstorming and writing time.",
    "Structure your content professionally.",
    "Generate ideas for various formats and topics."
];

const faqs = [
    {
        question: "What is an AI script writer?",
        answer: "An AI script writer is a tool that uses artificial intelligence to generate scripts for various formats like YouTube videos, podcasts, movies, and presentations. You provide a prompt or topic, and the AI creates a structured, well-written script, helping you save time and overcome writer's block."
    },
    {
        question: "How can this free AI script writer help me create better content?",
        answer: "Our AI script writer helps you structure your ideas professionally, ensuring a clear beginning, middle, and end. It can generate engaging dialogue, scene descriptions, and narrative arcs, which can significantly improve the quality and coherence of your final content."
    },
    {
        question: "Is this AI tool for writing scripts really free?",
        answer: "Yes, our AI script generator is completely free to use. There are no subscriptions or hidden fees. We want to empower creators of all levels to produce high-quality content without barriers."
    },
    {
        question: "Can the AI write a script in any genre or style?",
        answer: "Absolutely. Our AI script writer is versatile and can generate scripts in numerous genres, including comedy, drama, sci-fi, horror, and more. You can specify the genre and tone in your prompt to get a script that matches your vision."
    },
    {
        question: "What is the 'Storytelling Mode' feature?",
        answer: "The 'Storytelling Mode' is a special feature that instructs the AI to focus on creating a well-structured narrative. When enabled, the AI ensures the script follows a classic story arc, with clear plot points, character development, and an engaging flow, making it ideal for short films or narrative-driven videos."
    }
];

export default function AiScriptWriterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }) }}
      />
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
              <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                  AI Script Writer
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Generate high-quality, engaging scripts for any purpose with our <strong>AI script writer</strong>. Just provide a prompt, and our <strong>AI script generator</strong> will handle the rest, from video outlines to full podcast dialogues. This <strong>free AI script writer</strong> is designed to help you overcome writer's block and produce professional content in minutes. As the <strong>best AI script writer</strong> available, it offers a seamless experience for creating compelling narratives for any platform, making it an essential <strong>AI tool for writing scripts</strong>.
                </p>
              </div>

              <div className="mt-8">
                  <AiScriptWriterClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card className="bg-card/50">
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Describe Your Script:</strong> Enter a detailed prompt describing the script you need. Include the topic, format (e.g., YouTube video, podcast), desired length, and tone.</p>
                      <p><strong>2. Generate:</strong> Click the "Generate Script" button.</p>
                      <p><strong>3. Review & Refine:</strong> Copy the generated script and use it as a starting point. Feel free to edit and adapt it to your unique voice.</p>
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
                <h2>Unlock Your Creative Potential with an AI Script Writer</h2>
                <p>Writer's block is a common struggle for creators, but it doesn't have to be. An <strong>AI script writer</strong> is a powerful tool that can help you generate ideas, structure your narrative, and produce high-quality scripts in a fraction of the time it would take to write from scratch. Our platform offers a <strong>free AI script writer</strong> that is perfect for YouTubers, podcasters, filmmakers, and marketers who need to create engaging content on a consistent basis. Learn about the art of scriptwriting from the pros at the <a href="https://www.oscars.org/nicholl" target="_blank" rel="noopener noreferrer">Academy Nicholl Fellowships</a>.</p>
                <p>The <strong>AI script generator</strong> works by analyzing your input and creating a script that matches your specifications. You can provide a simple prompt or a detailed outline, and the AI will generate a script that is tailored to your needs. This makes it the <strong>best AI script writer</strong> for a wide range of applications. Whether you need an <strong>AI movie script generator</strong> for your next blockbuster or an <strong>AI video script generator</strong> for a marketing campaign, our tool can help you achieve your goals. You can even generate short-form content with our <Link href="/tools/reel-shorts-script-writer">Reel/Shorts Script Writer</Link>.</p>

                <h3>From Idea to Final Draft in Minutes</h3>
                <p>One of the greatest advantages of using an <strong>AI script writer online</strong> is the speed at which you can work. The <strong>AI story script generator</strong> can produce a complete story arc, including character dialogues and scene descriptions, in just a few minutes. This is particularly useful for creating a <strong>YouTube video script generator</strong> that can help you maintain a consistent upload schedule. The <strong>free AI script generator</strong> is also a great tool for brainstorming, allowing you to explore different ideas and angles for your content. Once your script is ready, use our <Link href="/tools/text-to-speech">Text-to-Speech Converter</Link> to bring it to life.</p>
                <p>Our commitment is to provide a top-tier <strong>AI script writing tool free</strong> of charge. It's a versatile <strong>script writer AI</strong> that can adapt to any genre or format. Stop staring at a blank page and start creating compelling scripts with the power of artificial intelligence. Try the <strong>best free AI script writer</strong> today and experience the future of content creation. Your next great story is just a prompt away.</p>
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
