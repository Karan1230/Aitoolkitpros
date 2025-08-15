import { type Metadata } from 'next';
import { IdeaGeneratorClient } from '@/components/idea-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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

const faqs = [
    {
        question: "1. Is this tool free?",
        answer: "Yes, our AI Idea Generator is completely free to use. Generate as many ideas as you need without any limits."
    },
    {
        question: "2. What kind of topics can I use?",
        answer: "You can enter any topic, industry, niche, or keyword. The AI works best with clear concepts but can also generate creative ideas from abstract topics."
    },
    {
        question: "3. Are the generated ideas unique?",
        answer: "The AI generates ideas based on your specific input, so they are tailored to your request. While the concepts may not be entirely new to the world, they offer a unique combination and perspective."
    },
    {
        question: "4. What are the different 'Idea Types'?",
        answer: "You can select the category of ideas you need, such as 'Business Idea', 'Marketing Idea', 'Content Idea', or 'Startup Idea'. This helps the AI focus its creativity on your specific goal."
    },
    {
        question: "5. How many ideas will I get?",
        answer: "The tool generates a list of at least 10 creative ideas for each request, giving you plenty of inspiration to work with."
    },
    {
        question: "6. Can I generate ideas in other languages?",
        answer: "Yes! Our tool supports over 20 languages. You can select your preferred language, and the AI will generate ideas in that language."
    },
    {
        question: "7. How can I use the generated ideas?",
        answer: "You can use them as a starting point for a new business, a topic for your next blog post or video, a new feature for your product, or a theme for your next marketing campaign. The possibilities are endless!"
    }
];

export default function IdeaGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Idea Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Stuck in a creative rut? Enter a topic and let our <strong>AI idea generator</strong> generate a list of innovative ideas to get you started. Our <strong>free AI tool</strong> helps you brainstorm <strong>creative concepts</strong> for <strong>business ideas</strong>, <strong>marketing ideas</strong>, and <strong>content ideas</strong>. Overcome creative blocks, discover new opportunities, and spark your next big project in any language. Get instant inspiration for your startup, blog, or social media campaign.
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
