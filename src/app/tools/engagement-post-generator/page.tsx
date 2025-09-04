
import { type Metadata } from 'next';
import { EngagementPostGeneratorClient } from '@/components/engagement-post-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free AI Engagement Post Ideas Generator',
  description: 'Generate creative post ideas for Instagram, Facebook, TikTok and more to boost your social media engagement. Get captions and hashtags instantly.',
};

const benefits = [
    "Spark conversations with your audience.",
    "Increase likes, comments, and shares.",
    "Save time brainstorming content ideas.",
    "Keep your social media feed fresh and engaging."
];

export default function EngagementPostGeneratorPage() {
  return (
    <>
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
              <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                  Engagement Post Ideas Generator
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Never run out of content ideas with our <strong>engagement post ideas generator</strong>. Generate engaging posts with captions and hashtags to keep your audience hooked on Instagram, TikTok, and other platforms. This <strong>AI post generator</strong> is the perfect tool for creating high-quality content that drives interaction. Use our <strong>social media post generator</strong> to craft compelling posts that resonate with your audience and boost your online presence.
                </p>
              </div>

              <div className="mt-8">
                  <EngagementPostGeneratorClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Enter Topic:</strong> Provide a topic, niche, or audience you want to create content for.</p>
                      <p><strong>2. Select Platform & Type:</strong> Choose your social media platform and the type of content you need.</p>
                      <p><strong>3. Generate:</strong> Click the "Generate Ideas" button to get a list of creative post ideas.</p>
                      <p><strong>4. Copy & Use:</strong> Copy your favorite idea and post it directly to your social media.</p>
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
                <h2>Boost Your Social Media with an Engagement Post Ideas Generator</h2>
                <p>In the crowded world of social media, engagement is everything. An <strong>engagement post ideas generator</strong> is a must-have tool for any marketer or content creator looking to stand out. Our platform offers a powerful <strong>AI post generator</strong> that can help you create a steady stream of fresh and engaging content. Whether you need ideas for Instagram, Facebook, or TikTok, our <strong>social media post generator</strong> is designed to help you connect with your audience and drive interaction. For more social media tips, check out <a href="https://socialmediaexaminer.com/" target="_blank" rel="noopener noreferrer">Social Media Examiner</a>.</p>
                <p>Our tool is more than just a simple content spinner; it's a sophisticated <strong>AI content generator for social media</strong> that understands what makes a post engaging. The <strong>AI social media post generator free</strong> tool can generate questions, polls, challenges, and more, all tailored to your specific niche. This makes it the <strong>best AI social media post generator</strong> for creating a vibrant and interactive online community. With our <strong>free AI social media post generator</strong>, you'll never have to worry about running out of ideas again. You can also generate relevant hashtags with our <Link href="/tools/hashtag-generator">Hashtag Generator</Link>.</p>
                
                <h3>Create Content That Converts</h3>
                <p>Using our <strong>AI generated social media posts</strong> is a great way to save time and effort on content creation. The <strong>social media content generator free</strong> tool can produce a week's worth of content in just a few minutes. It's a versatile <strong>social media post creator</strong> that can adapt to any brand voice or style. The <strong>Facebook post generator</strong> is perfect for creating long-form content that tells a story, while the <strong>Instagram post generator</strong> focuses on visually-driven captions that grab attention. For longer form content, try our <Link href="/tools/ai-script-writer">AI Script Writer</Link>.</p>
                <p>Our <strong>free social media post generator</strong> is also a great tool for brainstorming and A/B testing different types of content. The <strong>AI post creator</strong> can help you identify what resonates with your audience, so you can create more of what they love. Stop struggling with content creation and start using the power of AI to grow your social media presence. Try our <strong>AI social media content generator free</strong> tool today and see the difference for yourself.</p>
            </div>
        </div>
      </section>
    </>
  );
}
