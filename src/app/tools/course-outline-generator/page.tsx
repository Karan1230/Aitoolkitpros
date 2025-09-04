
import { type Metadata } from 'next';
import { CourseOutlineGeneratorClient } from '@/components/course-outline-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

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
    <>
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
              <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                  AI Course Outline Generator
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Turn your expertise into a well-structured course with our <strong>AI course outline generator</strong>. Describe your topic, and let our <strong>AI course creator</strong> build the curriculum with modules, lessons, and key learning points. This <strong>free course outline generator</strong> is perfect for educators, coaches, and content creators who want to design a comprehensive learning experience. As the <strong>best AI course outline generator</strong>, our tool streamlines the curriculum development process, saving you time and effort.
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
          </div>
        </div>
      </div>
      <section className="py-16">
        <div className="container max-w-4xl">
            <div className="prose dark:prose-invert mx-auto">
                <h2>Structure Your Knowledge with an AI Course Outline Generator</h2>
                <p>Creating a well-structured course can be a daunting task. From defining learning objectives to organizing content into logical modules, the process requires careful planning and a significant time investment. An <strong>AI course outline generator</strong> is a powerful tool that simplifies this process, allowing you to create a comprehensive course structure in minutes. Our platform offers a <strong>free course outline generator</strong> that is perfect for educators, trainers, and content creators who want to design effective and engaging learning experiences. For more on instructional design, platforms like <a href="https://www.coursera.org/" target="_blank" rel="noopener noreferrer">Coursera</a> offer great examples.</p>
                <p>Our tool is designed to be the <strong>best AI course outline generator</strong> by providing a detailed and logical structure for your content. The <strong>AI course creator</strong> analyzes your topic and generates a complete outline, including modules, lessons, and key learning points. This makes it an invaluable <strong>course outline creator</strong> for anyone who wants to save time and effort on curriculum development. The <strong>free online course outline generator</strong> is accessible to everyone, regardless of their technical expertise. You can even generate quiz questions for your course with our <Link href="/tools/quiz-generator">Quiz Generator</Link>.</p>

                <h3>From Topic to Curriculum in Minutes</h3>
                <p>Using our <strong>AI course outline generator free</strong> tool is easy. Simply enter your course topic, specify the target audience and duration, and the AI will generate a detailed outline for you. This makes it a great <strong>course content generator</strong> for creating a wide range of educational materials. The <strong>AI curriculum generator</strong> is also a useful tool for corporate trainers who need to develop training programs quickly and efficiently. It’s a versatile <strong>AI lesson plan generator</strong> that can adapt to any subject matter. Once you have your outline, create engaging <Link href="/tools/study-notes-creator">study notes</Link> for your students.</p>
                <p>Whether you're creating an online course, a workshop, or a training program, our <strong>course syllabus generator</strong> can help you get started. It's a powerful <strong>training course outline generator</strong> that can save you hours of work. Stop struggling with curriculum design and start using the power of AI to create well-structured and engaging learning experiences. Try our <strong>AI course builder</strong> today and see how easy it is to turn your knowledge into a professional course.</p>
            </div>
        </div>
      </section>
    </>
  );
}
