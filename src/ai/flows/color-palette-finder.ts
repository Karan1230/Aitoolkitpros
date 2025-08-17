'use server';

/**
 * @fileOverview A color palette generation AI agent.
 *
 * - colorPaletteFinder - A function that handles the color palette generation.
 * - ColorPaletteFinderInput - The input type for the function.
 * - ColorPaletteFinderOutput - The return type for the function.
 */

import { generateWithRetry } from '@/ai/genkit';
import {z} from 'genkit';

const PaletteSchema = z.object({
  name: z.string().describe('A creative name for the palette (e.g., "Ocean Sunset", "Forest Calm").'),
  colors: z.array(z.string().regex(/^#[0-9A-F]{6}$/i)).describe('An array of 3-6 hexadecimal color codes.'),
});

const ColorPaletteFinderInputSchema = z.object({
  inspiration: z.string().describe('The user\'s inspiration or description for the color palette.'),
  paletteType: z.string().describe('The type of color palette to generate (e.g., Complementary, Analogous).'),
  language: z.string().describe('The language of the user\'s inspiration text.'),
});
export type ColorPaletteFinderInput = z.infer<typeof ColorPaletteFinderInputSchema>;

const ColorPaletteFinderOutputSchema = z.object({
  palettes: z.array(PaletteSchema).describe('A list of 5 generated color palettes.'),
});
export type ColorPaletteFinderOutput = z.infer<typeof ColorPaletteFinderOutputSchema>;

export async function colorPaletteFinder(input: ColorPaletteFinderInput): Promise<ColorPaletteFinderOutput> {
  const prompt = `You are an expert designer and color theorist. Generate 5 distinct and harmonious color palettes based on the following user input.

  **User's Inspiration (in ${input.language}):**
  "${input.inspiration}"
  
  **Palette Type:** ${input.paletteType}
  
  **Instructions:**
  1.  For each of the 5 palettes, create a creative **name**.
  2.  For each palette, provide an array of 3 to 6 **colors** as hexadecimal codes (e.g., "#RRGGBB").
  3.  Ensure the palettes are aesthetically pleasing and relevant to the user's inspiration.
  4.  The generated colors must adhere to the principles of the requested **palette type**.
  5.  Do not repeat palettes. Each of the 5 results should be unique.
  
  Generate the color palettes now.`;

  const llmResponse = await generateWithRetry<ColorPaletteFinderOutput>({
    model: 'googleai/gemini-2.0-flash',
    prompt,
    output: {
      schema: ColorPaletteFinderOutputSchema,
    }
  });

  return llmResponse;
}
