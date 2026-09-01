'use client';

import React, { useState } from 'react';
import { Share2, Check, Copy, Twitter, Linkedin, Facebook, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const shareOnWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-muted-foreground mr-1 hidden sm:inline">Share:</span>
      
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full hover:bg-sky-500/10 hover:text-sky-500"
        onClick={shareOnTwitter}
        title="Share on X / Twitter"
      >
        <Twitter className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full hover:bg-blue-600/10 hover:text-blue-600"
        onClick={shareOnLinkedIn}
        title="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full hover:bg-emerald-500/10 hover:text-emerald-500"
        onClick={shareOnWhatsApp}
        title="Share on WhatsApp"
      >
        <MessageCircle className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="h-8 text-xs gap-1.5 rounded-full px-3"
        onClick={handleCopy}
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-emerald-500 font-medium">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            <span>Copy Link</span>
          </>
        )}
      </Button>
    </div>
  );
}
