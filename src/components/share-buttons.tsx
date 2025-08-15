
'use client';

import { 
    Twitter, 
    Facebook, 
    Linkedin, 
    Mail, 
    Copy, 
    Check,
    Send,
    MessageCircle,
    Instagram,
    MoreHorizontal
} from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';
import { type Post } from '@/lib/blog-data';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils';

interface ShareButtonsProps {
  post: Post;
  url: string;
}

const mainPlatforms = [
  { name: 'WhatsApp', icon: MessageCircle, key: 'whatsapp' },
  { name: 'Facebook', icon: Facebook, key: 'facebook' },
  { name: 'X', icon: Twitter, key: 'twitter' },
  { name: 'LinkedIn', icon: Linkedin, key: 'linkedin' },
];

const morePlatforms = [
  { name: 'Instagram', icon: Instagram, key: 'instagram' },
  { name: 'Email', icon: Mail, key: 'email' },
];

export function ShareButtons({ post, url }: ShareButtonsProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const text = encodeURIComponent(post.title);
  const hashtags = ['AIToolkitPro', ...post.tags.map(t => t.replace(/\s+/g, ''))].join(',');

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=${hashtags}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}&summary=${encodeURIComponent(post.description)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${text}%20${url}`,
    instagram: `https://www.instagram.com`, // Note: Instagram does not support direct web sharing with pre-filled content. This will just link to the site.
    email: `mailto:?subject=${text}&body=${encodeURIComponent(post.description)}%0A%0A${url}`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast({
      title: 'Link Copied!',
      description: 'The post URL has been copied to your clipboard.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-12 pt-8 border-t">
      <h3 className="text-lg font-bold text-center mb-4">Share this Post</h3>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {mainPlatforms.map(({ key, name, icon: Icon }) => (
          <Button
            key={key}
            variant="outline"
            size="lg"
            className="flex-grow md:flex-grow-0"
            asChild
          >
            <a
              href={shareLinks[key as keyof typeof shareLinks]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${name}`}
            >
              <Icon className="h-5 w-5 md:mr-2" />
              <span className="hidden md:inline">{name}</span>
            </a>
          </Button>
        ))}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="lg" className="flex-grow md:flex-grow-0">
                <MoreHorizontal className="h-5 w-5 md:mr-2"/>
                <span className="hidden md:inline">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {morePlatforms.map(({ key, name, icon: Icon }) => (
                 <DropdownMenuItem key={key} asChild>
                    <a
                        href={shareLinks[key as keyof typeof shareLinks]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                    >
                        <Icon className="h-4 w-4"/>
                        <span>Share on {name}</span>
                    </a>
                </DropdownMenuItem>
            ))}
            <DropdownMenuItem onClick={copyToClipboard} className="flex items-center gap-2">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </div>
  );
}
