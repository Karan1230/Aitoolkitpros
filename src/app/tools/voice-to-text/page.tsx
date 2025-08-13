import { type Metadata } from 'next';
import { VoiceToTextClient } from '@/components/voice-to-text-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


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
            <p className="mt-4 text-lg text-muted-foreground">
                Effortlessly transcribe your speech into text. Record your voice directly or upload an audio file to get a fast and accurate transcription.
            </p>

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

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>What audio formats are supported?</AccordionTrigger>
                            <AccordionContent>
                            The direct recording feature uses the standard format your browser provides (usually WEBM or MP4). The underlying AI supports a wide range of formats like MP3, WAV, FLAC, and more.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>How accurate is the transcription?</AccordionTrigger>
                            <AccordionContent>
                            Our tool uses a state-of-the-art AI model to provide highly accurate transcriptions. Accuracy is best with clear audio and minimal background noise.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Is my audio stored on your servers?</AccordionTrigger>
                            <AccordionContent>
                            No. Your audio is sent directly to the AI provider for transcription and is not stored on our servers. We are committed to your privacy.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
