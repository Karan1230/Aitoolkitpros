"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { colorPaletteFinder } from '@/ai/flows/color-palette-finder';
import type { ColorPaletteFinderOutput } from '@/ai/flows/color-palette-finder';
import { languages } from '@/lib/languages';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Languages, Palette, PaintBucket, SwatchBook } from 'lucide-react';

const paletteTypes = ["Analogous", "Monochromatic", "Triadic", "Complementary", "Split Complementary", "Tetradic"];

const formSchema = z.object({
  inspiration: z.string().min(10, 'Please provide a more detailed description for inspiration.'),
  paletteType: z.string().min(1, 'Please select a palette type.'),
  language: z.string().min(1, 'Please select a language.'),
});

type Palette = ColorPaletteFinderOutput['palettes'][0];

export function ColorPaletteFinderClient() {
  const [palettes, setPalettes] = useState<Palette[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inspiration: '',
      paletteType: 'Analogous',
      language: 'English',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setPalettes(null);

    try {
      const result = await colorPaletteFinder(values);
      setPalettes(result.palettes);
    } catch (error) {
      console.error('Palette generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to generate palettes. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: `Copied "${text}" to clipboard!` });
  };

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="inspiration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Color Inspiration</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., A modern and minimalist tech startup, a warm and cozy coffee shop, a vibrant summer music festival..."
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
                    name="paletteType"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Palette Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SwatchBook className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {paletteTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
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
              {isLoading ? 'Generating...' : 'Generate Palettes'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
           <div className="mt-6 p-4 border rounded-lg bg-muted/50 text-center text-muted-foreground animate-pulse">
             The AI is mixing the perfect colors...
           </div>
        )}

        {palettes && (
          <div className="mt-6 space-y-6">
             <h3 className="text-xl font-headline flex items-center gap-2"><Palette/>Generated Palettes</h3>
            {palettes.map((palette, index) => (
              <Card key={index} className="bg-muted/50">
                <CardContent className="p-4">
                   <p className="font-semibold mb-3">{palette.name}</p>
                   <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 grid grid-cols-6 h-16 rounded-lg overflow-hidden border">
                           {palette.colors.map(color => (
                            <div key={color} style={{backgroundColor: color}} />
                           ))}
                        </div>
                        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-2">
                           {palette.colors.map(color => (
                                <div key={color} className="flex items-center gap-2 p-1.5 rounded-md bg-background text-xs">
                                    <div className="w-5 h-5 rounded" style={{backgroundColor: color}}/>
                                    <span>{color}</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto" onClick={() => copyToClipboard(color)}>
                                        <Copy className="h-3 w-3"/>
                                    </Button>
                                </div>
                           ))}
                        </div>
                   </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
