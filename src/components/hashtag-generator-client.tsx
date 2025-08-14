"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { hashtagGenerator } from '@/ai/flows/hashtag-generator';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Download, Hash, Bot, Star, Rows } from 'lucide-react';
import { Badge } from './ui/badge';

const platforms = ["Instagram", "TikTok", "YouTube", "Twitter/X", "Facebook", "LinkedIn"];
const styles = ["Short & Popular", "Long-Tail & Niche", "Mixed"];

const formSchema = z.object({
  topic: z.string().min(3, 'Topic must be at least 3 characters long.'),
  platform: z.string().min(1, 'Please select a platform.'),
  style: z.string().min(1, 'Please select a style.'),
});

export function HashtagGeneratorClient() {
  const [hashtags, setHashtags] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      platform: 'Instagram',
      style: 'Mixed',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setHashtags(null);

    try {
      const result = await hashtagGenerator(values);
      setHashtags(result.hashtags);
    } catch (error) {
      console.error('Hashtag generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to generate hashtags. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const formatHashtagsForAction = (separator: string) => {
    if (!hashtags) return '';
    return hashtags.join(separator);
  };

  const copyToClipboard = () => {
    const text = formatHashtagsForAction(' ');
    navigator.clipboard.writeText(text);
    toast({ title: "Hashtags copied to clipboard!" });
  };

  const downloadHashtags = () => {
    const text = formatHashtagsForAction('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-hashtags.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Hashtags downloaded!" });
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
                  <FormLabel className="text-lg font-semibold">Topic or Post Description</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., healthy breakfast recipes, digital marketing tips" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                    control={form.control}
                    name="platform"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Platform</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger><Bot className="mr-2 h-4 w-4" />{field.value}</SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {platforms.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Hashtag Style</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger><Rows className="mr-2 h-4 w-4" />{field.value}</SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {styles.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? 'Generating...' : 'Generate Hashtags'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
           <div className="mt-6 p-4 border rounded-lg bg-muted/50 text-center text-muted-foreground animate-pulse">
             The AI is searching for the best hashtags...
           </div>
        )}

        {hashtags && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-headline flex items-center gap-2"><Hash className="h-5 w-5" /> Generated Hashtags</h3>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={copyToClipboard}><Copy className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={downloadHashtags}><Download className="h-4 w-4" /></Button>
                </div>
            </div>
            <Card className="bg-muted/50">
                <CardContent className="p-4">
                   <div className="flex flex-wrap gap-2">
                        {hashtags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-base font-normal">{tag}</Badge>
                        ))}
                   </div>
                </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
