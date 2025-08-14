"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { aiQuestionAnswering } from '@/ai/flows/ai-question-answering';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Check } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const formSchema = z.object({
  question: z.string().min(5, 'Question must be at least 5 characters long.'),
});

export function QuestionAnsweringClient() {
  const [answer, setAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAnswer(null);

    try {
      const result = await aiQuestionAnswering(values);
      setAnswer(result.answer);
    } catch (error) {
      console.error('Q&A failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to get an answer. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const copyToClipboard = () => {
    if (!answer) return;
    navigator.clipboard.writeText(answer);
    setCopied(true);
    toast({ title: 'Copied to clipboard!' });
    setTimeout(() => setCopied(false), 2000);
  };


  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="e.g., What is the capital of France?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} size="lg" className="w-full">
            {isLoading ? 'Thinking...' : 'Get Answer'}
            <Sparkles className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </Form>

      {isLoading && (
        <div className="mt-6 p-4 border rounded-lg bg-muted/50 text-center text-muted-foreground animate-pulse">
          Searching for the answer...
        </div>
      )}

      {answer && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Answer</h3>
           <div className="relative">
            <Card className="bg-muted/50">
              <CardContent className="p-4 max-h-[400px] overflow-y-auto">
                <p className="whitespace-pre-wrap font-body text-sm">{answer}</p>
              </CardContent>
            </Card>
            <Button
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
              className="absolute top-2 right-2 h-8 w-8"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
