'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Search,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  PenTool,
  TrendingUp,
  Sparkles,
  Layers,
  Users,
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlogPost, SeoSettings } from '@/lib/storage-types';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [seo, setSeo] = useState<SeoSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [statsRes, postsRes, seoRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/blog?includeDrafts=true'),
        fetch('/api/admin/seo')
      ]);

      const statsData = await statsRes.json();
      const postsData = await postsRes.json();
      const seoData = await seoRes.json();

      if (statsData.success) setStats(statsData.stats);
      if (postsData.success) setPosts(postsData.posts);
      if (seoData.success) setSeo(seoData.settings);
    } catch (err) {
      console.error('Failed to load admin stats:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setPosts(posts.filter(p => p.id !== id));
        fetchData();
      }
    } catch (e) {
      alert('Failed to delete post');
    }
  };

  const handleToggleStatus = async (post: BlogPost) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch(`/api/blog/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setPosts(posts.map(p => p.id === post.id ? { ...p, status: newStatus } : p));
      }
    } catch (e) {
      alert('Failed to update status');
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-3" />
        <p className="text-xs text-muted-foreground">Loading dashboard analytics...</p>
      </div>
    );
  }

  const publishedCount = posts.filter(p => p.status === 'published').length;
  const draftCount = posts.filter(p => p.status === 'draft').length;

  return (
    <div className="space-y-8">
      {/* Top Welcome & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Admin Overview</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manage your SEO-optimized blog posts, metadata settings, and user guest trials.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/blog/new">
            <Button size="sm" className="gap-1.5 font-semibold shadow-sm">
              <Plus className="h-4 w-4" />
              <span>Write Blog Post</span>
            </Button>
          </Link>
          <Link href="/admin/seo">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Search className="h-3.5 w-3.5" />
              <span>SEO Settings</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-1">
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>Total Blog Articles</span>
            <FileText className="h-4 w-4 text-primary" />
          </div>
          <div className="text-2xl font-extrabold">{posts.length}</div>
          <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 pt-1">
            <span className="text-emerald-500 font-semibold">{publishedCount} live</span>
            <span>•</span>
            <span className="text-amber-500 font-semibold">{draftCount} drafts</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-1">
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>SEO Health Score</span>
            <Search className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {stats?.seoHealthScore || 90}%
          </div>
          <div className="text-[11px] text-emerald-500 flex items-center gap-1 pt-1 font-medium">
            <CheckCircle2 className="h-3 w-3" />
            <span>Search engines indexed</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-1">
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>Guest Free Trial</span>
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold">{stats?.guestTrialMinutes || 60} min</div>
          <div className="text-[11px] text-muted-foreground pt-1">
            Enforced trial limit
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-1">
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>Registered Users</span>
            <Users className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-extrabold">{stats?.totalUsers || 1}</div>
          <div className="text-[11px] text-muted-foreground pt-1">
            Unlimited plan accounts
          </div>
        </div>
      </div>

      {/* SEO Health & Action Card */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-base font-bold flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>SEO Optimization Status & Google Readiness</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Check if your website is configured to maximize organic search rankings on Google, Bing, and Yahoo.
            </p>
          </div>
          <Link href="/admin/seo">
            <Button variant="outline" size="sm" className="text-xs gap-1">
              <span>Manage Meta & Schema</span>
              <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-muted/40 border border-border flex items-center gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <div>
              <div className="font-semibold">Dynamic XML Sitemap</div>
              <div className="text-muted-foreground text-[11px]">Auto-includes blog & tools</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-muted/40 border border-border flex items-center gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <div>
              <div className="font-semibold">Google Search Console Tag</div>
              <div className="text-muted-foreground text-[11px] truncate max-w-[160px]">
                {seo?.searchConsoleId ? 'Configured & Verified' : 'Needs verification'}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-muted/40 border border-border flex items-center gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <div>
              <div className="font-semibold">Schema.org JSON-LD</div>
              <div className="text-muted-foreground text-[11px]">Article & Blog Rich Snippets</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Blog Posts Management Section */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold">Blog Posts Management</h2>
            <p className="text-xs text-muted-foreground">
              Add, edit, publish, and delete SEO-ranking articles with the WordPress-style editor.
            </p>
          </div>
          <Link href="/admin/blog">
            <Button variant="ghost" size="sm" className="text-xs gap-1 text-primary">
              <span>View All ({posts.length})</span>
              <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground font-semibold">
                <th className="pb-3 pl-1">Article Title</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Author</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Published Date</th>
                <th className="pb-3 text-right pr-1">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {posts.slice(0, 5).map((post) => (
                <tr key={post.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-3 pl-1 max-w-[280px]">
                    <div className="font-semibold text-foreground line-clamp-1">{post.title}</div>
                    <div className="text-[11px] text-muted-foreground font-mono truncate">/blog/{post.slug}</div>
                  </td>
                  <td className="py-3">
                    <Badge variant="outline" className="text-[11px]">
                      {post.category}
                    </Badge>
                  </td>
                  <td className="py-3 text-muted-foreground">{post.author}</td>
                  <td className="py-3">
                    <button
                      onClick={() => handleToggleStatus(post)}
                      className="cursor-pointer"
                      title="Click to toggle status"
                    >
                      <Badge className={post.status === 'published' ? 'bg-emerald-600 hover:bg-emerald-700 text-white text-[10px]' : 'bg-amber-500 hover:bg-amber-600 text-white text-[10px]'}>
                        {post.status === 'published' ? 'Published' : 'Draft'}
                      </Badge>
                    </button>
                  </td>
                  <td className="py-3 text-muted-foreground">
                    {new Date(post.datePublished).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="py-3 text-right pr-1 space-x-1">
                    <Link href={`/blog/${post.slug}`} target="_blank">
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" title="View live article">
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                    <Link href={`/admin/blog/edit/${post.id}`}>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-primary hover:bg-primary/10" title="Edit in WordPress Editor">
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeletePost(post.id)}
                      className="h-7 w-7 text-destructive hover:bg-destructive/10"
                      title="Delete post"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
