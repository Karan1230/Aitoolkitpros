"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { sloganGenerator } from '@/ai/flows/slogan-generator';
import { languages } from '@/lib/languages';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Download, Languages, Palette } from 'lucide-react';

const tones = ["Catchy", "Professional", "Creative", "Funny", "Luxury"];

const formSchema = z.object({
  brandName: z.string().min(2, 'Brand name must be at least 2 characters.'),
  industry: z.string().min(3, 'Industry must be at least 3 characters.'),
  details: z.string().min(10, 'Details must be at least 10 characters.'),
  keyMessage: z.string().min(5, 'Key message must be at least 5 characters.'),
  tone: z.string().min(1, 'Please select a tone.'),
  seoFriendly: z.boolean(),
  language: z.string().min(1, 'Please select a language.'),
});

export function SloganGeneratorClient() {
  const [slogans, setSlogans] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brandName: '',
      industry: '',
      details: '',
      keyMessage: '',
      tone: 'Catchy',
      seoFriendly: false,
      language: 'English',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSlogans(null);

    try {
      const result = await sloganGenerator(values);
      setSlogans(result.slogans);
    } catch (error) {
      console.error('Slogan generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to generate slogans. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const formatSlogansForAction = (separator: string) => {
    if (!slogans) return '';
    return slogans.join(separator);
  };

  const copyToClipboard = () => {
    const text = formatSlogansForAction('\n');
    navigator.clipboard.writeText(text);
    toast({ title: "Slogans copied to clipboard!" });
  };

  const downloadSlogans = () => {
    const text = formatSlogansForAction('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-slogans.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Slogans downloaded!" });
  };

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="brandName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Brand Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Nike, Coca-Cola" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Industry/Niche</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Sportswear, Beverages" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Product/Service Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., We sell high-performance athletic shoes and apparel."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="keyMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Key Message</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Empowerment, innovation, victory" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
             <FormField
              control={form.control}
              name="seoFriendly"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <FormLabel className="text-base font-semibold">
                            SEO-Friendly Slogans
                        </FormLabel>
                        <p className="text-sm text-muted-foreground">
                           Incorporate relevant keywords for online marketing.
                        </p>
                    </div>
                    <FormControl>
                        <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? 'Generating...' : 'Generate Slogans'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
           <div className="mt-6 p-4 border rounded-lg bg-muted/50 text-center text-muted-foreground animate-pulse">
             The AI is crafting some catchy slogans...
           </div>
        )}

        {slogans && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-headline">Generated Slogans</h3>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={copyToClipboard}><Copy className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={downloadSlogans}><Download className="h-4 w-4" /></Button>
                </div>
            </div>
            <Card className="bg-muted/50">
                <CardContent className="p-4 max-h-[600px] overflow-y-auto">
                   <ul className="space-y-2">
                        {slogans.map((slogan, index) => (
                            <li key={index} className="p-2 bg-background rounded-md shadow-sm">{slogan}</li>
                        ))}
                   </ul>
                </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
