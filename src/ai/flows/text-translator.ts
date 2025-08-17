'use server';
/**
 * @fileOverview Translates text into a specified language using Gemini.
 *
 * - textTranslatorFlow - The main flow for text translation.
 * - TextTranslatorInput - The input type for the flow.
 * - TextTranslatorOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import {z} from 'genkit';

const TextTranslatorInputSchema = z.object({
  text: z.string().describe('The text to be translated.'),
  targetLanguage: z.string().describe('The language to translate the text into (e.g., "Spanish", "French", "Japanese").'),
});
export type TextTranslatorInput = z.infer<typeof TextTranslatorInputSchema>;

const TextTranslatorOutputSchema = z.object({
  translatedText: z.string().describe('The translated text.'),
});
export type TextTranslatorOutput = z.infer<typeof TextTranslatorOutputSchema>;

export async function textTranslator(input: TextTranslatorInput): Promise<TextTranslatorOutput> {
  const prompt = `Translate the following text into ${input.targetLanguage}:\n\n---\n\n${input.text}\n\n---\n\nTranslated Text:`;
  
  const { output } = await ai.generate({
    model: 'googleai/gemini-2.0-flash',
    prompt,
    output: {
      schema: TextTranslatorOutputSchema,
    }
  });

  return output!;
}
