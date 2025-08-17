'use server';

/**
 * @fileOverview A grammar and spelling correction AI agent.
 *
 * - grammarSpellingCorrector - A function that corrects grammar and spelling.
 * - GrammarSpellingCorrectorInput - The input type for the grammarSpellingCorrector function.
 * - GrammarSpellingCorrectorOutput - The return type for the grammarSpellingCorrector function.
 */

import { ai } from '@/ai/genkit';
import {z} from 'genkit';

const GrammarSpellingCorrectorInputSchema = z.object({
  text: z.string().describe('The text to be corrected.'),
});
export type GrammarSpellingCorrectorInput = z.infer<typeof GrammarSpellingCorrectorInputSchema>;

const GrammarSpellingCorrectorOutputSchema = z.object({
  correctedText: z.string().describe('The corrected text.'),
});
export type GrammarSpellingCorrectorOutput = z.infer<typeof GrammarSpellingCorrectorOutputSchema>;

export async function grammarSpellingCorrector(input: GrammarSpellingCorrectorInput): Promise<GrammarSpellingCorrectorOutput> {
  const { output } = await ai.generate({
      model: 'googleai/gemini-2.0-flash',
      prompt: `Correct the grammar and spelling of the following text:\n\n${input.text}`,
      output: {
        schema: GrammarSpellingCorrectorOutputSchema,
      }
    });

    return output!;
}
