
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

const faqs = [
    {
        question: "1. What audio formats are supported for upload?",
        answer: "You can upload files in various formats, including MP3, WAV, FLAC, M4A, and MP4. The tool is designed to be highly flexible."
    },
    {
        question: "2. How accurate is the transcription?",
        answer: "Our tool uses a state-of-the-art AI model to provide highly accurate transcriptions. Accuracy is best with clear audio and minimal background noise."
    },
    {
        question: "3. Is my audio stored on your servers?",
        answer: "No. Your audio is sent directly to the AI provider for transcription and is not stored on our servers. We are committed to your privacy."
    },
    {
        question: "4. Can the tool transcribe and translate at the same time?",
        answer: "Yes, that's one of its most powerful features! The AI first transcribes the audio into text and then translates that text into your selected target language, all in one step."
    },
    {
        question: "5. What is the maximum file size I can upload?",
        answer: "To ensure fast and reliable service for all users, the maximum file size for each audio file is currently limited to 10MB."
    },
    {
        question: "6. Can I transcribe multiple files at once?",
        answer: "Yes, you can select and upload multiple audio files at the same time. The tool will process them in parallel and display the transcription for each file as it becomes available."
    },
    {
        question: "7. How should I record my audio for the best results?",
        answer: "For the highest accuracy, record in a quiet environment using a decent quality microphone. Speak clearly and try to minimize overlapping speakers."
    }
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

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, index) => (
                             <AccordionItem 
                                value={`item-${index + 1}`} 
                                key={index} 
                                className="bg-background/50 border rounded-lg transition-all duration-300 data-[state=open]:border-primary data-[state=open]:shadow-lg data-[state=open]:shadow-primary/10"
                            >
                                <AccordionTrigger className="text-left px-6 hover:no-underline font-semibold">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-6">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
