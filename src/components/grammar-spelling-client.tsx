"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { grammarSpellingCorrector } from '@/ai/flows/grammar-spelling-corrector';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Check } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const formSchema = z.object({
  text: z.string().min(5, 'Text must be at least 5 characters long.'),
});

export function GrammarSpellingClient() {
  const [correctedText, setCorrectedText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setCorrectedText(null);

    try {
      const result = await grammarSpellingCorrector(values);
      setCorrectedText(result.correctedText);
    } catch (error) {
      console.error('Correction failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to correct the text. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const copyToClipboard = () => {
    if (!correctedText) return;
    navigator.clipboard.writeText(correctedText);
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
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Paste your text here to correct grammar and spelling..."
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} size="lg" className="w-full">
            {isLoading ? 'Correcting...' : 'Correct Text'}
            <Sparkles className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </Form>

      {isLoading && (
        <div className="mt-6 p-4 border rounded-lg bg-muted/50 text-center text-muted-foreground animate-pulse">
          Checking your text...
        </div>
      )}

      {correctedText && (
         <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Corrected Text</h3>
          <div className="relative">
            <Card className="bg-muted/50">
              <CardContent className="p-4 max-h-[400px] overflow-y-auto">
                <p className="whitespace-pre-wrap font-body text-sm">{correctedText}</p>
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
