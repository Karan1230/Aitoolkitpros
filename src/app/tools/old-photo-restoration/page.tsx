
import { type Metadata } from 'next';
import { OldPhotoRestorationClient } from '@/components/old-photo-restoration-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


export const metadata: Metadata = {
  title: 'Free AI Old Photo Restoration Tool | Restore Your Photos Instantly',
  description: 'Restore old, damaged, and faded photos with our free AI-powered tool. Bring your memories back to life with enhanced quality and color.',
};

const benefits = [
    "Restore faded colors and improve contrast.",
    "Fix scratches, tears, and other damage.",
    "Enhance facial details for clearer portraits.",
    "Preserve your family history for generations."
];

const faqs = [
    {
        question: "What is AI old photo restoration?",
        answer: "AI old photo restoration is a process that uses artificial intelligence to automatically repair and enhance old, damaged, or faded photographs. The AI can fix scratches, tears, and discoloration, as well as improve sharpness and detail to bring old memories back to life."
    },
    {
        question: "How does the AI photo restoration tool work?",
        answer: "You upload a scanned copy of your old photograph. The AI then analyzes the image, identifies areas of damage, and uses its training on millions of photos to intelligently reconstruct the missing or damaged parts. It enhances colors, sharpens details, and cleans up imperfections."
    },
    {
        question: "Is this old photo restoration service free?",
        answer: "Yes, our AI-powered photo restoration tool is completely free to use. You can restore your cherished family photos without any cost or need for expensive professional services."
    },
    {
        question: "What kind of damage can the AI image restoration fix?",
        answer: "The AI is effective at fixing a wide range of common issues, including scratches, small tears, fading, discoloration, and low contrast. It can also significantly improve the clarity of faces and other important details in the photograph."
    },
    {
        question: "Will the result look natural?",
        answer: "Our tool is designed to produce natural-looking results. The goal is to restore the photo to its original glory, not to make it look artificial. The AI enhances the existing details and colors in a way that is respectful to the original photograph."
    }
];

export default function OldPhotoRestorationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }) }}
      />
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
              <h1 className="font-headline text-4xl md:text-5xl font-bold gradient-text">
                  AI Old Photo Restoration
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Breathe new life into your old memories with our <strong>AI old photo restoration</strong> tool. Upload a photo, and let our <strong>AI photo restoration</strong> fix damages, enhance colors, and improve details in seconds. This <strong>free AI photo restoration</strong> tool is perfect for preserving family history. As the <strong>best AI photo restoration</strong> software, it delivers stunning results, making it an essential <strong>AI image restoration</strong> tool for anyone with cherished old photographs.
                </p>
              </div>

              <div className="mt-8">
                  <OldPhotoRestorationClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Upload Photo:</strong> Click to upload an old or damaged photo from your device.</p>
                      <p><strong>2. Restore:</strong> Click the "Submit" button and wait for the AI to process and restore your image.</p>
                      <p><strong>3. Compare & Download:</strong> View the before-and-after comparison and download your restored photo.</p>
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
                <h2>Bring Your Cherished Memories Back to Life with AI Photo Restoration</h2>
                <p>Old photographs are precious windows to the past, but over time, they can fade, get scratched, or become damaged. An <strong>AI old photo restoration</strong> tool is a magical solution that can bring these cherished memories back to life. Our platform offers a powerful <strong>AI photo restoration</strong> service that can repair damages, enhance colors, and improve the overall quality of your old photos. It's the perfect way to preserve your family history for future generations. For more on photo preservation, check out the resources from <a href="https://www.archives.gov/preservation/family-archives" target="_blank" rel="noopener noreferrer">The National Archives</a>.</p>
                <p>Our tool is designed to be the <strong>best AI photo restoration</strong> software by providing exceptional results with ease. The <strong>free AI photo restoration</strong> is accessible to everyone, allowing you to restore your photos without any cost. Simply upload your old photo, and our <strong>photo restoration AI</strong> will analyze the image and apply a series of enhancements to bring it back to its former glory. The <strong>AI image restoration</strong> process is fast and efficient, so you can see the results in seconds. You can also upscale your restored photos with our <Link href="/tools/image-upscaler">Image Upscaler</Link>.</p>

                <h3>How AI Restores Your Old Photos</h3>
                <p>The technology behind our <strong>old photo restoration online free</strong> tool is truly remarkable. The AI is trained on millions of images to understand how to repair common issues like scratches, tears, and discoloration. It can even enhance facial details, making your ancestors' faces clearer and more recognizable. This makes it an invaluable <strong>AI photo enhancer free</strong> tool for anyone who wants to improve the quality of their old photos. The <strong>restore old photos AI free</strong> service is a great way to breathe new life into your family albums. You can even edit them further with our <Link href="/tools/ai-image-editor">AI Image Editor</Link>.</p>
                <p>Whether you're a professional genealogist or just someone who wants to preserve their family memories, our <strong>free old photo restoration online</strong> tool is here to help. It's a versatile <strong>picture restoration</strong> tool that can handle a wide range of photo types and conditions. Stop letting your precious memories fade away and start restoring them with the power of AI. Try our <strong>AI photo restoration free</strong> tool today and see your old photos in a whole new light.</p>
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
