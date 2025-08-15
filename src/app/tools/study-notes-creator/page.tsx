import { type Metadata } from 'next';
import { StudyNotesCreatorClient } from '@/components/study-notes-creator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


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
            <p className="mt-4 text-lg text-muted-foreground">
                Paste any text and let our AI create clear, concise, and easy-to-understand study notes for you. Our free AI study notes creator helps you summarize long articles, documents, and textbooks instantly. Get key points and summaries in any language, saving you hours of reading and note-taking. Improve your focus by studying only the most important concepts and quickly grasp the main ideas of any text.
            </p>

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

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Is this tool free?</AccordionTrigger>
                            <AccordionContent>
                            Yes, the AI Study Notes Creator is 100% free to use. There are no hidden fees or subscriptions.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Is there a character limit?</AccordionTrigger>
                            <AccordionContent>
                            While there may be a generous limit to ensure fair usage, the tool is designed to handle large amounts of text, such as articles or book chapters.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Can I use this for any subject?</AccordionTrigger>
                            <AccordionContent>
                            Absolutely. The tool is versatile and can summarize text from any field, including science, history, literature, and technical subjects.
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
