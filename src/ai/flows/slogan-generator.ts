'use server';

/**
 * @fileOverview A slogan and tagline generation AI agent.
 *
 * - sloganGenerator - A function that handles the slogan generation.
 * - SloganGeneratorInput - The input type for the function.
 * - SloganGeneratorOutput - The return type for the function.
 */

import { generateWithRetry } from '@/ai/genkit';
import {z} from 'genkit';

const SloganGeneratorInputSchema = z.object({
  brandName: z.string().describe('The name of the brand or company.'),
  industry: z.string().describe('The industry or niche of the brand.'),
  details: z.string().describe('Details about the product, service, or brand.'),
  keyMessage: z.string().describe('The core message or value proposition to convey.'),
  tone: z.string().describe('The desired tone for the slogans (e.g., Catchy, Professional, Creative).'),
  seoFriendly: z.boolean().describe('Whether to optimize the slogans for SEO with relevant keywords.'),
  language: z.string().describe('The language for the generated slogans.'),
});
export type SloganGeneratorInput = z.infer<typeof SloganGeneratorInputSchema>;

const SloganGeneratorOutputSchema = z.object({
  slogans: z.array(z.string()).describe('A list of generated slogans or taglines.'),
});
export type SloganGeneratorOutput = z.infer<typeof SloganGeneratorOutputSchema>;

export async function sloganGenerator(input: SloganGeneratorInput): Promise<SloganGeneratorOutput> {
  const seoInstruction = input.seoFriendly ? `4. Incorporate relevant keywords from the industry and product details to make the taglines SEO-friendly.` : '';
  
  const prompt = `You are an expert copywriter specializing in branding. Generate a list of at least 15 short, memorable, and brand-focused slogans/taglines in ${input.language} based on the following criteria.

  **Brand Name:** ${input.brandName}
  **Industry/Niche:** ${input.industry}
  **Product/Service Details:** ${input.details}
  **Key Message:** ${input.keyMessage}
  **Tone:** ${input.tone}
  
  **Instructions:**
  1.  Create slogans that are catchy and easy to remember.
  2.  Ensure the slogans align with the specified tone.
  3.  The slogans must reflect the brand's key message and details.
  ${seoInstruction}
  
  Generate the list of slogans now.`;

  const llmResponse = await generateWithRetry<SloganGeneratorOutput>({
    model: 'googleai/gemini-2.0-flash',
    prompt,
    output: {
      schema: SloganGeneratorOutputSchema,
    }
  });

  return llmResponse;
}
