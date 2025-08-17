'use server';

/**
 * @fileOverview Generates logos using an AI model.
 *
 * - aiLogoGenerator - A function that handles the logo generation process.
 * - AiLogoGeneratorInput - The input type for the aiLogoGenerator function.
 * - AiLogoGeneratorOutput - The return type for the aiLogoGenerator function.
 */

import { generateWithRetry } from '@/ai/genkit';
import {z} from 'genkit';

const AiLogoGeneratorInputSchema = z.object({
  brandName: z.string().describe('The name of the brand.'),
  slogan: z.string().optional().describe('The brand\'s slogan.'),
  industry: z.string().describe('The industry or niche of the brand.'),
  style: z.string().describe('The desired style for the logo.'),
  colors: z.string().describe('The preferred color palette for the logo.'),
});
export type AiLogoGeneratorInput = z.infer<typeof AiLogoGeneratorInputSchema>;

const AiLogoGeneratorOutputSchema = z.object({
  logos: z.array(z.object({
    regularUrl: z.string(),
    transparentUrl: z.string(),
  })).describe('An array of generated logos, each with a regular and transparent version.'),
});
export type AiLogoGeneratorOutput = z.infer<typeof AiLogoGeneratorOutputSchema>;


async function generateSingleLogo(input: AiLogoGeneratorInput): Promise<string> {
    const sloganPart = input.slogan ? `with the slogan '${input.slogan}'` : '';
    const fullPrompt = `Create a high-quality, professional logo for a brand named "${input.brandName}" ${sloganPart}.
Industry: ${input.industry}.
Style: ${input.style}.
Colors: ${input.colors}.
The logo should be on a solid, plain white background, be clean, modern, and easily recognizable. Do not include any extra text other than the brand name and slogan.`;

    const { media } = await generateWithRetry<{ media?: { url: string } }>({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: fullPrompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media?.url) {
      throw new Error("Failed to generate logo image.");
    }
    return media.url;
}

async function removeLogoBackground(imageUrl: string): Promise<string> {
    const prompt = [
      { text: "Please make the background of this logo transparent. Isolate only the main logo graphic and text. The output must be a clean PNG with a transparent background." },
      { media: { url: imageUrl } }
    ];

    const { media } = await generateWithRetry<{ media?: { url: string } }>({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media?.url) {
      throw new Error("Failed to remove background from the logo.");
    }
    return media.url;
}

export async function aiLogoGenerator(input: AiLogoGeneratorInput): Promise<AiLogoGeneratorOutput> {
    // Generate 4 logos in parallel
    const logoPromises = Array(4).fill(null).map(() => generateSingleLogo(input));
    const regularLogoUrls = await Promise.all(logoPromises);

    // For each generated logo, remove its background
    const finalLogos = await Promise.all(
        regularLogoUrls.map(async (regUrl) => {
            const transUrl = await removeLogoBackground(regUrl);
            return {
                regularUrl: regUrl,
                transparentUrl: transUrl,
            };
        })
    );

    return { logos: finalLogos };
}
