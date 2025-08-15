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

const faqs = [
    {
        question: "1. Is this tool free?",
        answer: "Yes, the AI Course Outline Generator is 100% free to use. There are no hidden fees or subscriptions."
    },
    {
        question: "2. Can I use this for any subject?",
        answer: "Absolutely. The tool is designed to be versatile and can generate course outlines for any subject, from academic topics like 'Quantum Physics' to practical skills like 'Digital Marketing'."
    },
    {
        question: "3. Is the generated outline ready to use?",
        answer: "The generated outline provides a strong foundation. We always recommend reviewing it and adding your own expertise, examples, and activities to make the course truly yours."
    },
    {
        question: "4. How detailed is the outline?",
        answer: "The outline includes a course title, a description, and a full structure of modules. Each module contains multiple lessons, and each lesson comes with 3-5 key talking points to cover."
    },
    {
        question: "5. Can I specify the course length and difficulty?",
        answer: "Yes. You can select the target audience level (e.g., Beginner, Advanced) and the estimated duration of the course. The AI will adjust the depth and breadth of the content accordingly."
    },
    {
        question: "6. Can I download the generated outline?",
        answer: "Yes. Once the outline is generated, you can copy the entire structure to your clipboard or download it as a .txt file for easy editing and integration into your lesson planning software."
    },
    {
        question: "7. Does this tool work in other languages?",
        answer: "Yes, you can generate a course outline in over 20 languages, making it a valuable tool for international educators and content creators."
    }
];

export default function CourseOutlineGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Course Outline Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Turn your expertise into a well-structured course. Describe your topic, and let our <strong>AI course outline generator</strong> build the curriculum for you. Our <strong>free AI tool</strong> helps you create a complete <strong>course structure</strong> with modules, lessons, and key points. This <strong>AI curriculum design</strong> tool is perfect for educators, coaches, and content creators who want to save time on <strong>lesson planning</strong> and generate a clear roadmap for their educational content. Start to <strong>create online courses</strong> faster with our powerful generator.
              </p>
            </div>

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
