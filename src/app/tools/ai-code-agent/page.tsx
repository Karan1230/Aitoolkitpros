
'use client';

import { type Metadata } from 'next';
import { AiCodeAgentClient } from '@/components/ai-code-agent-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Lightbulb, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';


// Note: Metadata is not used in client components, but kept for reference
export const metadata: Metadata = {
  title: 'Free AI Code Agent | Generate Complete Codebases from Prompts',
  description: 'Describe your project, and let our AI Code Agent write the entire codebase with directories and files, ready for you to download as a ZIP file.',
};

const benefits = [
    "Rapidly prototype new applications.",
    "Generate boilerplate code for any framework.",
    "Learn new technologies by example.",
    "Go from idea to code in minutes."
];

const faqs = [
    {
        question: "What is an AI Code Agent?",
        answer: "An AI Code Agent is an advanced tool that uses a powerful AI model to generate a complete, structured codebase from a single text prompt. You describe the application you want to build, and it writes the code, organizes it into files and directories, and provides it as a downloadable ZIP file."
    },
    {
        question: "How detailed should my prompt be?",
        answer: "The more detailed your prompt, the better the result. Specify the programming language, frameworks, key features, and any architectural preferences. For example, instead of 'a blog,' try 'a simple blog using Next.js, Tailwind CSS, and Markdown files for posts.'"
    },
    {
        question: "Is this AI code generator free?",
        answer: "Yes, our AI Code Agent is completely free to use. It's a powerful tool for developers, students, and entrepreneurs who want to accelerate their development process without any cost."
    },
    {
        question: "Can the AI create projects with multiple files and folders?",
        answer: "Yes, that's its primary strength. The AI doesn't just write a single script; it generates a complete directory structure with all the necessary files, such as HTML, CSS, JavaScript, config files, and more, just as a human developer would."
    },
    {
        question: "Is the generated code guaranteed to work?",
        answer: "The AI generates code based on best practices and its training data, and it's often very high quality. However, like any AI-generated content, it may require minor debugging or adjustments. It provides an excellent starting point, saving you hours or even days of work."
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "AI Code Agent",
      "applicationCategory": "DeveloperTool",
      "operatingSystem": "Web",
      "description": "An AI tool that generates a complete, structured codebase from a text prompt and provides it as a downloadable ZIP file.",
      "url": "https://ai-toolkit-pro.vercel.app/tools/ai-code-agent",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "410"
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

const examplePrompts = [
    {
        title: "React To-Do App",
        prompt: "A simple to-do list app using React, TypeScript, and Tailwind CSS. It should have a single component to add, list, and delete tasks. State should be managed within the component.",
    },
    {
        title: "Python Web Scraper",
        prompt: "A Python script that uses BeautifulSoup and Requests to scrape the titles and links from the front page of Hacker News (news.ycombinator.com). The results should be saved to a CSV file.",
    },
    {
        title: "Node.js Express API",
        prompt: "A basic Node.js backend using Express. It should have two routes: a GET route at '/' that returns 'Hello World', and a GET route at '/api/users' that returns a JSON array of mock user data.",
    }
];

export default function AiCodeAgentPage() {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCopy = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(prompt);
    toast({ title: "Prompt copied to clipboard!" });
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

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
                  AI Code Agent
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Stop writing boilerplate. Describe your project, and our <strong>AI Code Agent</strong> will generate the entire codebase, including all necessary files and directories. This powerful <strong>AI code generator</strong> helps you go from idea to a downloadable ZIP file in minutes. It's the ultimate tool for rapid prototyping and learning new frameworks.
                </p>
              </div>

              <div className="mt-8">
                  <AiCodeAgentClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Describe Your Project:</strong> Write a detailed prompt about the application you want to build. Include the tech stack and key features.</p>
                      <p><strong>2. Generate Codebase:</strong> Click the button and wait for the AI to write the code. This may take a few minutes for complex projects.</p>
                      <p><strong>3. Download ZIP:</strong> Once complete, a download button will appear for your ZIP file.</p>
                      <p><strong>4. Unzip & Run:</strong> Extract the files and follow the instructions in the generated README.md to run your new application.</p>
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
      <section className="py-16 bg-muted/50">
        <div className="container max-w-5xl">
            <h2 className="font-headline text-3xl font-bold text-center mb-8">Example Prompts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {examplePrompts.map((example, index) => (
                    <Card key={index} className="flex flex-col relative">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 pr-10"><Lightbulb className="h-6 w-6 text-primary"/>{example.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-sm text-muted-foreground font-mono bg-background/50 p-4 rounded-md">"{example.prompt}"</p>
                        </CardContent>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-4 right-4 h-8 w-8"
                            onClick={() => handleCopy(example.prompt)}
                        >
                            {copiedPrompt === example.prompt ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container max-w-4xl">
            <div className="prose dark:prose-invert mx-auto">
                <h2>From Idea to Application with the AI Code Agent</h2>
                <p>The traditional software development process involves hours of setting up projects, writing boilerplate code, and structuring files. The <strong>AI Code Agent</strong> is here to revolutionize that. As a powerful <strong>AI code generator</strong>, it takes a high-level description of an application and generates the entire source code, neatly organized into files and folders. This allows developers to focus on the unique logic and features of their app, rather than the repetitive setup tasks.</p>
                
                <p>Our tool is more than just an <strong>AI code writer</strong>; it's an architect. It understands different programming languages, frameworks, and design patterns. Whether you need a simple static website or a complex web application with a backend, the <strong>AI coding generator</strong> can create a solid foundation for your project. This makes it an invaluable tool for learning, as you can see how a complete project is structured for a technology you're unfamiliar with. For more on AI in software development, read insights from publications like <a href="https://stackoverflow.blog/2023/11/22/the-generative-ai-paradox-from-developer-tool-to-developer-threat/" target="_blank" rel="noopener noreferrer">the Stack Overflow Blog</a>.</p>
                
                <h3>Rapid Prototyping and Learning</h3>
                <p>Imagine having a startup idea and getting a functional prototype in minutes. That's the power of our <strong>free AI code generator</strong>. It's the ultimate tool for rapid prototyping, allowing you to quickly validate ideas and demonstrate concepts to stakeholders. For students and new developers, the <strong>AI code generator free</strong> service is an incredible learning resource. You can ask it to generate a "To-Do List app with React and Firebase" and then study the resulting code to understand how the pieces fit together. You can also get help on specific code snippets with our <Link href="/tools/chatgpt-ai-tools">AI ChatBot Assistant</Link>.</p>
                
                <p>This <strong>website code generator AI</strong> can significantly speed up your workflow. Stop wasting time on repetitive tasks and let the AI handle the heavy lifting. Try the <strong>AI Code Agent</strong> today and experience the future of software development.</p>
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

    