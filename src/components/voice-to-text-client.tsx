"use client";

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { voiceToTextConverter } from '@/ai/flows/voice-to-text-converter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileAudio } from 'lucide-react';

const formSchema = z.object({
    language: z.string().optional(),
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

  const handleTranscription = async (audioDataUri: string, fileName: string, language?: string) => {
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

    setTranscriptions([]);
    setIsLoading(true);
    const { language } = form.getValues();
    const transcriptionPromises: Promise<TranscriptionResult>[] = [];

    for (const file of Array.from(files)) {
      const reader = new FileReader();
      const promise = new Promise<TranscriptionResult>((resolve) => {
        reader.onloadend = async () => {
          const audioDataUri = reader.result as string;
          resolve(handleTranscription(audioDataUri, file.name, language));
        };
        reader.readAsDataURL(file);
      });
      transcriptionPromises.push(promise);
    }

    const results = await Promise.all(transcriptionPromises);
    setTranscriptions(results);
    setIsLoading(false);
  };


  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4 text-center">
            <h3 className="font-semibold text-lg">Upload Files</h3>
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
                <p className="text-xs text-muted-foreground">Select one or more audio files from your device.</p>
        </div>

        {isLoading && (
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
                        <div className="flex items-center mb-2">
                            <FileAudio className="mr-2 h-5 w-5 flex-shrink-0" />
                            <p className="font-semibold text-sm truncate">{result.fileName}</p>
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
