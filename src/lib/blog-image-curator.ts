import { GoogleGenAI } from '@google/genai';

export interface CuratedImage {
  url: string;
  alt: string;
  caption: string;
  prompt?: string;
  sectionTitle?: string;
  source?: 'gemini' | 'flux-ai' | 'curated-hd';
}

/**
 * Curated high-resolution Unsplash images organized by category for instant, 100% reliable fallbacks.
 */
const HIGH_RES_FALLBACK_IMAGES: Record<string, CuratedImage[]> = {
  seo: [
    {
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&auto=format&fit=crop&q=75&fm=webp',
      alt: 'Digital marketing strategist analyzing SEO keyword rankings and search engine analytics on laptop',
      caption: 'Data-driven SEO: Analyzing keyword search volume and organic traffic trends.'
    },
    {
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&auto=format&fit=crop&q=75&fm=webp',
      alt: 'Analytics dashboard displaying website traffic growth, conversion rates, and SERP visibility',
      caption: 'Real-time performance metrics: Tracking organic impressions and click-through rates.'
    },
    {
      url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=675&auto=format&fit=crop&q=75&fm=webp',
      alt: 'Modern minimalist workstation with laptop, notepad, and coffee for content writing and blogging',
      caption: 'Efficient content workflow: Drafting high-ranking articles with automated AI tools.'
    },
    {
      url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=675&auto=format&fit=crop&q=75&fm=webp',
      alt: 'Search engine optimization and data analytics chart on computer screen',
      caption: 'Optimizing on-page SEO: Meta tags, keyword density, and internal linking strategies.'
    }
  ],
  gadgets: [
    {
      url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&h=675&auto=format&fit=crop&q=75&fm=webp',
      alt: 'Flagship smartphone comparison with sleek titanium frame and borderless AMOLED display',
      caption: 'Flagship industrial design: Comparing build quality, ergonomics, and bezel symmetry.'
    },
    {
      url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=1200&h=675&auto=format&fit=crop&q=75&fm=webp',
      alt: 'Macro close-up of professional smartphone camera lenses and sapphire sensor module',
      caption: 'Optics comparison: Multi-sensor camera array, periscope zoom, and low-light aperture.'
    },
    {
      url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=675&auto=format&fit=crop&q=75&fm=webp',
      alt: 'High-performance processor silicon microchip with glowing circuit traces',
      caption: 'Silicon architecture: 3nm processing efficiency and neural AI engine benchmarks.'
    },
    {
      url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=675&auto=format&fit=crop&q=75&fm=webp',
      alt: 'Modern tech workspace with premium gadgets, laptop, and wireless charging setup',
      caption: 'Ecosystem integration: Seamless cross-device workflows and battery endurance.'
    }
  ],
  video: [
    {
      url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&h=675&auto=format&fit=crop&q=75&fm=webp',
      alt: 'Content creator video studio with 4K camera, ring light, and dual monitors',
      caption: 'Studio recording setup: Professional lighting, camera angles, and audio capture.'
    },
    {
      url: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=1200&h=675&auto=format&fit=crop&q=75&fm=webp',
      alt: 'Video editing software timeline interface with multi-track audio and motion graphics',
      caption: 'Timeline editing: Dynamic pacing, jump cuts, and engagement retention subtitles.'
    },
    {
      url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=675&auto=format&fit=crop&q=75&fm=webp',
      alt: 'Studio condenser microphone and audio mixer setup for podcasting and video voiceover',
      caption: 'High-fidelity audio: Crisp voiceover recording and background audio balancing.'
    },
    {
      url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&h=675&auto=format&fit=crop&q=75&fm=webp',
      alt: 'Social media video analytics showing skyrocketing view counts and subscriber metrics',
      caption: 'Viral growth metrics: Audience retention curve and click-through rate optimization.'
    }
  ],
  coding: [
    {
      url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=675&auto=format&fit=crop&q=75&fm=webp',
      alt: 'Modern software development workstation with syntax-highlighted code on dual monitors',
      caption: 'Developer productivity: Streamlining full-stack workflows with AI assistance.'
    },
    {
      url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=675&auto=format&fit=crop&q=75&fm=webp',
      alt: 'Clean minimalist developer desk with laptop displaying interactive user interface and code',
      caption: 'Interactive UI implementation: Modular component design and responsive layout.'
    },
    {
      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=675&auto=format&fit=crop&q=75&fm=webp',
      alt: 'Cloud server architecture diagram with global data networks and connected nodes',
      caption: 'Scalable infrastructure: Cloud-native pipelines and serverless deployment.'
    },
    {
      url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=675&auto=format&fit=crop&q=75&fm=webp',
      alt: 'Futuristic digital matrix and cybersecurity code data streams',
      caption: 'Production security: Rigorous authentication, role-based rules, and fast compilation.'
    }
  ],
  general: [
    {
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=675&auto=format&fit=crop&q=75&fm=webp',
      alt: 'Modern corporate architectural building with bright natural daylight and executive office',
      caption: 'Strategic blueprint: Scaling modern digital workflows with precision.'
    },
    {
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=675&auto=format&fit=crop&q=75&fm=webp',
      alt: 'Creative team collaborating around table with laptops and strategic planning notes',
      caption: 'Collaborative execution: Aligning team objectives and output velocity.'
    },
    {
      url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&h=675&auto=format&fit=crop&q=75&fm=webp',
      alt: 'Modern product design wireframe blueprint and user experience dashboard',
      caption: 'Structured UX design: Clear hierarchy, accessible typography, and intuitive controls.'
    },
    {
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=675&auto=format&fit=crop&q=75&fm=webp',
      alt: 'Bright airy modern workspace with laptop, indoor plants, and natural light',
      caption: 'Productive workspace: Ergonomic setup for deep focus and sustainable output.'
    }
  ]
};

