
import { type Metadata } from 'next';
import { AiVoiceCloningClient } from '@/components/ai-voice-cloning-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Voice Cloning Tool | Clone Voices Instantly',
  description: 'Clone any voice from an audio sample with our free AI-powered tool. Generate speech in the cloned voice from text. No login required.',
};

const benefits = [
    "Replicate a voice for use in creative projects.",
    "Generate custom voiceovers for videos and presentations.",
    "Personalize audio content with a familiar voice.",
    "Easy to use: just upload an audio file and provide text."
];

export default function AiVoiceCloningPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                AI Voice Cloning
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Clone any voice from a short audio sample. Upload an audio file, provide text, and our AI will generate speech in the cloned voice.
              </p>
            </div>

            <div className="mt-8">
                <AiVoiceCloningClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Upload Audio:</strong> Upload a clear audio sample (WAV or MP3) of the voice you want to clone.</p>
                    <p><strong>2. Provide Text:</strong> Enter the text you want the AI to speak in the cloned voice.</p>
                    <p><strong>3. Generate:</strong> Click the "Clone" button and wait for the AI to process your request.</p>
                    <p><strong>4. Listen:</strong> Play the generated audio to hear the result.</p>
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
