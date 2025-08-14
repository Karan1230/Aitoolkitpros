"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { storyPlotGenerator } from '@/ai/flows/story-plot-generator';
import type { StoryPlotGeneratorOutput } from '@/ai/flows/story-plot-generator';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Download, BookText, Drama, Microscope, Users, Map, Pin } from 'lucide-react';
import { Badge } from './ui/badge';

const genres = ["Romance", "Thriller", "Horror", "Sci-Fi", "Fantasy", "Mystery", "Drama", "Comedy", "Adventure"];
const storyLengths = ["Short idea", "Detailed plot", "Chapter outline"];

const formSchema = z.object({
  genre: z.string().min(1, 'Please select a genre.'),
  length: z.string().min(1, 'Please select a story length.'),
  characters: z.string().optional(),
  setting: z.string().optional(),
  theme: z.string().optional(),
});

export function StoryPlotGeneratorClient() {
  const [plot, setPlot] = useState<StoryPlotGeneratorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      genre: 'Fantasy',
      length: 'Detailed plot',
      characters: '',
      setting: '',
      theme: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setPlot(null);

    try {
      const result = await storyPlotGenerator(values);
      setPlot(result);
    } catch (error) {
      console.error('Plot generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to generate the story plot. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const formatPlotForAction = () => {
    if (!plot) return '';
    let text = `Title: ${plot.title}\n\n`;
    text += `Logline: ${plot.logline}\n\n`;
    text += `Genre: ${form.getValues('genre')}\n\n`;
    text += `== Characters ==\n${plot.plot.characters.map(c => `- ${c.name}: ${c.description}`).join('\n')}\n\n`;
    text += `== Setting ==\n${plot.plot.setting}\n\n`;
    text += `== Conflict ==\n${plot.plot.conflict}\n\n`;
    text += `== Resolution ==\n${plot.plot.resolution}\n\n`;
    text += `== Plot Outline ==\n${plot.plot.outline}\n`;
    return text;
  };

  const copyToClipboard = () => {
    const text = formatPlotForAction();
    navigator.clipboard.writeText(text);
    toast({ title: "Plot copied to clipboard!" });
  };

  const downloadPlot = () => {
    const text = formatPlotForAction();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-story-plot.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Plot downloaded!" });
  };

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold text-lg">Genre</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger><Drama className="mr-2 h-4 w-4" />{field.value}</SelectTrigger>
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
                    name="length"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold text-lg">Plot Detail</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger><BookText className="mr-2 h-4 w-4" />{field.value}</SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {storyLengths.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
              control={form.control}
              name="characters"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Characters (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., A weary detective, a charming art thief" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                    control={form.control}
                    name="setting"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-lg font-semibold">Setting (Optional)</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., A rain-slicked cyberpunk city" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-lg font-semibold">Theme (Optional)</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Betrayal, redemption" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>


            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? 'Generating...' : 'Generate Plot'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
           <div className="mt-6 p-4 border rounded-lg bg-muted/50 text-center text-muted-foreground animate-pulse">
             The AI is writing a masterpiece... please wait.
           </div>
        )}

        {plot && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-headline">{plot.title}</h2>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={copyToClipboard}><Copy className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={downloadPlot}><Download className="h-4 w-4" /></Button>
                </div>
            </div>
            <Card className="bg-muted/50">
                <CardContent className="p-6 space-y-6">
                   <p className="italic text-muted-foreground">{plot.logline}</p>
                   <Badge variant="secondary">{form.getValues('genre')}</Badge>

                    <div>
                        <h3 className="font-headline text-xl mb-2 flex items-center gap-2"><Users />Characters</h3>
                        <ul className="space-y-2 list-disc list-inside">
                            {plot.plot.characters.map(char => <li key={char.name}><strong>{char.name}:</strong> {char.description}</li>)}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-headline text-xl mb-2 flex items-center gap-2"><Map/>Setting</h3>
                        <p>{plot.plot.setting}</p>
                    </div>

                     <div>
                        <h3 className="font-headline text-xl mb-2 flex items-center gap-2"><Drama />Conflict</h3>
                        <p>{plot.plot.conflict}</p>
                    </div>

                     <div>
                        <h3 className="font-headline text-xl mb-2 flex items-center gap-2"><Pin />Resolution</h3>
                        <p>{plot.plot.resolution}</p>
                    </div>
                    
                     <div>
                        <h3 className="font-headline text-xl mb-2 flex items-center gap-2"><BookText />Plot Outline</h3>
                        <pre className="whitespace-pre-wrap font-body text-sm bg-background p-4 rounded-md">{plot.plot.outline}</pre>
                    </div>
                </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
