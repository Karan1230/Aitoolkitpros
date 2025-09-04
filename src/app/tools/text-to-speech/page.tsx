
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
    <>
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
              <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                  Text-to-Speech Converter
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Bring your text to life with our realistic <strong>AI text-to-speech</strong> converter. Paste your text, choose a voice, and our <strong>TTS tool</strong> will generate high-quality audio in seconds. This <strong>free text-to-speech</strong> service is perfect for voiceovers, accessibility, and more. As the <strong>best free text-to-speech</strong> platform, it offers a wide range of natural-sounding voices. Use our <strong>AI voice generator</strong> to create professional audio content effortlessly.
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
      <section className="py-16">
        <div className="container max-w-4xl">
            <div className="prose dark:prose-invert mx-auto">
                <h2>Create Natural-Sounding Audio with an AI Text-to-Speech Converter</h2>
                <p>In a world where content is consumed in various formats, audio is becoming increasingly important. An <strong>AI text-to-speech</strong> (TTS) converter is a powerful tool that can transform your written content into natural-sounding audio. Our platform offers a high-quality <strong>TTS tool</strong> that can be used for a wide range of applications, from creating voiceovers for videos to making your content more accessible to visually impaired audiences. It's the perfect solution for anyone who wants to create professional audio content without the need for expensive recording equipment.</p>
                <p>Our tool is designed to be the <strong>best free text-to-speech</strong> service by offering a wide variety of natural-sounding voices and languages. The <strong>free text-to-speech online</strong> tool is easy to use; simply paste your text, choose a voice, and the AI will do the rest. This makes it an invaluable <strong>AI voice generator</strong> for content creators who want to add a new dimension to their work. The <strong>text to speech online</strong> service is also a great way to listen to articles and documents on the go.</p>

                <h3>From Text to Voice in a Few Clicks</h3>
                <p>The <strong>free text to speech AI</strong> technology behind our tool is what sets it apart. It uses advanced machine learning to produce voices that are clear, natural, and expressive. This makes it a great <strong>AI voice generator free</strong> tool for creating high-quality voiceovers that will engage your audience. The <strong>text to voice AI free</strong> service is also a great way to prototype voice applications and interactive voice response (IVR) systems. Our <strong>natural sounding text to speech free</strong> tool is a must-have for any developer working with voice technology.</p>
                <p>Whether you need a <strong>text to speech generator</strong> for a professional project or a <strong>free tts</strong> service for personal use, our tool has you covered. It's a versatile <strong>online text to speech</strong> platform that can be used for a wide range of applications. Stop using robotic-sounding text-to-speech voices and start creating natural and engaging audio content with the power of AI. Try our <strong>best text to speech free</strong> tool today and hear the difference for yourself.</p>
            </div>
        </div>
      </section>
    </>
  );
}
