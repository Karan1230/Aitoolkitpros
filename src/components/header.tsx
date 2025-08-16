
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Logo } from './icons';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'All Tools', href: '/tools' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 100) { 
          setIsVisible(false);
        } else { 
          setIsVisible(true);
        }
        setLastScrollY(currentScrollY); 
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);


  return (
    <header className={cn(
        "sticky top-4 z-50 w-full transition-transform duration-300",
        isVisible ? 'translate-y-0' : '-translate-y-full'
    )}>
        <div className="container flex h-16 items-center rounded-2xl border border-border/40 bg-background/80 backdrop-blur-lg shadow-lg">
            <div className="mr-auto hidden md:flex">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Logo className="h-9 w-9 text-primary" />
                    <span className="font-bold font-headline text-xl gradient-text">AI Toolkit Pro</span>
                </Link>
                <nav className="flex items-center space-x-2 text-sm font-medium">
                    {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            'px-4 py-2 rounded-lg border border-transparent transition-all duration-300 ease-in-out',
                            'hover:text-primary hover:border-primary/50',
                            pathname === item.href 
                            ? 'text-primary-foreground bg-primary shadow-sm hover:border-primary' 
                            : 'text-muted-foreground'
                        )}
                    >
                        {item.name}
                    </Link>
                    ))}
                </nav>
            </div>

            <div className="flex w-full items-center justify-between md:hidden">
                <Link href="/" className="flex items-center space-x-2">
                    <Logo className="h-8 w-8 text-primary" />
                    <span className="font-bold font-headline text-lg gradient-text">AI Toolkit Pro</span>
                </Link>
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
                        <SheetDescription className="sr-only">A list of links to navigate the site.</SheetDescription>
                        <nav className="grid gap-4 text-lg font-medium mt-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={cn(
                                        'flex items-center justify-center py-3 rounded-lg border-2 transition-all duration-300 ease-in-out',
                                        pathname === item.href 
                                        ? 'text-primary-foreground bg-primary/80 border-primary shadow-lg' 
                                        : 'text-foreground hover:bg-muted/50 border-muted'
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>

            <div className="hidden md:flex items-center justify-end">
                <Button asChild>
                    <Link href="/tools">Try AI Tools <Sparkles className="ml-2 h-4 w-4"/></Link>
                </Button>
            </div>
        </div>
    </header>
  );
}
