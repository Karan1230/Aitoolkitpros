'use server';
/**
 * @fileOverview Translates text from one language to another using an AI model.
 *
 * - textTranslator - A function that handles the text translation process.
 * - TextTranslatorInput - The input type for the textTranslator function.
 * - TextTranslatorOutput - The return type for the textTranslator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TextTranslatorInputSchema = z.object({
  text: z.string().describe('The text to translate.'),
  targetLanguage: z.string().describe('The language to translate the text into.'),
});
export type TextTranslatorInput = z.infer<typeof TextTranslatorInputSchema>;

const TextTranslatorOutputSchema = z.object({
  translatedText: z.string().describe('The translated text.'),
});
export type TextTranslatorOutput = z.infer<typeof TextTranslatorOutputSchema>;

export async function textTranslator(input: TextTranslatorInput): Promise<TextTranslatorOutput> {
  return textTranslatorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'textTranslatorPrompt',
  input: {schema: TextTranslatorInputSchema},
  output: {schema: TextTranslatorOutputSchema},
  prompt: `Translate the following text into {{targetLanguage}}:\n\n{{{text}}}`,
});

const textTranslatorFlow = ai.defineFlow(
  {
    name: 'textTranslatorFlow',
    inputSchema: TextTranslatorInputSchema,
    outputSchema: TextTranslatorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
