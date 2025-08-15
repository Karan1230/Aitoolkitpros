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

export default function IdeaGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Idea Generator
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Stuck in a creative rut? Enter a topic and let our AI generate a list of innovative ideas to get you started. Our free AI idea generator helps you brainstorm creative concepts for business, marketing, and content. Overcome creative blocks, discover new opportunities, and spark your next big project in any language. Get instant inspiration for your startup, blog, or social media campaign.
            </p>

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
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Is this tool free?</AccordionTrigger>
                            <AccordionContent>
                            Yes, our AI Idea Generator is completely free to use. Generate as many ideas as you need without any limits.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>What kind of topics can I use?</AccordionTrigger>
                            <AccordionContent>
                            You can enter any topic, industry, niche, or keyword. The AI works best with clear concepts but can also generate creative ideas from abstract topics.
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="item-3">
                            <AccordionTrigger>Are the generated ideas unique?</AccordionTrigger>
                            <AccordionContent>
                            The AI generates ideas based on your specific input, so they are tailored to your request. While the concepts may not be entirely new to the world, they offer a unique combination and perspective.
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
