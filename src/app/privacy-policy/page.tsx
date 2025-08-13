import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the Privacy Policy for AI Toolkit Pro to understand how we handle your data and protect your privacy.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Privacy Policy</h1>
        <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>
        
        <p>
          Welcome to AI Toolkit Pro. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and disclose information about you when you use our website.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          Since our service requires no login or subscription, we do not collect personal identification information such as your name, email address, or phone number. We may collect non-personal information that your browser sends whenever you visit our site, such as your computer's IP address, browser type, and the pages you visit.
        </p>

        <h2>2. How We Use Information</h2>
        <p>
          The information you provide to our tools (e.g., text for the script writer, prompts for the image generator) is sent to third-party API providers to generate the output. We do not store your inputs or the generated outputs on our servers. Please refer to the privacy policies of the respective API providers for more information on how they handle data.
        </p>

        <h2>3. Cookies</h2>
        <p>
          We may use cookies to improve your experience. Cookies are small files stored on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
        </p>

        <h2>4. Third-Party Services</h2>
        <p>
          Our tools rely on various third-party APIs (e.g., Gemini, ElevenLabs). These sites have their own privacy policies. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
        </p>

        <h2>5. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>

        <h2>6. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us through our contact page.
        </p>
      </div>
    </div>
  );
}
