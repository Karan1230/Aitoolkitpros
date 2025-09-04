
import { type Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Privacy Policy | AI Toolkit Pro',
  description: 'Read the Privacy Policy for AI Toolkit Pro to understand how we handle your data and protect your privacy when you use our free AI tools.',
  keywords: ['privacy policy', 'data protection', 'user privacy', 'ai tools privacy'],
  openGraph: {
    title: 'Privacy Policy | AI Toolkit Pro',
    description: 'Understand how we handle your data and protect your privacy.',
    url: 'https://www.aitoolkitpro.com/privacy-policy',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | AI Toolkit Pro',
    description: 'Our commitment to your privacy.',
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy",
  "url": "https://www.aitoolkitpro.com/privacy-policy",
  "description": "Read the Privacy Policy for AI Toolkit Pro to understand how we handle your data and protect your privacy.",
  "publisher": {
    "@type": "Organization",
    "name": "AI Toolkit Pro",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.aitoolkitpro.com/logo.png"
    }
  }
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="container max-w-3xl p-4 sm:p-6 md:p-8">
        <div className="text-center mb-10">
            <h1 className="font-headline text-3xl md:text-4xl font-bold">Privacy Policy</h1>
            <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
        
        <Card className="bg-card/50">
            <CardContent className="p-6 space-y-6 text-sm md:text-base text-muted-foreground">
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-foreground">1. Information We Collect</h2>
                  <p>
                    Since our service requires no login or subscription, we do not collect personal identification information such as your name, email address, or phone number. We may collect non-personal information that your browser sends whenever you visit our site, such as your computer's IP address, browser type, and the pages you visit.
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-foreground">2. How We Use Information</h2>
                  <p>
                    The information you provide to our tools (e.g., text for the script writer, prompts for the image generator) is sent to third-party API providers to generate the output. We do not store your inputs or the generated outputs on our servers. Please refer to the privacy policies of the respective API providers for more information on how they handle data.
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-foreground">3. Cookies</h2>
                  <p>
                    We may use cookies to improve your experience. Cookies are small files stored on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-foreground">4. Third-Party Services</h2>
                  <p>
                    Our tools rely on various third-party APIs (e.g., Gemini, ElevenLabs). These sites have their own privacy policies. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-foreground">5. Changes to This Privacy Policy</h2>
                  <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-foreground">6. Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us through our contact page.
                  </p>
                </div>
            </CardContent>
        </Card>
      </div>
    </>
  );
}
