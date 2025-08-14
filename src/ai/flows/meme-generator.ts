'use server';

/**
 * @fileOverview Generates memes from text prompts or uploaded images using an AI model.
 *
 * - memeGenerator - A function that handles the meme generation process.
 * - MemeGeneratorInput - The input type for the memeGenerator function.
 * - MemeGeneratorOutput - The return type for the memeGenerator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MemeGeneratorInputSchema = z.object({
  topic: z.string().describe('The topic or text for the meme.'),
  imageDataUri: z
    .string()
    .optional()
    .describe(
      "An optional image to use as a base for the meme, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type MemeGeneratorInput = z.infer<typeof MemeGeneratorInputSchema>;

const MemeGeneratorOutputSchema = z.object({
  imageUrl: z.string().describe('The URL of the generated meme image.'),
});
export type MemeGeneratorOutput = z.infer<typeof MemeGeneratorOutputSchema>;

export async function memeGenerator(input: MemeGeneratorInput): Promise<MemeGeneratorOutput> {
  return memeGeneratorFlow(input);
}

const memeGeneratorFlow = ai.defineFlow(
  {
    name: 'memeGeneratorFlow',
    inputSchema: MemeGeneratorInputSchema,
    outputSchema: MemeGeneratorOutputSchema,
  },
  async (input) => {
    
    const promptText = `Generate a funny meme about "${input.topic}". The meme should have witty, bold, and easy-to-read text overlaid on the image. Make it humorous and shareable.`;

    const prompt: any = [{ text: promptText }];

    if (input.imageDataUri) {
        prompt.unshift({ media: { url: input.imageDataUri } });
    }

    const { media } = await ai.generate({
        model: 'googleai/gemini-2.0-flash-preview-image-generation',
        prompt,
        config: {
            responseModalities: ['TEXT', 'IMAGE'],
        },
    });

    if (!media?.url) {
        throw new Error("Failed to generate meme image.");
    }
    
    return { imageUrl: media.url };
  }
);
