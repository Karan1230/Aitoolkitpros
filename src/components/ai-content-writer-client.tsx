"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { languages } from '@/lib/languages';
import { aiContentWriter } from '@/ai/flows/ai-content-writer';
import type { AiContentWriterOutput } from '@/ai/flows/ai-content-writer';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Download, Languages, FileSignature, Palette, Type, BookOpen, Mic, Globe, Image as LucideImage, Link as LinkIcon, Pilcrow, PenLine } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

// Form validation schema
const formSchema = z.object({
  title: z.string().min(5, 'Title or keywords must be at least 5 characters.'),
  contentType: z.string().min(1),
  wordCount: z.number().min(50).max(3000),
  writingStyle: z.string().min(1),
  readability: z.string().min(1),
  articleType: z.string().min(1),
  tone: z.string().min(1),
  pointOfView: z.string().min(1),
  targetCountry: z.string().min(1),
  language: z.string().min(1),
  imageCount: z.number().min(0).max(6),
  imageStyle: z.string().min(1),
  imageDimensions: z.string().min(1),
  internalLinks: z.string().optional(),
  externalLinks: z.string().optional(),
});

// Options for form fields
const contentTypes = ["Blog Post", "Article"];
const writingStyles = ["Formal", "Casual", "Creative", "Professional", "Technical"];
const readabilityLevels = ["5th Grade", "8th Grade", "10th Grade", "12th Grade", "College Level"];
const articleTypes = ["General", "News", "How-to Guide", "Listicle", "Review", "Case Study"];
const tones = ["Neutral", "Persuasive", "Informative", "Humorous", "Inspirational"];
const pointsOfView = ["First Person (I, we)", "Second Person (you)", "Third Person (he, she, it, they)"];
const imageStyles = ["Photorealistic", "Digital Art", "Anime", "Cartoon", "Minimalist"];
const imageDimensions = ["16:9", "1:1", "9:16"];
const countries = ["Global", "USA", "UK", "Canada", "Australia", "India"];

