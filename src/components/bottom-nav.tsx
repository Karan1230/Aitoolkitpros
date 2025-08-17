"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wrench, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Tools', href: '/tools', icon: Wrench },
  { name: 'Favorites', href: '/favorites', icon: Heart },
  { name: 'Profile', href: '/profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-20 bg-secondary/80 backdrop-blur-lg border-t">
      <nav className="grid h-full grid-cols-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center justify-center gap-1 text-muted-foreground"
          >
            <div className={cn(
              "p-3 rounded-full transition-all duration-300",
              pathname === item.href ? "bg-primary text-primary-foreground" : ""
            )}>
              <item.icon className="h-6 w-6" />
            </div>
            <span className={cn(
              "text-xs font-medium",
               pathname === item.href ? "text-primary" : "text-muted-foreground"
            )}>
              {item.name}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
