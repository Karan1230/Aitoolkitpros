'use server';

/**
 * @fileOverview An AI agent for generating custom icons.
 *
 * - customIconGenerator - A function that handles icon generation.
 * - CustomIconGeneratorInput - The input type for the function.
 * - CustomIconGeneratorOutput - The return type for the function.
 */

import { generateWithRetry } from '@/ai/genkit';
import {z} from 'genkit';

const CustomIconGeneratorInputSchema = z.object({
  prompt: z.string().describe('A description or concept for the icon.'),
  style: z.string().describe('The artistic style for the icon (e.g., flat, 3D, outline).'),
  colorScheme: z.string().describe('The desired color scheme for the icon.'),
  language: z.string().describe('The language of the user\'s prompt.'),
});
export type CustomIconGeneratorInput = z.infer<typeof CustomIconGeneratorInputSchema>;

const CustomIconGeneratorOutputSchema = z.object({
  imageUrls: z.array(z.string()).describe('An array of URLs for the generated icon images.'),
});
export type CustomIconGeneratorOutput = z.infer<typeof CustomIconGeneratorOutputSchema>;

export async function customIconGenerator({ prompt, style, colorScheme }: CustomIconGeneratorInput): Promise<CustomIconGeneratorOutput> {
    const fullPrompt = `Create a high-quality, professional icon for: "${prompt}".
The icon must be in a "${style}" style.
The color scheme should be "${colorScheme}".
The icon must be on a clean, plain white background with no shadows or extraneous elements. It should be a single, isolated graphic.`;

    const imagePromises = Array(4).fill(null).map(() => 
        generateWithRetry<{ media?: { url: string } }>({
            model: 'googleai/gemini-2.0-flash-preview-image-generation',
            prompt: fullPrompt,
            config: {
              responseModalities: ['TEXT', 'IMAGE'],
            },
        })
    );
    
    const results = await Promise.all(imagePromises);
    const imageUrls = results.map(result => result.media?.url).filter((url): url is string => !!url);
    
    if (imageUrls.length === 0) {
        throw new Error("The AI failed to generate any icons. Please try a different prompt or style.");
    }

    return { imageUrls };
}
