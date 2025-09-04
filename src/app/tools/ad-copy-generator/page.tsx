
import { type Metadata } from 'next';
import { AdCopyGeneratorClient } from '@/components/ad-copy-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free AI Ad Copy Generator | Create High-Converting Ads',
  description: 'Generate effective ad copy for Google, Facebook, Instagram, and more with our free AI tool. Create headlines, body text, and CTAs in seconds.',
};

const benefits = [
    "Create high-converting ad copy in seconds.",
    "Optimize your ads for different platforms.",
    "A/B test multiple variations to find the winner.",
    "Save time and money on copywriting."
];

export default function AdCopyGeneratorPage() {
  return (
    <>
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-3">
              <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                  AI Ad Copy Generator
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Our free <strong>ad-copy-generator</strong> is your ultimate solution for creating compelling and high-converting ad copy. Whether you need an <strong>AI ad copy generator</strong> for Google Ads, Facebook, Instagram, or LinkedIn, our tool is designed to meet your needs. By leveraging advanced artificial intelligence, this tool helps you craft persuasive headlines, engaging body text, and powerful calls-to-action in just seconds. It is the perfect assistant for marketers, business owners, and content creators looking to enhance their advertising campaigns without the high cost of a professional copywriter.
                </p>
              </div>

              <div className="mt-8">
                  <AdCopyGeneratorClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card className="bg-card/50">
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm md:text-base">
                      <p><strong>1. Enter Details:</strong> Provide product info, your target audience, and key selling points.</p>
                      <p><strong>2. Select Platform & Tone:</strong> Choose the ad platform and the tone of voice for your copy.</p>
                      <p><strong>3. Generate:</strong> Click the "Generate Ad Copy" button to get multiple ad variations.</p>
                      <p><strong>4. Copy & Use:</strong> Copy your favorite ad variation and use it in your campaign.</p>
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
                              <span className="text-sm md:text-base">{benefit}</span>
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
                <h2>Unlock High-Converting Ads with an AI Ad Copy Generator</h2>
                <p>In today's competitive digital landscape, crafting ad copy that not only grabs attention but also converts is more critical than ever. This is where an <strong>AI ad copy generator</strong> becomes an invaluable asset for any marketer. Our tool is designed to be the <strong>best ad copy generator</strong> available for free, providing you with everything you need to launch a successful campaign. Whether you're a seasoned professional or just starting, our platform simplifies the creative process, allowing you to focus on strategy while the AI handles the writing. For a great campaign, you also need a powerful brand identity, which you can create with our <Link href="/tools/ai-logo-maker">AI Logo Maker</Link>.</p>
                <p>One of the biggest challenges in advertising is creating platform-specific content. An effective Google ad is vastly different from a compelling Instagram post. Our <strong>free ad copy generator</strong> takes this into account, optimizing the text for your chosen platform. Are you running a campaign on Facebook? The <strong>Facebook ad copy generator</strong> will produce longer, more narrative-driven content. For Google Ads, the focus will be on concise, keyword-rich headlines and descriptions. This level of customization ensures your message resonates with the right audience in the right context, as explained by marketing experts at <a href="https://neilpatel.com/blog/ad-copy/" target="_blank" rel="noopener noreferrer">Neil Patel's blog</a>.</p>
                
                <h3>How Does the Ad Copy Generator Work?</h3>
                <p>Using our <strong>ad-copy-generator</strong> is incredibly simple. You start by inputting key details about your product or service, your target audience, and the main selling points. The AI then analyzes this information to understand your brand's voice and objectives. From there, it generates multiple ad copy variations, giving you a range of options to A/B test. This data-driven approach helps you identify what works best, improving your ROI and lowering your cost per acquisition. The tool functions as a <strong>free ad copy writer</strong>, saving you countless hours and significant budget that would otherwise be spent on manual copywriting. To further enhance your social media presence, pair your ad copy with the right hashtags using our <Link href="/tools/hashtag-generator">Hashtag Generator</Link>.</p>
                <p>The applications are limitless. Use it as an <strong>Instagram ad copy generator</strong> to create visually-driven text that complements your images and videos. Leverage it as a <strong>Google ad copy generator</strong> to dominate search results with perfectly crafted headlines. No matter your goal—be it increasing brand awareness, driving traffic, or boosting sales—our <strong>AI ad copy generator</strong> is engineered to deliver results. Stop guessing and start generating ad copy that converts with the power of artificial intelligence.</p>
            </div>
        </div>
      </section>
    </>
  );
}
