
import { type Metadata } from 'next';
import { RoastJokeGeneratorClient } from '@/components/roast-joke-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


export const metadata: Metadata = {
  title: 'Free AI Roast & Joke Generator | Create Funny Lines Instantly',
  description: 'Generate hilarious roasts, jokes, and one-liners with our free AI tool. Choose a tone and topic to get creative and funny content in seconds.',
};

const benefits = [
    "Instantly generate funny content for any occasion.",
    "Come up with witty comebacks and one-liners.",
    "Entertain friends, family, or your social media followers.",
    "Choose from multiple tones to match your style."
];

const faqs = [
    {
        question: "What is an AI roast & joke generator?",
        answer: "An AI roast & joke generator is a creative tool that uses artificial intelligence to write funny content. You can provide a topic, name, or scenario, and the AI will generate a list of original jokes, roasts, or one-liners based on your selected mode and tone."
    },
    {
        question: "How does the AI joke generator work?",
        answer: "The AI has been trained on a vast amount of comedic material, including jokes, stand-up comedy, and roasts. It understands different comedic styles (like sarcasm, dark humor, or wholesome fun) and can apply them to the topic you provide to create relevant and funny content."
    },
    {
        question: "Is this funny joke generator free to use?",
        answer: "Yes, our roast and joke generator is completely free. You can generate unlimited lists of jokes and roasts for any occasion without any cost."
    },
    {
        question: "What is 'Family-Friendly' mode?",
        answer: "When you enable the 'Family-Friendly' (or Safe Search) mode, the AI will strictly avoid generating content that is vulgar, offensive, or otherwise inappropriate for all ages. It's perfect for when you need clean humor for a family event or a professional setting."
    },
    {
        question: "Can the AI roast my friend?",
        answer: "Yes! Simply enter your friend's name or a funny trait as the topic, select 'Roast' mode, and choose a tone. The AI will generate a list of lighthearted (or savage, depending on your choice) roasts you can use. Remember to always keep it friendly!"
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "AI Roast & Joke Generator",
      "applicationCategory": "EntertainmentApplication",
      "operatingSystem": "Web",
      "description": "A free AI tool to generate hilarious roasts, jokes, and one-liners. Choose a tone and topic to get creative and funny content in seconds.",
      "url": "https://ai-toolkit-pro.vercel.app/tools/roast-joke-generator",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "250"
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

export default function RoastJokeGeneratorPage() {
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
                  AI Roast & Joke Generator
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Unleash your inner comedian with our <strong>AI roast & joke generator</strong>. Enter a topic, pick a style, and let our <strong>AI joke generator</strong> create hilarious roasts, jokes, and one-liners for any occasion. This <strong>free joke generator</strong> is perfect for social gatherings, online content, or just having a laugh. As the <strong>best AI joke generator</strong>, it offers a wide range of humorous content to keep you and your friends entertained.
                </p>
              </div>

              <div className="mt-8">
                  <RoastJokeGeneratorClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Enter a Topic:</strong> Write a name, topic, or scenario you want to joke about.</p>
                      <p><strong>2. Choose Mode & Tone:</strong> Select whether you want a roast, a joke, or a mix, and pick the comedic tone.</p>
                      <p><strong>3. Generate:</strong> Click the "Generate" button and let the AI craft some witty lines.</p>
                      <p><strong>4. Copy & Share:</strong> Copy your favorite jokes and share them with the world!</p>
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
                <h2>Generate Laughter with an AI Roast & Joke Generator</h2>
                <p>Humor is a powerful way to connect with people, and an <strong>AI roast & joke generator</strong> is the perfect tool to have in your comedic arsenal. Our platform offers a versatile <strong>AI joke generator</strong> that can create everything from lighthearted one-liners to savage roasts. Whether you're preparing for a friendly roast, writing a comedy script, or just want to have some fun, our <strong>funny joke generator</strong> is here to help you craft the perfect punchline. For more on the art of comedy, check out resources from <a href="https://www.vulture.com/comedy/" target="_blank" rel="noopener noreferrer">Vulture</a>.</p>
                
                <p>Our tool is designed to be the <strong>best AI joke generator</strong> by offering a wide range of tones and styles. You can use the <strong>AI roast generator</strong> to come up with witty insults for a friend's birthday, or the <strong>dirty joke generator</strong> for more adult-oriented humor. The <strong>free joke generator</strong> is accessible to everyone, so you can start creating hilarious content right away. It's a fun and easy way to bring more laughter into your life. You can even generate funny images with our <Link href="/tools/meme-generator">Meme Generator</Link>.</p>
                
                <h3>Endless Jokes for Any Occasion</h3>
                <p>The <strong>random joke generator</strong> feature is perfect for when you need a quick laugh. The <strong>joke writer AI</strong> can generate jokes on any topic, from everyday life to pop culture. This makes it a great <strong>stand up comedy joke generator</strong> for aspiring comedians who need new material. The <strong>joke creator</strong> is also a fantastic tool for social media content, helping you create posts that are sure to get a reaction. Pair your jokes with a funny avatar from our <Link href="/tools/cartoon-avatar-maker">Cartoon Avatar Maker</Link>.</p>
                
                <p>Whether you need a <strong>dad joke generator</strong> to entertain your kids or a <strong>dark humor joke generator</strong> to share with your friends, our tool has you covered. It's a versatile <strong>joke maker</strong> that can adapt to any comedic style. Stop struggling to come up with funny material and start using the power of AI to generate laughter on demand. Try our <strong>AI joke writer free</strong> tool today and become the life of the party.</p>
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
