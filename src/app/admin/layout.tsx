'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  PenTool,
  Search,
  Sliders,
  Clock,
  Settings,
  Globe,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  ExternalLink,
  Sparkles,
  User,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<{ name: string; email: string } | null>(null);

  // Login form states if unauthenticated
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    async function checkAdminAuth() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.success && data.authenticated && data.user?.role === 'admin') {
          setIsAuthenticated(true);
          setAdminUser(data.user);
        } else {
          // If in local storage or cookie, check fallback
          const localAuth = localStorage.getItem('admin_authenticated');
          if (localAuth === 'true') {
            setIsAuthenticated(true);
            setAdminUser({ name: 'Admin Master', email: 'admin@aitoolkitpro.com' });
          } else {
            setIsAuthenticated(false);
          }
        }
      } catch (e) {
        setIsAuthenticated(false);
      }
    }
    checkAdminAuth();
  }, []);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail || 'admin@aitoolkitpro.com', password: loginPassword })
      });
      const data = await res.json();
      setIsLoggingIn(false);

      if (data.success) {
        localStorage.setItem('admin_authenticated', 'true');
        setIsAuthenticated(true);
        setAdminUser(data.user || { name: 'Admin Master', email: 'admin@aitoolkitpro.com' });
        router.refresh();
      } else {
        setLoginError(data.error || 'Invalid admin credentials');
      }
    } catch (err: any) {
      setIsLoggingIn(false);
      setLoginError(err.message || 'Failed to connect');
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('admin_authenticated');
    await fetch('/api/auth/me', { method: 'POST' });
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'All Blog Posts', href: '/admin/blog', icon: FileText },
    { label: 'Add New Post', href: '/admin/blog/new', icon: PenTool },
    { label: 'SEO & Metadata', href: '/admin/seo', icon: Search },
    { label: 'Access & User Rules', href: '/admin/access', icon: Clock },
    { label: 'Site Settings', href: '/admin/settings', icon: Settings },
  ];

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground">Loading Admin Control Panel...</p>
        </div>
      </div>
    );
  }

  // Admin Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <head>
          <meta name="robots" content="noindex, nofollow" />
        </head>
        <div className="w-full max-w-md bg-card rounded-2xl border border-border p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl border border-amber-500/20">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Portal</h1>
            <p className="text-xs text-muted-foreground">
              Sign in to manage blog posts, SEO metadata, and site configurations.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-xs border border-destructive/20">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="admin-email" className="text-xs font-medium">Admin Email / Username</Label>
              <Input
                id="admin-email"
                type="text"
                placeholder="Enter admin email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="text-sm"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="admin-pass" className="text-xs font-medium">Password</Label>
              <Input
                id="admin-pass"
                type="password"
                placeholder="Enter admin password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="text-sm"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? 'Authenticating...' : 'Sign In to Admin Panel'}
            </Button>
          </form>

          <div className="pt-2 text-center">
            <Link href="/" className="text-xs text-muted-foreground hover:text-primary hover:underline">
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-amber-500" />
          <span className="font-bold text-sm">AI Toolkit Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border flex flex-col justify-between transition-transform duration-200 ease-in-out md:translate-x-0 md:static
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 space-y-6">
          {/* Logo / Title */}
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-sm block">Admin Portal</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">WordPress Style</span>
              </div>
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/80'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border space-y-3 bg-muted/20">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center font-bold text-xs">
                A
              </div>
              <div className="truncate max-w-[110px]">
                <div className="font-semibold text-foreground truncate text-[11px]">{adminUser?.name || 'Administrator'}</div>
                <div className="text-[10px] text-muted-foreground truncate">{adminUser?.email}</div>
              </div>
            </div>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2">
            <Link href="/" target="_blank" className="flex-1">
              <Button variant="outline" size="sm" className="w-full text-[11px] h-8 gap-1">
                <span>View Site</span>
                <ExternalLink className="h-3 w-3" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="h-8 px-2.5 text-muted-foreground hover:text-destructive text-[11px]"
              title="Log Out"
            >
              <LogOut className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content View */}
      <main className="flex-1 min-w-0 overflow-y-auto bg-background/50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
