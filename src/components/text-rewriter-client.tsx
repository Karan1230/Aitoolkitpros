"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { textRewriter } from '@/ai/flows/text-rewriter';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Check } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const tones = ["Default", "Formal", "Casual", "Professional", "Friendly", "Humorous"];

const formSchema = z.object({
  text: z.string().min(10, 'Text must be at least 10 characters long.'),
  tone: z.string().optional(),
});

export function TextRewriterClient() {
  const [rewrittenText, setRewrittenText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
      tone: 'Default',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRewrittenText(null);

    try {
      const result = await textRewriter({
        ...values,
        tone: values.tone === 'Default' ? undefined : values.tone,
      });
      setRewrittenText(result.rewrittenText);
    } catch (error) {
      console.error('Rewrite failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to rewrite the text. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const copyToClipboard = () => {
    if (!rewrittenText) return;
    navigator.clipboard.writeText(rewrittenText);
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
                    placeholder="Paste the text you want to rewrite or paraphrase..."
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tone</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a tone" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {tones.map(tone => (
                      <SelectItem key={tone} value={tone}>{tone}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading} size="lg" className="w-full">
            {isLoading ? 'Rewriting...' : 'Rewrite Text'}
            <Sparkles className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </Form>

      {isLoading && (
        <div className="mt-6 p-4 border rounded-lg bg-muted/50 text-center text-muted-foreground animate-pulse">
          Rethinking your words...
        </div>
      )}

      {rewrittenText && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Rewritten Text</h3>
           <div className="relative">
            <Card className="bg-muted/50">
              <CardContent className="p-4 max-h-[400px] overflow-y-auto">
                <p className="whitespace-pre-wrap font-body text-sm">{rewrittenText}</p>
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
