"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';

import { customIconGenerator } from '@/ai/flows/custom-icon-generator';
import type { CustomIconGeneratorOutput } from '@/ai/flows/custom-icon-generator';
import { languages } from '@/lib/languages';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Download, Sparkles, Languages, Palette, Image as ImageIcon, Brush } from 'lucide-react';

const formSchema = z.object({
  prompt: z.string().min(3, 'Prompt must be at least 3 characters long.'),
  style: z.string().min(1, 'Please select a style.'),
  colorScheme: z.string().min(3, 'Please describe your color scheme.'),
  language: z.string().min(1, 'Please select a language.'),
});

const styles = ['Flat', '3D', 'Outline', 'Glyph', 'Cartoon', 'Minimalist', 'Pixel Art'];

export function CustomIconGeneratorClient() {
  const [icons, setIcons] = useState<CustomIconGeneratorOutput['imageUrls']>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      style: 'Flat',
      colorScheme: 'Blue and white',
      language: 'English',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setIcons([]);

    try {
      const result = await customIconGenerator(values);
      setIcons(result.imageUrls);
    } catch (error) {
      console.error('Icon generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to generate icons. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const downloadImage = async (url: string) => {
    try {
      const link = document.createElement('a');
      link.href = url;
      link.download = `ai-icon-${Date.now()}.png`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      toast({
        variant: 'destructive',
        title: 'Download Failed',
        description: 'Could not download the icon. Please try again.',
      });
    }
  };

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Icon Description</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., A shield with a heart in the middle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-lg font-semibold">Style</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                           <Brush className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Select a style" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {styles.map(style => (
                            <SelectItem key={style} value={style}>{style}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                    control={form.control}
                    name="colorScheme"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-lg font-semibold">Color Scheme</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Shades of blue and green" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
            </div>
            
             <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-lg font-semibold">Prompt Language</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <Languages className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {languages.map(lang => (
                            <SelectItem key={lang.value} value={lang.name}>{lang.name}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? 'Generating...' : 'Generate Icons'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
            <div className="mt-6 text-center">
                <div className="flex flex-col items-center justify-center h-full bg-muted/50 p-8 rounded-lg">
                    <ImageIcon className="h-16 w-16 text-muted-foreground animate-pulse" />
                    <p className="mt-4 text-muted-foreground">AI is designing your icons...</p>
                </div>
            </div>
        )}

        {icons.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Generated Icons</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {icons.map((url, index) => (
                <Card key={index} className="overflow-hidden group relative cursor-pointer" onClick={() => downloadImage(url)}>
                    <Image
                        src={url}
                        alt={`Generated Icon ${index + 1}`}
                        width={256}
                        height={256}
                        className="w-full h-full object-cover bg-white"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="text-white flex items-center gap-2 p-2 bg-black/50 rounded-lg">
                            <Download className="h-5 w-5" />
                            <span>Download</span>
                        </div>
                    </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
