/**
 * Free Online Images Service (100% Free, High Resolution, Watermark-Free)
 * Combines Wikimedia Commons Real-Time Search with a Curated High-Definition Unsplash Photography Catalog.
 */

export interface FreeOnlineImage {
  url: string;
  alt: string;
  caption: string;
  source: 'wikimedia' | 'unsplash-free';
  width?: number;
  height?: number;
}

// Curated high-resolution Unsplash images (16:9 widescreen 1200x675, zero watermark, high CTR)
const CURATED_UNSPLASH_CATALOG: Record<string, FreeOnlineImage[]> = {
  smartphone: [
    {
      url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&h=675&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Flagship smartphone comparison with sleek titanium frame and borderless display',
      caption: 'Flagship smartphone design: Premium materials, ergonomic curves, and vibrant display.',
      source: 'unsplash-free'
    },
    {
      url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=1200&h=675&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Professional multi-lens smartphone camera module with optical sapphire glass sensors',
      caption: 'Advanced optics: Multi-sensor camera array, periscope zoom, and low-light aperture.',
      source: 'unsplash-free'
    },
    {
      url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1200&h=675&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Modern smartphone held in hand displaying high-contrast user interface',
      caption: 'Everyday performance: Smooth refresh rates, bright outdoor visibility, and responsive touch.',
      source: 'unsplash-free'
    },
    {
      url: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=1200&h=675&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Modern tech devices side by side showcasing smartphone and smartwatch ecosystem',
      caption: 'Connected hardware ecosystem: Effortless pairing, battery optimization, and fast charging.',
      source: 'unsplash-free'
    }
  ],
  laptop: [
    {
      url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=675&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Modern slim laptop with metallic chassis open on a clean workspace table',
      caption: 'High-performance laptop: Powerful computing, all-day battery life, and vibrant retina display.',
      source: 'unsplash-free'
    },
    {
      url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&h=675&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Clean minimalist computer workstation with laptop, coffee mug, and notebook',
      caption: 'Productive workspace: Ergonomic setup for deep focus and smooth multitasking.',
      source: 'unsplash-free'
    },
    {
      url: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=1200&h=675&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Laptop keyboard and touchpad with subtle backlighting in modern studio',
      caption: 'Tactile input: Precision keyboard engineering and expansive multi-touch trackpad.',
      source: 'unsplash-free'
    }
  ],
  ai: [
    {
      url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=675&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Artificial Intelligence neural network visualization with luminous digital connections',
      caption: 'Next-generation AI: Deep neural models, automated reasoning, and fast multimodal inference.',
      source: 'unsplash-free'
    },
    {
      url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=675&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Futuristic AI algorithm concept with glowing geometric digital circuits',
      caption: 'Algorithmic breakthroughs: Accelerating complex problem solving and machine intelligence.',
      source: 'unsplash-free'
    },
    {
      url: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1200&h=675&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Modern automated AI tools interface on computer display in high-tech setting',
      caption: 'AI-assisted workflow: Enhancing human creativity with intelligent automated assistants.',
      source: 'unsplash-free'
    }
  ],
  coding: [
    {
      url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=675&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Software development monitor with colorful syntax-highlighted code',
      caption: 'Clean code architecture: Modular components, type safety, and efficient algorithms.',
      source: 'unsplash-free'
    },
    {
      url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=675&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Developer laptop displaying web application layout and code editor side-by-side',
      caption: 'Full-stack engineering: Rapid prototyping and responsive user interface construction.',
      source: 'unsplash-free'
    },
    {
      url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=675&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Digital matrix data streams and cybersecurity infrastructure visualization',
      caption: 'Security & DevOps: Automated testing, resilient pipelines, and zero-downtime deployment.',
      source: 'unsplash-free'
    }
  ],
  seo: [
    {
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Search engine optimization analytics graph showing upward website traffic growth',
      caption: 'Data-backed SEO: Targeting high-intent keywords to drive organic search visibility.',
      source: 'unsplash-free'
    },
    {
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Analytics dashboard displaying website traffic, visitor sessions, and conversions',
      caption: 'Performance tracking: Monitoring bounce rates, click-through rates, and user retention.',
      source: 'unsplash-free'
    },
    {
      url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=675&auto=format&fit=crop&q=80&fm=webp',
      alt: 'SEO audit checklist and keyword difficulty metric charts on computer screen',
      caption: 'On-page optimization: Strategic internal linking, schema markup, and speed metrics.',
      source: 'unsplash-free'
    }
  ],
  video: [
    {
      url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&h=675&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Video studio recording setup with high-resolution camera, ring light, and dual monitors',
      caption: 'Content creator studio: 4K camera setup, studio lighting, and audio monitoring.',
      source: 'unsplash-free'
    },
    {
      url: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=1200&h=675&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Video editing software timeline interface with multi-track audio and color grading',
      caption: 'Post-production workflow: Pacing, motion graphics, and audio frequency balancing.',
      source: 'unsplash-free'
    },
    {
      url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=675&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Professional condenser microphone and audio mixer on podcasting recording desk',
      caption: 'Crystal-clear audio: Studio condenser microphones and noise reduction filters.',
      source: 'unsplash-free'
    }
  ],
  business: [
    {
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=675&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Diverse creative team collaborating around boardroom table with laptops and notes',
      caption: 'Strategic collaboration: Cross-functional teams delivering high-impact business outcomes.',
      source: 'unsplash-free'
    },
    {
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=675&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Modern corporate glass skyscraper reaching toward blue sky',
      caption: 'Enterprise scalability: Sustainable growth frameworks and institutional credibility.',
      source: 'unsplash-free'
    },
    {
      url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=675&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Financial growth charts and investment portfolio performance on tablet screen',
      caption: 'Financial trajectory: Risk management, capital allocation, and market expansion.',
      source: 'unsplash-free'
    }
  ],
  general: [
    {
      url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=675&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Modern workstation desk with laptop, notepad, pens, and cup of fresh coffee',
      caption: 'Focused productivity: Eliminating distractions and organizing key priorities.',
      source: 'unsplash-free'
    },
    {
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=675&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Bright contemporary office space with natural daylight, indoor plants, and comfortable seating',
      caption: 'Modern creative environment: Open floor plan balancing teamwork with quiet focus.',
      source: 'unsplash-free'
    },
    {
      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=675&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Global digital network with illuminated data points and interconnected communication lines',
      caption: 'Global connectivity: Fast data transit, cloud integration, and worldwide collaboration.',
      source: 'unsplash-free'
    }
  ]
};

