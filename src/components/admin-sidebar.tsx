
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Bell,
  Home,
  Users,
  Wrench,
  Settings,
  LineChart,
} from 'lucide-react';
import { Logo } from './icons';
import { cn } from '@/lib/utils';

const navLinks = [
    { href: '/admin/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/admin/tools', icon: Wrench, label: 'Tools Management' },
    { href: '/admin/users', icon: Users, label: 'User Management' },
    { href: '/admin/analytics', icon: LineChart, label: 'Analytics' },
    { href: '/admin/settings', icon: Settings, label: 'App Settings' },
];

export function AdminSidebar() {
    const pathname = usePathname();

    const isActive = (href: string) => {
        return pathname === href || (href !== '/admin/dashboard' && pathname.startsWith(href));
    };

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
            <Logo className="h-6 w-6 text-primary" />
            <span className="">AI Toolkit Pro</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
             {navLinks.map(({ href, icon: Icon, label }) => (
                <Link
                    key={href}
                    href={href}
                    className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        isActive(href) && 'bg-muted text-primary'
                    )}
                >
                    <Icon className="h-4 w-4" />
                    {label}
                </Link>
             ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
