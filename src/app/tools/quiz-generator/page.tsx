
import { type Metadata } from 'next';
import { QuizGeneratorClient } from '@/components/quiz-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

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
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
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
        </div>
      </div>
    </div>
  );
}
