
import { type Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuestionAnsweringClient } from '@/components/question-answering-client';
import { CodingHelpClient } from '@/components/coding-help-client';
import { GrammarSpellingClient } from '@/components/grammar-spelling-client';
import { TextRewriterClient } from '@/components/text-rewriter-client';
import { Bot, Code, SpellCheck, PencilRuler } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


export const metadata: Metadata = {
  title: 'Best Free AI ChatBot Assistant | Code Helper & Grammar Corrector',
  description: 'Unlock the power of AI with a free ChatBot assistant. Get answers, receive coding help with an online AI code helper, correct grammar, and rewrite text effortlessly.',
};

const faqs = [
    {
        question: "What is an AI ChatBot Assistant?",
        answer: "An AI ChatBot Assistant is a collection of AI-powered tools designed to help you with various tasks. Our assistant includes an AI question answering system, a coding helper, a grammar and spelling corrector, and a text rewriter, all in one convenient interface."
    },
    {
        question: "How does the AI question answering tool work?",
        answer: "The AI question answering tool uses a large language model to understand your question and search its vast knowledge base to provide a comprehensive and accurate answer. It's perfect for research, learning, or satisfying your curiosity."
    },
    {
        question: "Can the AI code helper debug my code?",
        answer: "Yes, the AI code helper can assist with debugging. You can paste your code snippet and describe the error, and the AI will analyze it to suggest potential fixes and explain the underlying issue. It can also help you write new code or optimize existing functions."
    },
    {
        question: "Is the grammar and spelling corrector better than a standard spell check?",
        answer: "Absolutely. A standard spell check only catches misspellings. Our AI-powered grammar and spelling corrector understands context, sentence structure, and punctuation rules, allowing it to identify and fix complex grammatical errors, awkward phrasing, and more."
    },
    {
        question: "What can I use the text rewriter for?",
        answer: "The text rewriter, or paraphrasing tool, is perfect for improving the clarity and style of your writing. You can use it to rephrase sentences to avoid plagiarism, simplify complex language, or change the tone of your text to be more formal, casual, or professional."
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "AI ChatBot Assistant",
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Web",
      "description": "A suite of free AI tools for question answering, coding help, grammar correction, and text rewriting.",
      "url": "https://ai-toolkit-pro.vercel.app/tools/chatgpt-ai-tools",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "500"
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

export default function ChatGptToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="container py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
            AI ChatBot Assistant
          </h1>
          <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
            <p className="text-lg text-muted-foreground">
              A powerful suite of tools to help with various tasks. Get instant answers from our <strong>AI question answering</strong> system, receive coding assistance with our <strong>AI code helper</strong>, improve your writing with the <strong>grammar and spelling corrector</strong>, and refine your content with the <strong>text rewriter</strong>. This is your all-in-one <strong>AI assistant</strong> for enhanced productivity.
            </p>
          </div>
        </div>

        <Card className="mt-12 max-w-4xl mx-auto border-2 border-primary/20 shadow-lg">
          <CardContent className="p-2 md:p-6">
            <Tabs defaultValue="q-and-a" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
                <TabsTrigger value="q-and-a" className="flex flex-col md:flex-row gap-2 h-auto py-2">
                  <Bot /> Q&A
                </TabsTrigger>
                <TabsTrigger value="coding-help" className="flex flex-col md:flex-row gap-2 h-auto py-2">
                  <Code /> Coding Help
                </TabsTrigger>
                <TabsTrigger value="grammar-spelling" className="flex flex-col md:flex-row gap-2 h-auto py-2">
                  <SpellCheck /> Grammar
                </TabsTrigger>
                <TabsTrigger value="text-rewriter" className="flex flex-col md:flex-row gap-2 h-auto py-2">
                  <PencilRuler /> Rewriter
                </TabsTrigger>
              </TabsList>
              <TabsContent value="q-and-a" className="mt-6">
                <CardHeader className="px-0">
                  <CardTitle className="font-headline text-2xl">AI Question Answering</CardTitle>
                  <CardDescription>Ask any question, and get a detailed answer from the AI.</CardDescription>
                </CardHeader>
                <QuestionAnsweringClient />
              </TabsContent>
              <TabsContent value="coding-help" className="mt-6">
                 <CardHeader className="px-0">
                  <CardTitle className="font-headline text-2xl">AI Coding Help Assistant</CardTitle>
                  <CardDescription>Get help with your code. Ask for explanations, debugging, or code generation.</CardDescription>
                </CardHeader>
                <CodingHelpClient />
              </TabsContent>
              <TabsContent value="grammar-spelling" className="mt-6">
                 <CardHeader className="px-0">
                  <CardTitle className="font-headline text-2xl">Grammar & Spelling Corrector</CardTitle>
                  <CardDescription>Improve your writing by correcting grammar and spelling mistakes.</CardDescription>
                </CardHeader>
                <GrammarSpellingClient />
              </TabsContent>
              <TabsContent value="text-rewriter" className="mt-6">
                 <CardHeader className="px-0">
                  <CardTitle className="font-headline text-2xl">Text Rewriter</CardTitle>
                  <CardDescription>Paraphrase or rewrite your text to make it clearer, more engaging, or to fit a different tone.</CardDescription>
                </CardHeader>
                <TextRewriterClient />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <section className="py-16">
        <div className="container max-w-4xl">
            <div className="prose dark:prose-invert mx-auto">
                <h2>Boost Your Productivity with an AI ChatBot Assistant</h2>
                <p>In today's fast-paced world, having a reliable assistant can make all the difference. Our <strong>AI ChatBot Assistant</strong> is a versatile suite of tools designed to help you with a wide range of tasks. Whether you need quick answers to complex questions, help with your coding projects, or assistance with your writing, our <strong>AI assistant</strong> has you covered. This is more than just a chatbot; it's a comprehensive productivity platform powered by cutting-edge artificial intelligence. The evolution of chatbots is a fascinating topic, well-documented by sources like <a href="https://www.ibm.com/topics/chatbots" target="_blank" rel="noopener noreferrer">IBM</a>.</p>
                
                <p>The <strong>AI question answering</strong> tool is perfect for students, researchers, and anyone who needs quick access to information. Simply ask a question, and our AI will provide a detailed and accurate answer. For developers, the <strong>AI code helper</strong> is an invaluable resource. It can help you debug your code, explain complex concepts, and even generate code snippets to speed up your workflow. It's like having a senior developer by your side, ready to assist you at any time. For more general creative sparks, try our <Link href="/tools/idea-generator">Idea Generator</Link>.</p>

                <h3>Enhance Your Writing with AI</h3>
                <p>Clear and professional writing is essential for success in any field. Our <strong>grammar and spelling corrector</strong> helps you polish your writing by identifying and correcting errors. It's a powerful tool for students, professionals, and anyone who wants to ensure their writing is error-free. The <strong>text rewriter</strong> takes it a step further, allowing you to paraphrase and rephrase your text to improve its clarity, tone, and overall impact. It's the perfect tool for creating engaging content that resonates with your audience. You can also generate longer content with our <Link href="/tools/ai-script-writer">AI Script Writer</Link>.</p>
                
                <p>Our platform is designed to be the <strong>best AI assistant</strong> by offering a range of tools that work together seamlessly. The <strong>AI helper</strong> is always available to assist you with your tasks, making you more efficient and productive. Whether you're writing an essay, building an application, or researching a new topic, our <strong>AI assistant free</strong> tools are here to help. Experience the power of AI and unlock your full potential with our comprehensive suite of productivity tools.</p>
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
