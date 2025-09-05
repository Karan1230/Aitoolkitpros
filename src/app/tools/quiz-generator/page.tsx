
import { type Metadata } from 'next';
import { QuizGeneratorClient } from '@/components/quiz-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


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
        question: "What is an AI quiz generator?",
        answer: "An AI quiz generator is a tool that uses artificial intelligence to create quizzes on any topic you choose. You can specify the subject, difficulty level, and question type (like multiple-choice or true/false), and the AI will generate a complete quiz with questions, answers, and explanations."
    },
    {
        question: "How can I use this AI question generator?",
        answer: "This tool is incredibly versatile. Teachers can use it to create classroom tests and homework. Students can use it to generate practice quizzes for self-assessment. It's also great for creating fun trivia games for parties or social media."
    },
    {
        question: "Is this quiz maker AI free to use?",
        answer: "Yes, our AI quiz generator is completely free. There are no limits on the number of quizzes or questions you can generate, making it an excellent resource for anyone in need of educational content."
    },
    {
        question: "Does the AI provide the correct answers and explanations?",
        answer: "Yes, it does. For every question generated, the AI also provides the correct answer and a brief but clear explanation. This is essential for learning, as it helps users understand the 'why' behind the answer, not just the 'what'."
    },
    {
        question: "Can I create a quiz in a different language?",
        answer: "Absolutely. Our quiz generator supports over 100 languages. You can generate a quiz on any topic in the language of your choice, making it a valuable tool for international educators and learners."
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "AI Quiz Generator",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web",
      "description": "A free AI tool to generate custom quizzes on any topic, with options for difficulty, question type, and language.",
      "url": "https://ai-toolkit-pro.vercel.app/tools/quiz-generator",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "210"
      },
      "author": {
        "@type": "Organization",
        "name": "AI Toolkit Pro"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  ]
};

export default function QuizGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
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
                <p>Quizzes are a fantastic way to assess knowledge, engage students, and make learning more interactive. An <strong>AI quiz generator</strong> is a powerful tool that can help you create custom quizzes on any topic in minutes. Our platform offers a versatile <strong>AI question generator</strong> that can produce a variety of question types, from multiple-choice to fill-in-the-blank. It's the perfect solution for educators, trainers, and anyone who wants to create engaging and effective assessments. For more on modern teaching strategies, check out <a href="https://www.edutopia.org/" target="_blank" rel="noopener noreferrer">Edutopia</a>.</p>
                
                <p>Our tool is designed to be the <strong>best AI quiz generator</strong> by providing a combination of flexibility and ease of use. The <strong>free quiz generator</strong> is accessible to everyone, allowing you to create high-quality quizzes without any cost. The <strong>AI test generator</strong> can be used to create assessments for any subject, from history to mathematics. It's a powerful <strong>quiz maker AI</strong> that can save you hours of work and help you create more effective learning materials. You can also create study materials with our <Link href="/tools/study-notes-creator">Study Notes Creator</Link>.</p>
                
                <h3>From Topic to Test in a Few Clicks</h3>
                <p>Using our <strong>AI quiz maker</strong> is a simple process. Just enter your topic, select the desired difficulty and question types, and the AI will do the rest. The <strong>AI multiple choice question generator</strong> is perfect for creating quick and easy assessments, while the <strong>AI question generator from text</strong> can be used to create quizzes based on specific learning materials. This makes our tool an invaluable <strong>free AI quiz generator from text</strong> for teachers who want to create customized assessments. For a full curriculum, use our <Link href="/tools/course-outline-generator">Course Outline Generator</Link>.</p>
                
                <p>Whether you're creating a quiz for your students, a training module for your employees, or a fun trivia night with friends, our <strong>quiz generator from topic</strong> has you covered. It's a versatile <strong>online quiz maker for teachers free</strong> of charge and for everyone else. Stop spending hours creating quizzes manually and start using the power of AI to create engaging and effective assessments. Try our <strong>best free AI quiz generator</strong> today and see how easy it is to make learning fun.</p>
            </div>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <h2 className="font-headline text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
                <AccordionItem 
                    value={`item-${index}`} 
                    key={index}
                    className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl px-6 animate-pop-in"
                    style={{ animationDelay: `${index * 0.1}s`}}
                >
                    <AccordionTrigger className="font-headline text-lg text-left hover:no-underline">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                        {faq.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
