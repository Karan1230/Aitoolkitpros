'use server';

/**
 * @fileOverview A script generation AI agent.
 *
 * - aiScriptWriter - A function that handles the script generation process.
 * - AiScriptWriterInput - The input type for the aiScriptWriter function.
 * - AiScriptWriterOutput - The return type for the aiScriptWriter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
  return aiScriptWriterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiScriptWriterPrompt',
  input: {schema: AiScriptWriterInputSchema},
  output: {schema: AiScriptWriterOutputSchema},
  prompt: `You are an expert script writer. Generate a script based on the following prompt and parameters.

Prompt: {{{prompt}}}
Language: {{language}}
Genre: {{genre}}
Length: {{length}}

{{#if storytellingMode}}
Please ensure the script follows a clear narrative structure with a beginning, middle, and end. It should be engaging and well-structured for storytelling.
{{/if}}

Generate the script now.`,
});

const aiScriptWriterFlow = ai.defineFlow(
  {
    name: 'aiScriptWriterFlow',
    inputSchema: AiScriptWriterInputSchema,
    outputSchema: AiScriptWriterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
