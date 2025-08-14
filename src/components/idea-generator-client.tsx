"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { ideaGenerator } from '@/ai/flows/idea-generator';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Download, Languages, Lightbulb, CaseSensitive } from 'lucide-react';
import { languages } from '@/lib/languages';

const ideaTypes = [
  "Business Idea", 
  "Marketing Idea", 
  "Content Idea", 
  "Startup Idea", 
  "Product Idea"
];

const formSchema = z.object({
  topic: z.string().min(3, 'Topic must be at least 3 characters long.'),
  ideaType: z.string().min(1, 'Please select an idea type.'),
  language: z.string().min(1, 'Please select a language.'),
});

export function IdeaGeneratorClient() {
  const [ideas, setIdeas] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      ideaType: 'Business Idea',
      language: 'English',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setIdeas(null);

    try {
      const result = await ideaGenerator(values);
      setIdeas(result.ideas);
    } catch (error) {
      console.error('Idea generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to generate ideas. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const formatIdeasForAction = (separator: string) => {
    if (!ideas) return '';
    return ideas.join(separator);
  };

  const copyToClipboard = () => {
    const text = formatIdeasForAction('\n');
    navigator.clipboard.writeText(text);
    toast({ title: "Ideas copied to clipboard!" });
  };

  const downloadIdeas = () => {
    const text = formatIdeasForAction('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-ideas.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Ideas downloaded!" });
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
                  <FormLabel className="text-lg font-semibold">Your Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., sustainable energy, pet care, online education" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                    control={form.control}
                    name="ideaType"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Idea Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger><CaseSensitive className="mr-2 h-4 w-4" />{field.value}</SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {ideaTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
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
                                <SelectTrigger><Languages className="mr-2 h-4 w-4" />{field.value}</SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {languages.map(l => <SelectItem key={l.value} value={l.name}>{l.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? 'Generating...' : 'Generate Ideas'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
           <div className="mt-6 p-4 border rounded-lg bg-muted/50 text-center text-muted-foreground animate-pulse">
             The AI is brainstorming... please wait.
           </div>
        )}

        {ideas && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-headline">Generated Ideas</h3>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={copyToClipboard}><Copy className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={downloadIdeas}><Download className="h-4 w-4" /></Button>
                </div>
            </div>
            <Card className="bg-muted/50">
                <CardContent className="p-4 max-h-[600px] overflow-y-auto space-y-4">
                   {ideas.map((idea, index) => (
                       <div key={index} className="flex items-start gap-3">
                           <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                           <p>{idea}</p>
                       </div>
                   ))}
                </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
