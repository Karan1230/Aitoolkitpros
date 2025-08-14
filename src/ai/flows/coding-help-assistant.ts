'use server';

/**
 * @fileOverview A coding help assistant AI agent.
 *
 * - codingHelpAssistant - A function that provides coding assistance.
 * - CodingHelpAssistantInput - The input type for the codingHelpAssistant function.
 * - CodingHelpAssistantOutput - The return type for the codingHelpAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CodingHelpAssistantInputSchema = z.object({
  prompt: z.string().describe('The coding question or code snippet needing help.'),
});
export type CodingHelpAssistantInput = z.infer<typeof CodingHelpAssistantInputSchema>;

const CodingHelpAssistantOutputSchema = z.object({
  response: z.string().describe('The coding assistance, explanation, or corrected code snippet.'),
});
export type CodingHelpAssistantOutput = z.infer<typeof CodingHelpAssistantOutputSchema>;

export async function codingHelpAssistant(input: CodingHelpAssistantInput): Promise<CodingHelpAssistantOutput> {
  return codingHelpAssistantFlow(input);
}

const codingHelpAssistantFlow = ai.defineFlow(
  {
    name: 'codingHelpAssistantFlow',
    inputSchema: CodingHelpAssistantInputSchema,
    outputSchema: CodingHelpAssistantOutputSchema,
  },
  async (input) => {
    const llmResponse = await ai.generate({
      model: 'googleai/gemini-2.0-flash',
      prompt: `You are a coding help assistant. Provide a helpful response to the following prompt. If it's a code snippet, explain the issue and provide a corrected version. Use markdown for code blocks.\n\n${input.prompt}`,
      output: {
        schema: CodingHelpAssistantOutputSchema,
      }
    });
    return llmResponse.output!;
  }
);
