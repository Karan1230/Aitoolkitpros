'use client';

import React from 'react';
import { useAuthGuest } from '@/context/auth-guest-context';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Sparkles, User, LogOut, BookmarkCheck, UserPlus } from 'lucide-react';
import Link from 'next/link';

export function GuestTrialBar() {
  const {
    user,
    isAdmin,
    savedGenerations,
    openAuthModal,
    logout
  } = useAuthGuest();

  if (user) {
    return (
      <div className="flex items-center gap-2">
        {isAdmin && (
          <Link href="/admin">
            <Button size="sm" variant="outline" className="h-8 gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 text-xs font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Admin Panel</span>
            </Button>
          </Link>
        )}

        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <BookmarkCheck className="h-3.5 w-3.5" />
          <span>Account Active</span>
          {savedGenerations.length > 0 && (
            <span className="bg-emerald-500/20 px-1.5 py-0.2 rounded-full text-[10px] font-bold">
              {savedGenerations.length} saved
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 bg-muted/60 px-2.5 py-1 rounded-full text-xs border border-border">
          <User className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="max-w-[110px] truncate font-semibold text-foreground">{user.name}</span>
          <button
            onClick={() => logout()}
            title="Log out"
            className="ml-1 text-muted-foreground hover:text-destructive transition-colors p-0.5"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // Guest State - 100% Free with optional account creation to save work
  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => openAuthModal('login')}
        className="h-8 text-xs font-medium text-muted-foreground hover:text-foreground hidden sm:inline-flex"
      >
        Sign In
      </Button>

      <Button
        size="sm"
        onClick={() => openAuthModal('register')}
        className="h-8 text-xs font-semibold gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
      >
        <UserPlus className="h-3.5 w-3.5" />
        <span>Create Free Account</span>
      </Button>
    </div>
  );
}

