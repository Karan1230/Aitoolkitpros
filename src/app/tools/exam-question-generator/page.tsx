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
  title: 'Free AI Exam Question Generator | Create Practice Quizzes',
  description: 'Generate custom exam questions on any topic with our free AI tool. Choose difficulty, question type, and language to create practice tests.',
};

const benefits = [
    "Create practice tests for any subject.",
    "Generate questions for self-assessment or classroom use.",
    "Quickly create study materials for exams.",
    "Save time on creating educational content."
];

const faqs = [
    {
        question: "1. Is this tool completely free?",
        answer: "Yes, the AI Exam Question Generator is 100% free to use with no hidden charges or subscriptions."
    },
    {
        question: "2. What types of questions can I generate?",
        answer: "You can generate Multiple Choice Questions (MCQ), True/False, and Fill in the Blank questions."
    },
    {
        question: "3. Can I use the generated quizzes for my school or institution?",
        answer: "Yes, the content generated is royalty-free. You can use it for educational materials, presentations, or any other personal or commercial project."
    },
    {
        question: "4. Does the tool provide explanations for the answers?",
        answer: "Yes! Each question comes with the correct answer and a brief explanation, making it an excellent tool for learning and understanding the material."
    },
    {
        question: "5. Can I set the difficulty of the questions?",
        answer: "Absolutely. You can choose between 'Easy,' 'Medium,' and 'Hard' difficulty levels to create an exam that is appropriate for your needs."
    },
    {
        question: "6. How many questions can I generate at once?",
        answer: "You can generate anywhere from 1 to 20 questions at a time using the slider. This allows you to create short quizzes or longer practice exams."
    },
    {
        question: "7. What subjects can I create exams for?",
        answer: "You can create an exam for virtually any subject. The AI has a broad knowledge base, from history and science to programming and literature."
    }
];


export default function ExamQuestionGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Exam Question Generator
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Create custom practice exams on any topic in seconds. Just specify your requirements and let the AI build your test. Our free AI exam question generator helps you create practice quizzes by choosing the difficulty, question type, and language. This tool is perfect for students preparing for exams and teachers creating study materials. Save time and enhance learning with our automated exam builder.
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
                    <p><strong>1. Define Your Exam:</strong> Enter a topic or subject, select the difficulty, choose a question type, and set the number of questions.</p>
                    <p><strong>2. Select Language:</strong> Pick the language for your exam questions and answers.</p>
                    <p><strong>3. Generate:</strong> Click the "Generate Quiz" button and wait for the AI to create it.</p>
                    <p><strong>4. Review & Use:</strong> Your exam, complete with answers and explanations, will be displayed. You can then copy or download it.</p>
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
