
"use client";

import Link from "next/link";
import { Menu, Search, Star } from "lucide-react";
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { allTools } from "@/lib/tools";
import { ScrollArea } from "./ui/scroll-area";
import { UserNav } from "./user-nav";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

function SearchDialog() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const filteredTools = allTools.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleLinkClick = () => {
        setIsOpen(false);
        setSearchQuery('');
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button
                variant="outline"
                className="justify-start text-muted-foreground w-full md:w-auto"
                onClick={() => setIsOpen(true)}
            >
                <Search className="h-5 w-5 mr-2" />
                <span className="hidden md:inline-block">Search tools...</span>
                <span className="inline-block md:hidden">Search...</span>
            </Button>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Search Tools</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <Input
                        placeholder="Type to search for a tool..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                    />
                    <ScrollArea className="h-72 mt-4">
                        <div className="space-y-2">
                        {filteredTools.map(tool => (
                            <Link
                                href={tool.href}
                                key={tool.name}
                                className="block p-3 rounded-md hover:bg-muted"
                                onClick={handleLinkClick}
                            >
                                <div className="font-semibold">{tool.name}</div>
                                <p className="text-sm text-muted-foreground">{tool.description}</p>
                            </Link>
                        ))}
                        </div>
                         {filteredTools.length === 0 && (
                            <div className="text-center py-10 text-muted-foreground">
                                No tools found for "{searchQuery}"
                            </div>
                        )}
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        setIsLoading(false);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase.auth]);
  
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-border/40 bg-muted/40 px-4 backdrop-blur-sm">
      <Link href="/" className="flex items-center gap-2">
        <Logo className="h-6 w-6 text-primary" />
        <span className="font-bold text-lg hidden sm:inline-block">AI Toolkit Pro</span>
      </Link>
      
      <div className="flex items-center gap-2">
        <div className="hidden md:block">
            <SearchDialog />
        </div>
        
        {!isLoading && (
            user ? <UserNav user={user} /> : 
            <Button asChild>
                <Link href="/login">Login</Link>
            </Button>
        )}
        
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-[300px] flex flex-col md:hidden"
            >
              <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
               <div className="mt-4">
                 <SearchDialog />
               </div>
              <div className="flex-grow">
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
              </div>
              <div className="mt-auto text-center text-xs text-muted-foreground space-y-2">
                  <div className="flex items-center justify-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400"/>
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400"/>
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400"/>
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400"/>
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400"/>
                  </div>
                  <p>Rated 4.9/5 by 1,000+ users</p>
                  <p>Developed by Sharthaksoftech</p>
                  <p>&copy; {new Date().getFullYear()} AI Toolkit Pro. All rights reserved.</p>
              </div>
            </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
