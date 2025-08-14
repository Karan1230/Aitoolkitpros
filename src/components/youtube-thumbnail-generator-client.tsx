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
import { useToast } from '@/hooks/use-toast';
import { Download, ImageIcon, Sparkles, Square, RectangleHorizontal } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  prompt: z.string().min(5, 'Title must be at least 5 characters long.'),
  aspectRatio: z.string().min(1, 'Please select an aspect ratio.'),
  style: z.string().optional(), // Style is optional but can be used for prompt engineering
});

export function YoutubeThumbnailGeneratorClient() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      aspectRatio: '16:9',
      style: 'Digital Art'
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setImageUrls([]);

    try {
      const result = await aiImageGenerator({
          ...values,
          model: 'googleai/gemini-2.0-flash-preview-image-generation',
          isThumbnail: true
      });
      setImageUrls(result.imageUrls);
    } catch (error) {
      console.error('Thumbnail generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to generate thumbnails. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const downloadImage = async (url: string) => {
    try {
        const link = document.createElement('a');
        link.href = url;
        link.download = `youtube-thumbnail-${Date.now()}.png`;
        link.target = '_blank';
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
                  <FormLabel className="text-lg font-semibold">Video Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., How to Bake the Perfect Chocolate Cake" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="aspectRatio"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-lg font-semibold">Thumbnail Size</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      <FormItem>
                        <RadioGroupItem value="16:9" id="16:9" className="sr-only" />
                        <Label htmlFor="16:9" className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground ${field.value === '16:9' ? 'border-primary' : ''}`}>
                          <RectangleHorizontal className="mb-3 h-6 w-6" />
                          16:9 (Video)
                        </Label>
                      </FormItem>
                      <FormItem>
                        <RadioGroupItem value="1:1" id="1:1" className="sr-only" />
                        <Label htmlFor="1:1" className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground ${field.value === '1:1' ? 'border-primary' : ''}`}>
                          <Square className="mb-3 h-6 w-6" />
                          1:1 (Icon)
                        </Label>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? 'Generating...' : 'Generate Thumbnails'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
            <div className="mt-6 text-center">
                <div className="flex flex-col items-center justify-center h-full bg-muted/50 p-8 rounded-lg">
                    <ImageIcon className="h-16 w-16 text-muted-foreground animate-pulse" />
                    <p className="mt-4 text-muted-foreground">AI is designing your thumbnails...</p>
                </div>
            </div>
        )}

        {imageUrls.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Generated Thumbnails</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {imageUrls.map((url, index) => (
                <Card key={index} className="overflow-hidden group relative cursor-pointer" onClick={() => downloadImage(url)}>
                    <Image
                        src={url}
                        alt={`Generated YouTube Thumbnail ${index + 1}`}
                        width={1280}
                        height={720}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="text-white flex items-center gap-2">
                            <Download className="h-6 w-6" />
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
