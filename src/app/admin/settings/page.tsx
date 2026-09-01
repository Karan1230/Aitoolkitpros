'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  CheckCircle2,
  AlertCircle,
  Key,
  Megaphone,
  Mail,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SiteSettings, INITIAL_SITE_SETTINGS } from '@/lib/storage-types';

export default function AdminSettingsPage() {
  const [site, setSite] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [siteFeedback, setSiteFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Password change states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [adminName, setAdminName] = useState('');
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [passFeedback, setPassFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/admin/site');
        const data = await res.json();
        if (data.success && data.settings) {
          setSite(data.settings);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSaveSite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSiteFeedback(null);

    try {
      const res = await fetch('/api/admin/site', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(site)
      });
      const data = await res.json();
      setIsSaving(false);

      if (data.success) {
        setSiteFeedback({ type: 'success', message: 'General site settings updated successfully!' });
      } else {
        setSiteFeedback({ type: 'error', message: data.error || 'Failed to update settings' });
      }
    } catch (e: any) {
      setIsSaving(false);
      setSiteFeedback({ type: 'error', message: e.message || 'Connection error' });
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChangingPass(true);
    setPassFeedback(null);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'change-password',
          password: currentPassword,
          newPassword,
          name: adminName
        })
      });
      const data = await res.json();
      setIsChangingPass(false);

      if (data.success) {
        setPassFeedback({ type: 'success', message: 'Admin credentials updated successfully!' });
        setCurrentPassword('');
        setNewPassword('');
      } else {
        setPassFeedback({ type: 'error', message: data.error || 'Failed to update credentials' });
      }
    } catch (e: any) {
      setIsChangingPass(false);
      setPassFeedback({ type: 'error', message: e.message || 'Connection error' });
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="h-7 w-7 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-2" />
        <p className="text-xs text-muted-foreground">Loading site settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Site Settings & Security</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Manage announcements, branding, support information, and admin security credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 1: General Branding & Announcements */}
        <form onSubmit={handleSaveSite} className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Megaphone className="h-5 w-5 text-primary" />
            <h2 className="text-sm font-bold">Announcement Banner & Branding</h2>
          </div>

          {siteFeedback && (
            <div className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
              siteFeedback.type === 'success'
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                : 'bg-destructive/10 text-destructive border border-destructive/20'
            }`}>
              {siteFeedback.type === 'success' ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
              <span>{siteFeedback.message}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="brand-name" className="text-xs">Brand / Platform Name</Label>
            <Input
              id="brand-name"
              value={site.brandName}
              onChange={(e) => setSite({ ...site, brandName: e.target.value })}
              className="text-xs"
              required
            />
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <Label htmlFor="ann-enable" className="cursor-pointer font-semibold">Enable Top Announcement Bar</Label>
            <input
              id="ann-enable"
              type="checkbox"
              checked={site.announcementEnabled}
              onChange={(e) => setSite({ ...site, announcementEnabled: e.target.checked })}
              className="h-4 w-4 rounded text-primary focus:ring-primary"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ann-text" className="text-xs">Announcement Text</Label>
            <Input
              id="ann-text"
              value={site.announcementText}
              onChange={(e) => setSite({ ...site, announcementText: e.target.value })}
              placeholder="🚀 Try our new AI Tools for free!"
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ann-link" className="text-xs">Announcement Link URL</Label>
            <Input
              id="ann-link"
              value={site.announcementLink}
              onChange={(e) => setSite({ ...site, announcementLink: e.target.value })}
              placeholder="/tools"
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="footer-text" className="text-xs">Footer Copyright / Tagline</Label>
            <Textarea
              id="footer-text"
              value={site.footerText}
              onChange={(e) => setSite({ ...site, footerText: e.target.value })}
              rows={2}
              className="text-xs"
            />
          </div>

          <Button type="submit" disabled={isSaving} className="w-full font-semibold text-xs mt-2">
            <Save className="h-3.5 w-3.5 mr-1.5" />
            <span>{isSaving ? 'Saving...' : 'Save Site Settings'}</span>
          </Button>
        </form>

        {/* Module 2: Admin Password & Security */}
        <form onSubmit={handleChangePassword} className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Key className="h-5 w-5 text-amber-500" />
            <h2 className="text-sm font-bold">Admin Security & Credentials</h2>
          </div>

          {passFeedback && (
            <div className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
              passFeedback.type === 'success'
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                : 'bg-destructive/10 text-destructive border border-destructive/20'
            }`}>
              {passFeedback.type === 'success' ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
              <span>{passFeedback.message}</span>
            </div>
          )}

          <div className="p-3 bg-muted/60 rounded-xl text-xs space-y-1 border border-border">
            <div className="font-semibold">Current Default Admin:</div>
            <div className="text-muted-foreground font-mono">admin@aitoolkitpro.com</div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="admin-name" className="text-xs">Admin Display Name</Label>
            <Input
              id="admin-name"
              placeholder="Admin Master"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="current-pass" className="text-xs">Current Password</Label>
            <Input
              id="current-pass"
              type="password"
              placeholder="Current admin password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="text-xs"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="new-pass" className="text-xs">New Secure Password</Label>
            <Input
              id="new-pass"
              type="password"
              placeholder="New password (min. 6 characters)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="text-xs"
              minLength={6}
              required
            />
          </div>

          <Button type="submit" disabled={isChangingPass} variant="default" className="w-full font-semibold text-xs bg-amber-600 hover:bg-amber-700 text-white mt-2">
            <Key className="h-3.5 w-3.5 mr-1.5" />
            <span>{isChangingPass ? 'Updating Credentials...' : 'Update Admin Password'}</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
