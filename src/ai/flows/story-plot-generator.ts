'use server';

/**
 * @fileOverview A story plot generation AI agent.
 *
 * - storyPlotGenerator - A function that handles the plot generation.
 * - StoryPlotGeneratorInput - The input type for the function.
 * - StoryPlotGeneratorOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StoryPlotGeneratorInputSchema = z.object({
  genre: z.string().describe('The genre of the story.'),
  length: z.string().describe('The desired length and detail of the plot.'),
  characters: z.string().optional().describe('Optional user-defined characters.'),
  setting: z.string().optional().describe('Optional user-defined setting.'),
  theme: z.string().optional().describe('Optional user-defined theme.'),
});
export type StoryPlotGeneratorInput = z.infer<typeof StoryPlotGeneratorInputSchema>;

const StoryPlotGeneratorOutputSchema = z.object({
  title: z.string().describe('A catchy title for the story.'),
  logline: z.string().describe('A one-sentence summary of the story.'),
  plot: z.object({
    characters: z.array(z.object({ name: z.string(), description: z.string() })).describe('The main characters of the story with brief descriptions.'),
    setting: z.string().describe('The time and place where the story is set.'),
    conflict: z.string().describe('The main problem or challenge the characters face.'),
    resolution: z.string().describe('The idea for how the story might end.'),
    outline: z.string().describe('A summary of the plot or a chapter-by-chapter outline if requested.')
  }).describe('The detailed story plot.'),
});
export type StoryPlotGeneratorOutput = z.infer<typeof StoryPlotGeneratorOutputSchema>;

export async function storyPlotGenerator(input: StoryPlotGeneratorInput): Promise<StoryPlotGeneratorOutput> {
  return storyPlotGeneratorFlow(input);
}

const storyPlotPrompt = ai.definePrompt({
  name: 'storyPlotPrompt',
  input: {schema: StoryPlotGeneratorInputSchema},
  output: {schema: StoryPlotGeneratorOutputSchema},
  prompt: `You are an expert storyteller and plot generator. Create a compelling and unique story plot based on the following user requirements.

**Genre:** {{genre}}
**Desired Plot Length/Detail:** {{length}}

{{#if characters}}
**User-defined Characters:** {{{characters}}}
{{/if}}
{{#if setting}}
**User-defined Setting:** {{{setting}}}
{{/if}}
{{#if theme}}
**User-defined Theme:** {{{theme}}}
{{/if}}

**Instructions:**
1.  Generate a catchy and relevant **title** for the story.
2.  Write a concise **logline** (a one-sentence summary).
3.  Describe the **main characters**, giving each a name and a brief, interesting description.
4.  Detail the **setting** (time and place).
5.  Clearly outline the central **conflict** or problem.
6.  Provide a potential **resolution** or ending for the story.
7.  Based on the selected "length", provide an appropriate plot summary or outline in the **outline** field.
    - If "Short idea": Provide a one-paragraph summary.
    - If "Detailed plot": Provide a multi-paragraph, detailed summary of the plot from beginning to end.
    - If "Chapter outline": Provide a list of chapter-by-chapter plot points.

Ensure the entire output is creative, well-structured, and adheres to the requested genre. Generate the story plot now.`,
});


const storyPlotGeneratorFlow = ai.defineFlow(
  {
    name: 'storyPlotGeneratorFlow',
    inputSchema: StoryPlotGeneratorInputSchema,
    outputSchema: StoryPlotGeneratorOutputSchema,
  },
  async (input) => {
    const {output} = await storyPlotPrompt(input);
    return output!;
  }
);
