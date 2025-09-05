
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { aiMusicGenerator } from '@/ai/flows/ai-music-generator';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Music, Sparkles, Clock } from 'lucide-react';
import { Slider } from './ui/slider';

const formSchema = z.object({
  prompt: z.string().min(10, 'Prompt must be at least 10 characters.'),
  duration: z.number().min(5).max(60),
});

export function AiMusicGeneratorClient() {
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      duration: 15,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAudioDataUri(null);

    try {
      const result = await aiMusicGenerator(values);
      setAudioDataUri(result.audioDataUri);
    } catch (error) {
      console.error('Music generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to generate music. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

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
                  <FormLabel className="text-lg font-semibold">Music Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., An epic cinematic track with orchestral strings and powerful drums, suitable for a movie trailer."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Duration: {field.value} seconds</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4 pt-2">
                        <Clock className="h-5 w-5" />
                        <Slider
                            min={5}
                            max={60}
                            step={1}
                            defaultValue={[field.value]}
                            onValueChange={(vals) => field.onChange(vals[0])}
                        />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? 'Generating Music...' : 'Generate Music'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
           <div className="mt-6 p-4 border rounded-lg bg-muted/50 text-center text-muted-foreground animate-pulse">
             The AI is composing your track...
           </div>
        )}

        {audioDataUri && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><Music />Generated Audio</h3>
            <audio controls src={audioDataUri} className="w-full">
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
