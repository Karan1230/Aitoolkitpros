'use server';

/**
 * @fileOverview A hashtag generation AI agent.
 *
 * - hashtagGenerator - A function that handles the hashtag generation process.
 * - HashtagGeneratorInput - The input type for the function.
 * - HashtagGeneratorOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HashtagGeneratorInputSchema = z.object({
  topic: z.string().describe('The topic, niche, or description for which to generate hashtags.'),
  platform: z.string().describe('The social media platform for which the hashtags are optimized.'),
  style: z.string().describe('The desired style of hashtags.'),
});
export type HashtagGeneratorInput = z.infer<typeof HashtagGeneratorInputSchema>;

const HashtagGeneratorOutputSchema = z.object({
  hashtags: z.array(z.string()).describe('A list of generated hashtags, including the # symbol.'),
});
export type HashtagGeneratorOutput = z.infer<typeof HashtagGeneratorOutputSchema>;

export async function hashtagGenerator(input: HashtagGeneratorInput): Promise<HashtagGeneratorOutput> {
  return hashtagGeneratorFlow(input);
}

const hashtagGeneratorPrompt = ai.definePrompt({
  name: 'hashtagGeneratorPrompt',
  input: {schema: HashtagGeneratorInputSchema},
  output: {schema: HashtagGeneratorOutputSchema},
  prompt: `You are a social media expert specializing in hashtag strategy. Generate a list of at least 20 relevant hashtags based on the following criteria.

**Topic/Niche:** {{{topic}}}
**Platform:** {{platform}}
**Hashtag Style:** {{style}}

**Instructions:**
1.  Generate hashtags that are highly relevant to the topic.
2.  Optimize the hashtags for the specified platform (e.g., more general for Instagram, more niche for TikTok).
3.  Adhere to the requested style:
    - If "Short & Popular," focus on high-volume, widely used hashtags.
    - If "Long-Tail & Niche," focus on more specific, community-focused hashtags.
    - If "Mixed," provide a healthy balance of both popular and niche hashtags.
4.  Ensure every item in the output array is a string that starts with the '#' symbol.

Generate the list of hashtags now.`,
});


const hashtagGeneratorFlow = ai.defineFlow(
  {
    name: 'hashtagGeneratorFlow',
    inputSchema: HashtagGeneratorInputSchema,
    outputSchema: HashtagGeneratorOutputSchema,
  },
  async (input) => {
    const {output} = await hashtagGeneratorPrompt(input);
    return output!;
  }
);