/**
 * Generate high-quality, photorealistic AI-generated image URL (16:9 widescreen 1280x720)
 * Uses FLUX.1 state-of-the-art diffusion engine with cinematic studio lighting parameters.
 */
export function generateAiImageUrl(prompt: string, seed?: number, model: 'turbo' | 'flux' = 'flux'): string {
  const randomSeed = seed || Math.floor(Math.random() * 999999);
  
  // Clean prompt and eliminate artificial boilerplate or literal eyeball artifacts
  let cleanPrompt = prompt
    .replace(/\b(eye-catching|eye catching|eyeball|artstation|trending on artstation|cyberpunk|deviantart|cartoon|anime|drawing)\b/gi, 'authentic commercial photography')
    .replace(/[^\w\s,.:'"()\-]/g, '')
    .trim();

  // If prompt is too brief, enhance with professional cinematic photographic lighting
  if (cleanPrompt.length < 50) {
    cleanPrompt = `Commercial editorial photography of ${cleanPrompt}, 35mm lens, natural studio lighting, ultra-sharp detail, 8k resolution, 16:9 landscape`;
  }

  cleanPrompt = cleanPrompt.slice(0, 450);

  return `https://image.pollinations.ai/prompt/${encodeURIComponent(cleanPrompt)}?width=1280&height=720&nologo=true&seed=${randomSeed}&model=${model}&format=webp`;
}

/**
 * Returns high-resolution, authentic Unsplash photography for topics where real photos are preferred.
 */
export function getCuratedUnsplashForTopic(topic: string, index: number = 0): CuratedImage {
  const lower = topic.toLowerCase();
  let pool = HIGH_RES_FALLBACK_IMAGES.general;

  if (lower.includes('seo') || lower.includes('blog') || lower.includes('write') || lower.includes('content') || lower.includes('marketing')) {
    pool = HIGH_RES_FALLBACK_IMAGES.seo;
  } else if (lower.includes('samsung') || lower.includes('apple') || lower.includes('iphone') || lower.includes('phone') || lower.includes('gadget') || lower.includes('camera') || lower.includes('laptop') || lower.includes('chip') || lower.includes('hardware')) {
    pool = HIGH_RES_FALLBACK_IMAGES.gadgets;
  } else if (lower.includes('youtube') || lower.includes('video') || lower.includes('shorts') || lower.includes('reels') || lower.includes('tiktok') || lower.includes('stream')) {
    pool = HIGH_RES_FALLBACK_IMAGES.video;
  } else if (lower.includes('code') || lower.includes('develop') || lower.includes('software') || lower.includes('python') || lower.includes('agent') || lower.includes('programming')) {
    pool = HIGH_RES_FALLBACK_IMAGES.coding;
  }

  const selected = pool[index % pool.length] || pool[0];
  return selected;
}

/**
 * Generates an image using Gemini image generation model or FLUX.1 photorealistic engine with automatic fallback.
 */
export async function generateGeminiImage(
  prompt: string,
  aspectRatio: '16:9' | '1:1' = '16:9',
  seed?: number,
  model: 'turbo' | 'flux' = 'flux'
): Promise<{ url: string; source: 'gemini' | 'flux-ai' | 'curated-hd' }> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio,
          },
        },
      });

      if (response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData && part.inlineData.data) {
            const mime = part.inlineData.mimeType || 'image/png';
            return {
              url: `data:${mime};base64,${part.inlineData.data}`,
              source: 'gemini'
            };
          }
        }
      }
    } catch (err: any) {
      // Graceful fallback to FLUX.1 photorealistic URL generator
    }
  }

  // Fast, reliable 16:9 photorealistic generation using FLUX.1
  return {
    url: generateAiImageUrl(prompt, seed, model),
    source: 'flux-ai'
  };
}

