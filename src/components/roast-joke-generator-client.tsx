"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { roastJokeGenerator } from '@/ai/flows/roast-joke-generator';
import { languages } from '@/lib/languages';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Download, Languages, Palette, Mic, Flame, Laugh } from 'lucide-react';

const modes = ["Roast", "Joke", "Mixed"];
const tones = ["Savage", "Sarcastic", "Light/Friendly", "Dark Humor", "Wholesome"];

const formSchema = z.object({
  mode: z.string().min(1, 'Please select a mode.'),
  tone: z.string().min(1, 'Please select a tone.'),
  topic: z.string().min(2, 'Topic must be at least 2 characters.'),
  language: z.string().min(1, 'Please select a language.'),
  safeSearch: z.boolean(),
});

export function RoastJokeGeneratorClient() {
  const [results, setResults] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mode: 'Joke',
      tone: 'Light/Friendly',
      topic: '',
      language: 'English',
      safeSearch: true,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResults(null);

    try {
      const result = await roastJokeGenerator(values);
      setResults(result.results);
    } catch (error) {
      console.error('Generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to generate content. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const formatForAction = (separator: string) => {
    if (!results) return '';
    return results.join(separator);
  };

  const copyToClipboard = () => {
    const text = formatForAction('\n');
    navigator.clipboard.writeText(text);
    toast({ title: "Results copied to clipboard!" });
  };

  const downloadResults = () => {
    const text = formatForAction('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-roasts-and-jokes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Results downloaded!" });
  };

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-lg">Topic / Name / Scenario</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., My friend who is always late, coffee, Mondays" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                    control={form.control}
                    name="mode"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Mode</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <Mic className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select a mode" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {modes.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tone"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Tone</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <Palette className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select a tone" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {tones.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Language</FormLabel>
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
            </div>
             <FormField
              control={form.control}
              name="safeSearch"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <FormLabel className="text-base font-semibold">
                            Family-Friendly
                        </FormLabel>
                        <p className="text-sm text-muted-foreground">
                           Filter out 18+ and potentially offensive content.
                        </p>
                    </div>
                    <FormControl>
                        <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? 'Generating...' : 'Generate'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
           <div className="mt-6 p-4 border rounded-lg bg-muted/50 text-center text-muted-foreground animate-pulse">
             The AI is warming up the mic...
           </div>
        )}

        {results && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-headline">Generated Results</h3>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={copyToClipboard}><Copy className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={downloadResults}><Download className="h-4 w-4" /></Button>
                </div>
            </div>
            <Card className="bg-muted/50">
                <CardContent className="p-4 max-h-[600px] overflow-y-auto">
                   <ul className="space-y-3">
                        {results.map((item, index) => (
                            <li key={index} className="flex items-start gap-3 p-2 bg-background rounded-md shadow-sm">
                                {form.getValues('mode') === 'Roast' ? <Flame className="h-5 w-5 text-destructive flex-shrink-0 mt-1" /> : <Laugh className="h-5 w-5 text-primary flex-shrink-0 mt-1" />}
                                <p>{item}</p>
                            </li>
                        ))}
                   </ul>
                </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
