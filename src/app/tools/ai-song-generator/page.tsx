
import { type Metadata } from 'next';
import { AiSongGeneratorClient } from '@/components/ai-song-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Song Generator | Create Music from Text',
  description: 'Generate original songs with vocals and instrumentals from text prompts using our free AI tool. Create music in any genre, from pop to rock, in seconds.',
};

const benefits = [
    "Create original songs without musical knowledge.",
    "Generate royalty-free music for your projects.",
    "Experiment with different genres and styles.",
    "Perfect for content creators, musicians, and hobbyists."
];

export default function AiSongGeneratorPage() {
  return (
    <>
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
              <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                  AI Song Generator
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Turn your text prompts into complete songs with our <strong>AI song generator</strong>. This tool creates original music with vocals and instrumentation in any genre. As the <strong>best AI song generator</strong>, it allows you to produce high-quality tracks for free. Our <strong>AI song generator free</strong> tool is perfect for musicians and content creators alike. Use this <strong>AI music generator from text</strong> to bring your musical ideas to life effortlessly.
                </p>
              </div>

              <div className="mt-8">
                  <AiSongGeneratorClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Describe Your Song:</strong> Enter a prompt describing the song's theme, genre, mood, or lyrics.</p>
                      <p><strong>2. Generate:</strong> Click the "Submit" button and let the AI compose your song.</p>
                      <p><strong>3. Listen & Download:</strong> Once generated, you can listen to your creation and download it.</p>
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
                <h2>Create Your Own Music with an AI Song Generator</h2>
                <p>Have you ever wanted to create your own music but didn't know where to start? An <strong>AI song generator</strong> is the perfect tool for aspiring musicians and content creators. Our platform offers a powerful <strong>AI music generator</strong> that can turn your text prompts into complete songs, complete with vocals and instrumentation. This makes it the <strong>best AI music generator</strong> for anyone looking to create original music without any prior experience.</p>
                <p>The <strong>AI song generator from text</strong> technology is a game-changer. You can simply describe the mood, genre, and lyrics of the song you want to create, and the AI will do the rest. This <strong>AI song writer</strong> is like having a professional songwriter and composer at your fingertips. Our <strong>AI generated music free</strong> tool is perfect for creating background music for videos, podcasts, or any other creative project. It’s a versatile <strong>AI song creator</strong> that can produce music in a wide range of styles.</p>

                <h3>From Lyrics to Melody in Minutes</h3>
                <p>Our <strong>AI lyric generator</strong> can even help you write the words to your song. If you have a theme or an idea, the AI can generate lyrics that fit your vision. This makes our platform a comprehensive <strong>free AI music generator from text</strong>. The <strong>AI voice generator singing</strong> feature adds a human touch to your creations, making them sound professional and polished. As the <strong>best free AI music generator</strong>, we are committed to providing a high-quality, user-friendly experience.</p>
                <p>Whether you're a seasoned musician looking for a new source of inspiration or a complete beginner who wants to experiment with music, our <strong>AI song generator with vocals</strong> is the perfect tool for you. The <strong>AI music creator</strong> is designed to be intuitive and easy to use, so you can start creating music right away. Try our <strong>AI song generator free online no sign up</strong> tool today and unleash your inner musician. Your next hit song is just a few clicks away.</p>
            </div>
        </div>
      </section>
    </>
  );
}
