'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { getOptimizedImageUrl } from '@/lib/client-image-compressor';

function MarkdownImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSrc, setActiveSrc] = useState(src || '');

  React.useEffect(() => {
    setActiveSrc(src || '');
    setHasError(false);
    setIsLoaded(false);
  }, [src]);
  
  const optimizedSrc = activeSrc ? getOptimizedImageUrl(activeSrc, 960, 75) : '';

  const handleImageError = () => {
    if (activeSrc && activeSrc.includes('pollinations.ai')) {
      // High-res WebP Unsplash editorial fallback
      setActiveSrc('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&auto=format&fit=crop&q=75&fm=webp');
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <figure className="my-8 space-y-2.5">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-muted/80 to-muted flex flex-col items-center justify-center p-6 text-center text-muted-foreground shadow-xs">
          <ImageIcon className="w-8 h-8 mb-2 opacity-50 text-primary" />
          <p className="text-sm font-semibold text-foreground/80">{alt || 'Article Visual'}</p>
          {caption && <p className="text-xs text-muted-foreground mt-1 italic">{caption}</p>}
        </div>
      </figure>
    );
  }

  return (
    <figure className="my-8 space-y-2.5">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border bg-muted shadow-sm group">
        <Image
          src={optimizedSrc}
          alt={alt}
          fill
          loading="lazy"
          unoptimized={true}
          onLoad={() => setIsLoaded(true)}
          onError={handleImageError}
          className={`object-cover transition-all duration-500 group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 860px"
          referrerPolicy="no-referrer"
        />
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-muted/80 animate-pulse flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
          </div>
        )}
      </div>
      {(caption || alt) && (
        <figcaption className="text-center text-xs text-muted-foreground italic px-4 leading-relaxed">
          {caption || alt}
        </figcaption>
      )}
    </figure>
  );
}

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  let listItems: string[] = [];
  let isNumberedList = false;
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let tableRows: string[][] = [];
  let inTable = false;

  const flushList = (key: number) => {
    if (listItems.length > 0) {
      if (isNumberedList) {
        elements.push(
          <ol key={`ol-${key}`} className="my-5 space-y-2.5 list-decimal list-inside text-foreground/90 text-base leading-relaxed pl-3 font-normal">
            {listItems.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </ol>
        );
      } else {
        elements.push(
          <ul key={`ul-${key}`} className="my-5 space-y-2.5 list-disc list-inside text-foreground/90 text-base leading-relaxed pl-3 font-normal">
            {listItems.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </ul>
        );
      }
      listItems = [];
      isNumberedList = false;
    }
  };

  const flushCodeBlock = (key: number) => {
    if (codeBlockContent.length > 0) {
      elements.push(
        <pre key={`code-${key}`} className="my-6 p-4 sm:p-5 rounded-2xl bg-zinc-900 text-zinc-100 font-mono text-xs sm:text-sm overflow-x-auto border border-border shadow-inner">
          <code>{codeBlockContent.join('\n')}</code>
        </pre>
      );
      codeBlockContent = [];
    }
  };

  const flushTable = (key: number) => {
    if (tableRows.length > 0) {
      const headerRow = tableRows[0];
      const bodyRows = tableRows.slice(1);

      elements.push(
        <div key={`table-${key}`} className="my-8 overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-muted/70 text-foreground font-semibold border-b border-border">
              <tr>
                {headerRow.map((cell, idx) => (
                  <th key={idx} className="px-4 py-3 sm:px-5 sm:py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground">
                    <span dangerouslySetInnerHTML={{ __html: formatInline(cell.trim()) }} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bodyRows.map((row, rIdx) => (
                <tr key={rIdx} className={rIdx % 2 === 1 ? 'bg-muted/20' : 'bg-transparent hover:bg-muted/40 transition-colors'}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-3 sm:px-5 sm:py-3.5 text-xs sm:text-sm text-foreground/90 leading-normal">
                      <span dangerouslySetInnerHTML={{ __html: formatInline(cell.trim()) }} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
  };

  const formatInline = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-foreground/90">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono text-primary border border-border/50 font-medium">$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary font-medium underline underline-offset-4 hover:text-primary/80 transition-colors" target="_blank" rel="noopener noreferrer">$1</a>');
  };

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    const trimmed = line.trim();

    // Code blocks
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        flushCodeBlock(index);
        inCodeBlock = false;
      } else {
        flushList(index);
        flushTable(index);
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Markdown Table Row detection (e.g. | col1 | col2 |)
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      // Check if it's a separator row like | :--- | ---: |
      if (/^\|[\s\-:|]+\|$/.test(trimmed)) {
        // Separator row, skip parsing into content
        continue;
      }
      flushList(index);
      inTable = true;
      const cells = trimmed
        .slice(1, -1)
        .split('|')
        .map(c => c.trim());
      tableRows.push(cells);
      continue;
    } else if (inTable) {
      flushTable(index);
    }

    // Markdown Images: ![Alt Text](url)
    const imageMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imageMatch) {
      flushList(index);
      flushTable(index);
      const altText = imageMatch[1] || 'Blog illustration';
      const imgUrl = imageMatch[2];

      // Check if next line is an italic caption like *Caption text*
      let caption = '';
      if (index + 1 < lines.length) {
        const nextLine = lines[index + 1].trim();
        if (nextLine.startsWith('*') && nextLine.endsWith('*') && !nextLine.startsWith('**')) {
          caption = nextLine.slice(1, -1);
          index++; // Consume caption line
        }
      }

      elements.push(
        <MarkdownImage
          key={`img-${index}`}
          src={imgUrl}
          alt={altText}
          caption={caption}
        />
      );
      continue;
    }

    // Horizontal Rule
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      flushList(index);
      flushTable(index);
      elements.push(<hr key={`hr-${index}`} className="my-10 border-border/80" />);
      continue;
    }

    // Headings
    if (trimmed.startsWith('### ')) {
      flushList(index);
      flushTable(index);
      elements.push(
        <h3 key={`h3-${index}`} className="text-xl sm:text-2xl font-bold mt-8 mb-3 text-foreground tracking-tight flex items-center gap-2">
          <span>{trimmed.replace('### ', '')}</span>
        </h3>
      );
      continue;
    }

    if (trimmed.startsWith('## ')) {
      flushList(index);
      flushTable(index);
      elements.push(
        <h2 key={`h2-${index}`} className="text-2xl sm:text-3xl font-extrabold mt-12 mb-4 text-foreground tracking-tight border-b border-border/60 pb-3">
          {trimmed.replace('## ', '')}
        </h2>
      );
      continue;
    }

    if (trimmed.startsWith('# ')) {
      flushList(index);
      flushTable(index);
      elements.push(
        <h1 key={`h1-${index}`} className="text-3xl sm:text-4xl font-extrabold mt-12 mb-5 text-foreground tracking-tight">
          {trimmed.replace('# ', '')}
        </h1>
      );
      continue;
    }

    // Blockquotes
    if (trimmed.startsWith('> ')) {
      flushList(index);
      flushTable(index);
      elements.push(
        <blockquote key={`quote-${index}`} className="my-6 pl-5 py-3 border-l-4 border-primary italic text-foreground/90 bg-primary/5 rounded-r-2xl border-y border-r border-primary/10 shadow-xs">
          <p className="text-sm sm:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(trimmed.replace(/^>\s*/, '')) }} />
        </blockquote>
      );
      continue;
    }

    // Bullet Lists
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      isNumberedList = false;
      listItems.push(trimmed.slice(2));
      continue;
    }

    // Numbered lists
    if (/^\d+\.\s/.test(trimmed)) {
      isNumberedList = true;
      listItems.push(trimmed.replace(/^\d+\.\s/, ''));
      continue;
    }

    // Empty lines
    if (trimmed === '') {
      flushList(index);
      flushTable(index);
      continue;
    }

    // Regular Paragraph
    flushList(index);
    flushTable(index);
    elements.push(
      <p
        key={`p-${index}`}
        className="my-5 text-base sm:text-lg leading-relaxed sm:leading-8 text-foreground/90 font-normal"
        dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
      />
    );
  }

  flushList(lines.length);
  flushCodeBlock(lines.length);
  flushTable(lines.length);

  return <div className="blog-article-content space-y-1">{elements}</div>;
}
