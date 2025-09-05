
import { type Metadata } from 'next';
import { JokesShayariMakerClient } from '@/components/jokes-shayari-maker-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


export const metadata: Metadata = {
  title: 'Free AI Jokes & Shayari Maker | Instant Funny & Romantic Lines',
  description: 'Generate hilarious jokes, beautiful shayari, and clever pickup lines in any language with our free AI tool. Perfect for social media, chats, and fun.',
};

const benefits = [
    "Instantly get creative and original content.",
    "Perfect for breaking the ice or expressing feelings.",
    "Generate content in multiple languages.",
    "Save time thinking of witty or romantic lines."
];

const faqs = [
    {
        question: "What is an AI Jokes & Shayari Maker?",
        answer: "It's a creative tool that uses artificial intelligence to generate original jokes, shayari (a form of poetry in Hindi-Urdu), and pickup lines based on a topic and tone you provide."
    },
    {
        question: "How does the AI generate this content?",
        answer: "The AI has been trained on a massive dataset of literature, poetry, and comedy. It understands the structures, themes, and rhyming patterns of shayari, the setup and punchline of jokes, and the wit of pickup lines, allowing it to create new and relevant content."
    },
    {
        question: "Is this tool free to use?",
        answer: "Yes, our AI Jokes & Shayari Maker is completely free. You can generate as much content as you like for your personal use, social media, or just for fun."
    },
    {
        question: "Can I generate content in Hindi or other languages?",
        answer: "Yes! Our tool supports a wide range of languages. You can select your desired language, and the AI will generate the content in that language, which is especially great for creating authentic shayari."
    },
    {
        question: "Can I use the generated content on my social media?",
        answer: "Absolutely. The generated jokes, shayari, and pickup lines are perfect for sharing on platforms like Instagram, Facebook, WhatsApp, and Twitter to entertain your friends and followers."
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "AI Jokes & Shayari Maker",
      "applicationCategory": "EntertainmentApplication",
      "operatingSystem": "Web",
      "description": "A free AI tool to generate jokes, shayari, and pickup lines in any language. Perfect for social media, chats, and fun.",
      "url": "https://ai-toolkit-pro.vercel.app/tools/jokes-shayari-maker",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.7",
        "reviewCount": "180"
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

export default function JokesShayariMakerPage() {
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
                  AI Jokes & Shayari Maker
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Instantly generate jokes, shayari, and pickup lines with our <strong>AI Jokes & Shayari Maker</strong>. Whether you need a funny joke to share, a romantic shayari to express your feelings, or a witty pickup line to break the ice, our AI has you covered. Get creative content in seconds, tailored to your chosen topic, tone, and language.
                </p>
              </div>

              <div className="mt-8">
                  <JokesShayariMakerClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Choose Type:</strong> Select if you want a Joke, Shayari, or a Pickup Line.</p>
                      <p><strong>2. Enter Topic & Tone:</strong> Provide a topic and choose a tone (e.g., Funny, Romantic).</p>
                      <p><strong>3. Generate:</strong> Click the "Generate" button to get a list of creative lines.</p>
                      <p><strong>4. Copy & Share:</strong> Copy your favorite lines and share them with the world!</p>
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
                <h2>Express Yourself with AI-Generated Jokes and Shayari</h2>
                <p>Humor and poetry are timeless forms of expression. Our <strong>AI Jokes & Shayari Maker</strong> brings these art forms to your fingertips, allowing you to generate creative content for any occasion. Whether you want to make your friends laugh with a clever joke, or touch someone's heart with a beautiful shayari, our AI tool is here to help. For more about the rich history of Shayari, you can explore resources like <a href="https://en.wikipedia.org/wiki/Shayari" target="_blank" rel="noopener noreferrer">Wikipedia</a>.</p>
                
                <p>This tool is more than just a random generator. The AI understands context, tone, and language, allowing it to create content that is not only original but also relevant to your needs. Use it to create lighthearted content for your social media, or to find the perfect words for a special moment. You can also generate funny roasts with our <Link href="/tools/roast-joke-generator">Roast/Joke Generator</Link>.</p>
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
