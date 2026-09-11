import { GoogleGenAI } from '@google/genai';

/**
 * Nano Banana Image Generation Service
 * Powered by Google's native Gemini image generation models:
 * - 'gemini-3.1-flash-image' (Nano Banana 2)
 * - 'gemini-3.1-flash-lite-image' (Nano Banana Lite)
 */

export interface NanoBananaImageResult {
  url: string;
  source: 'nano-banana' | 'nano-banana-lite' | 'flux-ai';
  model: string;
}

export async function generateNanoBananaImage(
  prompt: string,
  options: {
    aspectRatio?: '16:9' | '1:1' | '4:3' | '9:16';
    model?: 'gemini-3.1-flash-image' | 'gemini-3.1-flash-lite-image';
    seed?: number;
  } = {}
): Promise<NanoBananaImageResult> {
  const chosenModel = options.model || 'gemini-3.1-flash-image';
  const aspectRatio = options.aspectRatio || '16:9';
  const seed = options.seed || Math.floor(Math.random() * 900000) + 100000;
  const apiKey = process.env.GEMINI_API_KEY;

  // Clean prompt and focus on vivid, high-resolution commercial photography
  let cleanPrompt = prompt
    .replace(/\b(eye-catching|eye catching|eyeball|artstation|trending on artstation|cyberpunk|deviantart|cartoon|anime|drawing)\b/gi, 'authentic commercial photography')
    .replace(/[^\w\s,.:'"()\-]/g, '')
    .trim();

  if (cleanPrompt.length < 50) {
    cleanPrompt = `Commercial editorial photography of ${cleanPrompt}, 35mm lens, natural studio lighting, ultra-sharp detail, 8k resolution, 16:9 landscape`;
  }

  // 1. Generate using Google's Nano Banana Gemini Image model
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build-nano-banana',
          },
        },
      });

      const response = await ai.models.generateContent({
        model: chosenModel,
        contents: {
          parts: [{ text: cleanPrompt }],
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
              source: chosenModel === 'gemini-3.1-flash-lite-image' ? 'nano-banana-lite' : 'nano-banana',
              model: chosenModel,
            };
          }
        }
      }
    } catch (err) {
      console.warn('[Nano Banana] Gemini image generation error, falling back to WebP photorealistic engine:', err);
    }
  }

  // 2. High-speed 16:9 widescreen WebP photorealistic fallback (no watermark)
  const encoded = encodeURIComponent(cleanPrompt.slice(0, 450));
  const fallbackUrl = `https://image.pollinations.ai/prompt/${encoded}?width=1280&height=720&nologo=true&seed=${seed}&model=flux&format=webp`;

  return {
    url: fallbackUrl,
    source: 'flux-ai',
    model: 'nano-banana-fallback',
  };
}
