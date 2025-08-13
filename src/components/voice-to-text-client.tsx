"use client";

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { voiceToTextConverter } from '@/ai/flows/voice-to-text-converter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mic, MicOff, Square } from 'lucide-react';

export function VoiceToTextClient() {
  const [transcription, setTranscription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => setHasPermission(true))
      .catch(() => {
        setHasPermission(false);
        toast({
          variant: 'destructive',
          title: 'Microphone permission denied.',
          description: 'Please allow microphone access in your browser settings to use this feature.',
        });
      });
  }, [toast]);

  const startRecording = async () => {
    if (isRecording) return;
    setTranscription(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks: Blob[] = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const audioDataUri = reader.result as string;
          await handleTranscription(audioDataUri);
        };
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Could not start recording:", error);
      setHasPermission(false);
      toast({
        variant: 'destructive',
        title: 'Could not access microphone.',
        description: 'Please ensure your microphone is connected and permissions are allowed.',
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleTranscription = async (audioDataUri: string) => {
    setIsLoading(true);
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
    }
  };

  const RecordingButton = () => {
    if (!hasPermission) {
      return (
        <Button size="lg" className="w-full" disabled>
          <MicOff className="mr-2 h-5 w-5" />
          Microphone Access Denied
        </Button>
      );
    }
    if (isRecording) {
      return (
        <Button onClick={stopRecording} size="lg" className="w-full" variant="destructive">
          <Square className="mr-2 h-5 w-5 animate-pulse" />
          Stop Recording
        </Button>
      );
    }
    return (
      <Button onClick={startRecording} size="lg" className="w-full">
        <Mic className="mr-2 h-5 w-5" />
        Start Recording
      </Button>
    );
  };
  

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardContent className="p-6 space-y-6">
        <div className="text-center">
            <p className="text-muted-foreground">Click the button below to start recording your voice.</p>
        </div>

        <div className="flex justify-center">
            {hasPermission === null ? 
                <Button size="lg" className="w-full" disabled>Checking permissions...</Button> : 
                <RecordingButton />
            }
        </div>

        {isLoading && (
           <div className="p-4 border rounded-lg bg-muted/50">
             <p className="text-center text-muted-foreground animate-pulse">AI is transcribing, please wait...</p>
           </div>
        )}

        {transcription && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Transcription</h3>
            <Card className="bg-muted/50">
                <CardContent className="p-4">
                    <p className="font-body text-sm">{transcription}</p>
                </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
