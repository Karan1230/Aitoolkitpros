import Link from 'next/link';
import { Logo } from './icons';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card">
      <div className="container flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="font-headline text-xl font-bold">AI Toolkit Pro</span>
          </Link>
          <p className="text-sm text-muted-foreground">© {currentYear} AI Toolkit Pro. All rights reserved.</p>
        </div>
        <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
          <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary">
            About Us
          </Link>
          <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Contact
          </Link>
          <Link href="/tools" className="text-sm font-medium text-muted-foreground hover:text-primary">
            All Tools
          </Link>
          <Link href="/privacy-policy" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Terms &amp; Conditions
          </Link>
        </nav>
      </div>
    </footer>
  );
}
