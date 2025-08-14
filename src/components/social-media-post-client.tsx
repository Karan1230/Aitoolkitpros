"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { socialMediaPostGenerator } from '@/ai/flows/social-media-post-generator';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Check, Languages } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { languages } from '@/lib/languages';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const formSchema = z.object({
  topic: z.string().min(2, 'Topic must be at least 2 characters long.'),
  language: z.string().min(1, 'Please select a language.'),
});

export function SocialMediaPostClient() {
  const [post, setPost] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      language: 'English',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setPost(null);

    try {
      const result = await socialMediaPostGenerator(values);
      setPost(result.post);
    } catch (error) {
      console.error('Post generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to generate the post. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const copyToClipboard = () => {
    if (!post) return;
    navigator.clipboard.writeText(post);
    setCopied(true);
    toast({ title: 'Copied to clipboard!' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
     <Card className="border-2 border-primary/20 shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-lg font-semibold">Topic</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., The future of AI" {...field} />
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
                    <FormLabel className="text-lg font-semibold">Language</FormLabel>
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
            </div>
            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
                {isLoading ? 'Generating...' : 'Generate Post'}
                <Sparkles className="ml-2 h-5 w-5" />
            </Button>
            </form>
        </Form>

        {isLoading && (
            <div className="mt-6 p-4 border rounded-lg bg-muted/50 text-center text-muted-foreground animate-pulse">
            Crafting your social media post...
            </div>
        )}

        {post && (
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Generated Post</h3>
                <div className="relative">
                    <Card className="bg-muted/50">
                    <CardContent className="p-4 max-h-[400px] overflow-y-auto">
                        <p className="whitespace-pre-wrap font-body text-sm">{post}</p>
                    </CardContent>
                    </Card>
                    <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyToClipboard}
                    className="absolute top-2 right-2 h-8 w-8"
                    >
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
