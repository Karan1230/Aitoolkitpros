"use client";

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { voiceToTextConverter } from '@/ai/flows/voice-to-text-converter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileAudio, Copy } from 'lucide-react';

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


const formSchema = z.object({
    language: z.string().min(1, 'Please select a language.'),
});

interface TranscriptionResult {
    fileName: string;
    transcription: string;
}

export function VoiceToTextClient() {
  const [transcriptions, setTranscriptions] = useState<TranscriptionResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: 'en-US',
    },
  });

  const handleTranscription = async (audioDataUri: string, fileName: string, language: string) => {
    try {
      const result = await voiceToTextConverter({ audioDataUri, language });
      return { fileName, transcription: result.transcription };
    } catch (error) {
      console.error('Transcription failed for', fileName, error);
      toast({
        variant: 'destructive',
        title: `Transcription failed for ${fileName}`,
        description: 'Please try again.',
      });
      return { fileName, transcription: 'Error: Could not transcribe.' };
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsLoading(true);
    setTranscriptions([]);
    const { language } = form.getValues();
    const newTranscriptions: TranscriptionResult[] = [];

    for (const file of Array.from(files)) {
      const reader = new FileReader();
      const promise = new Promise<TranscriptionResult>((resolve) => {
        reader.onloadend = async () => {
          const audioDataUri = reader.result as string;
          const result = await handleTranscription(audioDataUri, file.name, language);
          resolve(result);
        };
        reader.readAsDataURL(file);
      });
      newTranscriptions.push(await promise);
      setTranscriptions([...newTranscriptions]); // Update state after each file
    }

    setIsLoading(false);
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
        title: "Copied to clipboard!",
        description: "The transcription has been copied.",
    });
  }


  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardContent className="p-6 space-y-6">
        <Form {...form}>
            <form className="space-y-6">
                <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-lg font-semibold">Audio Language</FormLabel>
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

                <div className="space-y-2 text-center">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="audio/*"
                        multiple
                        className="hidden"
                    />
                    <Button onClick={() => fileInputRef.current?.click()} size="lg" className="w-full" disabled={isLoading}>
                        <Upload className="mr-2 h-5 w-5" />
                        Choose Audio Files
                    </Button>
                    <p className="text-xs text-muted-foreground">Select one or more audio files. Make sure to select the correct language above.</p>
                </div>
            </form>
        </Form>
        

        {isLoading && transcriptions.length === 0 && (
           <div className="p-4 border rounded-lg bg-muted/50">
             <p className="text-center text-muted-foreground animate-pulse">AI is transcribing, please wait...</p>
           </div>
        )}

        {transcriptions.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Transcriptions</h3>
            <div className="space-y-4">
              {transcriptions.map((result, index) => (
                <Card key={index} className="bg-muted/50">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                                <FileAudio className="mr-2 h-5 w-5 flex-shrink-0" />
                                <p className="font-semibold text-sm truncate">{result.fileName}</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => copyToClipboard(result.transcription)}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="font-body text-sm">{result.transcription}</p>
                    </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
