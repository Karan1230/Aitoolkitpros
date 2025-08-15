import { type Metadata } from 'next';
import { QuizGeneratorClient } from '@/components/quiz-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: 'Free AI Quiz Generator | Create Quizzes in Any Language',
  description: 'Generate custom quizzes on any topic with our free AI Quiz Generator. Choose difficulty, question type, and language to create engaging educational content.',
};

const benefits = [
    "Create engaging quizzes for students or training.",
    "Generate questions for trivia nights or games.",
    "Quickly assess knowledge on any subject.",
    "Save time on creating educational materials."
];

export default function QuizGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Quiz Generator
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Create custom quizzes on any topic in seconds. Just specify your requirements and let the AI build your quiz. Our free AI quiz generator helps you create engaging educational content by choosing the difficulty, question type, and language. This tool is perfect for teachers, students, and trivia enthusiasts who want to quickly assess knowledge, create study materials, or generate questions for games.
            </p>

            <div className="mt-8">
                <QuizGeneratorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Define Your Quiz:</strong> Enter a topic, select the difficulty, choose a question type, and set the number of questions.</p>
                    <p><strong>2. Select Language:</strong> Pick the language for your quiz questions and answers.</p>
                    <p><strong>3. Generate:</strong> Click the "Generate Quiz" button and wait for the AI to create it.</p>
                    <p><strong>4. Review & Use:</strong> Your quiz, complete with answers and explanations, will be displayed. You can then copy or download it.</p>
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
                            <AccordionTrigger>Is this tool completely free?</AccordionTrigger>
                            <AccordionContent>
                            Yes, the AI Quiz Generator is 100% free to use with no hidden charges or subscriptions.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>What types of questions can I generate?</AccordionTrigger>
                            <AccordionContent>
                            You can generate Multiple Choice Questions (MCQ), True/False, and Fill in the Blank questions.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Can I use the generated quizzes for commercial purposes?</AccordionTrigger>
                            <AccordionContent>
                            Yes, the content generated is royalty-free. You can use it for educational materials, presentations, or any other personal or commercial project.
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
