
import { type Metadata } from 'next';
import { StudyNotesCreatorClient } from '@/components/study-notes-creator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Study Notes Creator | Summarize Text Instantly',
  description: 'Convert long articles, documents, and textbooks into concise study notes with our free AI tool. Paste your text to get key points and summaries in any language.',
};

const benefits = [
    "Save hours of reading and note-taking.",
    "Quickly grasp the main ideas of any text.",
    "Generate summaries in bullet points or paragraphs.",
    "Improve focus by studying only the important concepts."
];

export default function StudyNotesCreatorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Study Notes Creator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Paste any text and let our AI create clear, concise, and easy-to-understand study notes for you, summarizing key points and saving you hours of work.
              </p>
            </div>

            <div className="mt-8">
                <StudyNotesCreatorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Paste Your Text:</strong> Copy the content you want to summarize and paste it into the text area.</p>
                    <p><strong>2. Set Preferences:</strong> Choose your desired note length, format, and language.</p>
                    <p><strong>3. Generate:</strong> Click the "Create Notes" button to get your AI-generated summary.</p>
                    <p><strong>4. Copy & Download:</strong> Use the buttons to copy the notes or download them as a text file.</p>
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