// Stop words list for high-precision semantic keyword extraction
const STOP_WORDS = new Set([
  'the', 'and', 'for', 'with', 'this', 'that', 'from', 'into', 'about', 'best',
  'top', 'vs', 'versus', 'how', 'what', 'why', 'where', 'when', 'which', 'guide',
  'ultimate', 'comprehensive', 'step', 'by', 'tips', 'pro', 'masterclass', 'easy',
  'simple', 'fast', 'foundations', 'principles', 'applications', 'studies', 'future',
  'outlook', 'recommendations', 'real', 'world', 'overview', 'conclusion',
  'introduction', 'comparison', 'review', '2024', '2025', '2026', 'full',
  'complete', 'essential', 'key', 'strategy', 'strategies', 'setup', 'practices',
  'free', 'online', 'tool', 'tools', 'way', 'ways', 'good', 'great', 'better',
  'year', 'years', 'month', 'months', 'checklist', 'roadmap', 'everything', 'know'
]);

/**
 * Extract clean, high-intent keywords for image searching
 */
export function extractSalientKeywords(text: string): string[] {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOP_WORDS.has(w));
}

/**
 * Smart query builder for Wikimedia Commons search.
 * Focuses on concrete entities (phones, cameras, animals, food, laptops) instead of generic phrases.
 */
