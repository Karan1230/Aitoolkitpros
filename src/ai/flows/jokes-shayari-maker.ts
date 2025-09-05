'use server';

/**
 * @fileOverview An AI agent for generating jokes, shayari, and pickup lines.
 *
 * - jokesShayariMaker - A function that handles the content generation.
 * - JokesShayariMakerInput - The input type for the function.
 * - JokesShayariMakerOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const JokesShayariMakerInputSchema = z.object({
  type: z.string().describe('The type of content to generate (e.g., Joke, Shayari, Pickup Line).'),
  topic: z.string().describe('The topic for the content.'),
  tone: z.string().describe('The desired tone (e.g., Funny, Romantic, Witty).'),
  language: z.string().describe('The language for the generated content.'),
});
export type JokesShayariMakerInput = z.infer<typeof JokesShayariMakerInputSchema>;

const JokesShayariMakerOutputSchema = z.object({
  results: z.array(z.string()).describe('A list of 5 generated items.'),
});
export type JokesShayariMakerOutput = z.infer<typeof JokesShayariMakerOutputSchema>;

export async function jokesShayariMaker(input: JokesShayariMakerInput): Promise<JokesShayariMakerOutput> {
  const prompt = `You are an expert ${input.type.toLowerCase()} writer from India. Generate 5 unique and high-quality items in the ${input.language} language based on the following criteria.

  **Content Type:** ${input.type}
  **Topic:** ${input.topic}
  **Tone:** ${input.tone}
  
  **Instructions:**
  1.  Generate content that strictly matches the requested **type**, **topic**, and **tone**.
  2.  If the type is "Shayari," it should be poetic and follow a proper rhyming scheme if applicable.
  3.  If the type is "Joke," it should be a funny one-liner or a short joke.
  4.  If the type is "Pickup Line," it should be clever, charming, or funny.
  5.  Ensure the content is creative, original, and relevant.
  
  Generate the list of 5 items now.`;
  
  const { output } = await ai.generate({
    model: 'googleai/gemini-2.0-flash',
    prompt,
    output: {
      schema: JokesShayariMakerOutputSchema,
    }
  });

  return output!;
}
