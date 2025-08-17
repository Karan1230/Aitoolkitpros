'use server';

/**
 * @fileOverview An idea generation AI agent.
 *
 * - ideaGenerator - A function that generates ideas based on user input.
 * - IdeaGeneratorInput - The input type for the ideaGenerator function.
 * - IdeaGeneratorOutput - The return type for the ideaGenerator function.
 */

import { ai } from '@/ai/genkit';
import {z} from 'genkit';

const IdeaGeneratorInputSchema = z.object({
  topic: z.string().describe('The topic, industry, or niche for which to generate ideas.'),
  ideaType: z.string().describe('The type of ideas to generate (e.g., Business, Marketing, Content).'),
  language: z.string().describe('The language for the generated ideas.'),
});
export type IdeaGeneratorInput = z.infer<typeof IdeaGeneratorInputSchema>;

const IdeaGeneratorOutputSchema = z.object({
  ideas: z.array(z.string()).describe('A list of generated ideas.'),
});
export type IdeaGeneratorOutput = z.infer<typeof IdeaGeneratorOutputSchema>;

export async function ideaGenerator(input: IdeaGeneratorInput): Promise<IdeaGeneratorOutput> {
    const prompt = `You are an expert idea generator. Generate at least 10 creative and relevant "${input.ideaType}" ideas in ${input.language} based on the following topic.

    Topic: ${input.topic}
    
    Please provide the ideas as a simple list.`;
    
    const { output } = await ai.generate({
        model: 'googleai/gemini-2.0-flash',
        prompt,
        output: {
            schema: IdeaGeneratorOutputSchema,
        }
    });

    return output!;
}
