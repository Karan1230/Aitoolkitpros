'use server';

/**
 * @fileOverview A roast and joke generation AI agent.
 *
 * - roastJokeGenerator - A function that handles the joke/roast generation.
 * - RoastJokeGeneratorInput - The input type for the function.
 * - RoastJokeGeneratorOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import {z} from 'genkit';

const RoastJokeGeneratorInputSchema = z.object({
  mode: z.string().describe('The mode of generation (e.g., Roast, Joke, Mixed).'),
  tone: z.string().describe('The desired tone for the output.'),
  topic: z.string().describe('The topic, name, or scenario to generate content about.'),
  language: z.string().describe('The language for the generated content.'),
  safeSearch: z.boolean().describe('Whether to enable family-friendly filtering.'),
});
export type RoastJokeGeneratorInput = z.infer<typeof RoastJokeGeneratorInputSchema>;

const RoastJokeGeneratorOutputSchema = z.object({
  results: z.array(z.string()).describe('A list of generated roasts or jokes.'),
});
export type RoastJokeGeneratorOutput = z.infer<typeof RoastJokeGeneratorOutputSchema>;

export async function roastJokeGenerator(input: RoastJokeGeneratorInput): Promise<RoastJokeGeneratorOutput> {
  const safeSearchInstruction = input.safeSearch ? `6. CRITICAL: All content must be strictly family-friendly. Avoid any offensive, vulgar, or inappropriate topics. No dark humor.` : '';

  const prompt = `You are an expert comedian and roast master. Generate a list of 10 funny and witty items in ${input.language} based on the following criteria.

  **Mode:** ${input.mode}
  **Tone:** ${input.tone}
  **Topic/Subject:** ${input.topic}
  
  **Instructions:**
  1.  Generate content that strictly matches the requested **mode** and **tone**.
  2.  If the mode is "Roast," generate clever and funny insults.
  3.  If the mode is "Joke," generate creative one-liners or short jokes.
  4.  If the mode is "Mixed," generate a combination of both roasts and jokes.
  5.  Ensure the content is genuinely funny and relevant to the topic.
  ${safeSearchInstruction}
  
  Generate the list of 10 items now.`;
  
  const { output } = await ai.generate({
    model: 'googleai/gemini-2.0-flash',
    prompt,
    output: {
      schema: RoastJokeGeneratorOutputSchema,
    }
  });

  return output!;
}
