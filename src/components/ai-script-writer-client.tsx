"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { aiScriptWriter } from '@/ai/flows/ai-script-writer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Sparkles } from 'lucide-react';

const formSchema = z.object({
  prompt: z.string().min(10, 'Prompt must be at least 10 characters long.'),
});

export function AiScriptWriterClient() {
  const [script, setScript] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setScript(null);

    try {
      const result = await aiScriptWriter({ prompt: values.prompt });
      setScript(result.script);
    } catch (error) {
      console.error('Script generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to generate script. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Script Prompt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., A 5-minute YouTube video script about the history of coffee"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? 'Generating...' : 'Generate Script'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
           <div className="mt-6 p-4 border rounded-lg bg-muted/50">
             <p className="text-center text-muted-foreground animate-pulse">The AI is writing, please wait...</p>
           </div>
        )}

        {script && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Generated Script</h3>
            <Card className="bg-muted/50">
                <CardContent className="p-4">
                    <pre className="whitespace-pre-wrap font-body text-sm">{script}</pre>
                </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
