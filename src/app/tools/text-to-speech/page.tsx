
import { type Metadata } from 'next';
import { TextToSpeechClient } from '@/components/text-to-speech-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Text-to-Speech Converter | Natural AI Voices',
  description: 'Convert text into natural-sounding speech with our free AI Text-to-Speech (TTS) tool. Perfect for voiceovers, accessibility, and content creation. No login needed.',
};

const benefits = [
    "Create high-quality voiceovers for videos.",
    "Make your content accessible to a wider audience.",
    "Listen to articles and documents on the go.",
    "Prototype voice applications and IVR systems."
];

export default function TextToSpeechPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                Text-to-Speech Converter
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Bring your text to life with realistic AI voices. Paste your text, choose a voice, and generate high-quality audio in seconds for voiceovers, accessibility, and more.
              </p>
            </div>

            <div className="mt-8">
                <TextToSpeechClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Enter Text:</strong> Type or paste the text you want to convert into the text area.</p>
                    <p><strong>2. Generate Audio:</strong> Click the "Convert to Speech" button.</p>
                    <p><strong>3. Listen & Download:</strong> Use the audio player to listen to the generated speech. You can download the audio file directly from the player.</p>
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
