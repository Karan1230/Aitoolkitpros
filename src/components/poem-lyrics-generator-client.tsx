"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { poemLyricsGenerator } from '@/ai/flows/poem-lyrics-generator';
import { languages } from '@/lib/languages';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Download, Languages, Palette, Music, BookOpen, Type } from 'lucide-react';

const types = ["Poem", "Song Lyrics"];
const genres = ["Love", "Nature", "Abstract", "Storytelling", "Rap", "Pop", "Rock", "Folk", "Sad", "Happy"];
const moods = ["Happy", "Sad", "Reflective", "Energetic", "Calm", "Angry", "Romantic"];

const formSchema = z.object({
  topic: z.string().min(3, 'Topic must be at least 3 characters.'),
  type: z.string().min(1, 'Please select a type.'),
  genre: z.string().min(1, 'Please select a genre.'),
  mood: z.string().min(1, 'Please select a mood.'),
  language: z.string().min(1, 'Please select a language.'),
});

export function PoemLyricsGeneratorClient() {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      type: 'Poem',
      genre: 'Love',
      mood: 'Happy',
      language: 'English',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setContent(null);

    try {
      const result = await poemLyricsGenerator(values);
      setContent(result.content);
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

  const copyToClipboard = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    toast({ title: "Content copied to clipboard!" });
  };
  
  const downloadContent = () => {
    if (!content) return;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-generated-content.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Content downloaded!" });
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
                  <FormLabel className="text-lg font-semibold">Topic / Theme</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., A rainy day in the city, falling in love"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <Type className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {types.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
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
                                <Music className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select a genre" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {genres.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="mood"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Mood</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <Palette className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select a mood" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {moods.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
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
             The AI is channeling its inner artist...
           </div>
        )}

        {content && (
          <div className="mt-6">
             <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-headline flex items-center gap-2"><BookOpen />Generated Content</h3>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={copyToClipboard}><Copy className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={downloadContent}><Download className="h-4 w-4" /></Button>
                </div>
            </div>
            <Card className="bg-muted/50">
                <CardContent className="p-4 max-h-[600px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap font-body text-sm">{content}</pre>
                </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
