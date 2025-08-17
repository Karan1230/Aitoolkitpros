'use server';

/**
 * @fileOverview A gift suggestion generation AI agent.
 *
 * - giftSuggestionGenerator - A function that handles the gift suggestion process.
 * - GiftSuggestionGeneratorInput - The input type for the function.
 * - GiftSuggestionGeneratorOutput - The return type for the function.
 */

import { generateWithRetry } from '@/ai/genkit';
import {z} from 'genkit';

const GiftIdeaSchema = z.object({
  name: z.string().describe('The name of the gift idea.'),
  description: z.string().describe('A brief description explaining why it\'s a good gift.'),
  category: z.string().describe('The category of the gift (e.g., Tech, Books, Fashion).'),
});

const GiftSuggestionGeneratorInputSchema = z.object({
  interests: z.string().describe('The recipient\'s interests, hobbies, or passions.'),
  occasion: z.string().describe('The occasion for the gift (e.g., Birthday, Anniversary, Christmas).'),
  age: z.string().describe('The age range of the recipient.'),
  priceRange: z.string().describe('The budget or price range for the gift.'),
  language: z.string().describe('The language for the generated gift ideas.'),
});
export type GiftSuggestionGeneratorInput = z.infer<typeof GiftSuggestionGeneratorInputSchema>;

const GiftSuggestionGeneratorOutputSchema = z.object({
  giftIdeas: z.array(GiftIdeaSchema).describe('A list of 10 generated gift suggestions.'),
});
export type GiftSuggestionGeneratorOutput = z.infer<typeof GiftSuggestionGeneratorOutputSchema>;

export async function giftSuggestionGenerator(input: GiftSuggestionGeneratorInput): Promise<GiftSuggestionGeneratorOutput> {
  const prompt = `You are an expert gift advisor. Generate a list of 10 thoughtful and creative gift suggestions in ${input.language} based on the following criteria.

  **Occasion:** ${input.occasion}
  **Age Range:** ${input.age}
  **Price Range:** ${input.priceRange}
  
  **Recipient's Interests & Hobbies:**
  ${input.interests}
  
  **Instructions:**
  1.  Generate 10 unique gift ideas.
  2.  For each idea, provide a **name**, a short **description** explaining why it's a suitable gift, and a relevant **category**.
  3.  Ensure the suggestions are highly relevant to the recipient's interests and the specified occasion.
  4.  Do not include links to purchase the items. Just provide the gift ideas.
  
  Generate the gift suggestions now.`;
  
  const llmResponse = await generateWithRetry<GiftSuggestionGeneratorOutput>({
    model: 'googleai/gemini-2.0-flash',
    prompt,
    output: {
      schema: GiftSuggestionGeneratorOutputSchema,
    }
  });

  return llmResponse;
}
