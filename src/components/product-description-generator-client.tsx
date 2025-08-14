"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { productDescriptionGenerator } from '@/ai/flows/product-description-generator';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Download } from 'lucide-react';

const tones = ["Professional", "Casual", "Sales-oriented", "SEO-optimized"];

const formSchema = z.object({
  productName: z.string().min(3, 'Product name must be at least 3 characters long.'),
  category: z.string().min(3, 'Category must be at least 3 characters long.'),
  features: z.string().min(10, 'Please list at least one key feature.'),
  targetAudience: z.string().min(3, 'Target audience must be at least 3 characters.'),
  tone: z.string().min(1, 'Please select a tone.'),
});

export function ProductDescriptionGeneratorClient() {
  const [description, setDescription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      category: '',
      features: '',
      targetAudience: '',
      tone: 'Professional',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setDescription(null);

    try {
      const result = await productDescriptionGenerator(values);
      setDescription(result.description);
    } catch (error) {
      console.error('Description generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to generate the description. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const copyToClipboard = () => {
    if (!description) return;
    navigator.clipboard.writeText(description);
    toast({ title: "Description copied to clipboard!" });
  };

  const downloadDescription = () => {
    if (!description) return;
    const blob = new Blob([description], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product-description.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Description downloaded!" });
  };

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-lg font-semibold">Product Name</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Wireless Bluetooth Headphones" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-lg font-semibold">Category</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Electronics, Audio" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            
            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Key Features</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., - 20-hour battery life\n- Noise-cancelling\n- Lightweight design"
                      className="min-h-[120px]"
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
                name="targetAudience"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-lg font-semibold">Target Audience</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Students, professionals, travelers" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-lg font-semibold">Tone of Voice</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a tone" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {tones.map(tone => (
                            <SelectItem key={tone} value={tone}>{tone}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? 'Generating...' : 'Generate Description'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
           <div className="mt-6 p-4 border rounded-lg bg-muted/50 text-center text-muted-foreground animate-pulse">
             The AI is writing your product description...
           </div>
        )}

        {description && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-headline">Generated Description</h3>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={copyToClipboard}><Copy className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={downloadDescription}><Download className="h-4 w-4" /></Button>
                </div>
            </div>
            <Card className="bg-muted/50">
                <CardContent className="p-4 max-h-[500px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap font-body text-sm">{description}</pre>
                </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
