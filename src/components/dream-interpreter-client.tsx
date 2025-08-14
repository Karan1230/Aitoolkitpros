"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { dreamInterpreter } from '@/ai/flows/dream-interpreter';
import { languages } from '@/lib/languages';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Download, Languages, Moon } from 'lucide-react';

const formSchema = z.object({
  dreamDescription: z.string().min(10, 'Please provide a more detailed description of your dream.'),
  outputLanguage: z.string().min(1, 'Please select a language.'),
});

export function DreamInterpreterClient() {
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dreamDescription: '',
      outputLanguage: 'English',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setInterpretation(null);

    try {
      const result = await dreamInterpreter(values);
      setInterpretation(result.interpretation);
    } catch (error) {
      console.error('Interpretation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to interpret the dream. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const copyToClipboard = () => {
    if (!interpretation) return;
    navigator.clipboard.writeText(interpretation);
    toast({ title: "Interpretation copied to clipboard!" });
  };

  const downloadInterpretation = () => {
    if (!interpretation) return;
    const blob = new Blob([interpretation], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-dream-interpretation.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Interpretation downloaded!" });
  };

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="dreamDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Dream Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., I was flying over a city made of glass, but I couldn't find my way home..."
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
                name="outputLanguage"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-lg font-semibold">Interpretation Language</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <Languages className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select a language" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {languages.map(lang => <SelectItem key={lang.value} value={lang.name}>{lang.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? 'Interpreting...' : 'Interpret Dream'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
           <div className="mt-6 p-4 border rounded-lg bg-muted/50 text-center text-muted-foreground animate-pulse">
             The AI is exploring the dream world...
           </div>
        )}

        {interpretation && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-headline flex items-center gap-2"><Moon /> Your Dream Interpretation</h3>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={copyToClipboard}><Copy className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={downloadInterpretation}><Download className="h-4 w-4" /></Button>
                </div>
            </div>
            <Card className="bg-muted/50">
                <CardContent className="p-4 max-h-[600px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap font-body text-sm">{interpretation}</pre>
                </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
