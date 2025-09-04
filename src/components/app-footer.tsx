
import Link from 'next/link';
import { Logo } from './icons';
import { Button } from './ui/button';
import { Twitter, Instagram, Facebook, Youtube } from 'lucide-react';

const footerLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-and-conditions', label: 'Terms & Conditions' },
  { href: '/copyright-disclaimer', label: 'Copyright Disclaimer' },
];

const socialLinks = [
    { name: 'Twitter', icon: <Twitter className="h-5 w-5" />, href: 'https://twitter.com' },
    { name: 'Instagram', icon: <Instagram className="h-5 w-5" />, href: 'https://instagram.com' },
    { name: 'Facebook', icon: <Facebook className="h-5 w-5" />, href: 'https://facebook.com' },
    { name: 'YouTube', icon: <Youtube className="h-5 w-5" />, href: 'https://youtube.com' },
];

export function AppFooter() {
  return (
    <footer className="border-t border-border/50 bg-background/95 backdrop-blur-sm">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="h-7 w-7 text-primary" />
              <span className="font-bold text-xl gradient-text">AI Toolkit Pro</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              A comprehensive suite of free AI-powered tools to boost creativity and productivity for creators and professionals.
            </p>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-headline text-base font-semibold">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                {footerLinks.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-headline text-base font-semibold">Popular Tools</h3>
              <ul className="mt-4 space-y-2">
                 <li><Link href="/tools/ai-script-writer" className="text-sm text-muted-foreground hover:text-primary transition-colors">AI Script Writer</Link></li>
                 <li><Link href="/tools/ai-image-generator" className="text-sm text-muted-foreground hover:text-primary transition-colors">AI Image Generator</Link></li>
                 <li><Link href="/tools/youtube-seo-tool" className="text-sm text-muted-foreground hover:text-primary transition-colors">YouTube SEO Tool</Link></li>
                 <li><Link href="/tools/ai-logo-maker" className="text-sm text-muted-foreground hover:text-primary transition-colors">AI Logo Maker</Link></li>
              </ul>
            </div>
             <div>
              <h3 className="font-headline text-base font-semibold">Connect With Us</h3>
              <div className="mt-4 flex gap-2">
                {socialLinks.map(social => (
                    <Button key={social.name} variant="outline" size="icon" asChild>
                        <a href={social.href} target="_blank" rel="noopener noreferrer">
                            {social.icon}
                            <span className="sr-only">{social.name}</span>
                        </a>
                    </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border/50 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AI Toolkit Pro. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
