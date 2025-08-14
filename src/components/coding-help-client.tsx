"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { codingHelpAssistant } from '@/ai/flows/coding-help-assistant';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Check } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const formSchema = z.object({
  prompt: z.string().min(10, 'Prompt must be at least 10 characters long.'),
});

export function CodingHelpClient() {
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResponse(null);

    try {
      const result = await codingHelpAssistant(values);
      setResponse(result.response);
    } catch (error) {
      console.error('Coding help failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to get help. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const copyToClipboard = () => {
    if (!response) return;
    navigator.clipboard.writeText(response);
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
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Paste your code snippet or describe the problem..."
                    className="min-h-[150px] font-mono"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} size="lg" className="w-full">
            {isLoading ? 'Thinking...' : 'Get Help'}
            <Sparkles className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </Form>

      {isLoading && (
        <div className="mt-6 p-4 border rounded-lg bg-muted/50 text-center text-muted-foreground animate-pulse">
          Analyzing your code...
        </div>
      )}

      {response && (
        <div className="mt-6 relative">
          <Card className="bg-muted/50">
            <CardContent className="p-4 max-h-[500px] overflow-y-auto">
              <pre className="whitespace-pre-wrap font-mono text-sm">{response}</pre>
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
      )}
    </div>
  );
}
