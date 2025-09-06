
import { type Metadata } from 'next';
import { AiInteriorDesignerClient } from '@/components/ai-interior-designer-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


export const metadata: Metadata = {
  title: 'Free AI Interior Designer | Redesign Your Space Instantly',
  description: 'Upload a photo of your room and let our AI Interior Designer generate new design ideas. Visualize different styles and layouts for free.',
};

const benefits = [
    "Visualize new designs for any room.",
    "Experiment with different styles like Modern or Scandinavian.",
    "Save time and money on interior design mockups.",
    "Get instant inspiration for your home renovation."
];

const faqs = [
    {
        question: "What is an AI interior designer?",
        answer: "An AI interior designer is a tool that uses artificial intelligence to generate new design concepts for a room based on a photo you upload. It allows you to visualize different styles, furniture layouts, and color schemes without any manual work."
    },
    {
        question: "How does the AI room designer work?",
        answer: "You simply upload a clear photo of your room, select the room type (e.g., bedroom, living room), and choose a design style (e.g., Modern, Industrial). The AI then analyzes your photo and re-imagines the space according to your selected style, generating a new image of the redesigned room."
    },
    {
        question: "Is this AI interior design tool really free?",
        answer: "Yes, our AI interior design generator is completely free to use. It's a great way to get professional-level design inspiration and mockups without the cost of hiring a designer."
    },
    {
        question: "Can I use this for any room in my house?",
        answer: "Absolutely! The AI room planner is versatile and can be used for any room, including living rooms, bedrooms, kitchens, bathrooms, and home offices. It's an excellent tool for planning any home renovation project."
    },
    {
        question: "What is the best way to take a photo for the AI home design tool?",
        answer: "For the best results, take a well-lit, clear photo from a corner of the room to capture as much of the space as possible. Ensure the photo is not blurry and shows the main features of the room you want to redesign."
    }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "AI Interior Designer",
      "applicationCategory": "DesignApplication",
      "operatingSystem": "Web",
      "description": "A free AI tool to redesign spaces by uploading a room photo and choosing a new style. Instantly visualize different layouts and designs.",
      "url": "https://aitoolkitpro.netlify.app/tools/ai-interior-designer",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.7",
        "reviewCount": "95"
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

export default function AiInteriorDesignerPage() {
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
                  AI Interior Designer
              </h1>
              <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
                <p className="text-lg text-muted-foreground">
                  Redesign your space with our <strong>AI interior designer</strong>. Upload a photo of any room, choose a new style, and watch as our <strong>AI interior design generator free</strong> tool creates stunning, realistic redesigns in seconds. Whether you're looking for an <strong>AI room designer</strong> to help you visualize a new layout or an <strong>AI room planner</strong> to experiment with different furniture arrangements, our tool provides an all-in-one solution. This <strong>free AI interior design</strong> tool is perfect for homeowners, real estate agents, and design enthusiasts.
                </p>
              </div>

              <div className="mt-8">
                  <AiInteriorDesignerClient />
              </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p><strong>1. Upload Your Room:</strong> Click to upload a clear photo of the room you want to redesign.</p>
                      <p><strong>2. Select Options:</strong> Choose the room type (e.g., Living Room) and the design style (e.g., Modern).</p>
                      <p><strong>3. Generate:</strong> Click the "Run" button and wait for the AI to generate your new interior design.</p>
                      <p><strong>4. Download:</strong> Save the generated image to your device.</p>
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
                <h2>Visualize Your Dream Space with an AI Interior Designer</h2>
                <p>Have you ever struggled to imagine how a new design would look in your home? An <strong>AI interior designer</strong> is here to change that. Our powerful tool allows you to upload a photo of any room and see it transformed into your dream space. As the <strong>best AI interior design app free</strong> on the market, it offers a seamless and intuitive experience for visualizing different styles, colors, and furniture arrangements. This technology empowers you to make confident design decisions without the guesswork. For more design inspiration, check out resources like <a href="https://www.architecturaldigest.com/" target="_blank" rel="noopener noreferrer">Architectural Digest</a>.</p>
                
                <p>Our platform is more than just a simple design tool; it's a comprehensive <strong>AI home design</strong> assistant. Use it as an <strong>AI room designer free</strong> tool to get instant inspiration for your living room, bedroom, or kitchen. The <strong>AI room planner free</strong> feature helps you optimize your layout for both style and functionality. Whether you're planning a full renovation or just a simple refresh, our <strong>interior design AI</strong> is the perfect partner for your project. You can even find the perfect color scheme with our <Link href="/tools/color-palette-finder">AI Color Palette Finder</Link>. For more details about our privacy practices, see our <Link href="/privacy-policy">Privacy Policy</Link>.</p>
                
                <h3>How AI is Revolutionizing Home Design</h3>
                <p>The magic of our <strong>AI interior design generator</strong> lies in its ability to understand and reinterpret your space. Simply upload your photo, select a style like "Modern," "Minimalist," or "Bohemian," and let the AI work its magic. The tool will generate a high-quality, realistic image of your redesigned room. This makes it an invaluable <strong>AI for interior design</strong>, saving you time and money on professional mockups. It’s also an excellent <strong>AI interior design from photo</strong> tool for real estate professionals who want to showcase the potential of a property.</p>
                
                <p>The applications are endless. Use the <strong>room AI generator</strong> to experiment with bold new color palettes or to see how a piece of furniture would fit in your space. The <strong>AI room generator from photo</strong> feature is perfect for those who want a quick and easy way to explore design ideas. Our commitment is to provide the best <strong>free AI room design</strong> experience possible. Stop wondering and start visualizing with our <strong>AI interior design app free</strong> tool today. Your perfect home is just a click away.</p>
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
