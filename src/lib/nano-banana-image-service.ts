import { GoogleGenAI } from '@google/genai';

export interface GeneratedImageResult {
  url: string;
  alt: string;
  caption: string;
  source: 'nano-banana' | 'unsplash-free' | 'flux-ai';
  prompt?: string;
}

/**
 * High-quality, 100% watermark-free, royalty-free online images by category and search terms.
 * Sourced directly from Unsplash CDN in clean WebP format with zero watermarks.
 */
const FREE_ONLINE_IMAGE_ARCHIVE: Record<string, Array<{ url: string; alt: string; caption: string }>> = {
  ai: [
    {
      url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1280&h=720&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Futuristic artificial intelligence neural network data visualization with glowing nodes',
      caption: 'Next-Gen AI: Neural networks and autonomous deep learning architectures.'
    },
    {
      url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1280&h=720&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Digital AI brain concept representing machine learning and intelligent computing',
      caption: 'Cognitive Computing: Transforming creative and technical workflows with AI.'
    },
    {
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1280&h=720&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Abstract 3D digital neural network wave structure with clean studio lighting',
      caption: 'Generative AI Pipelines: High-speed reasoning and automated content workflows.'
    },
    {
      url: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1280&h=720&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Robotic artificial intelligence assistant with ambient blue light reflections',
      caption: 'Automated Intelligence: Scalable AI tools for productivity and research.'
    }
  ],
  tech: [
    {
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1280&h=720&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Detailed close-up of microchip motherboard circuitry and high-speed semiconductors',
      caption: 'Hardware Architecture: High-density silicon chips powering modern computing.'
    },
    {
      url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1280&h=720&auto=format&fit=crop&q=80&fm=webp',
      alt: 'High-performance computing silicon processor with intricate copper traces',
      caption: 'Silicon Performance: Next-gen processing units and hardware acceleration.'
    },
    {
      url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1280&h=720&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Flagship smartphone comparison with sleek titanium frame and bezel-less display',
      caption: 'Mobile Innovation: Comparing ergonomics, OLED brightness, and build quality.'
    },
    {
      url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=1280&h=720&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Macro photograph of high-end camera lenses and optical sapphire glass sensor',
      caption: 'Optical Excellence: Multi-element lenses and dynamic range sensors.'
    }
  ],
  coding: [
    {
      url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1280&h=720&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Developer dual monitor workstation with syntax-highlighted code and terminal',
      caption: 'Developer Environment: Streamlined full-stack development and automated tooling.'
    },
    {
      url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1280&h=720&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Modern minimalist laptop workstation with clean code editor and responsive design',
      caption: 'Clean Architecture: Building modular, maintainable web applications.'
    },
    {
      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1280&h=720&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Cloud server architecture diagram with global data networks and connected nodes',
      caption: 'Cloud Infrastructure: Serverless deployments and resilient distributed systems.'
    },
    {
      url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1280&h=720&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Digital matrix data streams representing secure backend authentication',
      caption: 'Production Security: Strict access controls, encryption, and zero-trust policies.'
    }
  ],
  seo: [
    {
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1280&h=720&auto=format&fit=crop&q=80&fm=webp',
      alt: 'SEO specialist analyzing keyword rankings, search traffic, and conversion analytics',
      caption: 'Data-Driven SEO: Pinpointing high-intent search terms and organic traffic.'
    },
    {
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1280&h=720&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Real-time analytics dashboard with revenue graphs, conversion rates, and metrics',
      caption: 'Growth Analytics: Monitoring click-through rates and search visibility.'
    },
    {
      url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1280&h=720&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Minimalist creative workstation with laptop, notebook, and coffee for content writing',
      caption: 'Content Strategy: Drafting authoritative, high-ranking guides and case studies.'
    },
    {
      url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1280&h=720&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Search engine optimization audit charts and SERP performance metrics on computer',
      caption: 'On-Page Optimization: Crafting engaging meta tags and internal linking structures.'
    }
  ],
  video: [
    {
      url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1280&h=720&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Professional video studio with 4K camera on tripod, ring light, and dual monitors',
      caption: 'Studio Production: Multi-camera angles, studio lighting, and audio capture.'
    },
    {
      url: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=1280&h=720&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Video editing software timeline interface with multi-track audio and color grading',
      caption: 'Timeline Editing: Dynamic pacing, jump cuts, and viewer retention subtitles.'
    },
    {
      url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1280&h=720&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Studio condenser microphone and audio mixer setup for podcasting and narration',
      caption: 'Crisp Audio: Studio microphone placement and balanced sound engineering.'
    },
    {
      url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1280&h=720&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Social media video analytics graph with viral engagement and subscriber milestones',
      caption: 'Viral Distribution: Audience retention curves and algorithmic optimization.'
    }
  ],
  general: [
    {
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1280&h=720&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Bright modern workspace with natural daylight, laptop, and indoor plants',
      caption: 'Productive Workflows: Ergonomic setups designed for deep focus.'
    },
    {
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1280&h=720&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Creative team collaborating around table with laptops and strategic planning notes',
      caption: 'Collaborative Execution: Aligning team objectives and accelerating output.'
    },
    {
      url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1280&h=720&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Modern product design wireframe blueprint and user experience dashboard',
      caption: 'UX Architecture: Clear visual hierarchy, accessible typography, and intuitive flows.'
    },
    {
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&auto=format&fit=crop&q=80&fm=webp',
      alt: 'Modern architectural building with glass facade and bright sunny blue sky',
      caption: 'Strategic Blueprint: Building scalable, high-impact digital products.'
    }
  ]
};

