
import { type Metadata } from 'next';
import { YoutubeSeoToolClient } from '@/components/youtube-seo-tool-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI YouTube SEO Tool | Boost Your Video Rankings',
  description: 'Analyze your YouTube videos, channels, and keywords with our free AI SEO tool. Get optimized titles, descriptions, tags, and an SEO score to rank higher.',
};

const benefits = [
    "Increase video visibility and reach.",
    "Get a data-driven SEO score for your content.",
    "Find high-ranking keywords from competitors.",
    "Optimize titles, descriptions, and tags instantly."
];

export default function YoutubeSeoToolPage() {
  return (
    <>
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
              <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                  AI YouTube SEO Tool
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Get everything you need to rank higher on YouTube with our <strong>AI YouTube SEO tool</strong>. Analyze videos, channels, or keywords to get an instant SEO score and AI-powered recommendations. This <strong>free YouTube SEO tool</strong> is the <strong>best YouTube SEO tool</strong> for creators looking to grow their audience. Use our <strong>YouTube keyword tool</strong> to find high-ranking keywords and optimize your content for maximum visibility.
                </p>
              </div>

              <div className="mt-8">
                  <YoutubeSeoToolClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card className="bg-card/50">
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Choose Analysis Type:</strong> Select whether you want to analyze a video, channel, or keyword.</p>
                      <p><strong>2. Enter Input:</strong> Paste a YouTube URL or type a keyword.</p>
                      <p><strong>3. Generate Report:</strong> Click "Analyze" to get your comprehensive SEO report.</p>
                      <p><strong>4. Apply Suggestions:</strong> Copy the optimized title, description, and tags to improve your video's performance.</p>
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
                <h2>Optimize Your Videos with an AI YouTube SEO Tool</h2>
                <p>YouTube is the second largest search engine in the world, making SEO a critical component of any successful channel. An <strong>AI YouTube SEO tool</strong> is a powerful asset that can help you optimize your videos for maximum visibility and reach. Our platform offers a comprehensive <strong>free YouTube SEO tool</strong> that provides you with everything you need to improve your rankings, from keyword analysis to title and description optimization.</p>
                <p>Our tool is designed to be the <strong>best YouTube SEO tool</strong> by offering a suite of features that are both powerful and easy to use. The <strong>YouTube keyword tool</strong> helps you find high-ranking keywords that your target audience is searching for. The <strong>YouTube tag generator</strong> provides you with a list of relevant tags to help your videos get discovered. With our <strong>YouTube SEO tool free</strong> of charge, you can take your channel to the next level without breaking the bank.</p>

                <h3>From Analysis to Optimization in Minutes</h3>
                <p>The <strong>AI YouTube title generator</strong> can help you craft compelling titles that grab attention and entice viewers to click. The <strong>YouTube description generator</strong> creates keyword-rich descriptions that help YouTube's algorithm understand what your video is about. Our <strong>YouTube tag extractor</strong> allows you to see the tags that your competitors are using, giving you a competitive edge. This makes our tool the <strong>best free YouTube tag generator</strong> on the market.</p>
                <p>Whether you're a seasoned YouTuber or just starting, our <strong>YouTube keyword research tool</strong> can help you grow your audience. It's a versatile <strong>YouTube SEO software</strong> that can be used to optimize individual videos or your entire channel. Stop guessing what works and start using a data-driven approach to YouTube SEO. Try our <strong>best YouTube keyword tool</strong> today and see the difference it can make in your video performance.</p>
            </div>
        </div>
      </section>
    </>
  );
}
