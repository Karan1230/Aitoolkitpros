"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';

import { memeGenerator } from '@/ai/flows/meme-generator';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Download, Laugh, Sparkles, Upload } from 'lucide-react';

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const formSchema = z.object({
  topic: z.string().min(3, 'Topic must be at least 3 characters long.'),
  imageFile: z
    .custom<FileList>()
    .optional()
    .refine(
        (files) => !files || files.length === 0 || files[0].size <= MAX_FILE_SIZE_BYTES,
        `Image file must be less than ${MAX_FILE_SIZE_MB}MB.`
    ),
});

export function MemeGeneratorClient() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      imageFile: undefined,
    },
  });

  const { register, handleSubmit, watch, setValue } = form;
  const watchedFile = watch("imageFile");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        if (file.size > MAX_FILE_SIZE_BYTES) {
            toast({
                variant: 'destructive',
                title: 'File too large',
                description: `Please upload an image smaller than ${MAX_FILE_SIZE_MB}MB.`
            });
            setValue('imageFile', undefined);
            setPreviewUrl(null);
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
    } else {
        setPreviewUrl(null);
    }
  };


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setImageUrl(null);

    try {
        let imageDataUri: string | undefined = undefined;
        if (values.imageFile && values.imageFile.length > 0) {
            const file = values.imageFile[0];
            imageDataUri = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }

      const result = await memeGenerator({ topic: values.topic, imageDataUri });
      setImageUrl(result.imageUrl);
    } catch (error) {
      console.error('Meme generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to generate the meme. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const downloadImage = async (url: string) => {
    try {
      const link = document.createElement('a');
      link.href = url;
      link.download = `ai-meme-${Date.now()}.png`;
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Meme Topic or Text</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., When the code compiles on the first try" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageFile"
              render={() => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Upload an Image (Optional)</FormLabel>
                  <FormControl>
                    <div className="relative border-2 border-dashed border-muted rounded-lg p-6 text-center cursor-pointer hover:border-primary">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                           Drag & drop an image here, or click to select one
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            (Max {MAX_FILE_SIZE_MB}MB)
                        </p>
                        <input 
                            id="file-upload" 
                            type="file" 
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            {...register("imageFile")}
                            onChange={handleFileChange}
                        />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {previewUrl && (
                <div className="space-y-2">
                    <p className="text-sm font-medium">Image Preview:</p>
                    <div className="flex justify-center p-2 border rounded-md bg-muted/50">
                        <Image src={previewUrl} alt="Image preview" width={200} height={200} className="rounded-md object-contain max-h-[200px]" />
                    </div>
                </div>
            )}

            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? 'Generating...' : 'Generate Meme'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
            <div className="mt-6 text-center">
                <div className="flex flex-col items-center justify-center h-full bg-muted/50 p-8 rounded-lg">
                    <Laugh className="h-16 w-16 text-muted-foreground animate-bounce" />
                    <p className="mt-4 text-muted-foreground">Cooking up a fresh meme...</p>
                </div>
            </div>
        )}

        {imageUrl && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Your AI-Generated Meme</h3>
            <Card className="overflow-hidden group relative">
                <Image
                    src={imageUrl}
                    alt="Generated by AI"
                    width={512}
                    height={512}
                    className="w-full h-auto object-contain"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => downloadImage(imageUrl)}
                    >
                        <Download className="h-5 w-5" />
                    </Button>
                </div>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
