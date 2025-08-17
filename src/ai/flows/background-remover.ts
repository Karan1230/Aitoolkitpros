'use server';

/**
 * @fileOverview Removes the background from an image using an AI model.
 *
 * - backgroundRemover - A function that handles the background removal process.
 * - BackgroundRemoverInput - The input type for the backgroundRemover function.
 * - BackgroundRemoverOutput - The return type for the backgroundRemover function.
 */

import { generateWithRetry } from '@/ai/genkit';
import {z} from 'genkit';

const BackgroundRemoverInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "The image to process, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  background: z.string().describe('The desired background. This can be "transparent" or a hex color code (e.g., "#FFFFFF").'),
});
export type BackgroundRemoverInput = z.infer<typeof BackgroundRemoverInputSchema>;

const BackgroundRemoverOutputSchema = z.object({
  imageUrl: z.string().describe('The URL of the image with the background removed.'),
});
export type BackgroundRemoverOutput = z.infer<typeof BackgroundRemoverOutputSchema>;

export async function backgroundRemover(input: BackgroundRemoverInput): Promise<BackgroundRemoverOutput> {
    const promptText = `Please identify the main subject in the provided image and remove the background completely. Replace the background with ${input.background}. The output should be a clean PNG with the isolated subject.`;

    const prompt = [
        { text: promptText },
        { media: { url: input.imageDataUri } }
    ];

    const { media } = await generateWithRetry<{ media?: { url: string } }>({
        model: 'googleai/gemini-2.0-flash-preview-image-generation',
        prompt,
        config: {
            responseModalities: ['TEXT', 'IMAGE'],
        },
    });

    if (!media?.url) {
        throw new Error("Failed to remove background from the image.");
    }
    
    return { imageUrl: media.url };
}