/**
 * Intelligent topic-aware prompt builder that produces realistic, photographic scenes
 * strictly reflecting what the article and sections are talking about WITHOUT forcing laptop desks on everything.
 */
export function buildPhotorealisticPromptsForTopic(topic: string, keywords: string[] = []): {
  categoryKey: 'seo' | 'gadgets' | 'video' | 'coding' | 'general';
  featured: { prompt: string; alt: string; caption: string };
  sections: Array<{ sectionTitle: string; prompt: string; alt: string; caption: string }>;
} {
  const cleanTopic = topic.trim();
  const lowerTopic = cleanTopic.toLowerCase();

  // 1. SEO / Blog Writing / Content Marketing / Copywriting
  if (
    lowerTopic.includes('seo') ||
    lowerTopic.includes('blog') ||
    lowerTopic.includes('write') ||
    lowerTopic.includes('ranking') ||
    lowerTopic.includes('copywriting') ||
    lowerTopic.includes('article') ||
    lowerTopic.includes('content') ||
    lowerTopic.includes('marketing')
  ) {
    return {
      categoryKey: 'seo',
      featured: {
        prompt: `Commercial editorial photography for ${cleanTopic}, glowing digital growth search engine chart with dynamic upward traffic arrow, creative lightbulb idea concept, vibrant modern studio lighting, razor-sharp 8k, 16:9`,
        alt: `${cleanTopic} - Organic search growth, high-ranking SEO strategies, and content optimization`,
        caption: `Optimizing content creation: Fast indexing, high-intent keyword targeting, and traffic growth.`
      },
      sections: [
        {
          sectionTitle: 'Keyword Research & Search Intent',
          prompt: `Conceptual visual of search engine data analytics, magnifying glass focusing on keyword metrics, colorful holographic data graph, sharp macro focus, 16:9`,
          alt: `Search engine optimization keyword research showing difficulty and volume metrics`,
          caption: `Data-driven keyword targeting: Pinpointing high-intent search terms with low competition.`
        },
        {
          sectionTitle: 'Engaging Content & E-E-A-T Quality',
          prompt: `Creative modern writing studio scene, glowing fountain pen tip drawing luminous golden lines on paper, elegant warm aesthetic, 16:9`,
          alt: `Content creator writing high-ranking blog post with human-level readability and depth`,
          caption: `Structuring engaging articles: Fast drafting with human-level readability and zero fluff.`
        },
        {
          sectionTitle: 'On-Page SEO Optimization & Fast Indexing',
          prompt: `Digital network connections forming a rocket launch concept, representing website speed and rapid Google search indexing, vibrant colors, 16:9`,
          alt: `On-page SEO diagnostic score, internal linking, and fast web speed optimization`,
          caption: `Final optimization checklist: Embedding authoritative internal links and high-CTR meta tags.`
        }
      ]
    };
  }

  // 2. Smartphone / Hardware / Tech Gadget Comparison (e.g. Samsung S25 Ultra vs iPhone 17)
  if (
    lowerTopic.includes('samsung') ||
    lowerTopic.includes('iphone') ||
    lowerTopic.includes('pixel') ||
    lowerTopic.includes('galaxy') ||
    lowerTopic.includes('smartphone') ||
    lowerTopic.includes('laptop') ||
    lowerTopic.includes('macbook') ||
    lowerTopic.includes('vs') ||
    lowerTopic.includes('camera') ||
    lowerTopic.includes('phone') ||
    lowerTopic.includes('gadget')
  ) {
    return {
      categoryKey: 'gadgets',
      featured: {
        prompt: `High-end commercial tech studio photograph comparing ${cleanTopic} side-by-side on a dark matte slate podium, dramatic cinematic rim lighting, razor-sharp titanium textures, reflective glass displays, 8k resolution, professional product review photography, 16:9 aspect ratio`,
        alt: `${cleanTopic} commercial tech comparison showing flagship industrial design and build quality`,
        caption: `Side-by-side design and hardware comparison for ${cleanTopic}.`
      },
      sections: [
        {
          sectionTitle: 'Display, Bezels & Industrial Design',
          prompt: `Ultra-detailed commercial studio shot comparing the vibrant OLED screens and ultra-thin bezels of ${cleanTopic} turned on side-by-side in bright lighting, crisp vibrant colors, 8k resolution, professional tech photography, 16:9`,
          alt: `${cleanTopic} display screen quality, peak brightness, and borderless bezels comparison`,
          caption: `Comparing display clarity, dynamic refresh rate, and anti-reflective screen coating.`
        },
        {
          sectionTitle: 'Camera System & Sensor Optics',
          prompt: `Extreme macro close-up photograph of the rear camera lenses and optical zoom sensor modules of ${cleanTopic}, studio reflections in sapphire glass lenses, titanium housing, razor-sharp focus, 8k, 16:9`,
          alt: `${cleanTopic} rear camera sensor modules, optical zoom lenses, and macro capabilities`,
          caption: `In-depth look at primary sensors, telephoto periscope lenses, and low-light aperture optics.`
        },
        {
          sectionTitle: 'Processor Performance & Silicon Chipset',
          prompt: `Futuristic illuminated microchip processor silicon board with glowing circuit traces representing high-performance mobile CPU GPU chipsets for ${cleanTopic}, clean technology aesthetics, 8k render, 16:9`,
          alt: `${cleanTopic} next-generation processor chipset performance and benchmarks`,
          caption: `Architecture breakdown: CPU clock speeds, GPU rendering, and thermal dissipation efficiency.`
        }
      ]
    };
  }

  // 3. YouTube / Video / Shorts / Content Creation
  if (
    lowerTopic.includes('youtube') ||
    lowerTopic.includes('video') ||
    lowerTopic.includes('shorts') ||
    lowerTopic.includes('reels') ||
    lowerTopic.includes('tiktok') ||
    lowerTopic.includes('creator') ||
    lowerTopic.includes('stream')
  ) {
    return {
      categoryKey: 'video',
      featured: {
        prompt: `Cinematic commercial photography for "${cleanTopic}", high-end cinema camera on motorized gimbal with vibrant neon studio backlighting, audio visualizer beams, 8k resolution, 16:9`,
        alt: `${cleanTopic} professional cinema camera and viral video production studio setup`,
        caption: `Mastering viral video production with high-yield studio workflows.`
      },
      sections: [
        {
          sectionTitle: 'Studio Filming & Lighting Setup',
          prompt: `Professional video creator microphone with glowing RGB ring light and 4k camera lens capturing studio scene, warm cinematic lighting, 8k resolution, 16:9`,
          alt: `Content creator recording desk with studio microphone and filming equipment for ${cleanTopic}`,
          caption: `Optimal recording setup: microphone placement, lighting angles, and teleprompter workflow.`
        },
        {
          sectionTitle: 'Creative Video Editing & Motion Pacing',
          prompt: `Dynamic visual representation of video editing, glowing colorful film strips twisting through air with neon audio waveforms, creative 3D art, 16:9`,
          alt: `Dynamic video editing visual showing audio waveforms and visual pacing cuts for ${cleanTopic}`,
          caption: `Timeline editing: audio waveform sync, jump cuts, and engagement retention graphics.`
        },
        {
          sectionTitle: 'Audience Growth & Viral Metrics',
          prompt: `Glowing golden 3D play button floating with explosive colorful particle burst and rising growth graph, celebratory viral video concept, 8k, 16:9`,
          alt: `Skyrocketing video view analytics and subscriber retention metrics graph for ${cleanTopic}`,
          caption: `Real-time analytics tracking: audience retention spikes and click-through rate optimization.`
        }
      ]
    };
  }

  // 4. AI Tools / Software / Neural Networks / Agents
  if (
    lowerTopic.includes('ai') ||
    lowerTopic.includes('code') ||
    lowerTopic.includes('software') ||
    lowerTopic.includes('agent') ||
    lowerTopic.includes('intelligence') ||
    lowerTopic.includes('robot') ||
    lowerTopic.includes('tool')
  ) {
    return {
      categoryKey: 'coding',
      featured: {
        prompt: `Futuristic digital visualization representing "${cleanTopic}", glowing crystalline neural network core with holographic light rays, sleek modern aesthetics, 8k resolution, cinematic 16:9 photography`,
        alt: `${cleanTopic} artificial intelligence neural network and modern automated toolchain`,
        caption: `Streamlining productivity with next-generation automated AI tooling.`
      },
      sections: [
        {
          sectionTitle: 'Core Capabilities & Interactive Features',
          prompt: `Modern holographic user interface elements floating in clean air with smooth glass panels and glowing icons representing ${cleanTopic}, 8k, 16:9`,
          alt: `Interactive interface features and capabilities for ${cleanTopic}`,
          caption: `Feature breakdown: Intuitive user interface and intelligent automated capabilities.`
        },
        {
          sectionTitle: 'Efficiency Benchmarks & Real-World Speed',
          prompt: `Glowing high-speed light trails symbolizing turbo processing speed and benchmark efficiency for ${cleanTopic}, vibrant colors, 8k, 16:9`,
          alt: `Speed benchmarks and productivity metrics comparison for ${cleanTopic}`,
          caption: `Measurable output gains and latency reductions across real-world workloads.`
        },
        {
          sectionTitle: 'Scalable Architecture & Future Potential',
          prompt: `Modular glowing geometric cubic blocks assembling seamlessly into a futuristic structure, symbolizing scalable architecture for ${cleanTopic}, 8k, 16:9`,
          alt: `Scalable modular architecture and ecosystem blueprint for ${cleanTopic}`,
          caption: `Production-ready architecture: modular scalability and security best practices.`
        }
      ]
    };
  }

  // 5. Default / General Real-World Topics
  return {
    categoryKey: 'general',
    featured: {
      prompt: `Inspiring commercial editorial photograph for "${cleanTopic}", rich vibrant visual storytelling, natural golden hour lighting, clean minimalist composition, 8k resolution, 16:9 widescreen`,
      alt: `${cleanTopic} professional strategic execution and masterclass guide`,
      caption: `Masterclass guide to ${cleanTopic}: Strategies, execution blueprints, and real-world results.`
    },
    sections: [
      {
        sectionTitle: 'Foundations & Key Principles',
        prompt: `Artistic photographic concept representing core fundamentals of ${cleanTopic}, clean balanced geometry, studio spotlight, crisp textures, 8k, 16:9`,
        alt: `Practical setup and foundational principles for ${cleanTopic}`,
        caption: `Foundational strategy: defining goals, audience intent, and execution milestones.`
      },
      {
        sectionTitle: 'Real-World Applications & Case Studies',
        prompt: `Dynamic visual showing real-world impact and measurable growth for ${cleanTopic}, bright contemporary aesthetics, 8k, 16:9`,
        alt: `Real-world case study and measurable results for ${cleanTopic}`,
        caption: `Data-backed case study: quantifiable efficiency gains and ROI.`
      },
      {
        sectionTitle: 'Future Outlook & Pro Recommendations',
        prompt: `Visionary creative concept with bright horizon and modern architectural lines for ${cleanTopic}, inspiring atmosphere, 8k, 16:9`,
        alt: `Pro tips, strategic roadmap, and industry best practices for ${cleanTopic}`,
        caption: `Actionable takeaways and future-proof implementation frameworks.`
      }
    ]
  };
}

