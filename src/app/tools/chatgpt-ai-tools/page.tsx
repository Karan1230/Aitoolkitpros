
import { type Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuestionAnsweringClient } from '@/components/question-answering-client';
import { CodingHelpClient } from '@/components/coding-help-client';
import { GrammarSpellingClient } from '@/components/grammar-spelling-client';
import { TextRewriterClient } from '@/components/text-rewriter-client';
import { Bot, Code, SpellCheck, PencilRuler } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Best Free AI ChatBot Assistant | Code Helper & Grammar Corrector',
  description: 'Unlock the power of AI with a free ChatBot assistant. Get answers, receive coding help with an online AI code helper, correct grammar, and rewrite text effortlessly.',
};

export default function ChatGptToolsPage() {
  return (
    <>
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
    </>
  );
}
