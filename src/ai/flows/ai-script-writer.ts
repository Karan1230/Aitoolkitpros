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
  prompt: `You are an expert script writer. Generate a script based on the following prompt:\n\nPrompt: {{{prompt}}}`,
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
