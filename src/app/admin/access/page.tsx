'use client';

import React, { useState, useEffect } from 'react';
import {
  Clock,
  ShieldCheck,
  Save,
  CheckCircle2,
  AlertCircle,
  Users,
  Lock,
  RefreshCw,
  UserCheck,
  Key
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { AccessSettings, UserAccount } from '@/lib/storage-types';

export default function AdminAccessPage() {
  const [access, setAccess] = useState<AccessSettings>({
    guestTrialMinutes: 60,
    guestModeEnabled: true,
    enforceTrialLock: true,
    lockTitle: 'Your 1-Hour Free Guest Trial Has Ended',
    lockDescription: 'You have enjoyed 60 minutes of free AI tools access. To continue generating unlimited content with no restrictions, please create a free account or log in below.',
    allowTrialResetForTesting: true
  });
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const loadData = async () => {
    try {
      const res = await fetch('/api/admin/access');
      const data = await res.json();
      if (data.success && data.settings) {
        setAccess(data.settings);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/admin/access', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(access)
      });
      const data = await res.json();
      setIsSaving(false);

      if (data.success) {
        setFeedback({ type: 'success', message: 'Guest trial and access restrictions updated successfully!' });
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to update access settings' });
      }
    } catch (err: any) {
      setIsSaving(false);
      setFeedback({ type: 'error', message: err.message || 'Connection error' });
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="h-7 w-7 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-2" />
        <p className="text-xs text-muted-foreground">Loading access controls...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">User Access & Account Rules</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Configure free guest permissions, user account benefits, and registration rules.
          </p>
        </div>

        <Button
          type="submit"
          disabled={isSaving}
          className="gap-2 font-semibold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
        >
          <Save className="h-3.5 w-3.5" />
          <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
        </Button>
      </div>

      {feedback && (
        <div className={`p-4 rounded-xl text-xs flex items-center gap-2 ${
          feedback.type === 'success'
            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
            : 'bg-destructive/10 text-destructive border border-destructive/20'
        }`}>
          {feedback.type === 'success' ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 1: 1-Hour Guest Countdown Configuration */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Clock className="h-5 w-5 text-amber-500" />
            <h2 className="text-sm font-bold">1-Hour Guest Trial Timer Settings</h2>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="trial-mins" className="text-xs font-semibold">
              Guest Trial Duration (in Minutes)
            </Label>
            <div className="flex items-center gap-3">
              <Input
                id="trial-mins"
                type="number"
                min={1}
                max={1440}
                value={access.guestTrialMinutes}
                onChange={(e) => setAccess({ ...access, guestTrialMinutes: parseInt(e.target.value, 10) || 60 })}
                className="text-sm font-bold w-32"
                required
              />
              <span className="text-xs text-muted-foreground">
                ({access.guestTrialMinutes} minutes = {(access.guestTrialMinutes / 60).toFixed(1)} hours)
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              When visitors land on your site without an account, they can use all AI tools freely for this duration.
            </p>
          </div>

          <div className="pt-2 space-y-3 border-t border-border">
            <div className="flex items-center justify-between text-xs">
              <div>
                <Label htmlFor="guest-enabled" className="cursor-pointer font-semibold block">Allow Guest Access without Login</Label>
                <span className="text-[11px] text-muted-foreground">If enabled, users can explore without logging in first.</span>
              </div>
              <input
                id="guest-enabled"
                type="checkbox"
                checked={access.guestModeEnabled}
                onChange={(e) => setAccess({ ...access, guestModeEnabled: e.target.checked })}
                className="h-4 w-4 rounded text-primary focus:ring-primary"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <div>
                <Label htmlFor="enforce-lock" className="cursor-pointer font-semibold block">Enforce Modal Lock after Trial Expires</Label>
                <span className="text-[11px] text-muted-foreground">Pop up account creation screen once trial ends.</span>
              </div>
              <input
                id="enforce-lock"
                type="checkbox"
                checked={access.enforceTrialLock}
                onChange={(e) => setAccess({ ...access, enforceTrialLock: e.target.checked })}
                className="h-4 w-4 rounded text-primary focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Module 2: Lock Modal Customization */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Lock className="h-5 w-5 text-primary" />
            <h2 className="text-sm font-bold">Lock Screen & Expiration Messaging</h2>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="lock-title" className="text-xs">Lock Modal Headline</Label>
            <Input
              id="lock-title"
              value={access.lockTitle}
              onChange={(e) => setAccess({ ...access, lockTitle: e.target.value })}
              className="text-xs"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="lock-desc" className="text-xs">Lock Modal Message</Label>
            <Textarea
              id="lock-desc"
              value={access.lockDescription}
              onChange={(e) => setAccess({ ...access, lockDescription: e.target.value })}
              rows={4}
              className="text-xs"
              required
            />
          </div>

          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs space-y-1 text-amber-700 dark:text-amber-300">
            <div className="font-semibold flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              <span>Conversion Booster Active</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Users who register get instant unlimited access and their trial restrictions are permanently removed.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
