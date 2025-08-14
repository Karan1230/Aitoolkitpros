"use client";

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { voiceToTextConverter } from '@/ai/flows/voice-to-text-converter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Mic, MicOff, Copy, Trash2 } from 'lucide-react';

const formSchema = z.object({
  // Since we are not using a form, the schema can be empty.
  // We keep the form for structure, but don't need validation.
});

export function VoiceToTextClient() {
  const [transcription, setTranscription] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = async () => {
        setIsLoading(true);
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const audioDataUri = reader.result as string;
          try {
            const result = await voiceToTextConverter({ audioDataUri });
            setTranscription(result.transcription);
          } catch (error) {
            console.error('Transcription failed:', error);
            toast({
              variant: 'destructive',
              title: 'Uh oh! Something went wrong.',
              description: 'Failed to transcribe audio. Please try again.',
            });
          } finally {
            setIsLoading(false);
            audioChunksRef.current = [];
          }
        };
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setTranscription(null);
    } catch (error) {
      console.error('Failed to start recording:', error);
      toast({
        variant: 'destructive',
        title: 'Microphone access denied',
        description: 'Please allow microphone access in your browser settings to use this feature.',
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const copyToClipboard = () => {
    if (transcription) {
      navigator.clipboard.writeText(transcription);
      toast({
        title: "Copied to clipboard!",
        description: "The transcription has been copied.",
      });
    }
  };

  const clearTranscription = () => {
    setTranscription(null);
  }

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardContent className="p-6 space-y-6">
        <div className="text-center">
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            size="lg"
            variant={isRecording ? 'destructive' : 'default'}
            className="rounded-full w-24 h-24"
            disabled={isLoading}
          >
            {isRecording ? <MicOff className="h-10 w-10" /> : <Mic className="h-10 w-10" />}
          </Button>
          <p className="mt-4 text-muted-foreground">
            {isLoading ? "Transcribing..." : isRecording ? "Recording in progress..." : "Click to start recording"}
          </p>
        </div>
        
        <Form {...form}>
          <form className="space-y-6"></form>
        </Form>
        

        {isLoading && (
           <div className="p-4 border rounded-lg bg-muted/50">
             <p className="text-center text-muted-foreground animate-pulse">AI is listening, please wait...</p>
           </div>
        )}

        {transcription && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Transcription</h3>
            <Card className="bg-muted/50">
                <CardContent className="p-4 relative">
                    <pre className="whitespace-pre-wrap font-body text-sm pr-20">{transcription}</pre>
                    <div className="absolute top-2 right-2 flex gap-1">
                        <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                           <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={clearTranscription}>
                           <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
