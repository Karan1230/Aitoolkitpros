
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

const faqs = [
    {
        question: "1. Is this tool completely free?",
        answer: "Yes, the AI Quiz Generator is 100% free to use with no hidden charges or subscriptions."
    },
    {
        question: "2. What types of questions can I generate?",
        answer: "You can generate Multiple Choice Questions (MCQ), True/False, and Fill in the Blank questions."
    },
    {
        question: "3. Can I use the generated quizzes for commercial purposes?",
        answer: "Yes, the content generated is royalty-free. You can use it for educational materials, presentations, or any other personal or commercial project."
    },
    {
        question: "4. Does the tool provide explanations for the answers?",
        answer: "Yes! Each question comes with the correct answer and a brief explanation, making it an excellent tool for learning and understanding the material."
    },
    {
        question: "5. Can I set the difficulty of the questions?",
        answer: "Absolutely. You can choose between 'Easy,' 'Medium,' and 'Hard' difficulty levels to create a quiz that is appropriate for your audience."
    },
    {
        question: "6. How many questions can I generate at once?",
        answer: "You can generate anywhere from 1 to 20 questions at a time using the slider. This allows you to create short quizzes or longer practice tests."
    },
    {
        question: "7. What subjects can I create quizzes for?",
        answer: "You can create a quiz for virtually any subject. The AI has a broad knowledge base, from history and science to pop culture and programming."
    }
];

export default function QuizGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Quiz Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Create custom quizzes on any topic in seconds. Perfect for teachers, students, and trivia enthusiasts who want to generate engaging questions with answers and explanations.
              </p>
            </div>

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
