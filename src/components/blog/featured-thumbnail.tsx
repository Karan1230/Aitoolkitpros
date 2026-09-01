'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ImageIcon, Compass } from 'lucide-react';
import { getOptimizedImageUrl } from '@/lib/client-image-compressor';

export interface FeaturedThumbnailProps {
  src?: string;
  alt?: string;
  title?: string;
  highlightText?: string;
  badge?: string;
  category?: string;
  showOverlay?: boolean;
  priority?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function FeaturedThumbnail({
  src,
  alt = 'Article thumbnail',
  title = '',
  highlightText,
  badge,
  category,
  showOverlay = true,
  priority = false,
  size = 'md',
  className = '',
}: FeaturedThumbnailProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSrc, setActiveSrc] = useState<string>(src || '');

  React.useEffect(() => {
    setActiveSrc(src || '');
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  const categoryGradients: Record<string, string> = {
    'Marketing & Advertising': 'from-blue-600 via-indigo-700 to-purple-900',
    'Design & Branding': 'from-pink-600 via-rose-700 to-purple-900',
    'Video & Social Media': 'from-amber-500 via-orange-600 to-red-800',
    'AI Trends & Productivity': 'from-emerald-600 via-teal-700 to-slate-900',
    'AI Tutorials': 'from-cyan-600 via-blue-700 to-slate-900',
  };

  const categoryFallbacks: Record<string, string> = {
    'Marketing & Advertising': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&auto=format&fit=crop&q=75&fm=webp',
    'Design & Branding': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=675&auto=format&fit=crop&q=75&fm=webp',
    'Video & Social Media': 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&h=675&auto=format&fit=crop&q=75&fm=webp',
    'AI Trends & Productivity': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=675&auto=format&fit=crop&q=75&fm=webp',
    'AI Tutorials': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=675&auto=format&fit=crop&q=75&fm=webp',
  };

  const gradientClass =
    category && categoryGradients[category]
      ? categoryGradients[category]
      : 'from-slate-800 via-indigo-950 to-slate-900';

  // Request optimized compressed dimensions based on display size
  const targetWidth = size === 'lg' ? 1200 : size === 'sm' ? 450 : 800;
  const optimizedSrc = activeSrc ? getOptimizedImageUrl(activeSrc, targetWidth, 75) : '';

  const handleImageError = () => {
    if (activeSrc && activeSrc.includes('pollinations.ai')) {
      // If Pollinations rate limits (429), smoothly switch to high-res WebP Unsplash fallback
      const fallback = (category && categoryFallbacks[category]) || categoryFallbacks['AI Trends & Productivity'];
      setActiveSrc(fallback);
    } else {
      setHasError(true);
    }
  };

  return (
    <div
      className={`relative w-full overflow-hidden bg-muted aspect-video select-none ${className}`}
    >
      {optimizedSrc && !hasError ? (
        <>
          <Image
            src={optimizedSrc}
            alt={alt}
            fill
            priority={priority}
            loading={priority ? undefined : 'lazy'}
            unoptimized={true}
            className={`object-cover transition-all duration-500 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            sizes={
              size === 'lg'
                ? '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px'
                : size === 'sm'
                ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px'
                : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px'
            }
            onLoad={() => setIsLoaded(true)}
            onError={handleImageError}
            referrerPolicy="no-referrer"
          />

          {!isLoaded && (
            <div className="absolute inset-0 bg-muted/80 animate-pulse flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-muted-foreground/40" />
            </div>
          )}
        </>
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradientClass} flex flex-col justify-between p-6 text-white`}
        >
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative z-10 flex items-center justify-between">
            {badge ? (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/20 shadow-xs">
                {badge}
              </span>
            ) : category ? (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/15 backdrop-blur-md text-white/90">
                {category}
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/15 backdrop-blur-md text-white/90">
                AI Knowledge Hub
              </span>
            )}
            <Compass className="w-5 h-5 text-white/40" />
          </div>

          <div className="relative z-10 space-y-2">
            <h3
              className={`font-black tracking-tight text-white leading-tight drop-shadow-md ${
                size === 'lg'
                  ? 'text-2xl sm:text-3xl line-clamp-3'
                  : size === 'sm'
                  ? 'text-sm sm:text-base line-clamp-2'
                  : 'text-lg sm:text-xl line-clamp-2'
              }`}
            >
              {title || alt || 'AI Masterclass Guide'}
            </h3>
            {highlightText && (
              <p
                className={`font-semibold text-emerald-300 drop-shadow-xs ${
                  size === 'lg' ? 'text-sm sm:text-base' : 'text-xs'
                }`}
              >
                ⚡ {highlightText}
              </p>
            )}
          </div>
        </div>
      )}

      {showOverlay && !hasError && (badge || highlightText) && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-4 sm:p-5 pointer-events-none">
          <div className="flex items-center justify-between">
            {badge && (
              <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider bg-primary text-primary-foreground shadow-md backdrop-blur-md border border-primary-foreground/20">
                {badge}
              </span>
            )}
          </div>

          {highlightText && (
            <div className="space-y-1">
              <div className="inline-block px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-bold shadow-lg">
                ✨ {highlightText}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
