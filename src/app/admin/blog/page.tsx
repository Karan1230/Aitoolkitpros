'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  ExternalLink,
  Sparkles,
  Clock,
  Tag,
  CheckCircle2,
  Wand2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/lib/storage-types';

export default function AdminBlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const [postToDelete, setPostToDelete] = useState<{ id: string; title: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog?includeDrafts=true');
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const confirmDelete = async () => {
    if (!postToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/blog/${postToDelete.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setPosts(prev => prev.filter(p => p.id !== postToDelete.id && p.slug !== postToDelete.id));
        setFeedback({ type: 'success', message: `Post "${postToDelete.title}" deleted permanently.` });
        setPostToDelete(null);
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to delete post.' });
      }
    } catch (e) {
      setFeedback({ type: 'error', message: 'Failed to delete post. Please try again.' });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleStatus = async (post: BlogPost) => {
    const nextStatus = post.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch(`/api/blog/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      const data = await res.json();
      if (data.success) {
        setPosts(posts.map(p => p.id === post.id ? { ...p, status: nextStatus } : p));
        setFeedback({ type: 'success', message: `Status updated to ${nextStatus === 'published' ? 'Live' : 'Draft'}.` });
      }
    } catch (e) {
      setFeedback({ type: 'error', message: 'Failed to update status' });
    }
  };

  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.slug.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || post.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <span>Blog Articles & Content Manager</span>
            <Badge variant="outline" className="text-primary border-primary/30 bg-primary/10">
              AI Powered
            </Badge>
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Generate, edit, and publish 1500+ word SEO articles with 4 landscape images in 1-click.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/blog/new">
            <Button className="gap-2 font-bold shadow-md bg-primary hover:bg-primary/90 text-primary-foreground">
              <Wand2 className="h-4 w-4" />
              <span>✨ AI 1-Click Writer / Add Post</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="p-4 rounded-2xl border border-border bg-card shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, description or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Status Tabs */}
          <div className="flex rounded-lg border border-border bg-muted/40 p-0.5 text-xs">
            {['All', 'published', 'draft'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1 rounded-md capitalize font-medium transition-colors ${
                  selectedStatus === st
                    ? 'bg-background text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {st === 'published' ? 'Live' : st}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-9 px-3 text-xs rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                Category: {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Posts Table */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-xs text-muted-foreground">
            Loading articles...
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <p className="text-sm font-semibold">No blog posts found.</p>
            <p className="text-xs text-muted-foreground">
              Create your first article or use the AI 1-Click Writer to generate a 1500+ word post!
            </p>
            <Link href="/admin/blog/new">
              <Button size="sm" className="gap-1.5 font-bold">
                <Wand2 className="h-3.5 w-3.5" />
                <span>Launch AI Writer</span>
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                <tr>
                  <th className="p-3.5 pl-4">Article</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">SEO Keywords</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5 pr-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-muted/20 transition-colors">
                    <td className="p-3.5 pl-4 max-w-xs">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-16 shrink-0 rounded-lg overflow-hidden bg-muted border border-border">
                          <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="truncate">
                          <p className="font-bold text-foreground truncate hover:text-primary transition-colors">
                            {post.title}
                          </p>
                          <p className="text-[11px] text-muted-foreground truncate">
                            /{post.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <Badge variant="outline" className="text-[10px]">
                        {post.category}
                      </Badge>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStatus(post)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors ${
                          post.status === 'published'
                            ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-600 border-amber-500/30 hover:bg-amber-500/20'
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${post.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        {post.status === 'published' ? 'Live' : 'Draft'}
                      </button>
                    </td>
                    <td className="p-3.5 text-muted-foreground text-[11px] max-w-[150px] truncate">
                      {post.focusKeywords && post.focusKeywords.length > 0
                        ? post.focusKeywords.join(', ')
                        : post.tags.join(', ')}
                    </td>
                    <td className="p-3.5 text-muted-foreground text-[11px] whitespace-nowrap">
                      {post.datePublished}
                    </td>
                    <td className="p-3.5 pr-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/blog/${post.slug}`} target="_blank">
                          <Button variant="ghost" size="icon" className="h-7 w-7" title="View Live">
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                        <Link href={`/admin/blog/edit/${post.id}`}>
                          <Button variant="ghost" size="icon" className="h-7 w-7" title="Edit Post">
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => setPostToDelete({ id: post.id, title: post.title })}
                          title="Delete Post"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {postToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-destructive">
              <div className="p-2.5 rounded-full bg-destructive/10">
                <Trash2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">Delete Article?</h3>
                <p className="text-xs text-muted-foreground">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-foreground/90 bg-muted/40 p-3 rounded-lg border border-border">
              Are you sure you want to permanently delete: <br />
              <strong className="text-foreground font-semibold">"{postToDelete.title}"</strong>
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPostToDelete(null)}
                disabled={isDeleting}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="text-xs font-bold gap-1.5"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete Permanently'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Feedback */}
      {feedback && (
        <div className={`fixed bottom-5 right-5 z-50 p-4 rounded-xl border shadow-lg text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-bottom-5 ${
          feedback.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600' : 'bg-destructive/10 border-destructive/30 text-destructive'
        }`}>
          <span>{feedback.message}</span>
          <button onClick={() => setFeedback(null)} className="ml-2 hover:opacity-75 font-bold">✕</button>
        </div>
      )}
    </div>
  );
}
