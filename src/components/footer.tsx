import Link from 'next/link';
import { Logo } from './icons';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Send, Twitter, Github, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40">
      <div className="container py-12">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4 flex flex-col gap-2 items-start">
            <Link href="/" className="flex items-center gap-2 mb-2">
              <Logo className="h-8 w-8 text-primary" />
              <span className="font-headline text-xl font-bold">AI Toolkit Pro</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              Your hub for free AI tools for creativity, business, content, and fun. Explore tools in multiple languages.
            </p>
             <div className="flex gap-2 mt-4">
                <Button variant="ghost" size="icon" asChild>
                    <a href="#" aria-label="Twitter"><Twitter /></a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                    <a href="#" aria-label="GitHub"><Github /></a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                    <a href="#" aria-label="LinkedIn"><Linkedin /></a>
                </Button>
             </div>
          </div>
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
                <h4 className="font-headline font-semibold mb-3">Quick Links</h4>
                <nav className="flex flex-col gap-2">
                    <Link href="/tools" className="text-sm text-muted-foreground hover:text-primary">All Tools</Link>
                    <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">Blog</Link>
                    <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link>
                    <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link>
                </nav>
            </div>
             <div>
                <h4 className="font-headline font-semibold mb-3">Legal</h4>
                <nav className="flex flex-col gap-2">
                    <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
                    <Link href="/terms-and-conditions" className="text-sm text-muted-foreground hover:text-primary">Terms & Conditions</Link>
                </nav>
            </div>
            <div className="col-span-2 sm:col-span-2">
              <h4 className="font-headline font-semibold mb-3">Stay Updated with New AI Tools</h4>
              <form className="flex w-full max-w-sm items-center space-x-2">
                <Input type="email" placeholder="Email" />
                <Button type="submit" size="icon" className="bg-accent hover:bg-accent/90">
                    <Send className="h-4 w-4" />
                </Button>
             </form>
            </div>
          </div>
        </div>
         <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
             <p>© {currentYear} AI Toolkit Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
