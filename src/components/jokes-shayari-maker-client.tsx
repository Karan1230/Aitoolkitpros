"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { jokesShayariMaker } from '@/ai/flows/jokes-shayari-maker';
import { languages } from '@/lib/languages';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Download, Languages, Palette, Mic, MessageCircle, Heart, Laugh } from 'lucide-react';

const contentTypes = ["Joke", "Shayari", "Pickup Line"];
const tones = ["Funny", "Romantic", "Witty", "Sarcastic", "Heart-touching"];

const formSchema = z.object({
  type: z.string().min(1, 'Please select a content type.'),
  topic: z.string().min(2, 'Topic must be at least 2 characters.'),
  tone: z.string().min(1, 'Please select a tone.'),
  language: z.string().min(1, 'Please select a language.'),
});

export function JokesShayariMakerClient() {
  const [results, setResults] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'Shayari',
      topic: 'love',
      tone: 'Romantic',
      language: 'Hindi',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResults(null);

    try {
      const result = await jokesShayariMaker(values);
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
    const text = formatForAction('\n\n');
    navigator.clipboard.writeText(text);
    toast({ title: "Results copied to clipboard!" });
  };

  const downloadResults = () => {
    const text = formatForAction('\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-jokes-shayari.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Results downloaded!" });
  };

  const getIconForType = (type: string) => {
    switch (type) {
        case 'Joke': return <Laugh className="h-5 w-5 text-primary flex-shrink-0 mt-1" />;
        case 'Shayari': return <Heart className="h-5 w-5 text-destructive flex-shrink-0 mt-1" />;
        case 'Pickup Line': return <MessageCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />;
        default: return <Mic className="h-5 w-5 text-primary flex-shrink-0 mt-1" />;
    }
  }

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
                  <FormLabel className="font-semibold text-lg">Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., love, rain, coffee, friendship" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Content Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <Mic className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {contentTypes.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
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

            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? 'Generating...' : 'Generate'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
           <div className="mt-6 p-4 border rounded-lg bg-muted/50 text-center text-muted-foreground animate-pulse">
             The AI is feeling inspired...
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
                   <ul className="space-y-4">
                        {results.map((item, index) => (
                            <li key={index} className="flex items-start gap-3 p-3 bg-background rounded-md shadow-sm">
                                {getIconForType(form.getValues('type'))}
                                <p className="whitespace-pre-wrap">{item}</p>
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
