
import { type Metadata } from 'next';
import { VoiceToTextClient } from '@/components/voice-to-text-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


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
        question: "What is a voice-to-text converter?",
        answer: "A voice-to-text converter, also known as a speech-to-text or transcription tool, is a service that uses artificial intelligence to convert spoken words from an audio or video file into written text. It's a fast and efficient way to get a transcript of your recordings."
    },
    {
        question: "How accurate is the AI voice-to-text transcription?",
        answer: "Our tool uses advanced AI models to provide highly accurate transcriptions. Accuracy can depend on the clarity of the audio, but for clear recordings, it is significantly faster and often just as accurate as manual transcription."
    },
    {
        question: "Is this audio to text converter free?",
        answer: "Yes, our voice-to-text converter is completely free to use. You can transcribe your audio files without any cost, making it an accessible tool for students, journalists, content creators, and professionals."
    },
    {
        question: "What audio file formats can I upload?",
        answer: "Our tool supports a wide range of common audio formats, including MP3, WAV, and M4A. Simply upload your file, and the AI will begin the transcription process."
    },
    {
        question: "Can the tool translate the transcription into another language?",
        answer: "Yes, one of the key features of our tool is its ability to both transcribe and translate. After converting the audio to text, it can then translate that text into over 100 different languages, providing you with a fully translated transcript."
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Voice-to-Text Converter",
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Web",
      "description": "A free AI Voice-to-Text converter to accurately transcribe speech from audio files into text. Ideal for interviews, meetings, and content creation.",
      "url": "https://ai-toolkit-pro.vercel.app/tools/voice-to-text",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "280"
      },
      "author": {
        "@type": "Organization",
        "name": "AI Toolkit Pro"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  ]
};

export default function VoiceToTextPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
              <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                  Voice-to-Text Converter
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Effortlessly transcribe speech into text with our <strong>voice-to-text converter</strong>. Upload an audio file to get a fast and accurate transcription from our <strong>AI voice to text</strong> tool. This <strong>free voice to text</strong> service is ideal for interviews, meetings, and voice notes. As the <strong>best voice to text app</strong>, it provides reliable results for all your transcription needs. Use our <strong>voice to text online</strong> converter to save time and streamline your workflow.
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
      <section className="py-16">
        <div className="container max-w-4xl">
            <div className="prose dark:prose-invert mx-auto">
                <h2>Transcribe Your Audio with a Voice-to-Text Converter</h2>
                <p>In a world where audio and video content are king, the ability to quickly and accurately transcribe speech is more valuable than ever. A <strong>voice-to-text converter</strong> is a powerful tool that can transform your audio recordings into written text in a matter of seconds. Our platform offers a state-of-the-art <strong>AI voice to text</strong> service that is perfect for journalists, students, researchers, and anyone who needs to convert speech to text. For more on the benefits of transcription, see <a href="https://www.rev.com/blog/articles/the-many-benefits-of-transcribing-audio-and-video-files" target="_blank" rel="noopener noreferrer">Rev's blog</a>.</p>
                
                <p>Our tool is designed to be the <strong>best voice to text app</strong> by providing high accuracy and a user-friendly interface. The <strong>free voice to text</strong> service is accessible to everyone, allowing you to transcribe your audio without any cost. Simply upload your audio file, and our <strong>voice to text online</strong> converter will do the rest. It's a versatile <strong>speech to text converter</strong> that can handle a wide range of audio qualities and accents. Once you have your text, you can convert it back to audio with our <Link href="/tools/text-to-speech">Text-to-Speech Converter</Link>.</p>

                <h3>From Spoken Word to Written Text in an Instant</h3>
                <p>The <strong>audio to text converter</strong> technology behind our tool uses advanced machine learning to recognize and transcribe speech with incredible precision. This makes it a reliable <strong>transcribe audio to text free</strong> tool for creating accurate transcripts of interviews, meetings, and lectures. The <strong>voice to text converter online free</strong> service is also a great way to create captions for your videos, making your content more accessible to a wider audience. You can even generate a full script with our <Link href="/tools/ai-script-writer">AI Script Writer</Link>.</p>
                
                <p>Whether you need to <strong>convert audio to text</strong> for a professional project or a personal one, our tool has you covered. It's a powerful <strong>mp3 to text</strong> converter that can handle a variety of audio formats. Stop spending hours on manual transcription and start using the power of AI to convert your speech to text. Try our <strong>best free voice to text app</strong> today and experience the future of transcription.</p>
            </div>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <h2 className="font-headline text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
                <AccordionItem 
                    value={`item-${index}`} 
                    key={index}
                    className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl px-6 animate-pop-in"
                    style={{ animationDelay: `${index * 0.1}s`}}
                >
                    <AccordionTrigger className="font-headline text-lg text-left hover:no-underline">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                        {faq.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