export function AiContentWriterClient() {
  const [result, setResult] = useState<AiContentWriterOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      contentType: 'Blog Post',
      wordCount: 1200,
      writingStyle: 'Casual',
      readability: '10th Grade',
      articleType: 'General',
      tone: 'Informative',
      pointOfView: 'Third Person (he, she, it, they)',
      targetCountry: 'Global',
      language: 'English',
      imageCount: 3,
      imageStyle: 'Photorealistic',
      imageDimensions: '16:9',
      internalLinks: '',
      externalLinks: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await aiContentWriter(values);
      setResult(response);
    } catch (error) {
      console.error('Content generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to generate content. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Content copied to clipboard!" });
  };
  
  const downloadHtml = (htmlContent: string, title: string) => {
    const blob = new Blob([`<!DOCTYPE html><html><head><title>${title}</title></head><body>${htmlContent}</body></html>`], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s/g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "HTML file downloaded!" });
  };

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="text"><PenLine className="mr-2 h-4 w-4" />Text</TabsTrigger>
                <TabsTrigger value="images"><LucideImage className="mr-2 h-4 w-4" />Images</TabsTrigger>
                <TabsTrigger value="links"><LinkIcon className="mr-2 h-4 w-4" />Links</TabsTrigger>
              </TabsList>
              
              {/* Text Generation Tab */}
              <TabsContent value="text" className="space-y-6 mt-6">
                 <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-lg font-semibold">Title or Keywords</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., The Future of Artificial Intelligence" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="contentType" render={({ field }) => (
                        <FormItem><FormLabel>Content Type</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><FileSignature className="mr-2 h-4 w-4" /><SelectValue/></SelectTrigger></FormControl><SelectContent>{contentTypes.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="writingStyle" render={({ field }) => (
                        <FormItem><FormLabel>Writing Style</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><Type className="mr-2 h-4 w-4" /><SelectValue/></SelectTrigger></FormControl><SelectContent>{writingStyles.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="readability" render={({ field }) => (
                        <FormItem><FormLabel>Readability</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><BookOpen className="mr-2 h-4 w-4" /><SelectValue/></SelectTrigger></FormControl><SelectContent>{readabilityLevels.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="articleType" render={({ field }) => (
                        <FormItem><FormLabel>Article Type</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><Pilcrow className="mr-2 h-4 w-4" /><SelectValue/></SelectTrigger></FormControl><SelectContent>{articleTypes.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                    )}/>
                     <FormField control={form.control} name="tone" render={({ field }) => (
                        <FormItem><FormLabel>Tone of Voice</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><Mic className="mr-2 h-4 w-4" /><SelectValue/></SelectTrigger></FormControl><SelectContent>{tones.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                    )}/>
                     <FormField control={form.control} name="pointOfView" render={({ field }) => (
                        <FormItem><FormLabel>Point of View</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl><SelectContent>{pointsOfView.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                    )}/>
                     <FormField control={form.control} name="targetCountry" render={({ field }) => (
                        <FormItem><FormLabel>Target Country</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><Globe className="mr-2 h-4 w-4" /><SelectValue/></SelectTrigger></FormControl><SelectContent>{countries.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="language" render={({ field }) => (
                        <FormItem><FormLabel>Language</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><Languages className="mr-2 h-4 w-4" /><SelectValue/></SelectTrigger></FormControl><SelectContent>{languages.map(l => <SelectItem key={l.name} value={l.name}>{l.name}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                    )}/>
                </div>
                 <FormField
                    control={form.control}
                    name="wordCount"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Word Count: {field.value}</FormLabel>
                        <FormControl>
                             <Slider
                                min={50} max={3000} step={50}
                                defaultValue={[field.value]}
                                onValueChange={(vals) => field.onChange(vals[0])}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
              </TabsContent>

              {/* Image Generation Tab */}
              <TabsContent value="images" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <FormField control={form.control} name="imageStyle" render={({ field }) => (
                        <FormItem><FormLabel>Image Style</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><Palette className="mr-2 h-4 w-4" /><SelectValue/></SelectTrigger></FormControl><SelectContent>{imageStyles.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                    )}/>
                     <FormField control={form.control} name="imageDimensions" render={({ field }) => (
                        <FormItem><FormLabel>Image Dimensions</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl><SelectContent>{imageDimensions.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                    )}/>
                </div>
                <FormField
                    control={form.control}
                    name="imageCount"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Number of Images: {field.value} (First is featured)</FormLabel>
                        <FormControl>
                             <Slider
                                min={0} max={6} step={1}
                                defaultValue={[field.value]}
                                onValueChange={(vals) => field.onChange(vals[0])}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
              </TabsContent>

              {/* Linking Tab */}
              <TabsContent value="links" className="space-y-6 mt-6">
                 <FormField
                    control={form.control}
                    name="internalLinks"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Internal Links (Optional)</FormLabel>
                         <FormDescription>One URL per line. The AI will integrate these into the content.</FormDescription>
                        <FormControl>
                            <Textarea placeholder="https://yoursite.com/page1\nhttps://yoursite.com/page2" {...field} className="min-h-[80px]" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="externalLinks"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>External Links (Optional)</FormLabel>
                         <FormDescription>One URL per line. If left blank, the AI will add relevant links.</FormDescription>
                        <FormControl>
                            <Textarea placeholder="https://externalsite.com/source1\nhttps://externalsite.com/source2" {...field} className="min-h-[80px]" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
              </TabsContent>
            </Tabs>
            
            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? 'Generating Content...' : 'Generate Content'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
           <div className="mt-6 p-4 border rounded-lg bg-muted/50 text-center text-muted-foreground animate-pulse">
             The AI is writing your masterpiece... this may take a moment.
           </div>
        )}

        {result && (
          <div className="mt-8 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-headline">Generated Content</h2>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => copyToClipboard(result.htmlContent)}><Copy className="mr-2 h-4 w-4" />Copy HTML</Button>
                    <Button variant="outline" onClick={() => downloadHtml(result.htmlContent, result.generatedTitle)}><Download className="mr-2 h-4 w-4" />Download HTML</Button>
                </div>
            </div>
            
            <Card className="bg-muted/50 overflow-hidden">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">{result.generatedTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                    {result.featuredImageUrl && (
                        <Image
                            src={result.featuredImageUrl}
                            alt={result.generatedTitle}
                            width={1280}
                            height={720}
                            className="rounded-lg mb-6 w-full object-cover"
                        />
                    )}
                    <div
                        className="prose prose-sm md:prose-base dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: result.htmlContent }}
                    />
                </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
