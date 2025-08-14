import { type Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuestionAnsweringClient } from '@/components/question-answering-client';
import { CodingHelpClient } from '@/components/coding-help-client';
import { GrammarSpellingClient } from '@/components/grammar-spelling-client';
import { TextRewriterClient } from '@/components/text-rewriter-client';
import { Bot, Code, SpellCheck, PencilRuler } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Free AI ChatGPT Tool | Code Helper & Grammar Corrector',
  description: 'Unlock the power of AI with free ChatGPT-powered tools. Get answers, receive coding help with an online AI code helper, correct grammar, and rewrite text effortlessly.',
};

export default function ChatGptToolsPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          Advanced AI Assistant Tools
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Powered by ChatGPT, these tools are designed to help you with a variety of tasks, from answering questions to writing better code and content.
        </p>
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
  );
}
