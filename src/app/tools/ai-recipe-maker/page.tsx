
import { type Metadata } from 'next';
import { AiRecipeMakerClient } from '@/components/ai-recipe-maker-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free AI Recipe Maker | Recipes from Your Ingredients',
  description: 'Generate delicious recipes based on the ingredients you have at home. Our free AI tool helps you cook amazing meals and reduce food waste.',
};

const benefits = [
    "Reduce food waste by using what you have.",
    "Discover new and exciting meal ideas.",
    "Get recipes for any cuisine or dietary need.",
    "Save time on meal planning and grocery lists."
];

export default function AiRecipeMakerPage() {
  return (
    <>
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
              <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                  AI Recipe Maker
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Don't know what to cook? Our <strong>AI recipe maker</strong> can help. Enter the ingredients you have, and let our <strong>AI recipe generator</strong> create delicious recipes for you. This powerful <strong>AI recipe generator from ingredients</strong> helps you reduce food waste and discover new meal ideas. As the <strong>best AI recipe generator</strong> available for free, it provides a simple way to get creative in the kitchen. Just input what you have, and this <strong>recipe generator AI</strong> will do the rest.
                </p>
              </div>

              <div className="mt-8">
                  <AiRecipeMakerClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card className="bg-card/50">
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. List Ingredients:</strong> Enter the ingredients you have on hand, separated by commas.</p>
                      <p><strong>2. Set Preferences:</strong> Choose your desired cuisine, meal type, and any dietary restrictions.</p>
                      <p><strong>3. Generate:</strong> Click the "Generate Recipes" button to get unique recipe ideas.</p>
                      <p><strong>4. Cook & Enjoy:</strong> Follow the step-by-step instructions and enjoy your meal!</p>
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
                <h2>Transform Your Kitchen with an AI Recipe Maker</h2>
                <p>How many times have you stared into your fridge, full of ingredients, yet feeling like you have nothing to cook? An <strong>AI recipe maker</strong> is the perfect solution to this common dilemma. Our innovative tool acts as your personal chef, taking the ingredients you already have and transforming them into delicious, easy-to-follow recipes. This not only sparks creativity in the kitchen but also helps you reduce food waste and save money. It’s a smart, sustainable way to approach meal planning, a concept championed by organizations like <a href="https://www.feedingamerica.org/our-work/reduce-food-waste" target="_blank" rel="noopener noreferrer">Feeding America</a>.</p>
                <p>Our platform features the <strong>best AI recipe generator</strong> because it is designed with the user in mind. The <strong>AI recipe generator from ingredients</strong> is incredibly intuitive; simply list what you have on hand, and the AI will provide a variety of meal ideas. You can also customize the results based on your dietary preferences, such as vegetarian, gluten-free, or low-carb. This makes it a versatile <strong>recipe generator by ingredients free</strong> tool that caters to your specific needs. Need a gift for a foodie friend? Try our <Link href="/tools/gift-suggestion-tool">Gift Suggestion Tool</Link>.</p>
                
                <h3>Endless Culinary Inspiration at Your Fingertips</h3>
                <p>The power of our <strong>recipe generator AI</strong> lies in its vast database of culinary knowledge. It can suggest recipes from various cuisines, from Italian to Thai, and for any meal type, whether it's a quick breakfast or a gourmet dinner. This <strong>free AI recipe generator</strong> is like having a cookbook that writes itself based on what's in your pantry. It’s the ultimate kitchen assistant for busy families, students, and anyone looking to simplify their cooking routine.</p>
                <p>Using the <strong>recipe generator from ingredients</strong> is a fun and exciting way to discover new dishes. You might be surprised by the creative combinations our <strong>AI generated recipes</strong> can come up with. It’s also a great way to learn new cooking techniques and expand your culinary skills. Stop letting good food go to waste and start making delicious meals with what you have. Try our <strong>AI recipe generator free</strong> today and revolutionize the way you cook.</p>
            </div>
        </div>
      </section>
    </>
  );
}
