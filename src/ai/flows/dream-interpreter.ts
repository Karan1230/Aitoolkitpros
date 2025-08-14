'use server';

/**
 * @fileOverview An AI agent for dream interpretation.
 *
 * - dreamInterpreter - A function that handles dream interpretation.
 * - DreamInterpreterInput - The input type for the function.
 * - DreamInterpreterOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { textTranslatorFlow } from './text-translator';

const DreamInterpreterInputSchema = z.object({
  dreamDescription: z.string().describe('The detailed description of the dream.'),
  outputLanguage: z.string().describe('The language for the interpretation.'),
});
export type DreamInterpreterInput = z.infer<typeof DreamInterpreterInputSchema>;

const DreamInterpreterOutputSchema = z.object({
  interpretation: z.string().describe('The detailed interpretation of the dream.'),
});
export type DreamInterpreterOutput = z.infer<typeof DreamInterpreterOutputSchema>;

export async function dreamInterpreter(input: DreamInterpreterInput): Promise<DreamInterpreterOutput> {
  return dreamInterpreterFlow(input);
}

const interpretationPrompt = ai.definePrompt({
  name: 'dreamInterpretationPrompt',
  input: {schema: z.object({ dreamDescription: z.string() }) },
  output: {schema: DreamInterpreterOutputSchema},
  prompt: `You are an expert dream interpreter with knowledge of psychology, mythology, and cultural symbolism. Analyze the following dream description and provide a comprehensive interpretation.

Dream Description:
{{{dreamDescription}}}

**Instructions:**
1.  **Symbol Analysis:** Identify the key symbols in the dream and explain their potential meanings.
2.  **Emotional Context:** Analyze the emotional tone of the dream (e.g., fear, joy, confusion) and what it might signify.
3.  **Provide Meanings:** Offer insights from different perspectives:
    - **Psychological:** Connect the dream to potential subconscious thoughts, anxieties, or desires.
    - **Cultural/Spiritual:** Discuss any relevant archetypes, myths, or spiritual meanings associated with the dream elements.
4.  **Concluding Thought:** End with a summary or a question for self-reflection.
5.  Generate the interpretation in English.

Generate the interpretation now.`,
});


const dreamInterpreterFlow = ai.defineFlow(
  {
    name: 'dreamInterpreterFlow',
    inputSchema: DreamInterpreterInputSchema,
    outputSchema: DreamInterpreterOutputSchema,
  },
  async ({ dreamDescription, outputLanguage }) => {
    // 1. Generate the interpretation in English for consistency and quality.
    const {output: englishInterpretation} = await interpretationPrompt({ dreamDescription });
    
    if (!englishInterpretation?.interpretation) {
        throw new Error("Failed to generate an interpretation.");
    }

    // 2. Translate to the desired output language if it's not English.
    if (outputLanguage !== 'English') {
        const translationResult = await textTranslatorFlow({
            text: englishInterpretation.interpretation,
            targetLanguage: outputLanguage
        });
        return {
            interpretation: translationResult.translatedText
        };
    }
    
    return englishInterpretation;
  }
);
