"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';

import { cartoonAvatarMaker } from '@/ai/flows/cartoon-avatar-maker';
import type { CartoonAvatarMakerOutput } from '@/ai/flows/cartoon-avatar-maker';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Download, Sparkles, Upload, Trash2, Palette, Image as ImageIcon, UserSquare } from 'lucide-react';
import { Label } from './ui/label';

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const styles = ["2D Cartoon", "3D Avatar", "Anime", "Pixar Style", "Comic Book", "Line Art"];
const bgTypes = ["Transparent", "Solid Color", "Custom Scene"];

const formSchema = z.object({
  imageFile: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, "An image file is required.")
    .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE_BYTES,
        `Image file must be less than ${MAX_FILE_SIZE_MB}MB.`
    ),
  style: z.string().min(1, 'Please select a style.'),
  backgroundType: z.string().min(1, 'Please select a background type.'),
  backgroundColor: z.string().optional(),
  backgroundPrompt: z.string().optional(),
}).refine(data => {
    if (data.backgroundType === 'Solid Color' && !data.backgroundColor) return false;
    if (data.backgroundType === 'Custom Scene' && !data.backgroundPrompt) return false;
    return true;
}, {
    message: "Please provide details for your selected background type.",
    path: ["backgroundColor"],
});

export function CartoonAvatarMakerClient() {
  const [avatars, setAvatars] = useState<CartoonAvatarMakerOutput['imageUrls']>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageFile: undefined,
      style: '3D Avatar',
      backgroundType: 'Transparent',
      backgroundColor: '#F0BA18',
      backgroundPrompt: '',
    },
  });

  const { register, handleSubmit, watch, setValue } = form;
  const watchedFile = watch("imageFile");
  const backgroundType = watch("backgroundType");

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
    setAvatars([]);

    try {
        const file = values.imageFile[0];
        const imageDataUri = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

        let backgroundValue = '';
        if (values.backgroundType === 'Solid Color') {
            backgroundValue = values.backgroundColor!;
        } else if (values.backgroundType === 'Custom Scene') {
            backgroundValue = values.backgroundPrompt!;
        }

        const result = await cartoonAvatarMaker({
            imageDataUri,
            style: values.style,
            background: {
                type: values.backgroundType.toLowerCase().replace(' ', ''),
                value: backgroundValue,
            },
        });
        setAvatars(result.imageUrls);
    } catch (error) {
      console.error('Avatar generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error instanceof Error ? error.message : 'Failed to generate avatars. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const downloadImage = async (url: string) => {
    try {
      const link = document.createElement('a');
      link.href = url;
      link.download = `ai-avatar-${Date.now()}.png`;
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
                  <FormLabel className="text-lg font-semibold">Upload Your Photo</FormLabel>
                  <FormControl>
                    <div className="relative border-2 border-dashed border-muted rounded-lg p-6 text-center cursor-pointer hover:border-primary">
                        {previewUrl ? (
                             <div className="relative">
                                <Image src={previewUrl} alt="Image preview" width={200} height={200} className="rounded-md object-contain max-h-[200px] mx-auto" />
                                <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={(e) => { e.preventDefault(); setValue('imageFile', undefined); setPreviewUrl(null); }}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                                <p className="mt-2 text-sm text-muted-foreground">
                                Drag & drop a photo here, or click to select one
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    (Max {MAX_FILE_SIZE_MB}MB)
                                </p>
                            </>
                        )}
                        <input 
                            id="file-upload" 
                            type="file" 
                            accept="image/jpeg,image/png,image/webp"
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
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Choose Style</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <UserSquare className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Select an artistic style" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {styles.map(style => <SelectItem key={style} value={style}>{style}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="backgroundType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Choose Background</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                         <ImageIcon className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Select a background type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {bgTypes.map(bg => <SelectItem key={bg} value={bg}>{bg}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {backgroundType === 'Solid Color' && (
                <FormField
                    control={form.control}
                    name="backgroundColor"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Background Color</FormLabel>
                             <FormControl>
                                <div className="flex items-center gap-2 border rounded-md p-2">
                                    <Palette className="h-5 w-5 text-muted-foreground" />
                                    <Input type="text" {...field} placeholder="#F0BA18" />
                                    <Input type="color" value={field.value} onChange={field.onChange} className="w-10 h-10 p-1" />
                                </div>
                             </FormControl>
                             <FormMessage />
                        </FormItem>
                    )}
                />
            )}
             {backgroundType === 'Custom Scene' && (
                <FormField
                    control={form.control}
                    name="backgroundPrompt"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Describe the Background</FormLabel>
                             <FormControl>
                                <Input {...field} placeholder="e.g., A futuristic city at night, a serene forest" />
                             </FormControl>
                             <FormMessage />
                        </FormItem>
                    )}
                />
            )}


            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? 'Generating...' : 'Generate Avatars'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
            <div className="mt-6 text-center">
                <div className="flex flex-col items-center justify-center h-full bg-muted/50 p-8 rounded-lg">
                    <UserSquare className="h-16 w-16 text-muted-foreground animate-pulse" />
                    <p className="mt-4 text-muted-foreground">AI is creating your new look...</p>
                </div>
            </div>
        )}

        {avatars.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Your Avatars</h3>
            <div className="grid grid-cols-2 gap-4">
              {avatars.map((url, index) => (
                <Card key={index} className="overflow-hidden group relative cursor-pointer" onClick={() => downloadImage(url)}>
                    <Image
                        src={url}
                        alt={`Generated Avatar ${index + 1}`}
                        width={512}
                        height={512}
                        className="w-full h-full object-cover bg-cover"
                        style={{backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23ccc' stroke-width='1' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`}}
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