/**
 * Synchronously or asynchronously generates 4 topic-matched images with high reliability.
 */
export async function get4ContextualAiImages(topic: string, keywords: string[] = []): Promise<{
  featured: CuratedImage;
  inArticle: CuratedImage[];
}> {
  const seedBase = Math.floor(Math.random() * 900000) + 100000;
  const plans = buildPhotorealisticPromptsForTopic(topic, keywords);
  const fallbacks = HIGH_RES_FALLBACK_IMAGES[plans.categoryKey] || HIGH_RES_FALLBACK_IMAGES.general;

  const [featRes, sec1Res, sec2Res, sec3Res] = await Promise.all([
    generateGeminiImage(plans.featured.prompt, '16:9', seedBase, 'turbo'),
    generateGeminiImage(plans.sections[0].prompt, '16:9', seedBase + 1, 'turbo'),
    generateGeminiImage(plans.sections[1].prompt, '16:9', seedBase + 2, 'turbo'),
    generateGeminiImage(plans.sections[2].prompt, '16:9', seedBase + 3, 'turbo'),
  ]);

  return {
    featured: {
      url: featRes.url || fallbacks[0].url,
      alt: plans.featured.alt,
      caption: plans.featured.caption,
      prompt: plans.featured.prompt,
      source: featRes.source
    },
    inArticle: [
      {
        url: sec1Res.url || fallbacks[1].url,
        alt: plans.sections[0].alt,
        caption: plans.sections[0].caption,
        prompt: plans.sections[0].prompt,
        sectionTitle: plans.sections[0].sectionTitle,
        source: sec1Res.source
      },
      {
        url: sec2Res.url || fallbacks[2].url,
        alt: plans.sections[1].alt,
        caption: plans.sections[1].caption,
        prompt: plans.sections[1].prompt,
        sectionTitle: plans.sections[1].sectionTitle,
        source: sec2Res.source
      },
      {
        url: sec3Res.url || fallbacks[3].url,
        alt: plans.sections[2].alt,
        caption: plans.sections[2].caption,
        prompt: plans.sections[2].prompt,
        sectionTitle: plans.sections[2].sectionTitle,
        source: sec3Res.source
      }
    ]
  };
}

