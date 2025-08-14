"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { giftSuggestionGenerator } from '@/ai/flows/gift-suggestion-generator';
import type { GiftSuggestionGeneratorOutput } from '@/ai/flows/gift-suggestion-generator';
import { languages } from '@/lib/languages';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Download, Languages, Gift, Calendar, User, DollarSign } from 'lucide-react';
import { Badge } from './ui/badge';

const occasions = ["Birthday", "Anniversary", "Christmas", "Valentine's Day", "Mother's Day", "Father's Day", "Graduation", "Wedding"];
const ageRanges = ["Kid (0-12)", "Teen (13-19)", "Young Adult (20-30)", "Adult (31-50)", "Senior (50+)"];
const priceRanges = ["Under $25", "$25 - $50", "$50 - $100", "$100 - $250", "Any"];

const formSchema = z.object({
  interests: z.string().min(3, 'Please describe at least one interest.'),
  occasion: z.string().min(1, 'Please select an occasion.'),
  age: z.string().min(1, 'Please select an age range.'),
  priceRange: z.string().min(1, 'Please select a price range.'),
  language: z.string().min(1, 'Please select a language.'),
});

type GiftIdea = GiftSuggestionGeneratorOutput['giftIdeas'][0];

export function GiftSuggestionToolClient() {
  const [giftIdeas, setGiftIdeas] = useState<GiftIdea[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: '',
      occasion: 'Birthday',
      age: 'Adult (31-50)',
      priceRange: 'Any',
      language: 'English',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGiftIdeas(null);

    try {
      const result = await giftSuggestionGenerator(values);
      setGiftIdeas(result.giftIdeas);
    } catch (error) {
      console.error('Gift suggestion failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to generate gift ideas. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const formatIdeasForAction = () => {
    if (!giftIdeas) return '';
    return giftIdeas.map(idea => 
      `Gift: ${idea.name}\nCategory: ${idea.category}\nDescription: ${idea.description}`
    ).join('\n\n---\n\n');
  };

  const copyToClipboard = () => {
    const text = formatIdeasForAction();
    navigator.clipboard.writeText(text);
    toast({ title: "Gift ideas copied to clipboard!" });
  };
  
  const downloadIdeas = () => {
    const text = formatIdeasForAction();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-gift-suggestions.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Gift ideas downloaded!" });
    };

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Recipient's Interests</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Loves hiking, reading fantasy novels, and trying new coffee shops."
                      className="min-h-[100px]"
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
                    name="occasion"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Occasion</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <Calendar className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select an occasion" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {occasions.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Age Range</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <User className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select age range" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {ageRanges.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="priceRange"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Price Range</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <DollarSign className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select a price range" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {priceRanges.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
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
              {isLoading ? 'Generating Ideas...' : 'Suggest Gifts'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
           <div className="mt-6 p-4 border rounded-lg bg-muted/50 text-center text-muted-foreground animate-pulse">
             The AI is finding the perfect gifts...
           </div>
        )}

        {giftIdeas && (
          <div className="mt-6 space-y-4">
             <div className="flex justify-between items-center">
                <h3 className="text-xl font-headline flex items-center gap-2"><Gift />Generated Gift Ideas</h3>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={copyToClipboard}><Copy className="mr-2 h-4 w-4" />Copy All</Button>
                    <Button variant="outline" size="sm" onClick={downloadIdeas}><Download className="mr-2 h-4 w-4" />Download</Button>
                </div>
            </div>
            {giftIdeas.map((idea, index) => (
              <Card key={index} className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-lg">{idea.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <p className="text-sm">{idea.description}</p>
                   <Badge variant="secondary">{idea.category}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
