"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';

import { backgroundRemover } from '@/ai/flows/background-remover';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Download, Image as ImageIcon, Sparkles, Upload, Trash2, Palette, Check } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const colors = ["#FFFFFF", "#000000", "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#F4D03F"];

const formSchema = z.object({
  imageFile: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, "An image file is required.")
    .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE_BYTES,
        `Image file must be less than ${MAX_FILE_SIZE_MB}MB.`
    ),
  background: z.string().min(1, 'Please select a background.'),
  customColor: z.string().optional(),
}).refine(data => {
    if (data.background === 'custom' && !data.customColor) {
        return false;
    }
    return true;
}, {
    message: "Please select a custom color.",
    path: ["customColor"],
});


export function BackgroundRemoverClient() {
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageFile: undefined,
      background: 'transparent',
      customColor: '#CCCCCC'
    },
  });

  const { register, handleSubmit, watch, setValue } = form;
  const watchedFile = watch("imageFile");
  const selectedBg = watch("background");

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
    setResultImageUrl(null);

    try {
        const file = values.imageFile[0];
        const imageDataUri = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

        const backgroundValue = values.background === 'custom' ? values.customColor! : values.background;

        const result = await backgroundRemover({ imageDataUri, background: backgroundValue });
        setResultImageUrl(result.imageUrl);
    } catch (error) {
      console.error('Background removal failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to remove the background. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const downloadImage = async (url: string) => {
    try {
      const link = document.createElement('a');
      link.href = url;
      link.download = `background-removed-${Date.now()}.png`;
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
              name="imageFile"
              render={() => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Upload Your Image</FormLabel>
                  <FormControl>
                    <div className="relative border-2 border-dashed border-muted rounded-lg p-6 text-center cursor-pointer hover:border-primary">
                        {previewUrl ? (
                             <div className="relative">
                                <Image src={previewUrl} alt="Image preview" width={200} height={200} className="rounded-md object-contain max-h-[200px] mx-auto" />
                                <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={() => { setValue('imageFile', undefined); setPreviewUrl(null); }}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                                <p className="mt-2 text-sm text-muted-foreground">
                                Drag & drop an image here, or click to select one
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    (Max {MAX_FILE_SIZE_MB}MB)
                                </p>
                            </>
                        )}
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

            <FormField
              control={form.control}
              name="background"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Choose Background</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2 pt-2">
                        <Label htmlFor="transparent-bg" className={`flex items-center gap-2 rounded-md border-2 p-3 cursor-pointer ${field.value === 'transparent' ? 'border-primary' : 'border-muted'}`}>
                           <input type="radio" id="transparent-bg" name="background" value="transparent" checked={field.value === 'transparent'} onChange={field.onChange} className="sr-only" />
                           <div className="w-6 h-6 bg-transparent border-2 border-dashed rounded-full bg-white bg-cover" style={{backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`}} />
                           <span>Transparent</span>
                        </Label>
                        {colors.map(color => (
                            <Label key={color} htmlFor={`color-${color}`} className={`flex items-center gap-2 rounded-md border-2 p-3 cursor-pointer ${field.value === color ? 'border-primary' : 'border-muted'}`}>
                                <input type="radio" id={`color-${color}`} name="background" value={color} checked={field.value === color} onChange={field.onChange} className="sr-only" />
                                <div className="w-6 h-6 rounded-full" style={{backgroundColor: color}} />
                                {field.value === color && <Check className="h-5 w-5 text-primary" />}
                            </Label>
                        ))}
                        <FormField
                            control={form.control}
                            name="customColor"
                            render={({ field: customColorField }) => (
                                <Label htmlFor="custom-color-bg" className={`flex items-center gap-2 rounded-md border-2 p-3 cursor-pointer ${selectedBg === 'custom' ? 'border-primary' : 'border-muted'}`}>
                                    <input type="radio" id="custom-color-bg" name="background" value="custom" checked={selectedBg === 'custom'} onChange={(e) => setValue('background', e.target.value)} className="sr-only" />
                                    <input type="color" {...customColorField} className="w-6 h-6 p-0 border-none bg-transparent" />
                                    <span>Custom</span>
                                </Label>
                            )}
                        />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? 'Processing...' : 'Remove Background'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
            <div className="mt-6 text-center">
                <div className="flex flex-col items-center justify-center h-full bg-muted/50 p-8 rounded-lg">
                    <ImageIcon className="h-16 w-16 text-muted-foreground animate-pulse" />
                    <p className="mt-4 text-muted-foreground">AI is working its magic...</p>
                </div>
            </div>
        )}

        {resultImageUrl && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Result</h3>
            <Card className="overflow-hidden group relative">
                <Image
                    src={resultImageUrl}
                    alt="Image with background removed"
                    width={512}
                    height={512}
                    className="w-full h-auto object-contain bg-cover"
                    style={{backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23ccc' stroke-width='1' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`}}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => downloadImage(resultImageUrl)}
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
