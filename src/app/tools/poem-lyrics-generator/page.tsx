
import { type Metadata } from 'next';
import { PoemLyricsGeneratorClient } from '@/components/poem-lyrics-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


export const metadata: Metadata = {
  title: 'Free AI Poem & Song Lyrics Generator | Create Original Verses',
  description: 'Generate beautiful poems and creative song lyrics on any topic with our free AI-powered tool. Choose a genre, mood, and style to get started.',
};

const benefits = [
    "Overcome writer's block with creative inspiration.",
    "Generate song lyrics with verses and choruses.",
    "Create beautiful poems in various styles.",
    "Perfect for songwriters, poets, and content creators."
];

const faqs = [
    {
        question: "What is an AI Poem & Song Lyrics Generator?",
        answer: "An AI Poem & Song Lyrics Generator is a creative tool that uses artificial intelligence to write original poems and song lyrics based on your ideas. You provide a topic, genre, and mood, and the AI crafts unique verses for you."
    },
    {
        question: "How does the AI generate lyrics and poems?",
        answer: "The AI has been trained on a massive library of literature, poetry, and song lyrics. It understands poetic devices, rhyming schemes, and song structures. Based on your input, it generates new content that matches your desired style and theme."
    },
    {
        question: "Is this lyric and poem generator free?",
        answer: "Yes, our tool is completely free to use. We want to make creative writing accessible to everyone, from professional songwriters to hobbyist poets."
    },
    {
        question: "Can I use the generated lyrics for my own songs?",
        answer: "Yes, the generated lyrics are a great starting point for your own songs. You can use them as inspiration, modify them, or use them as they are in your creative projects. Always ensure your final work is original."
    },
    {
        question: "What kind of genres can the AI write in?",
        answer: "Our AI is versatile and can write in a wide variety of genres. For lyrics, it can handle Pop, Rap, Rock, and Country. For poems, it can create Sonnets, Haikus, Free Verse, and more. Just specify your desired genre in the input."
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "AI Poem & Song Lyrics Generator",
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Web",
      "description": "A free AI tool to generate poems and song lyrics from a topic, genre, and mood.",
      "url": "https://aitoolkitpro.netlify.app/tools/poem-lyrics-generator",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "150"
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

export default function PoemLyricsGeneratorPage() {
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
                  Poem & Song Lyrics Generator
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Unleash your inner artist with our <strong>AI poem & lyrics generator</strong>. Provide a topic, style, and mood, and let our AI craft beautiful poems and creative song lyrics for you. This <strong>free lyrics generator</strong> is perfect for songwriters, poets, and anyone looking for creative inspiration. As the <strong>best AI poem generator</strong>, it helps you express your ideas effortlessly.
                </p>
              </div>

              <div className="mt-8">
                  <PoemLyricsGeneratorClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Enter Topic:</strong> Describe the subject of your poem or song.</p>
                      <p><strong>2. Select Options:</strong> Choose the type, genre, mood, and language.</p>
                      <p><strong>3. Generate:</strong> Click the "Generate" button to let the AI write for you.</p>
                      <p><strong>4. Copy & Use:</strong> Copy the generated text and use it in your creative projects.</p>
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
                <h2>Find Your Voice with an AI Poem & Lyrics Generator</h2>
                <p>Whether you're a seasoned songwriter struggling with writer's block or a budding poet searching for inspiration, an <strong>AI poem & lyrics generator</strong> can be your creative partner. Our tool uses advanced AI to generate original poems and song lyrics tailored to your specifications. From heartfelt ballads to energetic rap verses, our <strong>AI song lyrics generator</strong> can help you find the words you're looking for. For more on songwriting, explore resources like <a href="https://www.bmi.com/songwriters" target="_blank" rel="noopener noreferrer">BMI for Songwriters</a>.</p>
                
                <p>The <strong>free AI poem generator</strong> is perfect for students, teachers, and anyone who wants to explore the art of poetry. You can experiment with different forms and styles, from classic sonnets to modern free verse. Our tool is designed to be the <strong>best AI lyrics generator</strong> by providing high-quality, creative content that you can use as a starting point for your own masterpieces. If you have a story to tell, start with our <Link href="/tools/story-plot-generator">Story Plot Generator</Link>.</p>

                <h3>How to Generate Creative Lyrics and Poems</h3>
                <p>Using our <strong>AI lyrics writer</strong> is simple. Just provide a topic, choose a genre and mood, and let the AI do the rest. The <strong>lyrics generator from topic</strong> feature allows you to create songs about anything you can imagine. The <strong>poem generator from words</strong> can take your ideas and weave them into beautiful, evocative poetry. It's a powerful <strong>AI rap lyrics generator</strong> for aspiring MCs and a versatile <strong>AI love song generator</strong> for romantics.</p>
                
                <p>Our <strong>free song lyric generator</strong> is a valuable tool for any musician. It can help you brainstorm ideas, break through creative blocks, and write songs faster than ever before. The <strong>random song lyrics generator</strong> is perfect for when you need a spark of inspiration. Stop waiting for your muse and start creating with the power of AI. Try our <strong>AI poem generator free</strong> tool today and unleash your inner wordsmith.</p>
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
