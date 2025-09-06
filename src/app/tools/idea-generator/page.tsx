
import { type Metadata } from 'next';
import { IdeaGeneratorClient } from '@/components/idea-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


export const metadata: Metadata = {
  title: 'Free AI Idea Generator | Generate Business & Content Ideas',
  description: 'Generate endless creative ideas for business, marketing, content, and more with our free AI Idea Generator. Spark your next big project in any language.',
};

const benefits = [
    "Overcome creative blocks instantly.",
    "Discover new business or product opportunities.",
    "Generate engaging content ideas for your blog or social media.",
    "Explore marketing angles you haven't considered."
];

const faqs = [
    {
        question: "What is an AI idea generator?",
        answer: "An AI idea generator is a creative tool that uses artificial intelligence to brainstorm a wide range of ideas based on a topic you provide. It can generate concepts for businesses, marketing campaigns, content like blog posts or videos, new products, and much more."
    },
    {
        question: "How does the AI come up with the ideas?",
        answer: "The AI has been trained on a massive dataset of information from the internet. It understands connections between different concepts and industries. When you provide a topic, it uses this knowledge to generate relevant, creative, and often unexpected ideas that you might not have thought of on your own."
    },
    {
        question: "Is this free AI idea generator truly free?",
        answer: "Yes, our idea generator is completely free to use with no limitations. We want to provide a powerful brainstorming partner to help entrepreneurs, marketers, and creators kickstart their next big project."
    },
    {
        question: "Can I use this as a business idea generator?",
        answer: "Absolutely. This is one of its most popular uses. Simply select 'Business Idea' as the type, and the AI will provide you with a list of potential startup concepts related to your chosen topic or industry."
    },
    {
        question: "How can the content idea generator help my blog or YouTube channel?",
        answer: "If you're feeling stuck, the content idea generator can be a lifesaver. It can provide you with a list of engaging blog post titles, video concepts, or social media topics, ensuring your content calendar is always full of fresh ideas that will interest your audience."
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "AI Idea Generator",
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Web",
      "description": "A free AI tool to generate endless creative ideas for business, marketing, content, and more.",
      "url": "https://aitoolkitpro.netlify.app/tools/idea-generator",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "220"
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

export default function IdeaGeneratorPage() {
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
                  AI Idea Generator
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Stuck in a creative rut? Enter a topic and let our <strong>AI idea generator</strong> create a list of innovative ideas. Whether you need a <strong>business idea generator</strong> for your next startup or a <strong>content idea generator</strong> for your blog, this tool can help. Our <strong>free AI idea generator</strong> is perfect for entrepreneurs, marketers, and creators looking for fresh inspiration. As the <strong>best AI idea generator</strong>, it provides a wide range of creative concepts to get you started.
                </p>
              </div>

              <div className="mt-8">
                  <IdeaGeneratorClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Enter Your Topic:</strong> Be as specific or broad as you like (e.g., "sustainable fashion," "mobile apps for fitness").</p>
                      <p><strong>2. Choose Idea Type:</strong> Select the category of ideas you need, such as "Business" or "Content."</p>
                      <p><strong>3. Select Language:</strong> Pick your preferred language for the generated ideas.</p>
                      <p><strong>4. Generate:</strong> Click the "Generate Ideas" button and get a list of creative concepts in seconds.</p>
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
                <h2>Spark Your Next Big Project with an AI Idea Generator</h2>
                <p>Every great creation starts with an idea. But sometimes, finding that initial spark of inspiration can be a challenge. An <strong>AI idea generator</strong> is a powerful tool designed to help you overcome creative blocks and generate a wide range of ideas for any project. Our platform offers a versatile <strong>free AI idea generator</strong> that can be used for everything from brainstorming business concepts to planning your content calendar. For more on the creative process, check out <a href="https://www.inc.com/jeff-haden/the-science-of-creativity-how-to-get-more-great-ideas.html" target="_blank" rel="noopener noreferrer">Inc. Magazine's articles on creativity</a>.</p>
                
                <p>Our tool is designed to be the <strong>best AI idea generator</strong> by providing relevant and creative suggestions tailored to your needs. The <strong>AI business idea generator</strong> is perfect for aspiring entrepreneurs looking for their next venture. It can provide you with a list of innovative startup ideas, complete with potential business models and target audiences. For marketers and content creators, the <strong>AI content idea generator</strong> is an invaluable resource for keeping your content fresh and engaging. Once you have an idea, you can create a <Link href="/tools/slogan-generator">slogan</Link> for it.</p>

                <h3>Endless Inspiration for Any Field</h3>
                <p>The <strong>random idea generator</strong> feature is a great way to explore new and unexpected concepts. You can use the <strong>AI product idea generator</strong> to brainstorm new products for your e-commerce store, or the <strong>AI name generator</strong> to find the perfect name for your brand. The <strong>AI story idea generator</strong> is perfect for writers who need a creative prompt to get their next story started. Our <strong>online idea generator</strong> is a comprehensive tool that can help you in any creative endeavor. You can even generate a <Link href="/tools/ai-logo-maker">logo</Link> for your new idea.</p>
                
                <p>Whether you need a <strong>blog post idea generator</strong> for your website or a <strong>YouTube video idea generator</strong> for your channel, our tool can provide you with a wealth of inspiration. The <strong>free idea generator</strong> is accessible to everyone, so you can start brainstorming right away. Stop waiting for inspiration to strike and start generating your own with the power of AI. Try our <strong>AI idea generator free</strong> tool today and unlock your creative potential.</p>
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
