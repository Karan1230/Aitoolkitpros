'use server';

/**
 * @fileOverview Generates images from text prompts using an AI model.
 *
 * - aiImageGenerator - A function that handles the image generation process.
 * - AiImageGeneratorInput - The input type for the aiImageGenerator function.
 * - AiImageGeneratorOutput - The return type for the aiImageGenerator function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { generateQwenImage } from '@/lib/qwen-image-service';

const AiImageGeneratorInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate the image from.'),
  style: z.string().describe('The artistic style of the image.').optional(),
  aspectRatio: z.string().describe('The aspect ratio of the image.').optional(),
  model: z.string().describe('The image generation model to use.').optional(),
  isThumbnail: z.boolean().describe('Whether the image is a thumbnail.').optional(),
  modelVersion: z.number().min(1).max(9).optional().default(1),
});
export type AiImageGeneratorInput = z.infer<typeof AiImageGeneratorInputSchema>;

const AiImageGeneratorOutputSchema = z.object({
  imageUrls: z.array(z.string()).describe('The URLs of the generated images.'),
});
export type AiImageGeneratorOutput = z.infer<typeof AiImageGeneratorOutputSchema>;

export async function aiImageGenerator(input: AiImageGeneratorInput): Promise<AiImageGeneratorOutput> {
  let fullPrompt = input.prompt;

  if (input.isThumbnail) {
    fullPrompt = `Create a visually appealing, click-worthy YouTube thumbnail with the title "${input.prompt}". Bold readable composition, rich vibrant colors, professional 8k design. Style: ${input.style || 'photorealistic'}.`;
  } else {
    fullPrompt = `${input.prompt}, in the style of ${input.style || 'photorealistic'}, highly detailed, 8k resolution`;
  }

  // Calculate dimensions based on aspect ratio
  let width = 1024;
  let height = 1024;
  if (input.aspectRatio === '16:9') {
    width = 1280;
    height = 720;
  } else if (input.aspectRatio === '9:16') {
    width = 720;
    height = 1280;
  } else if (input.aspectRatio === '4:3') {
    width = 1024;
    height = 768;
  }

  // Use Qwen-Image model as primary engine
  try {
    const qwenPromises = Array(4).fill(null).map((_, i) =>
      generateQwenImage(fullPrompt, {
        width,
        height,
        seed: Math.floor(Math.random() * 900000) + 100000 + (i * 13)
      })
    );

    const qwenResults = await Promise.all(qwenPromises);
    const imageUrls = qwenResults.map(r => r.url).filter(Boolean);

    if (imageUrls.length > 0) {
      return { imageUrls };
    }
  } catch (err) {
    console.warn('Qwen Image generator error, falling back to Gemini:', err);
  }

  // Fallback to Gemini if needed
  try {
    const apiKey = process.env[`GEMINI_API_KEY_${input.modelVersion}`] || process.env.GEMINI_API_KEY;
    if (apiKey) {
      const localAi = genkit({
        plugins: [googleAI({ apiKey })],
      });

      const imagePromises = Array(4).fill(null).map(() =>
        localAi.generate({
          model: (input.model && input.model.startsWith('googleai/') ? input.model : 'googleai/gemini-2.0-flash-preview-image-generation') as any,
          prompt: fullPrompt,
          config: {
            responseModalities: ['TEXT', 'IMAGE'],
          },
        })
      );

      const results = await Promise.all(imagePromises);
      const imageUrls = results.map(result => result.media?.url).filter((url): url is string => !!url);
      if (imageUrls.length > 0) {
        return { imageUrls };
      }
    }
  } catch (gErr) {
    console.warn('Gemini fallback failed:', gErr);
  }

  // Final FLUX.1 WebP fallback
  const encoded = encodeURIComponent(fullPrompt.slice(0, 400));
  const fallbackUrls = [1, 2, 3, 4].map(idx => 
    `https://image.pollinations.ai/prompt/${encoded}?width=${width}&height=${height}&nologo=true&seed=${Math.floor(Math.random() * 800000) + idx * 555}&model=flux&format=webp`
  );

  return { imageUrls: fallbackUrls };
}
