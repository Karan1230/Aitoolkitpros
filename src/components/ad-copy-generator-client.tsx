"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { adCopyGenerator } from '@/ai/flows/ad-copy-generator';
import type { AdCopyGeneratorOutput } from '@/ai/flows/ad-copy-generator';
import { languages } from '@/lib/languages';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Download, Languages, Palette, Megaphone, Bot } from 'lucide-react';
import { Badge } from './ui/badge';

const platforms = ["Google Ads", "Facebook Ads", "Instagram Ads", "LinkedIn Ads", "Twitter/X Ads"];
const tones = ["Persuasive", "Informative", "Emotional", "Luxury", "Humorous"];

const formSchema = z.object({
  productDetails: z.string().min(10, 'Product details must be at least 10 characters.'),
  targetAudience: z.string().min(3, 'Target audience must be at least 3 characters.'),
  keyPoints: z.string().min(10, 'Please list at least one key point.'),
  platform: z.string().min(1, 'Please select a platform.'),
  tone: z.string().min(1, 'Please select a tone.'),
  language: z.string().min(1, 'Please select a language.'),
});

export function AdCopyGeneratorClient() {
  const [adCopies, setAdCopies] = useState<AdCopyGeneratorOutput['adCopies'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productDetails: '',
      targetAudience: '',
      keyPoints: '',
      platform: 'Facebook Ads',
      tone: 'Persuasive',
      language: 'English',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAdCopies(null);

    try {
      const result = await adCopyGenerator(values);
      setAdCopies(result.adCopies);
    } catch (error) {
      console.error('Ad copy generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to generate ad copy. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const formatAdCopyForAction = (ad: { headline: string; mainText: string; callToAction: string; }) => {
    return `Headline: ${ad.headline}\nText: ${ad.mainText}\nCTA: ${ad.callToAction}`;
  };

  const copyToClipboard = (ad: { headline: string; mainText: string; callToAction: string; }) => {
    const text = formatAdCopyForAction(ad);
    navigator.clipboard.writeText(text);
    toast({ title: "Ad copy copied to clipboard!" });
  };

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <FormField
              control={form.control}
              name="productDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Product/Service Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., A subscription box for gourmet coffee beans, sourced ethically from around the world."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="targetAudience"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Target Audience</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Coffee lovers, remote workers" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="keyPoints"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Key Selling Points</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Freshness, variety, convenience" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

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
                            {tones.map(tone => <SelectItem key={tone} value={tone}>{tone}</SelectItem>)}
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
              {isLoading ? 'Generating...' : 'Generate Ad Copy'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
           <div className="mt-6 p-4 border rounded-lg bg-muted/50 text-center text-muted-foreground animate-pulse">
             The AI is writing your ads...
           </div>
        )}

        {adCopies && (
          <div className="mt-6 space-y-4">
            <h3 className="text-xl font-headline flex items-center gap-2"><Megaphone/>Generated Ad Copy</h3>
            {adCopies.map((ad, index) => (
              <Card key={index} className="bg-muted/50 relative group">
                <CardHeader>
                  <CardTitle className="text-lg">{ad.headline}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <p className="text-sm">{ad.mainText}</p>
                   <Badge>{ad.callToAction}</Badge>
                </CardContent>
                <Button variant="outline" size="icon" className="absolute top-4 right-4 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => copyToClipboard(ad)}>
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
