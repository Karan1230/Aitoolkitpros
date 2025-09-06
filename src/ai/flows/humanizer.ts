'use server';

/**
 * @fileOverview A text humanizer AI agent.
 *
 * - humanizeText - A function that rewrites text to sound more human.
 * - HumanizerInput - The input type for the function.
 * - HumanizerOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HumanizerInputSchema = z.object({
  text: z.string().describe('The AI-generated text to be humanized.'),
  language: z.string().describe('The language of the text.'),
});
export type HumanizerInput = z.infer<typeof HumanizerInputSchema>;

const HumanizerOutputSchema = z.object({
  humanizedText: z.string().describe('The rewritten, human-sounding text.'),
});
export type HumanizerOutput = z.infer<typeof HumanizerOutputSchema>;

export async function humanizeText(input: HumanizerInput): Promise<HumanizerOutput> {
  const prompt = `You are an expert editor who specializes in making AI-generated text sound more human. Your task is to rewrite the following text in ${input.language}, transforming it from robotic and generic to something that has the warmth, nuance, and natural flow of human writing.

  **Key Objectives:**
  1.  **Inject Personality:** Add a touch of personality and a more conversational tone.
  2.  **Improve Flow:** Use varied sentence structures, contractions (if appropriate for the language), and natural transitions.
  3.  **Remove AI Clichés:** Eliminate common AI phrases like "In conclusion," "Moreover," "It is important to note," etc.
  4.  **Add Nuance:** Introduce subtle emotional context or a more personal perspective where appropriate.
  5.  **Maintain Core Meaning:** The original meaning and key information of the text must be preserved.

  **Original AI-Generated Text:**
  "${input.text}"

  Rewrite the text to sound as if it were written by a thoughtful, engaging human. Generate only the humanized text as the output.`;

  const { output } = await ai.generate({
    model: 'googleai/gemini-2.0-flash',
    prompt,
    output: {
      schema: HumanizerOutputSchema,
    }
  });

  return output!;
}
