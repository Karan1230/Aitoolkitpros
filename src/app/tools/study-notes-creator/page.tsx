
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
    <>
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
              <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                  AI Study Notes Creator
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Paste any text and let our <strong>AI study notes creator</strong> generate clear, concise, and easy-to-understand study notes. This <strong>AI notes generator</strong> summarizes key points, saving you hours of work. As the <strong>best AI note taker</strong>, it helps you focus on what's important. Use our <strong>free AI notes generator</strong> to streamline your study process and improve your learning efficiency.
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
      <section className="py-16">
        <div className="container max-w-4xl">
            <div className="prose dark:prose-invert mx-auto">
                <h2>Streamline Your Studying with an AI Study Notes Creator</h2>
                <p>Studying effectively often means condensing large amounts of information into concise, manageable notes. An <strong>AI study notes creator</strong> is a revolutionary tool that automates this process, saving you countless hours of reading and note-taking. Our platform offers a powerful <strong>AI notes generator</strong> that can analyze any text and extract the most important key points, definitions, and concepts. It's the perfect study partner for students of all levels.</p>
                <p>Our tool is designed to be the <strong>best AI note taker</strong> by providing clear, organized, and accurate summaries. The <strong>free AI notes generator</strong> is easy to use; simply paste your text, and the AI will do the rest. This makes it an invaluable <strong>AI note taking app</strong> for anyone who needs to quickly grasp the main ideas of a long article, textbook chapter, or research paper. The <strong>AI notes summarizer</strong> is a game-changer for efficient and effective learning.</p>
                
                <h3>From Long Texts to Concise Notes in Seconds</h3>
                <p>The <strong>AI that takes notes from lectures</strong> feature is perfect for students who want to focus on listening during class. Simply record the lecture, transcribe it, and let our tool create the notes for you. The <strong>AI notes generator from text</strong> can also be used to create study guides, flashcards, and other learning materials. Our <strong>free AI note taking app</strong> is a versatile tool that can be adapted to any learning style.</p>
                <p>Whether you're preparing for an exam, writing a research paper, or just trying to learn something new, our <strong>AI notes app</strong> can help you succeed. It's a powerful <strong>AI for note taking</strong> that can help you study smarter, not harder. Stop spending hours on manual note-taking and start using the power of AI to streamline your study process. Try our <strong>best free AI note taking app</strong> today and see the difference it can make in your academic performance.</p>
            </div>
        </div>
      </section>
    </>
  );
}