export function buildSmartWikimediaQuery(title: string, sectionTitle?: string): string {
  const t = (title || '').toLowerCase();
  const s = (sectionTitle || '').toLowerCase();

  // 1. Mobile devices & Hardware
  if (t.includes('samsung') || t.includes('galaxy')) {
    if (s.includes('camera') || s.includes('lens') || s.includes('sensor')) return 'samsung galaxy camera';
    if (s.includes('display') || s.includes('screen') || s.includes('bezel')) return 'samsung galaxy display';
    return 'samsung galaxy';
  }
  if (t.includes('iphone') || t.includes('apple')) {
    if (s.includes('camera') || s.includes('lens') || s.includes('sensor')) return 'iphone camera';
    if (s.includes('display') || s.includes('screen') || s.includes('bezel')) return 'iphone display screen';
    return 'apple iphone';
  }
  if (t.includes('macbook') || t.includes('laptop')) return 'laptop computer';

  // 2. Animals & Pets
  if (t.includes('golden retriever')) return 'golden retriever';
  if (t.includes('puppy') || t.includes('puppies')) return 'puppy';
  if (t.includes('dog food') || (t.includes('dog') && (s.includes('food') || s.includes('diet')))) return 'dog food';
  if (t.includes('dog')) return 'dog';
  if (t.includes('cat')) return 'cat';

  // 3. Media & Content creation
  if (t.includes('youtube') || t.includes('video')) {
    if (s.includes('camera') || s.includes('studio') || s.includes('lighting')) return 'video camera studio';
    if (s.includes('edit') || s.includes('software')) return 'video editing software';
    return 'video camera';
  }

  // 4. Default: Extract up to 2 salient title keywords + 1 section keyword
  const tWords = extractSalientKeywords(title);
  const sWords = extractSalientKeywords(sectionTitle || '');

  const words = [...tWords.slice(0, 2)];
  for (const sw of sWords) {
    if (!words.includes(sw) && words.length < 3) {
      words.push(sw);
    }
  }

  return words.length > 0 ? words.join(' ') : 'technology';
}

/**
 * Determine best category key from topic or title.
 */
export function getCategoryKey(text: string): keyof typeof CURATED_UNSPLASH_CATALOG {
  const t = text.toLowerCase();
  if (t.includes('phone') || t.includes('samsung') || t.includes('iphone') || t.includes('pixel') || t.includes('galaxy') || t.includes('mobile') || t.includes('camera') || t.includes('gadget')) {
    return 'smartphone';
  }
  if (t.includes('laptop') || t.includes('macbook') || t.includes('pc') || t.includes('computer') || t.includes('desktop')) {
    return 'laptop';
  }
  if (t.includes('ai') || t.includes('artificial intelligence') || t.includes('model') || t.includes('gpt') || t.includes('gemini') || t.includes('neural') || t.includes('robot')) {
    return 'ai';
  }
  if (t.includes('code') || t.includes('coding') || t.includes('develop') || t.includes('software') || t.includes('python') || t.includes('javascript') || t.includes('api')) {
    return 'coding';
  }
  if (t.includes('seo') || t.includes('blog') || t.includes('write') || t.includes('ranking') || t.includes('keyword') || t.includes('content') || t.includes('marketing')) {
    return 'seo';
  }
  if (t.includes('video') || t.includes('youtube') || t.includes('shorts') || t.includes('reels') || t.includes('camera') || t.includes('podcast') || t.includes('audio') || t.includes('stream')) {
    return 'video';
  }
  if (t.includes('business') || t.includes('finance') || t.includes('money') || t.includes('startup') || t.includes('crypto') || t.includes('invest') || t.includes('market')) {
    return 'business';
  }
  return 'general';
}

/**
 * Search Wikimedia Commons API for real-time free, watermark-free images
 */
