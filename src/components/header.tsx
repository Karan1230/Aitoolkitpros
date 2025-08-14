'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Bot } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Logo } from './icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const navItems = [
  { name: 'Home', href: '/' },
  { name: 'All Tools', href: '/tools' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline text-lg">AI Toolkit Pro</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname === item.href ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                {item.name}
              </Link>
            ))}
             <DropdownMenu>
              <DropdownMenuTrigger className={cn(
                  'flex items-center transition-colors hover:text-foreground/80 text-sm font-medium',
                  pathname.startsWith('/tools/chatgpt') ? 'text-foreground' : 'text-foreground/60'
                )}>ChatGPT Tools</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Writing & Content</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/tools/chatgpt-ai-tools">All ChatGPT Tools</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/tools/chatgpt-ai-tools?tab=q-and-a">Q&A</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/tools/chatgpt-ai-tools?tab=text-rewriter">Text Rewriter</Link></DropdownMenuItem>
                 <DropdownMenuItem asChild><Link href="/tools/chatgpt-ai-tools?tab=grammar-spelling">Grammar Corrector</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Development</DropdownMenuLabel>
                <DropdownMenuItem asChild><Link href="/tools/chatgpt-ai-tools?tab=coding-help">Coding Helper</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:hidden">
          <Link href="/" className="flex items-center space-x-2">
             <Logo className="h-8 w-8 text-primary" />
             <span className="font-bold font-headline text-lg">AI Toolkit Pro</span>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">A list of links to navigate the site.</SheetDescription>
              <nav className="grid gap-6 text-lg font-medium mt-8">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            'flex items-center justify-center py-2 transition-colors hover:text-foreground/80',
                            pathname === item.href ? 'text-foreground bg-muted rounded-md' : 'text-foreground/60'
                        )}
                    >
                        {item.name}
                    </Link>
                ))}
                 <Link
                    href="/tools/chatgpt-ai-tools"
                    className={cn(
                        'flex items-center justify-center py-2 transition-colors hover:text-foreground/80',
                        pathname.startsWith('/tools/chatgpt') ? 'text-foreground bg-muted rounded-md' : 'text-foreground/60'
                    )}
                >
                    ChatGPT Tools
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
