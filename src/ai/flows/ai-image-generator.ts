'use server';

/**
 * @fileOverview Generates images from text prompts using an AI model.
 *
 * - aiImageGenerator - A function that handles the image generation process.
 * - AiImageGeneratorInput - The input type for the aiImageGenerator function.
 * - AiImageGeneratorOutput - The return type for the aiImageGenerator function.
 */

import { ai } from '@/ai/genkit';
import {z} from 'genkit';
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

const AiImageGeneratorInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate the image from.'),
  style: z.string().describe('The artistic style of the image.').optional(),
  aspectRatio: z.string().describe('The aspect ratio of the image.').optional(),
  model: z.string().describe('The image generation model to use.'),
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
        fullPrompt = `Create a visually appealing, click-worthy YouTube thumbnail with the title "${input.prompt}". It should have bold, readable text, vibrant colors, and professional design. Style: ${input.style || 'digital art'}.`;
    } else {
        fullPrompt = `${input.prompt}, in the style of ${input.style || 'photorealistic'}`;
    }

    const isGemini = input.model.startsWith('googleai/');
    
    const apiKey = process.env[`GEMINI_API_KEY_${input.modelVersion}`] || process.env.GEMINI_API_KEY;

    const localAi = genkit({
      plugins: [
        googleAI({ apiKey }),
      ],
    });

    const imagePromises = Array(4).fill(null).map(() => 
        localAi.generate({
            model: input.model as any,
            prompt: fullPrompt,
            ...(isGemini ? {
              config: {
                  responseModalities: ['TEXT', 'IMAGE'],
              },
            } : {
              config: {
              }
            }),
        })
    );
    
    const results = await Promise.all(imagePromises);
    const imageUrls = results.map(result => result.media?.url).filter((url): url is string => !!url);
    
    return { imageUrls };
}
