'use server';
/**
 * @fileOverview A text rewriting AI agent.
 *
 * - textRewriter - A function that rewrites or paraphrases text.
 * - TextRewriterInput - The input type for the textRewriter function.
 * - TextRewriterOutput - The return type for the textRewriter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TextRewriterInputSchema = z.object({
  text: z.string().describe('The text to be rewritten.'),
  tone: z.string().describe('The desired tone for the rewritten text (e.g., formal, casual, professional).').optional(),
});
export type TextRewriterInput = z.infer<typeof TextRewriterInputSchema>;

const TextRewriterOutputSchema = z.object({
  rewrittenText: z.string().describe('The rewritten text.'),
});
export type TextRewriterOutput = z.infer<typeof TextRewriterOutputSchema>;

export async function textRewriter(input: TextRewriterInput): Promise<TextRewriterOutput> {
  return textRewriterFlow(input);
}

const textRewriterFlow = ai.defineFlow(
  {
    name: 'textRewriterFlow',
    inputSchema: TextRewriterInputSchema,
    outputSchema: TextRewriterOutputSchema,
  },
  async (input) => {
    const prompt = `Rewrite the following text${input.tone ? ` in a ${input.tone} tone` : ''}:\n\n${input.text}`;

    const llmResponse = await ai.generate({
      model: 'openai/gpt-4o',
      prompt,
      output: {
        schema: TextRewriterOutputSchema,
      },
    });

    return llmResponse.output!;
  }
);
