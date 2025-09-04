import { type Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, Send } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the AI Toolkit Pro team. We welcome your questions, feedback, and suggestions.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "mainEntity": {
    "@type": "Organization",
    "name": "AI Toolkit Pro",
    "url": "https://www.aitoolkitpro.com",
    "logo": "https://www.aitoolkitpro.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": "support@aitoolkitpro.com",
      "availableLanguage": "English"
    }
  },
  "url": "https://www.aitoolkitpro.com/contact"
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="container py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-center">
            Contact Us
          </h1>
          <p className="mt-6 text-lg text-center text-muted-foreground">
            Have a question, feedback, or a suggestion? We'd love to hear from you.
          </p>

          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Send us a Message</CardTitle>
              <CardDescription>We'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your message..." className="min-h-[120px]" />
                </div>
                <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90">
                  Send Message <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
