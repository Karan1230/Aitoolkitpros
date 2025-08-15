'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TocEntry {
  level: number;
  id: string;
  title: string;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocEntry[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const foundHeadings: TocEntry[] = [];
    tempDiv.querySelectorAll('h2, h3').forEach((h) => {
      if (h.id) {
        foundHeadings.push({
          level: parseInt(h.tagName.substring(1), 10),
          id: h.id,
          title: h.textContent || '',
        });
      }
    });
    setHeadings(foundHeadings);
  }, [content]);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    const elements = headings.map(h => document.getElementById(h.id)).filter(el => el);
    elements.forEach(el => observer.current?.observe(el!));

    return () => observer.current?.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="sticky top-24 p-4 border rounded-lg bg-muted/50">
      <h3 className="font-headline text-lg mb-2">Table of Contents</h3>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                'text-sm text-muted-foreground hover:text-primary transition-colors',
                {
                  'text-primary font-semibold': activeId === heading.id,
                  'pl-4': heading.level === 3,
                }
              )}
            >
              {heading.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
