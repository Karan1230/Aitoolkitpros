
"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

export function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur-sm">
      <Link href="/" className="flex items-center gap-2">
        <Logo className="h-6 w-6 text-primary" />
        <span className="font-bold text-lg">AI Toolkit Pro</span>
      </Link>
      
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="mt-8 flex flex-col gap-4">
            <Link onClick={handleLinkClick} href="/tools" className="block p-4 text-lg font-medium rounded-lg border border-border bg-card hover:border-primary transition-all duration-300">
              All Tools
            </Link>
            <Link onClick={handleLinkClick} href="/about" className="block p-4 text-lg font-medium rounded-lg border border-border bg-card hover:border-primary transition-all duration-300">
              About
            </Link>
            <Link onClick={handleLinkClick} href="/privacy-policy" className="block p-4 text-lg font-medium rounded-lg border border-border bg-card hover:border-primary transition-all duration-300">
              Privacy Policy
            </Link>
            <Link onClick={handleLinkClick} href="/terms-and-conditions" className="block p-4 text-lg font-medium rounded-lg border border-border bg-card hover:border-primary transition-all duration-300">
              Terms & Conditions
            </Link>
             <Link onClick={handleLinkClick} href="/contact" className="block p-4 text-lg font-medium rounded-lg border border-border bg-card hover:border-primary transition-all duration-300">
              Contact Us
            </Link>
             <Link onClick={handleLinkClick} href="/copyright-disclaimer" className="block p-4 text-lg font-medium rounded-lg border border-border bg-card hover:border-primary transition-all duration-300">
              Copyright Disclaimer
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
