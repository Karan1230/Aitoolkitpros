'use server';

/**
 * @fileOverview Generates images from text prompts using the Stable Diffusion 3 API and Flux API.
 *
 * - aiImageGenerator - A function that handles the image generation process.
 * - AiImageGeneratorInput - The input type for the aiImageGenerator function.
 * - AiImageGeneratorOutput - The return type for the aiImageGenerator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiImageGeneratorInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate the image from.'),
});
export type AiImageGeneratorInput = z.infer<typeof AiImageGeneratorInputSchema>;

const AiImageGeneratorOutputSchema = z.object({
  imageUrl: z.string().describe('The URL of the generated image.'),
});
export type AiImageGeneratorOutput = z.infer<typeof AiImageGeneratorOutputSchema>;

export async function aiImageGenerator(input: AiImageGeneratorInput): Promise<AiImageGeneratorOutput> {
  return aiImageGeneratorFlow(input);
}

const aiImageGeneratorPrompt = ai.definePrompt({
  name: 'aiImageGeneratorPrompt',
  input: {schema: AiImageGeneratorInputSchema},
  output: {schema: AiImageGeneratorOutputSchema},
  prompt: `Generate an image based on the following prompt: {{{prompt}}}`,
});

const aiImageGeneratorFlow = ai.defineFlow(
  {
    name: 'aiImageGeneratorFlow',
    inputSchema: AiImageGeneratorInputSchema,
    outputSchema: AiImageGeneratorOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: input.prompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });
    return {imageUrl: media!.url!};
  }
);