/**
 * Fetch watermark-free, royalty-free relevant online images from Unsplash CDN
 * matched dynamically to the topic, keywords, or section name.
 */
export function getFreeWatermarkFreeImage(topic: string, index: number = 0): {
  url: string;
  alt: string;
  caption: string;
  source: 'unsplash-free';
} {
  const lower = topic.toLowerCase();
  let pool = FREE_ONLINE_IMAGE_ARCHIVE.general;

  if (lower.includes('ai') || lower.includes('gemini') || lower.includes('gpt') || lower.includes('bot') || lower.includes('intelligence') || lower.includes('generator')) {
    pool = FREE_ONLINE_IMAGE_ARCHIVE.ai;
  } else if (lower.includes('seo') || lower.includes('blog') || lower.includes('article') || lower.includes('content') || lower.includes('marketing') || lower.includes('ranking')) {
    pool = FREE_ONLINE_IMAGE_ARCHIVE.seo;
  } else if (lower.includes('phone') || lower.includes('samsung') || lower.includes('apple') || lower.includes('iphone') || lower.includes('gadget') || lower.includes('hardware') || lower.includes('chip') || lower.includes('laptop') || lower.includes('tech')) {
    pool = FREE_ONLINE_IMAGE_ARCHIVE.tech;
  } else if (lower.includes('code') || lower.includes('program') || lower.includes('software') || lower.includes('developer') || lower.includes('python') || lower.includes('script')) {
    pool = FREE_ONLINE_IMAGE_ARCHIVE.coding;
  } else if (lower.includes('video') || lower.includes('youtube') || lower.includes('shorts') || lower.includes('reels') || lower.includes('camera') || lower.includes('stream') || lower.includes('edit')) {
    pool = FREE_ONLINE_IMAGE_ARCHIVE.video;
  }

  const selected = pool[index % pool.length] || pool[0];
  return {
    url: selected.url,
    alt: `${topic} - ${selected.alt}`,
    caption: selected.caption,
    source: 'unsplash-free'
  };
}

/**
 * Generate image using Google's Nano Banana (gemini-3.1-flash-lite-image / gemini-3.1-flash-image) model
 * with seamless fallback to online watermark-free Unsplash photography.
 */
export async function generateNanoBananaImage(
  prompt: string,
  options: {
    aspectRatio?: '16:9' | '1:1' | '4:3' | '9:16';
    modelVariant?: 'lite' | 'standard' | 'pro';
    topic?: string;
    index?: number;
  } = {}
): Promise<GeneratedImageResult> {
  const aspectRatio = options.aspectRatio || '16:9';
  const apiKey = process.env.GEMINI_API_KEY;

  // Nano Banana model naming mapping according to system instructions
  // nano banana / nano banana lite -> 'gemini-3.1-flash-lite-image'
  // nano banana 2 -> 'gemini-3.1-flash-image'
  // nano banana pro -> 'gemini-3-pro-image'
  const modelName =
    options.modelVariant === 'standard'
      ? 'gemini-3.1-flash-image'
      : options.modelVariant === 'pro'
      ? 'gemini-3-pro-image'
      : 'gemini-3.1-flash-lite-image';

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
        model: modelName,
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
              alt: prompt.slice(0, 100),
              caption: 'Generated with Nano Banana Image AI model.',
              source: 'nano-banana',
              prompt
            };
          }
        }
      }
    } catch (err) {
      console.warn(`[Nano Banana Image API] Call failed with model ${modelName}, falling back to free watermark-free image:`, err);
    }
  }

  // 100% Free Watermark-Free Online Image Fallback
  const fallback = getFreeWatermarkFreeImage(options.topic || prompt, options.index || 0);
  return {
    url: fallback.url,
    alt: fallback.alt,
    caption: fallback.caption,
    source: 'unsplash-free',
    prompt
  };
}
