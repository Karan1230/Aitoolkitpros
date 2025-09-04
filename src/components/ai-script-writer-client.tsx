
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { languages } from '@/lib/languages';

import { aiScriptWriter } from '@/ai/flows/ai-script-writer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Languages, Clapperboard, Film, BookOpen, Copy, Download } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

const genres = [
    "Romance", "Comedy", "Drama", "Action", "Thriller", "Horror", 
    "Fantasy", "Sci-Fi", "Mystery", "Adventure", "Historical", 
    "Biography/Inspirational"
];

const scriptLengths = ["Short", "Medium", "Long", "Full Script"];

const formSchema = z.object({
  prompt: z.string().min(10, 'Prompt must be at least 10 characters long.'),
  language: z.string().min(1, 'Please select a language.'),
  genre: z.string().min(1, 'Please select a genre.'),
  length: z.string().min(1, 'Please select a length.'),
  storytellingMode: z.boolean(),
});

export function AiScriptWriterClient() {
  const [script, setScript] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      language: 'English',
      genre: 'Comedy',
      length: 'Medium',
      storytellingMode: true,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setScript(null);

    try {
      const result = await aiScriptWriter(values);
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
    });
  };

  const downloadScript = (text: string) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-script.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
        title: "Script downloaded!",
    });
  };

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
                  <FormLabel className="font-semibold">Script Prompt</FormLabel>
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                            {languages.map(lang => (
                                <SelectItem key={lang.value} value={lang.name}>
                                    {lang.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="font-semibold">Genre</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <Clapperboard className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select a genre" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {genres.map(genre => (
                                <SelectItem key={genre} value={genre}>
                                    {genre}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="length"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="font-semibold">Length</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <Film className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select a length" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {scriptLengths.map(length => (
                                <SelectItem key={length} value={length}>
                                    {length}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

            <FormField
              control={form.control}
              name="storytellingMode"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <FormLabel className="text-base font-semibold">
                            Storytelling Mode
                        </FormLabel>
                        <p className="text-sm text-muted-foreground">
                            Create a well-structured narrative with a clear beginning, middle, and end.
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
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Generated Script</h3>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(script)}>
                        <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => downloadScript(script)}>
                        <Download className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <Card className="bg-muted/50">
                <CardContent className="p-4 max-h-[400px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap font-body text-sm">{script}</pre>
                </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
