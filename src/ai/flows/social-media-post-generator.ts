'use server';
/**
 * @fileOverview A social media post generation AI agent.
 *
 * - socialMediaPostGenerator - A function that generates social media posts.
 * - SocialMediaPostGeneratorInput - The input type for the function.
 * - SocialMediaPostGeneratorOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import {z} from 'genkit';

const SocialMediaPostGeneratorInputSchema = z.object({
  topic: z.string().describe('The topic for the social media post.'),
  language: z.string().describe('The language for the post.'),
});
export type SocialMediaPostGeneratorInput = z.infer<typeof SocialMediaPostGeneratorInputSchema>;

const SocialMediaPostGeneratorOutputSchema = z.object({
  post: z.string().describe('The generated social media post with hashtags.'),
});
export type SocialMediaPostGeneratorOutput = z.infer<typeof SocialMediaPostGeneratorOutputSchema>;

export async function socialMediaPostGenerator(input: SocialMediaPostGeneratorInput): Promise<SocialMediaPostGeneratorOutput> {
    const { output } = await ai.generate({
      model: 'googleai/gemini-2.0-flash',
      prompt: `Generate a social media post in ${input.language} about "${input.topic}". Include relevant hashtags.`,
      output: {
        schema: SocialMediaPostGeneratorOutputSchema,
      }
    });

    return output!;
}
