
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
    <>
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
              <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                  AI Voice Cloning
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Clone any voice from a short audio sample with our <strong>AI voice cloning</strong> tool. Upload an audio file, provide text, and our AI will generate speech in the cloned voice. This <strong>free AI voice cloning</strong> tool is perfect for creating custom voiceovers, personalized messages, and more. Our <strong>AI voice cloning free</strong> platform offers a seamless experience, making it the <strong>best AI voice cloning</strong> tool available online.
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
      <section className="py-16">
        <div className="container max-w-4xl">
            <div className="prose dark:prose-invert mx-auto">
                <h2>Create Custom Voiceovers with AI Voice Cloning</h2>
                <p>Imagine being able to use any voice for your projects. With <strong>AI voice cloning</strong>, this is now a reality. Our platform offers a powerful <strong>voice cloning AI</strong> that can replicate any voice from a short audio sample. This technology opens up a world of possibilities for content creators, developers, and marketers. Whether you need a custom voiceover for a video or a personalized audio message, our <strong>AI voice cloning free</strong> tool makes it easy to achieve professional results.</p>
                <p>Our tool is widely regarded as the <strong>best AI voice cloning</strong> software because of its accuracy and ease of use. The <strong>voice cloning free</strong> service allows you to experiment with different voices and find the perfect one for your needs. It's a versatile <strong>AI voice cloner</strong> that can be used for a wide range of applications, from creating engaging podcast intros to developing interactive voice assistants. The <strong>free AI voice cloner</strong> is designed to be user-friendly, so you can start creating right away.</p>

                <h3>How AI Voice Cloning Works</h3>
                <p>The process of using our <strong>voice cloning AI free</strong> tool is simple. First, you upload a clear audio sample of the voice you want to clone. Then, you provide the text that you want the AI to speak. The <strong>free voice cloning AI</strong> will then analyze the audio sample and generate a new audio file in the cloned voice. The result is a high-quality, natural-sounding voiceover that you can use in any of your projects. This makes it the <strong>best free AI voice cloning</strong> tool for both personal and professional use.</p>
                <p>Our <strong>AI voice cloning online</strong> platform is accessible from any device, so you can create custom voiceovers on the go. It's a powerful <strong>text to speech voice cloning</strong> tool that can save you time and money on professional voice actors. Stop using generic text-to-speech voices and start creating personalized audio content with our <strong>free AI voice cloning online</strong> tool. Try the <strong>best free voice cloning AI</strong> today and discover the power of custom voice generation.</p>
            </div>
        </div>
      </section>
    </>
  );
}
