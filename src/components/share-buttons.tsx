
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
    Pin
} from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';
import { type Post } from '@/lib/blog-data';

interface ShareButtonsProps {
  post: Post;
  url: string;
}

const socialPlatforms = {
  twitter: { icon: Twitter, name: 'X' },
  facebook: { icon: Facebook, name: 'Facebook' },
  linkedin: { icon: Linkedin, name: 'LinkedIn' },
  pinterest: { icon: Pin, name: 'Pinterest' },
  whatsapp: { icon: MessageCircle, name: 'WhatsApp' },
  instagram: { icon: Instagram, name: 'Instagram' },
  email: { icon: Mail, name: 'Email' },
};


export function ShareButtons({ post, url }: ShareButtonsProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const text = encodeURIComponent(post.title);
  const hashtags = ['AIToolkitPro', ...post.tags.map(t => t.replace(/\s+/g, ''))].join(',');

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=${hashtags}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}&summary=${encodeURIComponent(post.description)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${url}&media=${encodeURIComponent(post.featuredImage)}&description=${text}`,
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
        {Object.entries(socialPlatforms).map(([key, { icon: Icon, name }]) => (
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
              <Icon className="h-5 w-5 mr-2" />
              {name}
            </a>
          </Button>
        ))}
        <Button variant="outline" size="lg" className="flex-grow md:flex-grow-0" onClick={copyToClipboard}>
          {copied ? <Check className="h-5 w-5 mr-2" /> : <Copy className="h-5 w-5 mr-2" />}
          {copied ? 'Copied!' : 'Copy Link'}
        </Button>
      </div>
    </div>
  );
}
