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
import { Sparkles, CheckCircle2, User, Lock, ArrowRight, AlertCircle, BookmarkCheck } from 'lucide-react';

export function AuthModal() {
  const {
    isAuthModalOpen,
    authModalMode,
    closeAuthModal,
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

  // Sync mode changes
  React.useEffect(() => {
    if (authModalMode === 'login') setActiveTab('login');
    else setActiveTab('register');
    setError(null);
  }, [authModalMode, isAuthModalOpen]);

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
                Free User Account
              </span>
            </div>
            <span className="text-xs font-medium bg-black/20 px-2.5 py-1 rounded-full text-white/90">
              100% Free Forever
            </span>
          </div>

          <DialogTitle className="text-xl font-bold mt-3 text-white">
            {activeTab === 'register'
              ? 'Create Your Free Account'
              : 'Welcome Back – Sign In'}
          </DialogTitle>
          <DialogDescription className="text-white/80 text-xs mt-1">
            {activeTab === 'register'
              ? 'Create an account to securely save your AI generated tools data, prompt history, and favorites across sessions.'
              : 'Sign in to access your saved AI generations and tools history.'}
          </DialogDescription>
        </div>

        {/* Benefits Checklist */}
        <div className="bg-muted/40 px-6 py-3 border-b border-border text-xs flex flex-wrap gap-x-4 gap-y-1">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <BookmarkCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span>Save all generated data</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span>Free unlimited tool usage</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span>No credit card required</span>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-border bg-muted/20">
          <button
            type="button"
            onClick={() => { setActiveTab('register'); setError(null); }}
            className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-colors ${
              activeTab === 'register'
                ? 'border-primary text-primary bg-background'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Create Free Account
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('login'); setError(null); }}
            className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-colors ${
              activeTab === 'login'
                ? 'border-primary text-primary bg-background'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            User Sign In
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 text-xs rounded-lg bg-destructive/10 text-destructive border border-destructive/20 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="reg-name" className="text-xs">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="reg-name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-9 text-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="reg-email" className="text-xs">Email Address</Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-sm"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="reg-password" className="text-xs">Create Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="reg-password"
                    type="password"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 text-sm"
                    minLength={6}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full font-semibold" disabled={isSubmitting}>
                {isSubmitting ? 'Creating account...' : 'Create Account & Save My Data'}
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </form>
          )}

          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="login-email" className="text-xs">Email Address</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-sm"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="login-password" className="text-xs">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 text-sm"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full font-semibold" disabled={isSubmitting}>
                {isSubmitting ? 'Signing in...' : 'Sign In to Account'}
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </form>
          )}

          {/* Bottom Actions */}
          <div className="mt-5 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <button
              type="button"
              onClick={closeAuthModal}
              className="hover:underline text-muted-foreground"
            >
              Continue as Guest (without saving)
            </button>

            <button
              type="button"
              onClick={() => {
                if (activeTab === 'register') setActiveTab('login');
                else if (activeTab === 'login') setActiveTab('register');
              }}
              className="text-primary hover:underline font-medium ml-auto"
            >
              {activeTab === 'register' ? 'Already registered? Log in' : 'New here? Register free'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

