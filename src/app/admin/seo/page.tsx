'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Globe,
  Save,
  CheckCircle2,
  AlertCircle,
  Share2,
  FileCode,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Code,
  Layers,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SeoSettings, INITIAL_SEO_SETTINGS } from '@/lib/storage-types';

export default function AdminSeoPage() {
  const [seo, setSeo] = useState<SeoSettings>(INITIAL_SEO_SETTINGS);
  const [keywordsString, setKeywordsString] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    async function loadSeo() {
      try {
        const res = await fetch('/api/admin/seo');
        const data = await res.json();
        if (data.success && data.settings) {
          setSeo(data.settings);
          setKeywordsString(data.settings.keywords?.join(', ') || '');
        }
      } catch (err) {
        console.error('Failed to load SEO settings', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadSeo();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedback(null);

    const payload: SeoSettings = {
      ...seo,
      keywords: keywordsString.split(',').map(k => k.trim()).filter(Boolean)
    };

    try {
      const res = await fetch('/api/admin/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      setIsSaving(false);

      if (data.success) {
        setFeedback({ type: 'success', message: 'SEO & Metadata settings successfully saved and applied to all pages!' });
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to update SEO settings' });
      }
    } catch (e: any) {
      setIsSaving(false);
      setFeedback({ type: 'error', message: e.message || 'Connection error' });
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="h-7 w-7 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-2" />
        <p className="text-xs text-muted-foreground">Loading SEO configurations...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Global SEO & Meta Control Center</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Configure site titles, meta descriptions, Google Search Console, Social Sharing (OpenGraph), and structured schema.
          </p>
        </div>

        <Button
          type="submit"
          disabled={isSaving}
          className="gap-2 font-semibold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
        >
          <Save className="h-3.5 w-3.5" />
          <span>{isSaving ? 'Saving...' : 'Save All SEO Settings'}</span>
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

      {/* Grid of SEO Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 1: General Meta Tags */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Globe className="h-5 w-5 text-primary" />
            <h2 className="text-sm font-bold">General Search Engine Meta Tags</h2>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <Label htmlFor="site-title">Global Site Title</Label>
              <span className="text-muted-foreground text-[10px]">{seo.siteTitle.length}/60</span>
            </div>
            <Input
              id="site-title"
              value={seo.siteTitle}
              onChange={(e) => setSeo({ ...seo, siteTitle: e.target.value })}
              className="text-xs"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="title-template" className="text-xs">Title Template</Label>
            <Input
              id="title-template"
              value={seo.titleTemplate}
              onChange={(e) => setSeo({ ...seo, titleTemplate: e.target.value })}
              placeholder="%s | AI Toolkit Pro"
              className="text-xs font-mono"
            />
            <span className="text-[10px] text-muted-foreground">Use <code>%s</code> as placeholder for page-specific titles.</span>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <Label htmlFor="site-desc">Meta Description</Label>
              <span className={`text-[10px] ${seo.siteDescription.length >= 120 && seo.siteDescription.length <= 160 ? 'text-emerald-500 font-bold' : 'text-muted-foreground'}`}>
                {seo.siteDescription.length}/160 chars (Recommended: 130-160)
              </span>
            </div>
            <Textarea
              id="site-desc"
              value={seo.siteDescription}
              onChange={(e) => setSeo({ ...seo, siteDescription: e.target.value })}
              rows={3}
              className="text-xs"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="keywords" className="text-xs">Global Meta Keywords (comma-separated)</Label>
            <Textarea
              id="keywords"
              value={keywordsString}
              onChange={(e) => setKeywordsString(e.target.value)}
              rows={2}
              className="text-xs"
            />
          </div>
        </div>

        {/* Module 2: OpenGraph & Social Sharing */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Share2 className="h-5 w-5 text-indigo-500" />
            <h2 className="text-sm font-bold">OpenGraph & Social Sharing (WhatsApp, Twitter, LinkedIn)</h2>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="og-image" className="text-xs">Default OpenGraph Share Image URL</Label>
            <Input
              id="og-image"
              value={seo.ogImageUrl}
              onChange={(e) => setSeo({ ...seo, ogImageUrl: e.target.value })}
              placeholder="https://aitoolkitpro.netlify.app/og-image.jpg"
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="twitter-handle" className="text-xs">Twitter / X Handle</Label>
            <Input
              id="twitter-handle"
              value={seo.twitterHandle}
              onChange={(e) => setSeo({ ...seo, twitterHandle: e.target.value })}
              placeholder="@AIToolkitPro"
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="canonical-url" className="text-xs">Canonical Base URL</Label>
            <Input
              id="canonical-url"
              value={seo.canonicalUrl}
              onChange={(e) => setSeo({ ...seo, canonicalUrl: e.target.value })}
              placeholder="https://aitoolkitpro.netlify.app"
              className="text-xs font-mono"
            />
          </div>

          {/* Social Card Live Preview */}
          <div className="p-3 bg-muted/40 rounded-xl border border-border space-y-1.5 text-xs">
            <div className="text-[10px] font-semibold uppercase text-muted-foreground">Social Card Simulation</div>
            <div className="font-bold truncate">{seo.siteTitle}</div>
            <div className="text-muted-foreground text-[11px] line-clamp-2">{seo.siteDescription}</div>
            <div className="text-[10px] text-primary font-mono truncate">{seo.canonicalUrl}</div>
          </div>
        </div>

        {/* Module 3: Webmaster Tools & Verification */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            <h2 className="text-sm font-bold">Google Webmaster & Verification</h2>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="gsc-id" className="text-xs">Google Search Console Verification Code</Label>
            <Input
              id="gsc-id"
              value={seo.searchConsoleId}
              onChange={(e) => setSeo({ ...seo, searchConsoleId: e.target.value })}
              placeholder="O53X2mdbJz3WwgeqtSsvQVCGlo5jYyvjVrckboIfecg"
              className="text-xs font-mono"
            />
            <p className="text-[10px] text-muted-foreground">
              Automatically injected into <code>&lt;meta name="google-site-verification"&gt;</code> tag.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ga-id" className="text-xs">Google Analytics Measurement ID (GA4)</Label>
            <Input
              id="ga-id"
              value={seo.googleAnalyticsId}
              onChange={(e) => setSeo({ ...seo, googleAnalyticsId: e.target.value })}
              placeholder="G-XXXXXXXXXX"
              className="text-xs font-mono"
            />
          </div>

          <div className="pt-2 space-y-2 border-t border-border">
            <div className="flex items-center justify-between text-xs">
              <Label htmlFor="robots-index" className="cursor-pointer font-medium">Allow Googlebot Indexing (index)</Label>
              <input
                id="robots-index"
                type="checkbox"
                checked={seo.enableRobotsIndex}
                onChange={(e) => setSeo({ ...seo, enableRobotsIndex: e.target.checked })}
                className="h-4 w-4 rounded text-primary focus:ring-primary"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <Label htmlFor="robots-follow" className="cursor-pointer font-medium">Allow Link Following (follow)</Label>
              <input
                id="robots-follow"
                type="checkbox"
                checked={seo.enableRobotsFollow}
                onChange={(e) => setSeo({ ...seo, enableRobotsFollow: e.target.checked })}
                className="h-4 w-4 rounded text-primary focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Module 4: Custom Tracking & Schema.org */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Code className="h-5 w-5 text-amber-500" />
            <h2 className="text-sm font-bold">Custom Header / Footer Scripts & Ads</h2>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="org-name" className="text-xs">Organization / Publisher Name</Label>
            <Input
              id="org-name"
              value={seo.organizationName}
              onChange={(e) => setSeo({ ...seo, organizationName: e.target.value })}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="custom-head" className="text-xs">Custom &lt;head&gt; Code (AdSense, Pixels, Verification)</Label>
            <Textarea
              id="custom-head"
              value={seo.customHeaderScript || ''}
              onChange={(e) => setSeo({ ...seo, customHeaderScript: e.target.value })}
              placeholder="<!-- Google AdSense or Meta Pixel -->"
              rows={3}
              className="text-xs font-mono"
            />
          </div>

          <div className="p-3 bg-primary/5 rounded-xl border border-primary/20 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Dynamic XML Sitemap Link</span>
            </div>
            <a href="/sitemap.xml" target="_blank" className="text-primary hover:underline font-mono flex items-center gap-1 font-semibold">
              /sitemap.xml <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </form>
  );
}
