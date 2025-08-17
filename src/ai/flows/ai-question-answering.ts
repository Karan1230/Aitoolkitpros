'use server';

/**
 * @fileOverview A question-answering AI agent.
 *
 * - aiQuestionAnswering - A function that handles the question-answering process.
 * - AiQuestionAnsweringInput - The input type for the aiQuestionAnswering function.
 * - AiQuestionAnsweringOutput - The return type for the aiQuestionAnswering function.
 */

import { ai } from '@/ai/genkit';
import {z} from 'genkit';
import { textTranslator } from './text-translator';

const AiQuestionAnsweringInputSchema = z.object({
  question: z.string().describe('The question to be answered.'),
  language: z.string().optional().describe('The language for the answer.'),
});
export type AiQuestionAnsweringInput = z.infer<typeof AiQuestionAnsweringInputSchema>;

const AiQuestionAnsweringOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
});
export type AiQuestionAnsweringOutput = z.infer<typeof AiQuestionAnsweringOutputSchema>;

export async function aiQuestionAnswering(input: AiQuestionAnsweringInput): Promise<AiQuestionAnsweringOutput> {
  let questionInEnglish = input.question;

  // 1. Translate the user's question to English if needed
  if (input.language && input.language !== 'English') {
    const translationResult = await textTranslator({
      text: input.question,
      targetLanguage: 'English'
    });
    questionInEnglish = translationResult.translatedText;
  }

  // 2. Get the answer in English
  const { output } = await ai.generate({
      model: 'googleai/gemini-2.0-flash',
      prompt: `Answer the following question: ${questionInEnglish}`,
      output: {
        schema: AiQuestionAnsweringOutputSchema,
      }
  });

  if (!output?.answer) {
    throw new Error("Failed to get an answer from the AI.");
  }

  // 3. Translate the answer back to the user's language if needed
  if (input.language && input.language !== 'English') {
    const translationResult = await textTranslator({
      text: output.answer,
      targetLanguage: input.language
    });
    return {
      answer: translationResult.translatedText
    };
  }
  
  return output;
}
