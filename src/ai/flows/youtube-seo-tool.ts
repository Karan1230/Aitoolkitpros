
'use server';

/**
 * @fileOverview A YouTube SEO analysis and optimization AI agent.
 *
 * - youtubeSeoTool - The main flow for the tool.
 * - YoutubeSeoToolInput - The input type for the flow.
 * - YoutubeSeoToolOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getVideoDetails, getChannelDetails, searchVideosByKeyword, extractKeywords } from '@/services/youtube';
import { YoutubeSeoToolInputSchema, YoutubeSeoToolOutputSchema, type YoutubeSeoToolInput, type YoutubeSeoToolOutput } from '@/ai/schemas/youtube-seo-tool-schemas';

// Define schemas for tools
const VideoDetailsToolSchema = z.object({
    id: z.string().describe('The YouTube video ID.'),
});
const ChannelDetailsToolSchema = z.object({
    id: z.string().describe('The YouTube channel ID.'),
});
const KeywordSearchToolSchema = z.object({
    keyword: z.string().describe('The keyword to search for on YouTube.'),
});

// Define Genkit tools
const getVideoDetailsTool = ai.defineTool(
    {
        name: 'getVideoDetails',
        description: 'Fetches details for a specific YouTube video.',
        inputSchema: VideoDetailsToolSchema,
        outputSchema: z.any(),
    },
    async (input) => getVideoDetails(input.id)
);

const getChannelDetailsTool = ai.defineTool(
    {
        name: 'getChannelDetails',
        description: 'Fetches details for a specific YouTube channel.',
        inputSchema: ChannelDetailsToolSchema,
        outputSchema: z.any(),
    },
    async (input) => getChannelDetails(input.id)
);

const searchVideosByKeywordTool = ai.defineTool(
    {
        name: 'searchVideosByKeyword',
        description: 'Searches for top 10 videos on YouTube based on a keyword.',
        inputSchema: KeywordSearchToolSchema,
        outputSchema: z.any(),
    },
    async (input) => searchVideosByKeyword(input.keyword)
);

const seoPrompt = ai.definePrompt({
    name: 'youtubeSeoPrompt',
    tools: [getVideoDetailsTool, getChannelDetailsTool, searchVideosByKeywordTool],
    prompt: `You are a YouTube SEO expert with years of experience in optimizing video content for maximum reach and engagement. Analyze the provided YouTube data and generate a comprehensive SEO report.

Here is the data for analysis:
{{#if videoData}}
**Video Data:**
Title: {{videoData.title}}
Description: {{videoData.description}}
Tags: {{#if videoData.tags}}{{videoData.tags.join ', '}}{{else}}No tags provided{{/if}}
{{/if}}

{{#if channelData}}
**Channel Data:**
Title: {{channelData.title}}
Description: {{channelData.description}}
Subscriber Count: {{channelData.subscriberCount}}
Video Count: {{channelData.videoCount}}
{{/if}}

{{#if competitorKeywords}}
**Top Competitor Keywords:**
{{competitorKeywords.join ', '}}
{{/if}}

**Your Tasks:**
Based on the provided data, perform the following tasks. Ensure every field in the output is filled.

1.  **SEO Score:** Provide an SEO score out of 100. Base this on the title length, description quality, tag relevance, and comparison to competitor data if available.
2.  **Optimized Title:** Suggest an optimized, compelling title (max 60 characters).
3.  **Optimized Description:** Write a keyword-rich, engaging description (200–300 words).
4.  **Optimized Tags:** Suggest 15 highly relevant, SEO-optimized tags.
5.  **Trending Hashtags:** Suggest 5 trending and relevant hashtags.
6.  **Competitor Keyword Frequency:** Analyze the competitor keywords and provide a frequency count for the top 10 most common keywords.
`,
    output: {
        schema: YoutubeSeoToolOutputSchema,
    },
});


export async function youtubeSeoTool(input: YoutubeSeoToolInput): Promise<YoutubeSeoToolOutput> {
    let promptData: {
        videoData?: any;
        channelData?: any;
        competitorKeywords?: string[];
    } = {};

    let originalData: any = null;

    if (input.analysisType === 'video') {
        const videoId = new URL(input.query).searchParams.get('v');
        if (!videoId) throw new Error('Invalid YouTube video URL');
        const videoDetails = await getVideoDetails(videoId);
        originalData = videoDetails;
        promptData.videoData = videoDetails;

        // Also fetch competitor data for video analysis
        const competitorVideos = await searchVideosByKeyword(videoDetails.title);
        promptData.competitorKeywords = extractKeywords(competitorVideos);

    } else if (input.analysisType === 'channel') {
        let channelId = '';
        const url = new URL(input.query);
        if(url.pathname.startsWith('/@')) {
            // Handle vanity URL e.g., https://www.youtube.com/@Google
            // This is a simplification; a proper implementation would need to resolve the handle to an ID.
            // For now, we will assume the last part of the path is the ID if it doesn't start with @
             channelId = url.pathname.substring(2);
        } else if (url.pathname.startsWith('/channel/')) {
            channelId = url.pathname.split('/')[2];
        } else {
             throw new Error('Invalid or unsupported YouTube channel URL format.');
        }

        const channelDetails = await getChannelDetails(channelId);
        originalData = channelDetails;
        promptData.channelData = channelDetails;
        
        // Also fetch competitor data based on channel title/topic
        const competitorVideos = await searchVideosByKeyword(channelDetails.title);
        promptData.competitorKeywords = extractKeywords(competitorVideos);
        
    } else if (input.analysisType === 'keyword') {
        const competitorVideos = await searchVideosByKeyword(input.query);
        originalData = competitorVideos;
        promptData.competitorKeywords = extractKeywords(competitorVideos);
        // Use the first video as a base for title/desc suggestions
        if (competitorVideos.length > 0) {
            promptData.videoData = {
                title: input.query,
                description: 'A video about ' + input.query,
                tags: []
            }
        }
    }

    const { output } = await seoPrompt(promptData);
    if (!output) throw new Error("The AI failed to generate an SEO report.");

    return { ...output, originalData };
}
