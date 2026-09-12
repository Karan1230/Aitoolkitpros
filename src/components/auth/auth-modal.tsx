'use client';

import React, { useState } from 'react';
import { useAuthGuest } from '@/context/auth-guest-context';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, CheckCircle2, User, Lock, ArrowRight, AlertCircle, BookmarkCheck, Loader2 } from 'lucide-react';

// Official Google G icon SVG
function GoogleIcon({ className = "h-4 w-4" }: { className?: string }) {
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

export function AuthModal() {
  const {
    isAuthModalOpen,
    authModalMode,
    closeAuthModal,
    signInWithGoogle,
    login,
    register,
  } = useAuthGuest();

  const [activeTab, setActiveTab] = useState<'register' | 'login'>(
    authModalMode === 'login' ? 'login' : 'register'
  );

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Sync mode changes
  React.useEffect(() => {
    if (authModalMode === 'login') setActiveTab('login');
    else setActiveTab('register');
    setError(null);
  }, [authModalMode, isAuthModalOpen]);

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsGoogleLoading(true);
    const res = await signInWithGoogle();
    setIsGoogleLoading(false);

    if (!res.success) {
      setError(res.error || 'Failed to sign in with Google');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const res = await register(name, email, password);
    setIsSubmitting(false);

    if (!res.success) {
      setError(res.error || 'Failed to create account');
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const res = await login(email, password);
    setIsSubmitting(false);

    if (!res.success) {
      setError(res.error || 'Invalid email or password');
    }
  };

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={(open) => !open && closeAuthModal()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-border bg-card shadow-2xl">
        {/* Top Header Banner */}
        <div className="p-6 text-white bg-gradient-to-r from-primary via-indigo-600 to-violet-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-white/10 backdrop-blur-md rounded-lg">
                <Sparkles className="h-5 w-5 text-yellow-300" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                Cloud Sync Enabled
              </span>
            </div>
            <span className="text-xs font-medium bg-black/20 px-2.5 py-1 rounded-full text-white/90">
              100% Free Forever
            </span>
          </div>

          <DialogTitle className="text-xl font-bold mt-3 text-white">
            {activeTab === 'register'
              ? 'Save Your AI Tools & History'
              : 'Welcome Back – Sign In'}
          </DialogTitle>
          <DialogDescription className="text-white/80 text-xs mt-1">
            Sign in with Google to automatically back up your prompts, generated images, scripts, and tool outputs in real-time.
          </DialogDescription>
        </div>

        {/* Benefits Checklist */}
        <div className="bg-muted/40 px-6 py-3 border-b border-border text-xs flex flex-wrap gap-x-4 gap-y-1">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <BookmarkCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span>Persistent history across devices</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span>Instant 1-Click Google Sign-In</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span>Zero subscription or credit card</span>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="p-3 text-xs rounded-lg bg-destructive/10 text-destructive border border-destructive/20 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Seamless Google Sign In Button */}
          <div className="space-y-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading || isSubmitting}
              className="w-full h-11 border-border/80 hover:bg-muted/60 font-semibold gap-3 text-sm shadow-xs transition-all relative overflow-hidden"
            >
              {isGoogleLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span>Connecting to Google...</span>
                </>
              ) : (
                <>
                  <GoogleIcon className="h-4 w-4 shrink-0" />
                  <span>Continue with Google</span>
                </>
              )}
            </Button>
            <p className="text-[11px] text-center text-muted-foreground">
              Instant access • Safely secured with Firebase Authentication
            </p>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-border"></div>
            <span className="flex-shrink mx-3 text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
              Or with email
            </span>
            <div className="flex-grow border-t border-border"></div>
          </div>

          {/* Tab Selector */}
          <div className="flex border-b border-border bg-muted/20 rounded-md p-1">
            <button
              type="button"
              onClick={() => { setActiveTab('register'); setError(null); }}
              className={`flex-1 py-1.5 text-xs font-semibold text-center rounded transition-colors ${
                activeTab === 'register'
                  ? 'bg-background shadow-xs text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Register with Email
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('login'); setError(null); }}
              className={`flex-1 py-1.5 text-xs font-semibold text-center rounded transition-colors ${
                activeTab === 'login'
                  ? 'bg-background shadow-xs text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Email Login
            </button>
          </div>

          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3 pt-1">
              <div className="space-y-1">
                <Label htmlFor="reg-name" className="text-xs">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="reg-name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-9 text-sm h-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="reg-email" className="text-xs">Email Address</Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-sm h-9"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="reg-password" className="text-xs">Create Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="reg-password"
                    type="password"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 text-sm h-9"
                    minLength={6}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full font-semibold h-9 mt-2" disabled={isSubmitting || isGoogleLoading}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Free Account
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </>
                )}
              </Button>
            </form>
          )}

          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-3 pt-1">
              <div className="space-y-1">
                <Label htmlFor="login-email" className="text-xs">Email Address</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-sm h-9"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="login-password" className="text-xs">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 text-sm h-9"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full font-semibold h-9 mt-2" disabled={isSubmitting || isGoogleLoading}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In with Email
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </>
                )}
              </Button>
            </form>
          )}

          {/* Bottom Actions */}
          <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <button
              type="button"
              onClick={closeAuthModal}
              className="hover:underline text-muted-foreground"
            >
              Continue without signing in
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