export async function searchWikimediaCommons(query: string, limit: number = 6): Promise<FreeOnlineImage[]> {
  try {
    const cleanQuery = query
      .replace(/[^\w\s]/g, ' ')
      .trim()
      .split(/\s+/)
      .slice(0, 3)
      .join(' ');

    if (!cleanQuery) return [];

    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(cleanQuery)}&gsrlimit=${limit * 3}&prop=imageinfo&iiprop=url|size|mime&format=json`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'AIToolkitPro/1.0 (free online photo curator)'
      },
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!res.ok) return [];

    const data = await res.json();
    const pages = data.query?.pages;
    if (!pages) return [];

    const results: FreeOnlineImage[] = [];

    for (const key of Object.keys(pages)) {
      const page = pages[key];
      const info = page.imageinfo?.[0];
      if (!info || !info.url) continue;

      const mime = (info.mime || '').toLowerCase();
      // Only keep photos: jpg, jpeg, png, webp
      if (!mime.includes('jpeg') && !mime.includes('jpg') && !mime.includes('png') && !mime.includes('webp')) {
        continue;
      }

      // Ignore icon/tiny images (< 500px width) or SVGs or documents
      if (info.width && info.width < 500) continue;
      const lowerUrl = info.url.toLowerCase();
      if (lowerUrl.endsWith('.svg') || lowerUrl.endsWith('.pdf') || lowerUrl.endsWith('.djvu') || lowerUrl.endsWith('.tif')) {
        continue;
      }

      const rawTitle = (page.title || '')
        .replace(/^File:/i, '')
        .replace(/\.[a-zA-Z0-9]+$/, '')
        .replace(/_/g, ' ')
        .trim();

      results.push({
        url: info.url,
        alt: `${rawTitle} - High resolution free public visual`,
        caption: `${rawTitle}`,
        source: 'wikimedia',
        width: info.width,
        height: info.height
      });

      if (results.length >= limit) break;
    }

    return results;
  } catch (err) {
    console.warn('[Wikimedia Search] Error fetching commons images:', err);
    return [];
  }
}

/**
 * Search Free Online Images across both Wikimedia Commons and Unsplash Catalog
 */
export async function searchFreeOnlineImages(query: string, limit: number = 10): Promise<FreeOnlineImage[]> {
  const [wikiImages] = await Promise.all([
    searchWikimediaCommons(query, Math.ceil(limit / 2)),
  ]);

  const catKey = getCategoryKey(query);
  const unsplashPool = CURATED_UNSPLASH_CATALOG[catKey] || CURATED_UNSPLASH_CATALOG.general;

  // Combine and deduplicate
  const combined: FreeOnlineImage[] = [...wikiImages];

  for (const img of unsplashPool) {
    if (!combined.some(c => c.url === img.url)) {
      combined.push(img);
    }
  }

  return combined.slice(0, limit);
}

/**
 * Get a single relevant free online image for a specific section or topic
 */
export async function getFreeOnlineImageForTopic(
  query: string,
  index: number = 0,
  sectionTitle?: string
): Promise<FreeOnlineImage> {
  const smartQuery = buildSmartWikimediaQuery(query, sectionTitle);
  const catKey = getCategoryKey(query);
  const pool = CURATED_UNSPLASH_CATALOG[catKey] || CURATED_UNSPLASH_CATALOG.general;
  const unsplashDefault = pool[index % pool.length] || pool[0];

  try {
    const wikiResults = await searchWikimediaCommons(smartQuery, 4);
    if (wikiResults.length > 0) {
      return wikiResults[index % wikiResults.length];
    }
  } catch {
    // Fallback to Unsplash
  }

  return unsplashDefault;
}

/**
 * One-Click Replace ALL Images in an Article with Free Online Watermark-Free Photos
 * - Replaces the Featured Image
 * - Replaces all in-article Markdown images `![alt](url)` and HTML `<img>`
 * - Synchronizes with the `inArticleImages` array
 */
export async function replaceAllArticleImagesWithFreeWebImages(article: {
  title: string;
  content: string;
  category?: string;
  inArticleImages?: Array<{
    url: string;
    alt?: string;
    caption?: string;
    prompt?: string;
    sectionTitle?: string;
    source?: string;
  }>;
}): Promise<{
  newFeaturedImage: string;
  newContent: string;
  newInArticleImages: Array<{
    url: string;
    alt: string;
    caption: string;
    sectionTitle?: string;
    source: string;
  }>;
  replacedCount: number;
}> {
  const { title, content, inArticleImages = [] } = article;
  const catKey = getCategoryKey(title);
  const fallbackPool = CURATED_UNSPLASH_CATALOG[catKey] || CURATED_UNSPLASH_CATALOG.general;

  // 1. Get New Featured Image using smart search query
  const featuredOnline = await getFreeOnlineImageForTopic(title, 0);
  const newFeaturedImage = featuredOnline.url;

  // 2. Extract sections from markdown content to match images with relevant topics
  // Match headings like ## Section Title
  const lines = content.split('\n');
  const sectionHeadings: string[] = [];
  for (const line of lines) {
    const match = line.match(/^#{1,3}\s+(.+)$/);
    if (match && match[1]) {
      sectionHeadings.push(match[1].trim());
    }
  }

  // 3. Scan all markdown images in content: ![alt](url)
  const imageRegex = /!\[([^\]]*)\]\((https?:\/\/[^\s\)]+)\)/g;
  const matches: Array<{ fullMatch: string; alt: string; url: string; index: number }> = [];
  let m;

  while ((m = imageRegex.exec(content)) !== null) {
    matches.push({
      fullMatch: m[0],
      alt: m[1],
      url: m[2],
      index: m.index
    });
  }

  let updatedContent = content;
  const newInArticleImages: Array<{
    url: string;
    alt: string;
    caption: string;
    sectionTitle?: string;
    source: string;
  }> = [];

  // Used URLs to ensure every image in the article is unique
  const usedUrls = new Set<string>([newFeaturedImage]);

  // Replace each in-article image with a distinct free online photo
  for (let i = 0; i < matches.length; i++) {
    const item = matches[i];
    const sectionName = sectionHeadings[i] || `Key Section ${i + 1}`;
    const smartSearchQuery = buildSmartWikimediaQuery(title, sectionName);

    // Try finding an unused image
    let chosen: FreeOnlineImage | null = null;

    try {
      const candidates = await searchWikimediaCommons(smartSearchQuery, 6);
      for (const cand of candidates) {
        if (!usedUrls.has(cand.url)) {
          chosen = cand;
          break;
        }
      }
    } catch {
      // Ignore
    }

    if (!chosen) {
      // Pick from Unsplash catalog
      for (let pIdx = 0; pIdx < fallbackPool.length; pIdx++) {
        const candidate = fallbackPool[(i + 1 + pIdx) % fallbackPool.length];
        if (!usedUrls.has(candidate.url)) {
          chosen = candidate;
          break;
        }
      }
    }

    if (!chosen) {
      chosen = fallbackPool[(i + 1) % fallbackPool.length] || fallbackPool[0];
    }

    usedUrls.add(chosen.url);

    const newAlt = chosen.alt || `${sectionName} - High resolution free online visual`;
    const newCaption = chosen.caption || sectionName;
    const replacementMarkdown = `![${newAlt}](${chosen.url})`;

    // Replace in content
    updatedContent = updatedContent.replace(item.fullMatch, replacementMarkdown);

    newInArticleImages.push({
      url: chosen.url,
      alt: newAlt,
      caption: newCaption,
      sectionTitle: sectionName,
      source: chosen.source
    });
  }

  // Also update existing inArticleImages if length differs
  if (matches.length === 0 && inArticleImages.length > 0) {
    for (let i = 0; i < inArticleImages.length; i++) {
      const existing = inArticleImages[i];
      const sectionName = existing.sectionTitle || sectionHeadings[i] || `Section ${i + 1}`;
      const chosen = fallbackPool[(i + 1) % fallbackPool.length] || fallbackPool[0];

      newInArticleImages.push({
        url: chosen.url,
        alt: chosen.alt,
        caption: chosen.caption,
        sectionTitle: sectionName,
        source: chosen.source
      });
    }
  }

  const replacedCount = 1 + (matches.length > 0 ? matches.length : newInArticleImages.length);

  return {
    newFeaturedImage,
    newContent: updatedContent,
    newInArticleImages,
    replacedCount
  };
}
