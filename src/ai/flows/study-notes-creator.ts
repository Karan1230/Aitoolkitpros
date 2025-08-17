'use server';

/**
 * @fileOverview An AI agent for creating study notes from text.
 *
 * - studyNotesCreator - A function that handles the note creation.
 * - StudyNotesCreatorInput - The input type for the function.
 * - StudyNotesCreatorOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import {z} from 'genkit';

const StudyNotesCreatorInputSchema = z.object({
  text: z.string().describe('The source text to create study notes from.'),
  length: z.string().describe('The desired length of the notes (e.g., Short, Medium, Detailed).'),
  format: z.string().describe('The desired format for the notes (e.g., Bullet Points, Paragraph Summary).'),
  language: z.string().describe('The language for the generated notes.'),
});
export type StudyNotesCreatorInput = z.infer<typeof StudyNotesCreatorInputSchema>;

const StudyNotesCreatorOutputSchema = z.object({
  notes: z.string().describe('The generated study notes.'),
});
export type StudyNotesCreatorOutput = z.infer<typeof StudyNotesCreatorOutputSchema>;

export async function studyNotesCreator(input: StudyNotesCreatorInput): Promise<StudyNotesCreatorOutput> {
  const prompt = `You are an expert at creating clear and concise study materials. Analyze the following text and generate high-quality study notes in ${input.language}.

  **Source Text:**
  ${input.text}
  
  **Instructions:**
  1.  Identify and extract the most important key points, definitions, and concepts from the source text.
  2.  Organize the extracted information into a logical structure that is easy to understand and learn from.
  3.  The final notes should be of a **${input.length}** length.
  4.  The output must be formatted as **${input.format}**.
  5.  Do not include any information that is not present in the source text.
  
  Generate the study notes now.`;

  const { output } = await ai.generate({
    model: 'googleai/gemini-2.0-flash',
    prompt,
    output: {
      schema: StudyNotesCreatorOutputSchema,
    }
  });

  return output!;
}
