'use server';

/**
 * @fileOverview A short-form video script generation AI agent.
 *
 * - reelShortsScriptWriter - A function that handles script generation.
 * - ReelShortsScriptWriterInput - The input type for the function.
 * - ReelShortsScriptWriterOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import {z} from 'genkit';

const ScriptSchema = z.object({
  hook: z.string().describe('The hook (first 3-5 seconds) to grab attention.'),
  mainContent: z.string().describe('The core message or story of the video, broken down into scenes or steps.'),
  callToAction: z.string().describe('The call-to-action to encourage engagement.'),
  caption: z.string().describe('A suggested caption for the social media post.'),
  hashtags: z.array(z.string()).describe('A list of relevant hashtags.'),
});

const ReelShortsScriptWriterInputSchema = z.object({
  topic: z.string().describe('The topic, niche, or main idea for the video.'),
  platform: z.string().describe('The video platform (e.g., Instagram Reels, YouTube Shorts, TikTok).'),
  tone: z.string().describe('The desired tone for the script.'),
  language: z.string().describe('The language for the generated script.'),
});
export type ReelShortsScriptWriterInput = z.infer<typeof ReelShortsScriptWriterInputSchema>;

const ReelShortsScriptWriterOutputSchema = z.object({
  scripts: z.array(ScriptSchema).describe('A list of generated script variations.'),
});
export type ReelShortsScriptWriterOutput = z.infer<typeof ReelShortsScriptWriterOutputSchema>;

export async function reelShortsScriptWriter(input: ReelShortsScriptWriterInput): Promise<ReelShortsScriptWriterOutput> {
  const prompt = `You are an expert viral video script writer. Generate 3 distinct and compelling short-form (15-60 seconds) video scripts in ${input.language} based on the following criteria.

  **Platform:** ${input.platform}
  **Tone:** ${input.tone}
  
  **Topic/Idea:**
  ${input.topic}
  
  **Instructions for each script:**
  1.  **Hook:** Create a powerful hook for the first 3-5 seconds to grab the viewer's attention immediately.
  2.  **Main Content:** Write the core message or story. Break it down into simple, scannable scenes or points.
  3.  **Call-to-Action (CTA):** Provide a clear and strong CTA to encourage likes, comments, shares, or another desired action.
  4.  **Caption:** Write a compelling caption for the post.
  5.  **Hashtags:** Suggest a list of relevant and effective hashtags.
  
  Tailor each script to be effective for the specified **platform** and **tone**. Ensure each of the 3 scripts is a unique take on the topic.
  
  Generate the scripts now.`;
  
  const { output } = await ai.generate({
    model: 'googleai/gemini-2.0-flash',
    prompt,
    output: {
      schema: ReelShortsScriptWriterOutputSchema,
    }
  });

  return output!;
}
