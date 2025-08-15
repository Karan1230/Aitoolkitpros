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

const faqs = [
    {
        question: "1. Is this tool free?",
        answer: "Yes, the AI Study Notes Creator is 100% free to use. There are no hidden fees or subscriptions."
    },
    {
        question: "2. Is there a character limit?",
        answer: "While there is a generous limit to ensure fair usage, the tool is designed to handle large amounts of text, such as articles or book chapters. For extremely long documents, consider breaking them into smaller sections."
    },
    {
        question: "3. Can I use this for any subject?",
        answer: "Absolutely. The tool is versatile and can summarize text from any field, including science, history, literature, and technical subjects."
    },
    {
        question: "4. What's the difference between 'Note Length' options?",
        answer: "'Short' provides a very brief summary. 'Medium' gives a balanced overview. 'Detailed' extracts more information and key points for a comprehensive set of notes."
    },
    {
        question: "5. Can I choose the format of the notes?",
        answer: "Yes, you can choose between 'Bullet Points' for a scannable list of key ideas or 'Paragraph Summary' for a more narrative-style summary of the text."
    },
    {
        question: "6. Does the AI add any information that wasn't in the original text?",
        answer: "No. The AI is designed to only summarize and reformat the information you provide. It will not introduce any external facts or opinions."
    },
    {
        question: "7. Can I create notes in different languages?",
        answer: "Yes. You can paste text in one language and request the study notes to be generated in another, making it a useful tool for language learners as well."
    }
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
                Paste any text and let our <strong>AI study notes creator</strong> create clear, concise, and easy-to-understand study notes for you. Our <strong>free AI summarizer</strong> helps you summarize long articles, documents, and textbooks instantly. Get <strong>key points and summaries</strong> in any language, saving you hours of reading and note-taking. Improve your focus by studying only the most important concepts with the <strong>best study tool</strong> and quickly grasp the main ideas of any text.
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
