'use server';

/**
 * @fileOverview Generates quizzes using an AI model.
 *
 * - quizGenerator - A function that handles the quiz generation process.
 * - QuizGeneratorInput - The input type for the quizGenerator function.
 * - QuizGeneratorOutput - The return type for the quizGenerator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QuestionSchema = z.object({
  question: z.string().describe('The question text.'),
  options: z.array(z.string()).optional().describe('A list of possible answers for MCQ.'),
  answer: z.string().describe('The correct answer.'),
  explanation: z.string().describe('A brief explanation of the correct answer.'),
});

const QuizGeneratorInputSchema = z.object({
  topic: z.string().describe('The topic or subject for the quiz.'),
  difficulty: z.string().describe('The difficulty level of the quiz (e.g., Easy, Medium, Hard).'),
  questionType: z.string().describe('The type of questions (e.g., MCQ, True/False, Fill in the Blank).'),
  numQuestions: z.number().int().min(1).max(20).describe('The number of questions to generate.'),
  language: z.string().describe('The language for the quiz.'),
});
export type QuizGeneratorInput = z.infer<typeof QuizGeneratorInputSchema>;

const QuizGeneratorOutputSchema = z.object({
  quiz: z.array(QuestionSchema).describe('The list of generated quiz questions.'),
});
export type QuizGeneratorOutput = z.infer<typeof QuizGeneratorOutputSchema>;

export async function quizGenerator(input: QuizGeneratorInput): Promise<QuizGeneratorOutput> {
  return quizGeneratorFlow(input);
}

const quizGeneratorPrompt = ai.definePrompt({
  name: 'quizGeneratorPrompt',
  input: {schema: QuizGeneratorInputSchema},
  output: {schema: QuizGeneratorOutputSchema},
  prompt: `You are a helpful assistant that creates quizzes. Generate a quiz in {{language}} based on the following parameters.

Topic: {{{topic}}}
Difficulty: {{difficulty}}
Question Type: {{questionType}}
Number of Questions: {{numQuestions}}

For each question, provide the question itself, the options (if MCQ), the correct answer, and a brief explanation for the answer.
Ensure the output is a valid JSON object matching the defined schema.`,
});


const quizGeneratorFlow = ai.defineFlow(
  {
    name: 'quizGeneratorFlow',
    inputSchema: QuizGeneratorInputSchema,
    outputSchema: QuizGeneratorOutputSchema,
  },
  async (input) => {
    const {output} = await quizGeneratorPrompt(input);
    return output!;
  }
);
