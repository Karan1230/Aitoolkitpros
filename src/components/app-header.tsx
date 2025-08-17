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

export function AppHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur-sm">
      <Link href="/" className="flex items-center gap-2">
        <Logo className="h-6 w-6 text-primary" />
        <span className="font-bold text-lg">AI Toolkit Pro</span>
      </Link>
      
      <Sheet>
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
            <Link href="/tools" className="text-lg font-medium hover:text-primary">
              All Tools
            </Link>
            <Link href="/about" className="text-lg font-medium hover:text-primary">
              About
            </Link>
            <Link href="/privacy-policy" className="text-lg font-medium hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="text-lg font-medium hover:text-primary">
              Terms & Conditions
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
