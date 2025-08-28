
"use client";

import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { allTools } from "@/lib/tools";
import { ScrollArea } from "./ui/scroll-area";

function SearchDialog() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const filteredTools = allTools.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Search className="h-6 w-6" />
                    <span className="sr-only">Search</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Search Tools</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <Input
                        placeholder="Type to search for a tool..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <ScrollArea className="h-72 mt-4">
                        <div className="space-y-2">
                        {filteredTools.map(tool => (
                            <Link
                                href={tool.href}
                                key={tool.name}
                                className="block p-2 rounded-md hover:bg-muted"
                                onClick={() => setIsOpen(false)}
                            >
                                <div className="font-semibold">{tool.name}</div>
                                <p className="text-sm text-muted-foreground">{tool.description}</p>
                            </Link>
                        ))}
                        </div>
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    );
}


export function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleTouchStart = (e: globalThis.TouchEvent) => {
    const touch = e.touches[0];
    // Open gesture: only care if touch starts on the right 25% of the screen
    if (!isMenuOpen && touch.clientX < window.innerWidth * 0.75) {
      touchStartRef.current = null;
      return;
    }
    // Close gesture: can start anywhere
    touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
  };

  const handleTouchMove = (e: globalThis.TouchEvent) => {
    if (!touchStartRef.current) return;

    const touch = e.touches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;

    // Ignore vertical swipes
    if (Math.abs(dy) > Math.abs(dx)) {
      return;
    }

    const duration = Date.now() - touchStartRef.current.time;
    
    // Swipe left to open
    if (!isMenuOpen && dx < -50 && duration < 500) {
      setIsMenuOpen(true);
      touchStartRef.current = null;
    }
    
    // Swipe right to close
    if (isMenuOpen && dx > 50 && duration < 500) {
      setIsMenuOpen(false);
      touchStartRef.current = null;
    }
  };

  useEffect(() => {
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isMenuOpen]);


  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur-sm">
      <Link href="/" className="flex items-center gap-2">
        <Logo className="h-6 w-6 text-primary" />
        <span className="font-bold text-lg">AI Toolkit Pro</span>
      </Link>
      
      <div className="flex items-center gap-2">
        <SearchDialog />
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
            </Button>
            </SheetTrigger>
            <SheetContent 
            side="right" 
            className="w-[300px]"
            >
            <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-3">
                <Link onClick={handleLinkClick} href="/tools" className="block p-3 text-base font-medium rounded-lg border border-border bg-card hover:border-primary transition-all duration-300">
                All Tools
                </Link>
                <Link onClick={handleLinkClick} href="/about" className="block p-3 text-base font-medium rounded-lg border border-border bg-card hover:border-primary transition-all duration-300">
                About
                </Link>
                <Link onClick={handleLinkClick} href="/privacy-policy" className="block p-3 text-base font-medium rounded-lg border border-border bg-card hover:border-primary transition-all duration-300">
                Privacy Policy
                </Link>
                <Link onClick={handleLinkClick} href="/terms-and-conditions" className="block p-3 text-base font-medium rounded-lg border border-border bg-card hover:border-primary transition-all duration-300">
                Terms & Conditions
                </Link>
                <Link onClick={handleLinkClick} href="/contact" className="block p-3 text-base font-medium rounded-lg border border-border bg-card hover:border-primary transition-all duration-300">
                Contact Us
                </Link>
                <Link onClick={handleLinkClick} href="/copyright-disclaimer" className="block p-3 text-base font-medium rounded-lg border border-border bg-card hover:border-primary transition-all duration-300">
                Copyright Disclaimer
                </Link>
            </nav>
            </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
