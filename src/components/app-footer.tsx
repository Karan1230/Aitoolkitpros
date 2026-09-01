import Link from 'next/link';
import { Logo } from './icons';
import { Button } from './ui/button';
import { Twitter, Instagram, Facebook, Youtube, ShieldCheck, Sparkles } from 'lucide-react';

const footerLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/blog', label: 'SEO Blog & Guides' },
  { href: '/tools', label: 'All AI Tools' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-and-conditions', label: 'Terms & Conditions' },
  { href: '/copyright-disclaimer', label: 'Copyright Disclaimer' },
];

const popularTools = [
  { href: '/tools/ai-script-writer', label: 'AI Script Writer' },
  { href: '/tools/ai-ad-copy-generator', label: 'AI Ad Copy Generator' },
  { href: '/tools/ai-logo-maker', label: 'AI Logo Maker' },
  { href: '/tools/reel-shorts-script-writer', label: 'Reel & Shorts Script' },
  { href: '/tools/youtube-seo-tool', label: 'YouTube SEO Generator' },
  { href: '/tools/ai-image-generator', label: 'AI Image Generator' },
];

const socialLinks = [
    { name: 'Twitter', icon: <Twitter className="h-4 w-4" />, href: 'https://twitter.com' },
    { name: 'Instagram', icon: <Instagram className="h-4 w-4" />, href: 'https://instagram.com' },
    { name: 'Facebook', icon: <Facebook className="h-4 w-4" />, href: 'https://facebook.com' },
    { name: 'YouTube', icon: <Youtube className="h-4 w-4" />, href: 'https://youtube.com' },
];

export function AppFooter() {
  return (
    <footer className="border-t border-border/50 bg-background/95 backdrop-blur-sm">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg gradient-text">AI Toolkit Pro</span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              An all-in-one suite of 100% free AI tools for creators, marketers, developers, and entrepreneurs worldwide.
            </p>
          </div>

          <div>
            <h3 className="font-headline text-sm font-semibold">Quick Navigation</h3>
            <ul className="mt-3 space-y-1.5">
              {footerLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-sm font-semibold">Popular AI Tools</h3>
            <ul className="mt-3 space-y-1.5">
              {popularTools.map(tool => (
                <li key={tool.href}>
                  <Link href={tool.href} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                    {tool.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-sm font-semibold">Connect & Stay Updated</h3>
            <p className="text-xs text-muted-foreground mt-2 mb-3">
              Follow our community for the latest generative AI tools and release updates.
            </p>
            <div className="flex gap-2">
              {socialLinks.map(social => (
                <Button key={social.name} variant="outline" size="icon" className="h-8 w-8" asChild>
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    {social.icon}
                    <span className="sr-only">{social.name}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-2">
          <p>&copy; {new Date().getFullYear()} AI Toolkit Pro. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="hover:underline">Blog</Link>
            <Link href="/privacy-policy" className="hover:underline">Privacy</Link>
            <Link href="/terms-and-conditions" className="hover:underline">Terms</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
