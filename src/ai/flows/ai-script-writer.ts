'use server';

/**
 * @fileOverview A script generation AI agent.
 *
 * - aiScriptWriter - A function that handles the script generation process.
 * - AiScriptWriterInput - The input type for the aiScriptWriter function.
 * - AiScriptWriterOutput - The return type for the aiScriptWriter function.
 */

import {z} from 'genkit';
import { generateWithRetry } from '../genkit';
import { textTranslator } from './text-translator';

const AiScriptWriterInputSchema = z.object({
  prompt: z.string().describe('A prompt describing the type of script to generate.'),
  language: z.string().describe('The language for the script.'),
  genre: z.string().describe('The genre of the script.'),
  length: z.string().describe('The desired length of the script.'),
  storytellingMode: z.boolean().describe('Whether to enable storytelling mode for a structured narrative.'),
});
export type AiScriptWriterInput = z.infer<typeof AiScriptWriterInputSchema>;

const AiScriptWriterOutputSchema = z.object({
  script: z.string().describe('The generated script.'),
});
export type AiScriptWriterOutput = z.infer<typeof AiScriptWriterOutputSchema>;

export async function aiScriptWriter(input: AiScriptWriterInput): Promise<AiScriptWriterOutput> {
  // 1. Generate the script in English
  const storytellingPrompt = input.storytellingMode ? `Please ensure the script follows a clear narrative structure with a beginning, middle, and end. It should be engaging and well-structured for storytelling.` : '';

  const prompt = `You are an expert script writer. Generate a script in English based on the following prompt and parameters.

  Prompt: ${input.prompt}
  Genre: ${input.genre}
  Length: ${input.length}
  
  ${storytellingPrompt}
  
  Generate the script now.`;
  
  const scriptOutput = await generateWithRetry<AiScriptWriterOutput>({
      model: 'googleai/gemini-2.0-flash',
      prompt,
      output: {
        schema: AiScriptWriterOutputSchema,
      }
  });
  
  if (!scriptOutput?.script) {
      throw new Error("Failed to generate script.");
  }

  // 2. Translate the script if the target language is not English
  if (input.language !== 'English') {
      const translationResult = await textTranslator({
          text: scriptOutput.script,
          targetLanguage: input.language
      });
      return {
          script: translationResult.translatedText
      };
  }

  return scriptOutput;
}
