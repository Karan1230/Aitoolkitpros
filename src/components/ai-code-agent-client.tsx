
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { aiCodeAgent } from '@/ai/flows/ai-code-agent';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Download, Code2, Hourglass } from 'lucide-react';

const formSchema = z.object({
  prompt: z.string().min(20, 'Please provide a more detailed project description (at least 20 characters).'),
});

export function AiCodeAgentClient() {
  const [zipData, setZipData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setZipData(null);

    try {
      const result = await aiCodeAgent(values);
      setZipData(result.zipData);
      toast({
        title: "Codebase Generated!",
        description: "Your ZIP file is ready for download.",
      });
    } catch (error) {
      console.error('Code generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to generate the codebase. This can happen with very complex requests. Please try again with a more focused prompt.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const downloadZip = () => {
    if (!zipData) return;
    const link = document.createElement("a");
    link.href = `data:application/zip;base64,${zipData}`;
    link.download = "ai-generated-codebase.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
                  <FormLabel className="text-lg font-semibold">Describe Your Project</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., A simple to-do list app using React, TypeScript, and Tailwind CSS. It should have a single component to add, list, and delete tasks. State should be managed within the component."
                      className="min-h-[150px] font-mono text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? 'Generating Codebase...' : 'Generate Codebase'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
           <div className="mt-6 p-6 border rounded-lg bg-muted/50 text-center text-muted-foreground">
             <Hourglass className="mx-auto h-12 w-12 animate-spin text-primary" />
             <p className="mt-4 font-semibold">The AI is writing your code...</p>
             <p className="text-sm">This can take a few minutes for complex projects. Please be patient.</p>
           </div>
        )}

        {zipData && (
          <div className="mt-6 text-center">
            <h3 className="text-xl font-headline">Your Codebase is Ready!</h3>
             <div className="p-6 mt-4 border-2 border-dashed rounded-lg bg-muted/50">
                <Code2 className="mx-auto h-16 w-16 text-primary" />
                <p className="mt-4 text-muted-foreground">Your complete codebase has been generated and zipped.</p>
                 <Button onClick={downloadZip} size="lg" className="mt-4">
                    <Download className="mr-2 h-5 w-5" />
                    Download ZIP File
                </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
