"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { textToSpeechConverter } from '@/ai/flows/text-to-speech-converter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Volume2, User, UserRound } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { cn } from '@/lib/utils';
import { Label } from './ui/label';

const formSchema = z.object({
  text: z.string().min(5, 'Text must be at least 5 characters long.'),
  model: z.string().min(1, 'Please select a model.'),
  voice: z.string().min(1, 'Please select a voice.'),
  languageCode: z.string().min(1, 'Please select a language.'),
});

const ttsModels = [
  { name: 'Google', value: 'googleai/gemini-2.5-flash-preview-tts' },
];

const voices = [
    { name: 'Adhara', gender: 'Female', value: 'Adhara' },
    { name: 'Bellatrix', gender: 'Female', value: 'Bellatrix' },
    { name: 'Capella', gender: 'Female', value: 'Capella' },
    { name: 'Mimosa', gender: 'Female', value: 'Mimosa' },
    { name: 'Vega', gender: 'Female', value: 'Vega' },
    { name: 'Algenib', gender: 'Male', value: 'Algenib' },
    { name: 'Achernar', gender: 'Male', value: 'Achernar' },
    { name: 'Aldebaran', gender: 'Male', value: 'Aldebaran' },
    { name: 'Antares', gender: 'Male', value: 'Antares' },
    { name: 'Sirius', gender: 'Male', value: 'Sirius' },
];

const languages = [
  { name: "English (US)", value: "en-US" },
  { name: "English (UK)", value: "en-GB" },
  { name: "English (India)", value: "en-IN" },
  { name: "English (Australia)", value: "en-AU" },
  { name: "Hindi", value: "hi-IN" },
  { name: "Urdu", value: "ur-PK" },
  { name: "Arabic", value: "ar-SA" },
  { name: "Bengali", value: "bn-IN" },
  { name: "Chinese (Mandarin)", value: "cmn-CN" },
  { name: "French", value: "fr-FR" },
  { name: "German", value: "de-DE" },
  { name: "Indonesian", value: "id-ID" },
  { name: "Japanese", value: "ja-JP" },
  { name: "Korean", value: "ko-KR" },
  { name: "Portuguese", value: "pt-BR" },
  { name: "Russian", value: "ru-RU" },
  { name: "Spanish", value: "es-US" },
  { name: "Turkish", value: "tr-TR" },
  { name: "Vietnamese", value: "vi-VN" },
];


export function TextToSpeechClient() {
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
      model: 'googleai/gemini-2.5-flash-preview-tts',
      voice: 'Adhara',
      languageCode: 'en-US',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAudioDataUri(null);

    try {
      const result = await textToSpeechConverter(values);
      setAudioDataUri(result.audioDataUri);
    } catch (error) {
      console.error('Text-to-Speech conversion failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to convert text to speech. Please try again.',
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
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Text to Convert</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the text you want to convert to speech..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="voice"
              render={({ field }) => (
                <FormItem>
                   <FormLabel className="text-lg font-semibold">Choose a Voice</FormLabel>
                   <FormControl>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-2">
                        {voices.map((voice) => (
                           <Label 
                                key={voice.value}
                                htmlFor={voice.value}
                                className={cn(
                                    "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                                    field.value === voice.value && "border-primary"
                                )}
                           >
                                <input 
                                    type="radio"
                                    id={voice.value}
                                    name="voice"
                                    value={voice.value}
                                    checked={field.value === voice.value}
                                    onChange={field.onChange}
                                    className="sr-only"
                                />
                                {voice.gender === 'Female' ? <User className="mb-3 h-8 w-8" /> : <UserRound className="mb-3 h-8 w-8" />}
                                <span className="text-sm font-medium">{voice.name}</span>
                                <span className="text-xs text-muted-foreground">{voice.gender}</span>
                           </Label>
                        ))}
                    </div>
                   </FormControl>
                   <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-lg font-semibold">AI Model</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a model" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {ttsModels.map(model => (
                            <SelectItem key={model.value} value={model.value}>
                            {model.name}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="languageCode"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-lg font-semibold">Language</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {languages.map(lang => (
                            <SelectItem key={lang.value} value={lang.value}>
                            {lang.name}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>


            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? 'Converting...' : 'Convert to Speech'}
              <Volume2 className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
           <div className="mt-6 p-4 border rounded-lg bg-muted/50">
             <p className="text-center text-muted-foreground animate-pulse">Generating audio, please wait...</p>
           </div>
        )}

        {audioDataUri && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Generated Audio</h3>
            <audio controls src={audioDataUri} className="w-full">
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
