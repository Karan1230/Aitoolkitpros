'use client';

import React, { useState } from 'react';
import { useAuthGuest, SavedGeneration } from '@/context/auth-guest-context';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sparkles,
  Search,
  Copy,
  Check,
  Trash2,
  Clock,
  Wand2,
  FolderSync,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

export function SavedHistoryDialog() {
  const {
    isHistoryModalOpen,
    closeHistoryModal,
    savedGenerations,
    deleteSavedGeneration,
    user,
    openAuthModal,
  } = useAuthGuest();

  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const toolsList = Array.from(new Set(savedGenerations.map((g) => g.toolName)));

  const filteredGenerations = savedGenerations.filter((item) => {
    const matchesSearch =
      item.toolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.result.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = selectedFilter === 'all' || item.toolName === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <Dialog open={isHistoryModalOpen} onOpenChange={(open) => !open && closeHistoryModal()}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col p-0 overflow-hidden border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-border bg-gradient-to-r from-primary/10 via-background to-accent/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-primary/10 rounded-lg text-primary">
                <Wand2 className="h-5 w-5" />
              </span>
              <div>
                <DialogTitle className="text-lg font-bold text-foreground">
                  Saved Content & History
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                  Your AI generations and prompt history, securely synced with Firebase.
                </DialogDescription>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              <FolderSync className="h-3.5 w-3.5 animate-pulse" />
              <span>Cloud Synced</span>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search history by keyword or tool..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 text-xs h-8"
              />
            </div>

            {toolsList.length > 0 && (
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                aria-label="Filter by AI tool"
                className="h-8 text-xs bg-background border border-border rounded-md px-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="all">All Tools ({savedGenerations.length})</option>
                {toolsList.map((t) => (
                  <option key={t} value={t}>
                    {t} ({savedGenerations.filter((g) => g.toolName === t).length})
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Content Body */}
        <ScrollArea className="flex-1 p-6 max-h-[55vh]">
          {!user ? (
            <div className="py-12 text-center space-y-3">
              <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-semibold">Sign in to view your saved history</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Sign in with your Google account to automatically store and access all your generated AI content across devices.
              </p>
              <Button
                size="sm"
                onClick={() => {
                  closeHistoryModal();
                  openAuthModal('register');
                }}
                className="mt-2 text-xs font-semibold"
              >
                Sign In with Google
              </Button>
            </div>
          ) : filteredGenerations.length === 0 ? (
            <div className="py-12 text-center space-y-2 text-muted-foreground">
              <Clock className="h-8 w-8 mx-auto stroke-1 text-muted-foreground/60" />
              <p className="text-sm font-medium">No saved generations found</p>
              <p className="text-xs">
                {searchQuery
                  ? 'No results match your search query.'
                  : 'When you generate content with any AI tool, your outputs will be saved here!'}
              </p>
              <div className="pt-2">
                <Link href="/tools" onClick={closeHistoryModal}>
                  <Button variant="outline" size="sm" className="text-xs">
                    Explore AI Tools <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredGenerations.map((item: SavedGeneration) => (
                <div
                  key={item.id}
                  className="group p-4 rounded-xl border border-border/70 bg-card hover:border-primary/40 transition-all shadow-2xs relative"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-primary/10 text-primary">
                        {item.toolName}
                      </span>
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(item.createdAt)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopy(item.id, item.result)}
                        className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                        title="Copy content"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" />
                            <span className="text-emerald-500 text-[11px]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5 mr-1" />
                            <span className="text-[11px]">Copy</span>
                          </>
                        )}
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteSavedGeneration(item.id)}
                        className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive"
                        title="Delete from history"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  {item.prompt && (
                    <div className="mb-2 text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground/80">Input / Prompt: </span>
                      <span className="italic line-clamp-2">{item.prompt}</span>
                    </div>
                  )}

                  <div className="p-3 bg-muted/40 rounded-lg text-xs font-mono whitespace-pre-wrap line-clamp-4 text-foreground/90 select-text">
                    {item.result}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="p-3 px-6 border-t border-border bg-muted/20 flex items-center justify-between text-xs text-muted-foreground">
          <span>{savedGenerations.length} total saved generations</span>
          <Button variant="ghost" size="sm" onClick={closeHistoryModal} className="h-7 text-xs">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
