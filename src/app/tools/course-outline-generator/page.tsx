import { type Metadata } from 'next';
import { CourseOutlineGeneratorClient } from '@/components/course-outline-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export const metadata: Metadata = {
  title: 'Free AI Course Outline Generator | Create Course Structures Instantly',
  description: 'Generate a complete course outline with modules, lessons, and key points using our free AI tool. Perfect for educators, coaches, and content creators.',
};

const benefits = [
    "Structure your knowledge into a professional course.",
    "Save hours of planning and curriculum design.",
    "Generate logical modules and lesson plans.",
    "Get a clear roadmap for your educational content."
];

export default function CourseOutlineGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Course Outline Generator
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Turn your expertise into a well-structured course. Describe your topic, and let our AI build the curriculum for you.
            </p>

            <div className="mt-8">
                <CourseOutlineGeneratorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Define Your Course:</strong> Enter your course topic, the target level (e.g., Beginner), and the estimated duration.</p>
                    <p><strong>2. Select Language:</strong> Pick your preferred language for the outline.</p>
                    <p><strong>3. Generate:</strong> Click "Generate Outline" to see the AI-created course structure.</p>
                    <p><strong>4. Copy or Download:</strong> Use the buttons to copy the entire outline or download it as a text file for further customization.</p>
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
                            Yes, the AI Course Outline Generator is 100% free to use. There are no hidden fees or subscriptions.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Can I use this for any subject?</AccordionTrigger>
                            <AccordionContent>
                            Absolutely. The tool is designed to be versatile and can generate course outlines for any subject, from academic topics to practical skills.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Is the generated outline ready to use?</AccordionTrigger>
                            <AccordionContent>
                            The generated outline provides a strong foundation. We always recommend reviewing it and adding your own expertise, examples, and activities to make the course truly yours.
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
