'use server';
/**
 * @fileOverview Converts voice to text, then translates it.
 *
 * - voiceToTextConverter - Transcribes audio and translates the result.
 * - VoiceToTextConverterInput - The input type for the voiceToTextConverter function.
 * - VoiceToTextConverterOutput - The return type for the voiceToTextConverter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { textTranslatorFlow } from './text-translator';

const VoiceToTextConverterInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "The audio file to transcribe, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
    ),
  targetLanguage: z.string().describe('The target language for the final text output.'),
});
export type VoiceToTextConverterInput = z.infer<typeof VoiceToTextConverterInputSchema>;

const VoiceToTextConverterOutputSchema = z.object({
  translatedText: z.string().describe('The translated text from the audio.'),
});
export type VoiceToTextConverterOutput = z.infer<typeof VoiceToTextConverterOutputSchema>;

export async function voiceToTextConverter(input: VoiceToTextConverterInput): Promise<VoiceToTextConverterOutput> {
  return voiceToTextConverterFlow(input);
}

const transcriptionPrompt = ai.definePrompt({
    name: 'transcriptionPrompt',
    input: { schema: z.object({ audioDataUri: z.string() }) },
    output: { schema: z.object({ transcription: z.string() }) },
    prompt: `Please transcribe the following audio file into text.

Audio: {{media url=audioDataUri}}`,
});


const voiceToTextConverterFlow = ai.defineFlow(
  {
    name: 'voiceToTextConverterFlow',
    inputSchema: VoiceToTextConverterInputSchema,
    outputSchema: VoiceToTextConverterOutputSchema,
  },
  async input => {
    // 1. Transcribe the audio
    const { output: transcriptionOutput } = await transcriptionPrompt({ audioDataUri: input.audioDataUri });
    if (!transcriptionOutput?.transcription) {
        throw new Error("Failed to transcribe audio.");
    }

    // 2. Translate the transcription
    const translationResult = await textTranslatorFlow({
        text: transcriptionOutput.transcription,
        targetLanguage: input.targetLanguage
    });

    return {
        translatedText: translationResult.translatedText
    };
  }
);
