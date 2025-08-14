'use server';

/**
 * @fileOverview An engagement post ideas generation AI agent.
 *
 * - engagementPostGenerator - A function that handles the generation of post ideas.
 * - EngagementPostGeneratorInput - The input type for the function.
 * - EngagementPostGeneratorOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PostIdeaSchema = z.object({
  idea: z.string().describe('The core idea for the post.'),
  caption: z.string().describe('A suggested caption for the post.'),
  hashtags: z.array(z.string()).describe('A list of relevant hashtags.'),
});

const EngagementPostGeneratorInputSchema = z.object({
  topic: z.string().describe('The topic, niche, or target audience for the posts.'),
  platform: z.string().describe('The social media platform (e.g., Instagram, TikTok).'),
  contentType: z.string().describe('The type of content to generate.'),
  language: z.string().describe('The language for the generated ideas.'),
});
export type EngagementPostGeneratorInput = z.infer<typeof EngagementPostGeneratorInputSchema>;

const EngagementPostGeneratorOutputSchema = z.object({
  postIdeas: z.array(PostIdeaSchema).describe('A list of generated engagement post ideas.'),
});
export type EngagementPostGeneratorOutput = z.infer<typeof EngagementPostGeneratorOutputSchema>;

export async function engagementPostGenerator(input: EngagementPostGeneratorInput): Promise<EngagementPostGeneratorOutput> {
  return engagementPostGeneratorFlow(input);
}

const engagementPostPrompt = ai.definePrompt({
  name: 'engagementPostPrompt',
  input: {schema: EngagementPostGeneratorInputSchema},
  output: {schema: EngagementPostGeneratorOutputSchema},
  prompt: `You are an expert social media manager. Generate 5 creative and interaction-focused post ideas in {{language}} based on the following criteria.

**Topic/Niche:** {{{topic}}}
**Platform:** {{platform}}
**Content Type:** {{contentType}}

**Instructions:**
1.  For each idea, generate a core **idea**, a compelling **caption**, and a list of relevant **hashtags**.
2.  Tailor the ideas to be highly engaging for the specified **platform** and **content type**.
3.  Focus on encouraging likes, comments, and shares.
4.  Ensure each post idea is unique and actionable.

Generate the engagement post ideas now.`,
});


const engagementPostGeneratorFlow = ai.defineFlow(
  {
    name: 'engagementPostGeneratorFlow',
    inputSchema: EngagementPostGeneratorInputSchema,
    outputSchema: EngagementPostGeneratorOutputSchema,
  },
  async (input) => {
    const {output} = await engagementPostPrompt(input);
    return output!;
  }
);
