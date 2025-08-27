'use server';

import { z } from 'zod';

export const YoutubeSeoToolInputSchema = z.object({
    analysisType: z.enum(['video', 'channel', 'keyword']).describe('The type of analysis to perform.'),
    query: z.string().describe('The YouTube URL or keyword for analysis.'),
});
export type YoutubeSeoToolInput = z.infer<typeof YoutubeSeoToolInputSchema>;

export const YoutubeSeoToolOutputSchema = z.object({
    seoScore: z.number().describe('The overall SEO score from 0 to 100.'),
    optimizedTitle: z.string().describe('The AI-suggested optimized title (max 60 chars).'),
    optimizedDescription: z.string().describe('The AI-suggested optimized description (200-300 words).'),
    optimizedTags: z.array(z.string()).describe('A list of 15 AI-suggested SEO-optimized tags.'),
    trendingHashtags: z.array(z.string()).describe('A list of 5 AI-suggested trending hashtags.'),
    competitorKeywordFrequency: z.array(z.object({ name: z.string(), value: z.number() })).describe('An array of competitor keywords and their frequency.'),
    originalData: z.any().optional().describe('The original data fetched from the YouTube API.'),
});
export type YoutubeSeoToolOutput = z.infer<typeof YoutubeSeoToolOutputSchema>;
