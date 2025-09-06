
import { type Metadata } from 'next';
import { AiRecipeMakerClient } from '@/components/ai-recipe-maker-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


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

const faqs = [
    {
        question: "What is an AI recipe maker?",
        answer: "An AI recipe maker is a smart tool that generates recipes based on a list of ingredients you provide. It helps you figure out what to cook with the items you already have in your kitchen, making meal planning easier and reducing food waste."
    },
    {
        question: "How does the AI recipe generator from ingredients work?",
        answer: "You simply enter the ingredients you have on hand, select your preferences for cuisine, meal type, and diet, and the AI will generate several complete recipes. It creatively combines your ingredients into delicious and easy-to-follow meal ideas."
    },
    {
        question: "Is this recipe generator AI free to use?",
        answer: "Yes, our AI recipe generator is completely free. Our goal is to make cooking more accessible, creative, and less wasteful for everyone, without any cost."
    },
    {
        question: "Can I use this for special diets like vegetarian or gluten-free?",
        answer: "Absolutely. Our tool is designed to be the best AI recipe generator for various dietary needs. You can specify preferences like Vegetarian, Vegan, Gluten-Free, Low-Carb, and more to get recipes that fit your lifestyle."
    },
    {
        question: "Will the AI only use the ingredients I list?",
        answer: "The AI recipe maker will prioritize the ingredients you list. However, it may also include common pantry staples like oil, salt, pepper, and spices to complete the recipe, assuming you have them available."
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "AI Recipe Maker",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "Web",
      "description": "A free AI tool to generate delicious recipes based on the ingredients you have at home, helping to reduce food waste.",
      "url": "https://aitoolkitpro.netlify.app/tools/ai-recipe-maker",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "180"
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

export default function AiRecipeMakerPage() {
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
