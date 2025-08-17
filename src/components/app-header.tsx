
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
  SheetOverlay,
  SheetClose
} from "@/components/ui/sheet";
import { useState, useRef, TouchEvent } from "react";

export function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const sheetContentRef = useRef<HTMLDivElement>(null);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!touchStartRef.current) return;

    const touch = e.touches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    
    // Prioritize vertical scroll
    if (Math.abs(dy) > Math.abs(dx)) {
        touchStartRef.current = null;
        return;
    }
    
    // Swipe right to close
    if (isMenuOpen && dx > 50) {
      const duration = Date.now() - touchStartRef.current.time;
      if (duration < 500) {
        setIsMenuOpen(false);
        touchStartRef.current = null;
      }
    }
  };
  
   const handleGlobalTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
     // Only trigger for swipes starting from the right edge of the screen
    if (touch.clientX > window.innerWidth - 40) {
        touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
    } else {
        touchStartRef.current = null;
    }
  };

  const handleGlobalTouchMove = (e: TouchEvent) => {
    if (!touchStartRef.current) return;

    const touch = e.touches[0];
    const dx = touch.clientX - touchStartRef.current.x;

    // Swipe left to open
    if (!isMenuOpen && dx < -50) {
        const duration = Date.now() - touchStartRef.current.time;
        if (duration < 500) {
            setIsMenuOpen(true);
            touchStartRef.current = null;
        }
    }
  };


  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur-sm"
      onTouchStartCapture={handleGlobalTouchStart}
      onTouchMoveCapture={handleGlobalTouchMove}
    >
      <Link href="/" className="flex items-center gap-2">
        <Logo className="h-6 w-6 text-primary" />
        <span className="font-bold text-lg">AI Toolkit Pro</span>
      </Link>
      
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent 
          ref={sheetContentRef}
          side="right" 
          className="w-[300px]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
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
