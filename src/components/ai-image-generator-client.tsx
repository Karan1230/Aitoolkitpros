"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';

import { aiImageGenerator } from '@/ai/flows/ai-image-generator';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Download, ImageIcon, Sparkles, Smartphone, Square, RectangleHorizontal } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  prompt: z.string().min(10, 'Prompt must be at least 10 characters long.'),
  style: z.string().min(1, 'Please select a style.'),
  aspectRatio: z.string().min(1, 'Please select an aspect ratio.'),
  model: z.string(),
});

const styles = ['Realistic', 'Anime', 'Digital Art', 'Cartoon'];

export function AiImageGeneratorClient() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      style: 'Realistic',
      aspectRatio: '1:1',
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setImageUrls([]);

    try {
      const result = await aiImageGenerator(values);
      setImageUrls(result.imageUrls);
    } catch (error) {
      console.error('Image generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to generate images. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const downloadImage = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `ai-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      toast({
        variant: 'destructive',
        title: 'Download Failed',
        description: 'Could not download the image. Please try again.',
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
                  <FormLabel className="text-lg font-semibold">Image Prompt</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., A cute cat astronaut in a synthwave galaxy" {...field} />
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
            </div>


            <FormField
              control={form.control}
              name="aspectRatio"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-lg font-semibold">Dimensions</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-3 gap-4"
                    >
                      <FormItem>
                        <RadioGroupItem value="9:16" id="9:16" className="sr-only" />
                        <Label htmlFor="9:16" className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground ${field.value === '9:16' ? 'border-primary' : ''}`}>
                          <Smartphone className="mb-3 h-6 w-6" />
                          9:16
                        </Label>
                      </FormItem>
                      <FormItem>
                        <RadioGroupItem value="16:9" id="16:9" className="sr-only" />
                        <Label htmlFor="16:9" className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground ${field.value === '16:9' ? 'border-primary' : ''}`}>
                          <RectangleHorizontal className="mb-3 h-6 w-6" />
                          16:9
                        </Label>
                      </FormItem>
                      <FormItem>
                        <RadioGroupItem value="1:1" id="1:1" className="sr-only" />
                        <Label htmlFor="1:1" className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground ${field.value === '1:1' ? 'border-primary' : ''}`}>
                          <Square className="mb-3 h-6 w-6" />
                          1:1
                        </Label>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? 'Generating...' : 'Generate Images'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
            <div className="mt-6 text-center">
                <div className="flex flex-col items-center justify-center h-full bg-muted/50 p-8 rounded-lg">
                    <ImageIcon className="h-16 w-16 text-muted-foreground animate-pulse" />
                    <p className="mt-4 text-muted-foreground">AI is painting masterpieces...</p>
                </div>
            </div>
        )}

        {imageUrls.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Generated Images</h3>
            <div className="grid grid-cols-2 gap-4">
              {imageUrls.map((url, index) => (
                <Card key={index} className="overflow-hidden group relative">
                    <Image
                        src={url}
                        alt={`Generated by AI ${index + 1}`}
                        width={512}
                        height={512}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => downloadImage(url)}
                        >
                            <Download className="h-5 w-5" />
                        </Button>
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
