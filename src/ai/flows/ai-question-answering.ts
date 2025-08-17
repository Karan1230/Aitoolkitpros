'use server';

/**
 * @fileOverview A question-answering AI agent.
 *
 * - aiQuestionAnswering - A function that handles the question-answering process.
 * - AiQuestionAnsweringInput - The input type for the aiQuestionAnswering function.
 * - AiQuestionAnsweringOutput - The return type for the aiQuestionAnswering function.
 */

import { generateWithRetry } from '@/ai/genkit';
import {z} from 'genkit';

const AiQuestionAnsweringInputSchema = z.object({
  question: z.string().describe('The question to be answered.'),
});
export type AiQuestionAnsweringInput = z.infer<typeof AiQuestionAnsweringInputSchema>;

const AiQuestionAnsweringOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
});
export type AiQuestionAnsweringOutput = z.infer<typeof AiQuestionAnsweringOutputSchema>;

export async function aiQuestionAnswering(input: AiQuestionAnsweringInput): Promise<AiQuestionAnsweringOutput> {
  const llmResponse = await generateWithRetry<AiQuestionAnsweringOutput>({
      model: 'googleai/gemini-2.0-flash',
      prompt: `Answer the following question: ${input.question}`,
      output: {
        schema: AiQuestionAnsweringOutputSchema,
      }
    });

    return llmResponse;
}
