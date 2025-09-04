
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
    <>
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
              <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                  AI Quiz Generator
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Create custom quizzes on any topic in seconds with our <strong>AI quiz generator</strong>. Perfect for teachers, students, and trivia enthusiasts, this <strong>AI question generator</strong> crafts engaging questions with answers and explanations. As the <strong>best AI quiz generator</strong>, it offers various question types and difficulty levels. Use our <strong>free quiz generator</strong> to make learning fun and effective. This <strong>AI test generator</strong> is your go-to solution for creating educational content effortlessly.
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
      <section className="py-16">
        <div className="container max-w-4xl">
            <div className="prose dark:prose-invert mx-auto">
                <h2>Create Engaging Assessments with an AI Quiz Generator</h2>
                <p>Quizzes are a fantastic way to assess knowledge, engage students, and make learning more interactive. An <strong>AI quiz generator</strong> is a powerful tool that can help you create custom quizzes on any topic in minutes. Our platform offers a versatile <strong>AI question generator</strong> that can produce a variety of question types, from multiple-choice to fill-in-the-blank. It's the perfect solution for educators, trainers, and anyone who wants to create engaging and effective assessments.</p>
                <p>Our tool is designed to be the <strong>best AI quiz generator</strong> by providing a combination of flexibility and ease of use. The <strong>free quiz generator</strong> is accessible to everyone, allowing you to create high-quality quizzes without any cost. The <strong>AI test generator</strong> can be used to create assessments for any subject, from history to mathematics. It's a powerful <strong>quiz maker AI</strong> that can save you hours of work and help you create more effective learning materials.</p>
                
                <h3>From Topic to Test in a Few Clicks</h3>
                <p>Using our <strong>AI quiz maker</strong> is a simple process. Just enter your topic, select the desired difficulty and question types, and the AI will do the rest. The <strong>AI multiple choice question generator</strong> is perfect for creating quick and easy assessments, while the <strong>AI question generator from text</strong> can be used to create quizzes based on specific learning materials. This makes our tool an invaluable <strong>free AI quiz generator from text</strong> for teachers who want to create customized assessments.</p>
                <p>Whether you're creating a quiz for your students, a training module for your employees, or a fun trivia night with friends, our <strong>quiz generator from topic</strong> has you covered. It's a versatile <strong>online quiz maker for teachers free</strong> of charge and for everyone else. Stop spending hours creating quizzes manually and start using the power of AI to create engaging and effective assessments. Try our <strong>best free AI quiz generator</strong> today and see how easy it is to make learning fun.</p>
            </div>
        </div>
      </section>
    </>
  );
}
