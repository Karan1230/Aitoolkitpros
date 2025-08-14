import { type Metadata } from 'next';
import { AiRecipeMakerClient } from '@/components/ai-recipe-maker-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


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
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Recipe Maker
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Don't know what to cook? Enter the ingredients you have, and let our AI create delicious recipes for you.
            </p>

            <div className="mt-8">
                <AiRecipeMakerClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
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

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Is this tool free?</AccordionTrigger>
                            <AccordionContent>
                            Yes, our AI Recipe Maker is 100% free to use. There are no hidden fees or subscriptions.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Do I need to have all the ingredients?</AccordionTrigger>
                            <AccordionContent>
                            The AI will prioritize the ingredients you list but may include common pantry staples like salt, pepper, or oil. It's designed to be flexible.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Can I use this for any dietary restriction?</AccordionTrigger>
                            <AccordionContent>
                            Absolutely. You can specify preferences like "vegetarian," "gluten-free," "vegan," or "low-carb" to get recipes that fit your needs.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