export function get4ContextualImages(topic: string, keywords: string[] = []): {
  featured: CuratedImage;
  inArticle: CuratedImage[];
} {
  const seedBase = Math.floor(Math.random() * 900000) + 100000;
  const plans = buildPhotorealisticPromptsForTopic(topic, keywords);

  return {
    featured: {
      url: generateAiImageUrl(plans.featured.prompt, seedBase, 'turbo'),
      alt: plans.featured.alt,
      caption: plans.featured.caption,
      prompt: plans.featured.prompt
    },
    inArticle: [
      {
        url: generateAiImageUrl(plans.sections[0].prompt, seedBase + 1, 'turbo'),
        alt: plans.sections[0].alt,
        caption: plans.sections[0].caption,
        prompt: plans.sections[0].prompt,
        sectionTitle: plans.sections[0].sectionTitle
      },
      {
        url: generateAiImageUrl(plans.sections[1].prompt, seedBase + 2, 'turbo'),
        alt: plans.sections[1].alt,
        caption: plans.sections[1].caption,
        prompt: plans.sections[1].prompt,
        sectionTitle: plans.sections[1].sectionTitle
      },
      {
        url: generateAiImageUrl(plans.sections[2].prompt, seedBase + 3, 'turbo'),
        alt: plans.sections[2].alt,
        caption: plans.sections[2].caption,
        prompt: plans.sections[2].prompt,
        sectionTitle: plans.sections[2].sectionTitle
      }
    ]
  };
}
