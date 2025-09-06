"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { humanizeText } from '@/ai/flows/humanizer';
import { languages } from '@/lib/languages';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Download, Languages, ArrowRight } from 'lucide-react';

const formSchema = z.object({
  text: z.string().min(20, 'Please provide at least 20 characters of text to humanize.'),
  language: z.string().min(1, 'Please select a language.'),
});

export function HumanizerClient() {
  const [humanizedText, setHumanizedText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
      language: 'English',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setHumanizedText(null);

    try {
      const result = await humanizeText(values);
      setHumanizedText(result.humanizedText);
    } catch (error) {
      console.error('Humanization failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to humanize the text. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Text copied to clipboard!" });
  };

  const downloadText = (text: string) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'humanized-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Text downloaded!" });
  };

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                 <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                        <FormLabel className="text-lg font-semibold">AI-Generated Text</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="Paste the text you want to make more human-sounding..."
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
                 <Button type="submit" disabled={isLoading} size="lg" className="w-full md:w-auto">
                    {isLoading ? 'Humanizing...' : 'Humanize Text'}
                    <Sparkles className="ml-2 h-5 w-5" />
                </Button>
            </div>
          </form>
        </Form>

        {isLoading && (
           <div className="mt-6 p-4 border rounded-lg bg-muted/50 text-center text-muted-foreground animate-pulse">
             Adding a human touch... please wait.
           </div>
        )}

        {humanizedText && (
          <div className="mt-8">
            <h3 className="text-xl font-headline mb-4">Results</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    <h4 className="font-semibold mb-2">Original Text</h4>
                    <Card className="bg-background">
                        <CardContent className="p-4 max-h-[300px] overflow-y-auto text-sm text-muted-foreground">
                            {form.getValues('text')}
                        </CardContent>
                    </Card>
                </div>
                <div className="relative">
                    <h4 className="font-semibold mb-2">Humanized Text</h4>
                    <Card className="bg-muted/50 border-primary/50">
                        <CardContent className="p-4 max-h-[300px] overflow-y-auto text-sm">
                            {humanizedText}
                        </CardContent>
                    </Card>
                    <div className="absolute top-8 right-2 flex flex-col gap-2">
                         <Button variant="outline" size="icon" onClick={() => copyToClipboard(humanizedText)}><Copy className="h-4 w-4" /></Button>
                         <Button variant="outline" size="icon" onClick={() => downloadText(humanizedText)}><Download className="h-4 w-4" /></Button>
                    </div>
                </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
