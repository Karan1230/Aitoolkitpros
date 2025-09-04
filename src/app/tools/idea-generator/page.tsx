
import { type Metadata } from 'next';
import { IdeaGeneratorClient } from '@/components/idea-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

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

export default function IdeaGeneratorPage() {
  return (
    <>
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
    </>
  );
}
