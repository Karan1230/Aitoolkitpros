
import { type Metadata } from 'next';
import { GiftSuggestionToolClient } from '@/components/gift-suggestion-tool-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Gift Suggestion Tool | Find the Perfect Gift',
  description: 'Get personalized gift ideas for any occasion, age, or interest with our free AI-powered tool. Find the perfect present for birthdays, anniversaries, and more.',
};

const benefits = [
    "Find unique gifts tailored to the recipient.",
    "Save time searching for the perfect present.",
    "Get ideas for any budget or occasion.",
    "Surprise your loved ones with thoughtful gifts."
];

export default function GiftSuggestionToolPage() {
  return (
    <>
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
              <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                  AI Gift Suggestion Tool
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Never struggle to find the perfect gift again with our <strong>AI gift suggestion tool</strong>. Describe the recipient and occasion, and our <strong>AI gift ideas generator</strong> will suggest thoughtful presents tailored to their interests and your budget. This <strong>AI gift finder</strong> is the ultimate solution for finding the perfect present for any event. Use our <strong>free gift idea generator</strong> to make every celebration special.
                </p>
              </div>

              <div className="mt-8">
                  <GiftSuggestionToolClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Describe Recipient:</strong> Enter the person's interests, age, and the occasion.</p>
                      <p><strong>2. Set Budget:</strong> Choose a price range for your gift.</p>
                      <p><strong>3. Generate:</strong> Click the "Suggest Gifts" button to get a list of personalized ideas.</p>
                      <p><strong>4. Copy or Download:</strong> Save your favorite ideas for later.</p>
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
                <h2>Find the Perfect Present with an AI Gift Suggestion Tool</h2>
                <p>Finding the perfect gift can be a stressful experience. An <strong>AI gift suggestion tool</strong> is designed to make this process easy and enjoyable. Our platform offers a powerful <strong>AI gift ideas generator</strong> that can help you find the ideal present for any person and any occasion. Whether you're shopping for a birthday, anniversary, or holiday, our <strong>gift recommendation AI</strong> is here to help you make a thoughtful choice.</p>
                <p>Our tool is more than just a simple gift finder; it's a sophisticated <strong>AI gift finder</strong> that takes into account the recipient's interests, age, and your budget. The <strong>AI gift generator</strong> provides a curated list of suggestions, complete with descriptions and categories, to help you make an informed decision. This makes it the <strong>best AI gift finder</strong> for anyone who wants to give a meaningful and personalized gift.</p>
                
                <h3>Personalized Gift Ideas for Everyone</h3>
                <p>The <strong>AI personalized gift suggestions</strong> feature is what sets our tool apart. By understanding the recipient's hobbies and passions, the <strong>AI gift recommender</strong> can suggest presents that they will truly love. It's a versatile <strong>gift idea generator free</strong> tool that can be used for friends, family, and colleagues. The <strong>AI present finder</strong> is perfect for those hard-to-shop-for people in your life.</p>
                <p>Whether you need a <strong>Christmas gift generator</strong> to get a head start on your holiday shopping or a <strong>birthday gift idea generator</strong> for an upcoming celebration, our tool is here to help. The <strong>free gift idea generator</strong> is a great way to discover new and unique gift ideas that you might not have thought of on your own. Stop stressing about gift shopping and start using the power of AI to find the perfect present. Try our <strong>AI gift suggestion tool</strong> today and make every gift-giving occasion a success.</p>
            </div>
        </div>
      </section>
    </>
  );
}
