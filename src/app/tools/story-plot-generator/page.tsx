
import { type Metadata } from 'next';
import { StoryPlotGeneratorClient } from '@/components/story-plot-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


export const metadata: Metadata = {
  title: 'Free AI Story Plot Generator | Create Unique Story Ideas',
  description: 'Generate endless story plots with our free AI tool. Get unique ideas with characters, settings, conflicts, and resolutions for any genre.',
};

const benefits = [
    "Overcome writer's block with endless inspiration.",
    "Develop complex characters and settings effortlessly.",
    "Structure your narrative with a clear plot outline.",
    "Explore different genres and story angles."
];

const faqs = [
    {
        question: "What is an AI story plot generator?",
        answer: "An AI story plot generator is a creative tool that uses artificial intelligence to generate unique story ideas. It can create a complete plot outline, including a title, logline, characters, setting, conflict, and resolution, based on a genre and other optional details you provide."
    },
    {
        question: "How can this AI story generator help me with writer's block?",
        answer: "This tool is the perfect antidote to writer's block. Instead of staring at a blank page, you can generate dozens of unique story ideas in seconds. It provides a solid foundation with characters and plot points that you can then develop into your own original work."
    },
    {
        question: "Is this free AI story generator really free?",
        answer: "Yes, our story plot generator is completely free to use. It's designed to be a helpful resource for writers of all levels, from hobbyists to professional authors, to spark creativity without any cost."
    },
    {
        question: "Can I provide my own characters or setting?",
        answer: "Absolutely. While the AI can generate everything for you, the tool is more powerful when you provide your own details. You can input your own character ideas, setting concepts, or themes to guide the AI in generating a plot that is more tailored to your vision."
    },
    {
        question: "What's the difference between 'Detailed Plot' and 'Chapter Outline'?",
        answer: "'Detailed Plot' provides a multi-paragraph summary of the entire story from beginning to end. 'Chapter Outline' breaks the story down into a list of chapter-by-chapter plot points, which can be very useful for structuring a novel or a long-form story."
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "AI Story Plot Generator",
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Web",
      "description": "A free AI tool to generate endless story plots with unique ideas, characters, settings, conflicts, and resolutions for any genre.",
      "url": "https://ai-toolkit-pro.vercel.app/tools/story-plot-generator",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "190"
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

export default function StoryPlotGeneratorPage() {
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
                  AI Story Plot Generator
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Never stare at a blank page again with our <strong>AI story plot generator</strong>. Generate unique story ideas, complete with characters, settings, conflict, and resolution for any genre to kickstart your writing. This <strong>AI story generator</strong> is the perfect tool for writers of all levels. As the <strong>best AI story generator</strong>, it provides endless inspiration. Use our <strong>free AI story generator</strong> to craft your next masterpiece.
                </p>
              </div>

              <div className="mt-8">
                  <StoryPlotGeneratorClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Choose a Genre:</strong> Select the genre that fits your story.</p>
                      <p><strong>2. Select Plot Detail:</strong> Choose how detailed you want the plot to be.</p>
                      <p><strong>3. (Optional) Add Details:</strong> Specify characters, setting, or a theme to guide the AI.</p>
                      <p><strong>4. Generate:</strong> Click the "Generate Plot" button and watch your story come to life.</p>
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
                <h2>Conquer Writer's Block with an AI Story Plot Generator</h2>
                <p>Every writer knows the feeling of staring at a blank page, waiting for inspiration to strike. An <strong>AI story plot generator</strong> is a powerful tool that can help you overcome writer's block and generate a wealth of creative ideas. Our platform offers a sophisticated <strong>AI story generator</strong> that can create unique plots, characters, and settings for any genre. It's the perfect companion for novelists, screenwriters, and anyone who loves to tell stories. For writing tips, check out <a href="https://www.masterclass.com/articles/writing-101" target="_blank" rel="noopener noreferrer">MasterClass</a>.</p>
                
                <p>Our tool is designed to be the <strong>best AI story generator</strong> by providing detailed and imaginative story elements. The <strong>free AI story generator</strong> is easy to use; simply choose a genre, and the AI will do the rest. This makes it an invaluable <strong>AI story writer</strong> for authors who need a creative spark to get started. The <strong>AI generated stories</strong> are not just random collections of ideas; they are coherent and well-structured narratives that can serve as the foundation for your next masterpiece. Once you have a plot, you can use our <Link href="/tools/ai-script-writer">AI Script Writer</Link> to write the full script.</p>
                
                <h3>From a Single Prompt to a Complete Story</h3>
                <p>The <strong>AI story generator from prompt</strong> feature allows you to guide the creative process. You can provide a simple idea or a detailed outline, and the AI will build a story around it. This makes it a versatile <strong>AI short story generator</strong> for creating everything from flash fiction to novellas. The <strong>random story generator</strong> is perfect for when you want to be surprised with a completely new and unexpected idea. Our <strong>AI story creator</strong> is a fun and engaging way to explore your creativity. You can also generate character ideas with our <Link href="/tools/cartoon-avatar-maker">Cartoon Avatar Maker</Link>.</p>
                
                <p>Whether you're writing a fantasy epic, a thrilling mystery, or a heartwarming romance, our <strong>AI novel generator</strong> can help you craft a compelling narrative. It's a powerful <strong>plot generator</strong> that can save you hours of brainstorming and outlining. Stop waiting for your muse and start creating your own inspiration with the power of AI. Try our <strong>best AI story generator free</strong> tool today and unlock your storytelling potential.</p>
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
