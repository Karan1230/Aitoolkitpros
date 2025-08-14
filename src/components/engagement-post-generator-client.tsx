"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { engagementPostGenerator } from '@/ai/flows/engagement-post-generator';
import type { EngagementPostGeneratorOutput } from '@/ai/flows/engagement-post-generator';
import { languages } from '@/lib/languages';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Download, Languages, Bot, MessageSquare, ThumbsUp } from 'lucide-react';
import { Badge } from './ui/badge';

const platforms = ["Instagram", "Facebook", "Twitter/X", "LinkedIn", "TikTok"];
const contentTypes = ["Question", "Poll", "Challenge", "Tip", "Inspirational", "Educational", "Fun Fact"];

const formSchema = z.object({
  topic: z.string().min(3, 'Topic must be at least 3 characters.'),
  platform: z.string().min(1, 'Please select a platform.'),
  contentType: z.string().min(1, 'Please select a content type.'),
  language: z.string().min(1, 'Please select a language.'),
});

type PostIdea = EngagementPostGeneratorOutput['postIdeas'][0];

export function EngagementPostGeneratorClient() {
  const [postIdeas, setPostIdeas] = useState<PostIdea[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      platform: 'Instagram',
      contentType: 'Question',
      language: 'English',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setPostIdeas(null);

    try {
      const result = await engagementPostGenerator(values);
      setPostIdeas(result.postIdeas);
    } catch (error) {
      console.error('Post idea generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to generate post ideas. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const formatPostForAction = (post: PostIdea) => {
    let text = `Idea: ${post.idea}\n\n`;
    text += `Caption:\n${post.caption}\n\n`;
    text += `Hashtags: ${post.hashtags.join(' ')}`;
    return text;
  };

  const copyToClipboard = (post: PostIdea) => {
    const text = formatPostForAction(post);
    navigator.clipboard.writeText(text);
    toast({ title: "Post idea copied to clipboard!" });
  };
  
  const downloadAll = () => {
    if (!postIdeas) return;
    const text = postIdeas.map(post => formatPostForAction(post)).join('\n\n---\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-engagement-post-ideas.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "All ideas downloaded!" });
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
                  <FormLabel className="text-lg font-semibold">Topic / Niche</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Fitness for beginners, tech startups, vegan recipes"
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
                    name="platform"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Platform</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <Bot className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select a platform" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {platforms.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="contentType"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Content Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {contentTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
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
              {isLoading ? 'Generating...' : 'Generate Ideas'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
           <div className="mt-6 p-4 border rounded-lg bg-muted/50 text-center text-muted-foreground animate-pulse">
             The AI is brainstorming engaging content for you...
           </div>
        )}

        {postIdeas && (
          <div className="mt-6 space-y-4">
             <div className="flex justify-between items-center">
                <h3 className="text-xl font-headline flex items-center gap-2"><ThumbsUp/>Generated Ideas</h3>
                <Button variant="outline" onClick={downloadAll}>
                    <Download className="mr-2 h-4 w-4" />
                    Download All
                </Button>
            </div>
            {postIdeas.map((post, index) => (
              <Card key={index} className="bg-muted/50 relative group">
                <CardHeader>
                  <CardTitle className="text-lg">{post.idea}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <p className="text-sm whitespace-pre-wrap">{post.caption}</p>
                   <div className="flex flex-wrap gap-2">
                        {post.hashtags.map((tag, i) => (
                            <Badge key={i} variant="secondary">{tag}</Badge>
                        ))}
                   </div>
                </CardContent>
                <Button variant="outline" size="icon" className="absolute top-4 right-4 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => copyToClipboard(post)}>
                    <Copy className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
