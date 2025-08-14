"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { reelShortsScriptWriter } from '@/ai/flows/reel-shorts-script-writer';
import type { ReelShortsScriptWriterOutput } from '@/ai/flows/reel-shorts-script-writer';
import { languages } from '@/lib/languages';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Download, Languages, Bot, Palette, Video, Hash } from 'lucide-react';
import { Badge } from './ui/badge';

const platforms = ["Instagram Reels", "YouTube Shorts", "TikTok"];
const tones = ["Funny", "Motivational", "Informative", "Emotional", "Storytelling", "Trendy"];

const formSchema = z.object({
  topic: z.string().min(3, 'Topic must be at least 3 characters.'),
  platform: z.string().min(1, 'Please select a platform.'),
  tone: z.string().min(1, 'Please select a tone.'),
  language: z.string().min(1, 'Please select a language.'),
});

type Script = ReelShortsScriptWriterOutput['scripts'][0];

export function ReelShortsScriptWriterClient() {
  const [scripts, setScripts] = useState<Script[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      platform: 'TikTok',
      tone: 'Funny',
      language: 'English',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setScripts(null);

    try {
      const result = await reelShortsScriptWriter(values);
      setScripts(result.scripts);
    } catch (error) {
      console.error('Script generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to generate scripts. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const formatScriptForAction = (script: Script) => {
    let text = `Hook: ${script.hook}\n\n`;
    text += `Main Content:\n${script.mainContent}\n\n`;
    text += `Call to Action: ${script.callToAction}\n\n`;
    text += `Caption: ${script.caption}\n\n`;
    text += `Hashtags: ${script.hashtags.join(' ')}`;
    return text;
  };

  const copyToClipboard = (script: Script) => {
    const text = formatScriptForAction(script);
    navigator.clipboard.writeText(text);
    toast({ title: "Script copied to clipboard!" });
  };
  
  const downloadAll = () => {
    if (!scripts) return;
    const text = scripts.map((script, index) => `--- SCRIPT ${index + 1} ---\n\n${formatScriptForAction(script)}`).join('\n\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-reel-scripts.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "All scripts downloaded!" });
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
                  <FormLabel className="text-lg font-semibold">Topic / Idea</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., A funny skit about a cat who thinks it's a dog"
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
                            {tones.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
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
              {isLoading ? 'Generating...' : 'Generate Scripts'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
           <div className="mt-6 p-4 border rounded-lg bg-muted/50 text-center text-muted-foreground animate-pulse">
             The AI is writing your next viral script...
           </div>
        )}

        {scripts && (
          <div className="mt-6 space-y-4">
             <div className="flex justify-between items-center">
                <h3 className="text-xl font-headline flex items-center gap-2"><Video />Generated Scripts</h3>
                <Button variant="outline" onClick={downloadAll}>
                    <Download className="mr-2 h-4 w-4" />
                    Download All
                </Button>
            </div>
            {scripts.map((script, index) => (
              <Card key={index} className="bg-muted/50 relative group">
                <CardHeader>
                  <CardTitle className="text-lg">Script Idea {index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div>
                        <p className="font-semibold text-sm">Hook:</p>
                        <p className="text-sm">{script.hook}</p>
                   </div>
                   <div>
                        <p className="font-semibold text-sm">Main Content:</p>
                        <p className="text-sm whitespace-pre-wrap">{script.mainContent}</p>
                   </div>
                    <div>
                        <p className="font-semibold text-sm">Call to Action:</p>
                        <p className="text-sm">{script.callToAction}</p>
                   </div>
                    <div>
                        <p className="font-semibold text-sm">Caption:</p>
                        <p className="text-sm">{script.caption}</p>
                   </div>
                   <div className="flex flex-wrap gap-2">
                        {script.hashtags.map((tag, i) => (
                            <Badge key={i} variant="secondary"><Hash className="h-3 w-3 mr-1"/>{tag.replace('#','')}</Badge>
                        ))}
                   </div>
                </CardContent>
                <Button variant="outline" size="icon" className="absolute top-4 right-4 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => copyToClipboard(script)}>
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
