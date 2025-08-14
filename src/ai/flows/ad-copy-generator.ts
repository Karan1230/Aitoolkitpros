'use server';

/**
 * @fileOverview An ad copy generation AI agent.
 *
 * - adCopyGenerator - A function that handles ad copy generation.
 * - AdCopyGeneratorInput - The input type for the function.
 * - AdCopyGeneratorOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdCopySchema = z.object({
  headline: z.string().describe('The main headline for the ad.'),
  mainText: z.string().describe('The body text of the ad.'),
  callToAction: z.string().describe('The call-to-action for the ad.'),
});

const AdCopyGeneratorInputSchema = z.object({
  productDetails: z.string().describe('Details about the product or service.'),
  targetAudience: z.string().describe('The intended audience for the ad.'),
  keyPoints: z.string().describe('The key selling points or messages to highlight.'),
  platform: z.string().describe('The advertising platform (e.g., Google Ads, Facebook Ads).'),
  tone: z.string().describe('The desired tone for the ad copy.'),
  language: z.string().describe('The language for the generated ad copy.'),
});
export type AdCopyGeneratorInput = z.infer<typeof AdCopyGeneratorInputSchema>;

const AdCopyGeneratorOutputSchema = z.object({
  adCopies: z.array(AdCopySchema).describe('A list of generated ad copy variations.'),
});
export type AdCopyGeneratorOutput = z.infer<typeof AdCopyGeneratorOutputSchema>;

export async function adCopyGenerator(input: AdCopyGeneratorInput): Promise<AdCopyGeneratorOutput> {
  return adCopyGeneratorFlow(input);
}

const adCopyPrompt = ai.definePrompt({
  name: 'adCopyPrompt',
  input: {schema: AdCopyGeneratorInputSchema},
  output: {schema: AdCopyGeneratorOutputSchema},
  prompt: `You are an expert digital marketing copywriter. Generate 5 distinct and compelling ad copy variations in {{language}} based on the following criteria.

**Ad Platform:** {{platform}}
**Tone:** {{tone}}

**Product/Service Details:**
{{{productDetails}}}

**Target Audience:**
{{{targetAudience}}}

**Key Selling Points:**
{{{keyPoints}}}


**Instructions:**
1.  For each variation, generate a **headline**, a **main text**, and a strong **call-to-action (CTA)**.
2.  Tailor the copy to be effective for the specified **platform**, respecting its typical character limits and style. For example, Google Ads should be concise, while Facebook Ads can be more descriptive.
3.  Ensure each ad copy variation is unique and highlights different angles of the key selling points.
4.  Adhere strictly to the requested **tone**.

Generate the ad copies now.`,
});


const adCopyGeneratorFlow = ai.defineFlow(
  {
    name: 'adCopyGeneratorFlow',
    inputSchema: AdCopyGeneratorInputSchema,
    outputSchema: AdCopyGeneratorOutputSchema,
  },
  async (input) => {
    const {output} = await adCopyPrompt(input);
    return output!;
  }
);
