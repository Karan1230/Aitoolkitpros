'use server';

/**
 * @fileOverview Generates images from text prompts using an AI model.
 *
 * - aiImageGenerator - A function that handles the image generation process.
 * - AiImageGeneratorInput - The input type for the aiImageGenerator function.
 * - AiImageGeneratorOutput - The return type for the aiImageGenerator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiImageGeneratorInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate the image from.'),
  style: z.string().describe('The artistic style of the image.').optional(),
  aspectRatio: z.string().describe('The aspect ratio of the image.').optional(),
  model: z.string().describe('The image generation model to use.'),
});
export type AiImageGeneratorInput = z.infer<typeof AiImageGeneratorInputSchema>;

const AiImageGeneratorOutputSchema = z.object({
  imageUrls: z.array(z.string()).describe('The URLs of the generated images.'),
});
export type AiImageGeneratorOutput = z.infer<typeof AiImageGeneratorOutputSchema>;

export async function aiImageGenerator(input: AiImageGeneratorInput): Promise<AiImageGeneratorOutput> {
  return aiImageGeneratorFlow(input);
}

const aiImageGeneratorFlow = ai.defineFlow(
  {
    name: 'aiImageGeneratorFlow',
    inputSchema: AiImageGeneratorInputSchema,
    outputSchema: AiImageGeneratorOutputSchema,
  },
  async (input) => {
    const fullPrompt = `${input.prompt}, in the style of ${input.style || 'photorealistic'}`;

    const imagePromises = Array(4).fill(null).map(() => 
        ai.generate({
            model: input.model as any,
            prompt: fullPrompt,
            config: {
                responseModalities: ['TEXT', 'IMAGE'],
                aspectRatio: input.aspectRatio || '1:1',
            },
        })
    );
    
    const results = await Promise.all(imagePromises);
    const imageUrls = results.map(result => result.media?.url).filter((url): url is string => !!url);
    
    return { imageUrls };
  }
);
