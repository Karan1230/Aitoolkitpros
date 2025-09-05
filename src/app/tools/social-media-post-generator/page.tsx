
import { type Metadata } from 'next';
import { SocialMediaPostClient } from '@/components/social-media-post-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


export const metadata: Metadata = {
  title: 'Free Social Media Post Generator | AI-Powered Captions',
  description: 'Generate engaging social media posts and captions with hashtags using our free AI tool. Perfect for Instagram, Facebook, Twitter, and LinkedIn.',
};

const benefits = [
    "Create compelling content in seconds.",
    "Get relevant hashtags to boost reach.",
    "Generate posts for multiple platforms.",
    "Save time and overcome creative blocks."
];

const faqs = [
    {
        question: "What is an AI social media post generator?",
        answer: "An AI social media post generator is a tool that uses artificial intelligence to create posts for platforms like Instagram, Facebook, and Twitter. You provide a topic, and the AI writes an engaging caption and suggests relevant hashtags to go with it."
    },
    {
        question: "How can this AI content generator for social media save me time?",
        answer: "Instead of brainstorming and writing every post from scratch, you can generate multiple ideas in seconds. This is perfect for social media managers, small business owners, and anyone who needs to maintain a consistent posting schedule without spending hours on content creation."
    },
    {
        question: "Is this free social media post generator really free?",
        answer: "Yes, our social media post generator is completely free to use. You can generate unlimited posts and captions to keep your social media feeds active and engaging."
    },
    {
        question: "Does the AI include hashtags in the generated posts?",
        answer: "Yes, our AI understands the importance of hashtags for discoverability. For each post it generates, it also provides a list of relevant hashtags to help your content reach a wider, more targeted audience."
    },
    {
        question: "Can I use this for my business's LinkedIn or Facebook page?",
        answer: "Absolutely. While it's great for visual platforms like Instagram, it's also an effective LinkedIn post generator and Facebook post generator. It can create professional and informative content suitable for a business audience."
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Social Media Post Generator",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "description": "A free AI tool to generate engaging social media posts and captions with hashtags for platforms like Instagram, Facebook, Twitter, and LinkedIn.",
      "url": "https://ai-toolkit-pro.vercel.app/tools/social-media-post-generator",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "225"
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

export default function SocialMediaPostGeneratorPage() {
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
                  Social Media Post Generator
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Enter a topic and let our <strong>social media post generator</strong> create engaging posts for your channels. This <strong>AI social media post generator</strong> includes relevant hashtags to boost reach and save you time. As the <strong>best AI social media post generator</strong>, it helps you craft compelling content for platforms like Instagram, Facebook, and Twitter. Use our <strong>free social media post generator</strong> to keep your online presence active and engaging.
                </p>
              </div>

              <div className="mt-8">
                  <SocialMediaPostClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Enter a Topic:</strong> Provide a keyword or a brief description of what you want to post about.</p>
                      <p><strong>2. Select Language:</strong> Choose the language for your post.</p>
                      <p><strong>3. Generate:</strong> Click the "Generate Post" button and let the AI work its magic.</p>
                      <p><strong>4. Copy & Paste:</strong> Use the copy button and paste the content directly to your social media platform.</p>
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
                <h2>Supercharge Your Social Media with an AI Post Generator</h2>
                <p>Consistency is key to a successful social media strategy, but creating fresh and engaging content every day can be a challenge. A <strong>social media post generator</strong> is an essential tool for any marketer, business owner, or influencer who wants to maintain an active online presence. Our platform offers a powerful <strong>AI social media post generator</strong> that can create high-quality content for a variety of platforms, from Instagram to LinkedIn. For more on social media strategy, check out <a href="https://blog.hootsuite.com/" target="_blank" rel="noopener noreferrer">Hootsuite's blog</a>.</p>
                
                <p>Our tool is designed to be the <strong>best AI social media post generator</strong> by providing relevant, creative, and optimized content. The <strong>AI content generator for social media</strong> can help you brainstorm ideas, write compelling captions, and even suggest relevant hashtags to increase your reach. The <strong>free AI social media post generator</strong> is a great way to save time and effort on content creation, so you can focus on what you do best: running your business. For more targeted engagement, try our <Link href="/tools/engagement-post-generator">Engagement Post Ideas Generator</Link>.</p>

                <h3>Create Engaging Content for Any Platform</h3>
                <p>The versatility of our <strong>AI generated social media posts</strong> is one of its greatest strengths. You can use it as an <strong>Instagram post generator</strong> to create visually-driven content, a <strong>Facebook post generator</strong> for more in-depth posts, or a <strong>LinkedIn post generator</strong> for professional updates. The <strong>Twitter post generator</strong> is perfect for crafting short and snappy messages that grab attention. Our <strong>social media content generator free</strong> tool is a one-stop-shop for all your content needs. You can also generate hashtags with our <Link href="/tools/hashtag-generator">Hashtag Generator</Link>.</p>
                
                <p>Using our <strong>AI post creator</strong> is simple. Just enter a topic or a keyword, and the AI will generate a variety of post ideas for you to choose from. This makes it an invaluable <strong>social media post creator</strong> for anyone who needs to produce a high volume of content. Stop struggling with content creation and start using the power of AI to build a strong and engaging online presence. Try our <strong>AI social media content generator free</strong> tool today and see the results for yourself.</p>
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
