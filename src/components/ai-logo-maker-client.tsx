"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';

import { aiLogoGenerator } from '@/ai/flows/ai-logo-generator';
import type { AiLogoGeneratorOutput } from '@/ai/flows/ai-logo-generator';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Download, PenTool, Sparkles, Image as ImageIcon } from 'lucide-react';

const formSchema = z.object({
  brandName: z.string().min(2, 'Brand name must be at least 2 characters long.'),
  slogan: z.string().optional(),
  industry: z.string().min(3, 'Industry must be at least 3 characters long.'),
  style: z.string().min(1, 'Please select a style.'),
  colors: z.string().min(3, 'Please describe your color preferences.'),
});

const styles = ['Modern', 'Minimalist', 'Luxury', 'Vintage', 'Playful', 'Professional'];

export function AiLogoMakerClient() {
  const [logos, setLogos] = useState<AiLogoGeneratorOutput['logos']>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brandName: '',
      slogan: '',
      industry: '',
      style: 'Modern',
      colors: 'Blue and silver',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setLogos([]);

    try {
      const result = await aiLogoGenerator(values);
      setLogos(result.logos);
    } catch (error) {
      console.error('Logo generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to generate logos. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  const downloadLogo = async (regularUrl: string, transparentUrl: string, index: number) => {
    try {
        toast({ title: "Downloading...", description: "Your logo files are being prepared." });

        const urls = [
            { name: `logo_${index+1}_regular.png`, url: regularUrl },
            { name: `logo_${index+1}_transparent.png`, url: transparentUrl }
        ];

        for (const file of urls) {
            const link = document.createElement('a');
            link.href = file.url;
            link.download = file.name;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            await new Promise(resolve => setTimeout(resolve, 200)); // Small delay
        }
        
    } catch (error) {
      console.error('Download failed:', error);
      toast({
        variant: 'destructive',
        title: 'Download Failed',
        description: 'Could not download the logos. Please try again.',
      });
    }
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
                        <FormLabel className="text-lg font-semibold">Brand Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., SparkleClean" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="slogan"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-lg font-semibold">Slogan (Optional)</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., The future is bright" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            
            <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-lg font-semibold">Industry / Niche</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Eco-friendly cleaning services" {...field} />
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
                 <FormField
                    control={form.control}
                    name="colors"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-lg font-semibold">Colors</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Green, white, and a touch of gold" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
            </div>

            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? 'Designing...' : 'Generate Logos'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
            <div className="mt-6 text-center">
                <div className="flex flex-col items-center justify-center h-full bg-muted/50 p-8 rounded-lg">
                    <PenTool className="h-16 w-16 text-muted-foreground animate-pulse" />
                    <p className="mt-4 text-muted-foreground">AI is designing your brand...</p>
                </div>
            </div>
        )}

        {logos.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Generated Logos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {logos.map((logo, index) => (
                <Card key={index} className="overflow-hidden group relative">
                    <div 
                        className="p-4 cursor-pointer"
                        onClick={() => downloadLogo(logo.regularUrl, logo.transparentUrl, index)}
                    >
                         <h4 className="font-semibold mb-2 text-center">Design {index+1}</h4>
                        <div className="grid grid-cols-2 gap-2">
                             <div>
                                <p className="text-xs text-center mb-1 text-muted-foreground">Original</p>
                                <Image
                                    src={logo.regularUrl}
                                    alt={`Generated Logo ${index + 1}`}
                                    width={256}
                                    height={256}
                                    className="w-full h-full object-cover rounded-md border"
                                />
                             </div>
                              <div>
                                <p className="text-xs text-center mb-1 text-muted-foreground">Transparent</p>
                                <Image
                                    src={logo.transparentUrl}
                                    alt={`Generated Logo ${index + 1} Transparent`}
                                    width={256}
                                    height={256}
                                    className="w-full h-full object-cover rounded-md border bg-cover"
                                    style={{backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23e0e0e0' stroke-width='1' stroke-dasharray='4%2c 8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`}}
                                />
                             </div>
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <div className="text-white flex items-center gap-2 p-4 bg-black/50 rounded-lg">
                            <Download className="h-6 w-6" />
                            <span>Download All</span>
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
