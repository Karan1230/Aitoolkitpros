'use client';

import React from 'react';
import { useAuthGuest } from '@/context/auth-guest-context';
import { Button } from '@/components/ui/button';
import { ShieldCheck, User, LogOut, Clock, Sparkles } from 'lucide-react';
import Link from 'next/link';

// Minimal Google G icon
function GoogleIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

export function GuestTrialBar() {
  const {
    user,
    isAdmin,
    savedGenerations,
    openAuthModal,
    openHistoryModal,
    logout,
  } = useAuthGuest();

  if (user) {
    return (
      <div className="flex items-center gap-1.5 sm:gap-2">
        {isAdmin && (
          <Link href="/admin" className="hidden md:inline-flex">
            <Button
              size="sm"
              variant="outline"
              className="h-8 gap-1 border-amber-500/40 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 text-xs font-semibold"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Admin</span>
            </Button>
          </Link>
        )}

        {/* Saved Content & History Trigger */}
        <Button
          size="sm"
          variant="outline"
          onClick={openHistoryModal}
          className="h-8 gap-1.5 text-xs font-medium border-border/80 hover:border-primary/40 bg-card hover:bg-accent/40 shadow-2xs"
          title="View saved AI history and generated content"
        >
          <Clock className="h-3.5 w-3.5 text-primary" />
          <span className="hidden sm:inline">Saved History</span>
          <span className="bg-primary/10 text-primary px-1.5 py-0.2 rounded-full text-[10px] font-bold">
            {savedGenerations.length}
          </span>
        </Button>

        {/* User Profile Capsule */}
        <div className="flex items-center gap-1.5 bg-muted/60 pl-1.5 pr-2 py-1 rounded-full text-xs border border-border">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.name}
              className="h-5 w-5 rounded-full object-cover border border-primary/30"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="p-1 rounded-full bg-primary/10 text-primary">
              <User className="h-3 w-3" />
            </span>
          )}
          <span className="max-w-[80px] sm:max-w-[120px] truncate font-semibold text-foreground text-xs">
            {user.name}
          </span>
          <button
            onClick={() => logout()}
            title="Sign out"
            className="ml-1 text-muted-foreground hover:text-destructive transition-colors p-0.5"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // Guest State - Prominent Google Sign-In with 1-click
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => openAuthModal('login')}
        className="h-8 text-xs font-semibold gap-1.5 border-border/80 hover:border-primary/40 bg-card text-foreground shadow-2xs"
      >
        <GoogleIcon className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Sign in with Google</span>
        <span className="inline sm:hidden">Sign In</span>
      </Button>

      <Button
        size="sm"
        onClick={() => openAuthModal('register')}
        className="h-8 text-xs font-semibold gap-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-xs hidden sm:inline-flex"
      >
        <Sparkles className="h-3.5 w-3.5" />
        <span>Save AI Data</span>
      </Button>
    </div>
  );
}
