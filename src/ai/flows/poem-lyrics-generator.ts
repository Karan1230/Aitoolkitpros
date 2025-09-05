'use server';

/**
 * @fileOverview An AI agent for generating poems and song lyrics.
 *
 * - poemLyricsGenerator - A function that handles the generation.
 * - PoemLyricsGeneratorInput - The input type for the function.
 * - PoemLyricsGeneratorOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PoemLyricsGeneratorInputSchema = z.object({
  topic: z.string().describe('The main topic or theme for the content.'),
  type: z.string().describe('The type of content to generate (e.g., Poem, Song Lyrics).'),
  genre: z.string().describe('The genre or style (e.g., Love, Nature, Pop, Rap).'),
  mood: z.string().describe('The desired mood or emotion (e.g., Happy, Sad, Reflective).'),
  language: z.string().describe('The language for the generated content.'),
});
export type PoemLyricsGeneratorInput = z.infer<typeof PoemLyricsGeneratorInputSchema>;

const PoemLyricsGeneratorOutputSchema = z.object({
  content: z.string().describe('The generated poem or song lyrics.'),
});
export type PoemLyricsGeneratorOutput = z.infer<typeof PoemLyricsGeneratorOutputSchema>;

export async function poemLyricsGenerator(input: PoemLyricsGeneratorInput): Promise<PoemLyricsGeneratorOutput> {
  const prompt = `You are an expert ${input.type.toLowerCase()} writer. Generate a ${input.type.toLowerCase()} in ${input.language} based on the following criteria.

  **Topic/Theme:** ${input.topic}
  **Genre:** ${input.genre}
  **Mood:** ${input.mood}
  
  **Instructions:**
  1.  If the type is "Song Lyrics," structure the output with clear sections like [Verse 1], [Chorus], [Verse 2], [Bridge], etc.
  2.  If the type is "Poem," create a well-structured poem that is evocative and follows a consistent theme.
  3.  The generated content must be original and creative.
  4.  Ensure the tone of the content matches the specified mood.
  
  Generate the ${input.type.toLowerCase()} now.`;
  
  const { output } = await ai.generate({
    model: 'googleai/gemini-2.0-flash',
    prompt,
    output: {
      schema: PoemLyricsGeneratorOutputSchema,
    }
  });

  return output!;
}
