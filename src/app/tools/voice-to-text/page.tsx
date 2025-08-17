
import { type Metadata } from 'next';
import { VoiceToTextClient } from '@/components/voice-to-text-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Voice-to-Text Converter | Transcribe Audio to Text',
  description: 'Accurately transcribe speech from audio files into text with our free AI Voice-to-Text converter. Ideal for interviews, meetings, and content creation. No sign-up required.',
};

const benefits = [
    "Quickly convert interviews and meetings into text.",
    "Create written records of your voice notes.",
    "Improve accessibility by providing transcripts for audio content.",
    "Save time on manual transcription."
];

export default function VoiceToTextPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                Voice-to-Text Converter
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Effortlessly transcribe speech into text. Upload an audio file to get a fast and accurate transcription, ideal for interviews, meetings, and voice notes.
              </p>
            </div>

            <div className="mt-8">
                <VoiceToTextClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Grant Permission:</strong> Allow the browser to access your microphone when prompted.</p>
                    <p><strong>2. Start Recording:</strong> Click "Start Recording" and begin speaking clearly.</p>
                    <p><strong>3. Stop Recording:</strong> Click "Stop Recording" when you are finished. The transcription will be generated automatically.</p>
                    <p><strong>4. Copy Text:</strong> Copy the transcribed text for your use.</p>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                            <span>{benefit}</span>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
