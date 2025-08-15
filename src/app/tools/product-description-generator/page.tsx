import { type Metadata } from 'next';
import { ProductDescriptionGeneratorClient } from '@/components/product-description-generator-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export const metadata: Metadata = {
  title: 'Free AI Product Description Generator | SEO-Optimized Copy',
  description: 'Generate compelling, high-converting product descriptions for your e-commerce store. Our AI tool creates SEO-friendly copy for any product.',
};

const benefits = [
    "Increase conversions with persuasive copy.",
    "Improve SEO with keyword-rich descriptions.",
    "Save hours of writing time.",
    "Create a consistent brand voice across all products."
];

const faqs = [
    {
        question: "1. Is this tool free to use?",
        answer: "Yes, it's 100% free. You can generate as many product descriptions as you need without any limits or subscriptions."
    },
    {
        question: "2. Is the generated content unique?",
        answer: "The AI generates a unique description based on your specific inputs. We recommend reviewing and tweaking it to perfectly match your brand's voice."
    },
    {
        question: "3. What e-commerce platforms can I use this for?",
        answer: "The descriptions are suitable for all major platforms like Shopify, WooCommerce, Amazon, Flipkart, Etsy, and more."
    },
    {
        question: "4. How does the 'SEO-optimized' tone work?",
        answer: "When you select the 'SEO-optimized' tone, the AI will naturally weave in relevant keywords based on your product name and category to help your product page rank better in search engine results."
    },
    {
        question: "5. Can I specify a target audience?",
        answer: "Yes. Providing a target audience (e.g., 'students', 'busy professionals', 'eco-conscious shoppers') helps the AI tailor the language and benefits to resonate with that specific group."
    },
    {
        question: "6. What should I include in the 'Key Features' section?",
        answer: "List the most important features of your product, one per line. The AI will then transform these features into benefits for the customer in the final description."
    },
    {
        question: "7. Can I generate descriptions in different languages?",
        answer: "While this tool is currently optimized for English, many of our other writing tools support multiple languages. This feature may be added in the future!"
    }
];

export default function ProductDescriptionGeneratorPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
                AI Product Description Generator
            </h1>
            <div className="mt-4 p-6 rounded-lg bg-muted/50 border">
              <p className="text-lg text-muted-foreground">
                Turn product features into compelling descriptions that sell. Let our <strong>AI product description generator</strong> craft the perfect copy for your e-commerce store. Our free AI tool creates <strong>high-converting copy</strong> and <strong>SEO-friendly descriptions</strong> for any product. Increase conversions with <strong>persuasive product descriptions</strong>, improve your SEO with keyword-rich content, and save hours of writing time. Maintain a consistent brand voice and watch your sales grow with our <strong>e-commerce copy generator</strong>.
              </p>
            </div>

            <div className="mt-8">
                <ProductDescriptionGeneratorClient />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>1. Enter Details:</strong> Provide the product name, category, features, and target audience.</p>
                    <p><strong>2. Select Tone:</strong> Choose a tone that matches your brand (e.g., Professional, SEO-optimized).</p>
                    <p><strong>3. Generate:</strong> Click the "Generate Description" button to let the AI create the copy.</p>
                    <p><strong>4. Copy & Use:</strong> Copy the generated description and paste it directly into your e-commerce platform.</p>
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
