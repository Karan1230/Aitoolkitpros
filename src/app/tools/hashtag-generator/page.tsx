
import { type Metadata } from 'next';
import { HashtagGeneratorClient } from '@/components/hashtag-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Hashtag Generator | Boost Your Social Media Reach',
  description: 'Generate relevant, trending, and niche-specific hashtags for Instagram, TikTok, YouTube, and more with our free AI Hashtag Generator.',
};

const benefits = [
    "Increase the visibility and reach of your posts.",
    "Attract your target audience more effectively.",
    "Save time on hashtag research.",
    "Discover trending and niche hashtags in your industry."
];

export default function HashtagGeneratorPage() {
  return (
    <>
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
              <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                  AI Hashtag Generator
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Enter a topic and let our <strong>AI hashtag generator</strong> find the perfect hashtags to boost your social media presence. This <strong>free hashtag generator</strong> works for platforms like Instagram, TikTok, and more. As the <strong>best hashtag generator</strong>, it provides relevant and trending options to increase your reach. Use this <strong>Instagram hashtag generator</strong> to connect with a larger audience and enhance your content's visibility.
                </p>
              </div>

              <div className="mt-8">
                  <HashtagGeneratorClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Enter Your Topic:</strong> Provide a keyword, niche, or a short description of your post.</p>
                      <p><strong>2. Select Platform:</strong> Choose the social media platform you're posting on.</p>
                      <p><strong>3. Choose Style:</strong> Select the type of hashtags you need.</p>
                      <p><strong>4. Generate:</strong> Click the "Generate Hashtags" button to get a list of optimized hashtags.</p>
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
                <h2>Boost Your Reach with an AI Hashtag Generator</h2>
                <p>Hashtags are a vital component of any successful social media strategy. They help categorize your content and make it discoverable to a wider audience. An <strong>AI hashtag generator</strong> is a powerful tool that simplifies the process of finding the right hashtags for your posts. Our platform offers a <strong>free hashtag generator</strong> that can provide you with a list of relevant, trending, and niche-specific hashtags in seconds. It's the perfect tool for marketers, influencers, and anyone who wants to grow their social media presence.</p>
                <p>Our tool is designed to be the <strong>best hashtag generator</strong> by offering a combination of accuracy and ease of use. The <strong>hashtag generator AI</strong> analyzes your topic and suggests hashtags that are most likely to increase your reach and engagement. This makes it an invaluable <strong>Instagram hashtag generator</strong> for creating posts that connect with your target audience. The <strong>free hashtag generator for Instagram</strong> is also a great way to discover new trends and stay ahead of the competition.</p>

                <h3>Find the Perfect Hashtags for Any Platform</h3>
                <p>The versatility of our <strong>hashtag suggestion tool</strong> is one of its key strengths. It can be used as a <strong>TikTok hashtag generator</strong> to help your videos go viral, or as a <strong>YouTube hashtag generator</strong> to improve the discoverability of your content. The <strong>hashtag finder</strong> is designed to work across all major social media platforms, so you can maintain a consistent and effective hashtag strategy. Our <strong>free hashtag generator tool</strong> is a must-have for any serious content creator.</p>
                <p>Using our <strong>hashtag creator</strong> is simple. Just enter your topic, and the AI will do the rest. The <strong>AI hashtag generator free</strong> tool will provide you with a list of hashtags that you can copy and paste directly into your posts. Stop guessing which hashtags to use and start using a data-driven approach. Try our <strong>best free hashtag generator</strong> today and see the difference it can make in your social media performance.</p>
            </div>
        </div>
      </section>
    </>
  );
}
