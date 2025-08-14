"use client";

import { useState, useRef, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { voiceToTextConverter } from '@/ai/flows/voice-to-text-converter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mic, MicOff, Square, Upload, FileAudio, Languages } from 'lucide-react';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';

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
  const [isRecording, setIsRecording] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: 'en-US',
    },
  });

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => setHasPermission(true))
      .catch(() => setHasPermission(false));
  }, []);

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

  const startRecording = async () => {
    if (isRecording) return;
    if (hasPermission === false) {
        toast({
            variant: 'destructive',
            title: 'Microphone permission denied.',
            description: 'Please allow microphone access in your browser settings to use this feature.',
        });
        return;
    }
    setTranscriptions([]);
    setIsLoading(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks: Blob[] = [];
      mediaRecorder.ondataavailable = (event) => audioChunks.push(event.data);

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const audioDataUri = reader.result as string;
          const { language } = form.getValues();
          const result = await handleTranscription(audioDataUri, `Recording-${new Date().toISOString()}`, language);
          if(result) setTranscriptions([result]);
          setIsLoading(false);
        };
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Could not start recording:", error);
      setHasPermission(false);
      toast({
        variant: 'destructive',
        title: 'Could not access microphone.',
        description: 'Please ensure your microphone is connected and permissions are allowed.',
      });
      setIsLoading(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsLoading(true);
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
        <Form {...form}>
            <form>
                <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg font-semibold flex items-center"><Languages className="mr-2 h-5 w-5" /> Language</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a language for transcription" />
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
            </form>
        </Form>
        
        <Separator />
        
        <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4 text-center">
                <h3 className="font-semibold text-lg">Record Audio</h3>
                {isRecording ? (
                    <Button onClick={stopRecording} size="lg" className="w-full" variant="destructive">
                        <Square className="mr-2 h-5 w-5 animate-pulse" />
                        Stop Recording
                    </Button>
                ) : (
                    <Button onClick={startRecording} size="lg" className="w-full" disabled={isLoading || hasPermission === false}>
                        <Mic className="mr-2 h-5 w-5" />
                        {hasPermission === false ? "Permission Denied" : "Start Recording"}
                    </Button>
                )}
                 <p className="text-xs text-muted-foreground">Record your voice directly from the browser.</p>
            </div>

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
                    <CardHeader className="p-4">
                        <CardTitle className="text-base flex items-center">
                            <FileAudio className="mr-2 h-5 w-5" />
                            {result.fileName}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
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
