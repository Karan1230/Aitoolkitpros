import { type Metadata } from 'next';
import { GiftSuggestionToolClient } from '@/components/gift-suggestion-tool-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


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

const faqs = [
    {
        question: "1. Is this tool free?",
        answer: "Yes, our AI Gift Suggestion Tool is 100% free to use."
    },
    {
        question: "2. Does the tool provide links to buy the gifts?",
        answer: "No, the tool focuses on providing creative ideas. It does not provide direct links to products to ensure the suggestions are unbiased and to encourage you to shop at your favorite stores."
    },
    {
        question: "3. Can I use this for any occasion?",
        answer: "Absolutely. The tool is perfect for birthdays, anniversaries, holidays like Christmas or Diwali, or just to find a nice surprise for someone."
    },
    {
        question: "4. How does the AI generate personalized suggestions?",
        answer: "The AI analyzes the interests, age, occasion, and price range you provide to cross-reference it with a vast database of gift ideas, ensuring the suggestions are relevant and thoughtful."
    },
    {
        question: "5. How many gift ideas will I get?",
        answer: "The tool generates a list of 10 unique gift ideas for each request, giving you a wide range of options to consider."
    },
    {
        question: "6. Can I save the gift ideas for later?",
        answer: "Yes. You can use the 'Copy All' or 'Download' buttons to save the entire list of suggestions to a text file on your device for future reference."
    },
    {
        question: "7. What if the recipient's interests are very niche?",
        answer: "Be as descriptive as possible! The more specific you are about their interests (e.g., 'loves 1980s sci-fi movies and collects vintage cameras'), the more tailored and creative the AI's suggestions will be."
    }
];

export default function GiftSuggestionToolPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Gift Suggestion Tool
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Never struggle to find the perfect gift again. Describe the recipient and occasion, and let our <strong>AI gift suggestion tool</strong> suggest thoughtful presents. Our <strong>free AI gift finder</strong> provides <strong>personalized gift ideas</strong> for any occasion, age, or interest. Find the <strong>perfect present</strong> for birthdays, anniversaries, and holidays, all tailored to your budget. Save time and surprise your loved ones with unique and thoughtful gifts recommended by our <strong>smart suggestion engine</strong>.
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

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, index) => (
                             <AccordionItem 
                                value={`item-${index + 1}`} 
                                key={index} 
                                className="bg-background/50 border rounded-lg transition-all duration-300 data-[state=open]:border-primary data-[state=open]:shadow-lg data-[state=open]:shadow-primary/10"
                            >
                                <AccordionTrigger className="text-left px-6 hover:no-underline font-semibold">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-6">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
