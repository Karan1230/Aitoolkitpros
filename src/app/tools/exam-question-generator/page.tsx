
import { type Metadata } from 'next';
import { QuizGeneratorClient } from '@/components/quiz-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

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

export default function ExamQuestionGeneratorPage() {
  return (
    <>
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
              <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                  AI Exam Question Generator
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Create custom practice exams on any topic in seconds with our <strong>AI exam question generator</strong>. This tool is perfect for students and teachers who need to generate study materials and assess knowledge quickly and efficiently. As the <strong>best AI question generator</strong>, it allows you to create multiple-choice, true/false, and fill-in-the-blank questions. Use this <strong>free exam question generator</strong> to produce high-quality questions for any subject, making it an essential <strong>AI test generator</strong> for effective learning.
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
          </div>
        </div>
      </div>
      <section className="py-16">
        <div className="container max-w-4xl">
            <div className="prose dark:prose-invert mx-auto">
                <h2>Enhance Learning with an AI Exam Question Generator</h2>
                <p>Creating effective exam questions can be a time-consuming process for educators. An <strong>AI exam question generator</strong> is a revolutionary tool that automates this task, allowing teachers to create high-quality assessments in minutes. Our platform offers a powerful <strong>AI question generator from text</strong> that can analyze any topic and produce a variety of question types. This makes it the <strong>best AI question generator</strong> for creating customized exams that align with your curriculum.</p>
                <p>Our tool is more than just a simple question bank; it's a sophisticated <strong>AI test generator free</strong> of charge that can adapt to different learning levels and subjects. The <strong>AI multiple choice question generator</strong> is perfect for creating quick and effective assessments, while the <strong>AI quiz generator</strong> can be used to create fun and engaging learning activities. With our <strong>free AI test generator</strong>, you can save valuable time and focus on what you do best: teaching.</p>

                <h3>Create Customized Assessments in Any Subject</h3>
                <p>The versatility of our <strong>AI exam generator</strong> is one of its key features. It can be used as a <strong>math question generator</strong>, a <strong>history question generator</strong>, or for any other subject you can think of. The <strong>long answer question generator</strong> is great for assessing critical thinking skills, while the <strong>free multiple choice question generator from text</strong> is perfect for creating objective tests. This makes our tool an invaluable resource for teachers at all levels.</p>
                <p>Our <strong>AI question generator free</strong> tool is designed to be user-friendly and intuitive. Simply enter your topic, choose your question types, and let the AI do the rest. The <strong>free AI question generator from text</strong> will provide you with a complete exam, including answers and explanations. Stop spending hours creating assessments and start using the power of AI to enhance your teaching. Try our <strong>AI test question generator free</strong> tool today and revolutionize the way you assess learning.</p>
            </div>
        </div>
      </section>
    </>
  );
}
