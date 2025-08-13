'use server';
/**
 * @fileOverview Converts voice to text using AssemblyAI API.
 *
 * - voiceToTextConverter - A function that handles the voice to text conversion process.
 * - VoiceToTextConverterInput - The input type for the voiceToTextConverter function.
 * - VoiceToTextConverterOutput - The return type for the voiceToTextConverter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VoiceToTextConverterInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "The audio file to transcribe, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type VoiceToTextConverterInput = z.infer<typeof VoiceToTextConverterInputSchema>;

const VoiceToTextConverterOutputSchema = z.object({
  transcription: z.string().describe('The transcribed text from the audio.'),
});
export type VoiceToTextConverterOutput = z.infer<typeof VoiceToTextConverterOutputSchema>;

export async function voiceToTextConverter(input: VoiceToTextConverterInput): Promise<VoiceToTextConverterOutput> {
  return voiceToTextConverterFlow(input);
}

const voiceToTextConverterPrompt = ai.definePrompt({
  name: 'voiceToTextConverterPrompt',
  input: {schema: VoiceToTextConverterInputSchema},
  output: {schema: VoiceToTextConverterOutputSchema},
  prompt: `You are an expert transcriptionist. Please transcribe the following audio file into text.  Here is the audio file:

Audio: {{media url=audioDataUri}}`,
});

const voiceToTextConverterFlow = ai.defineFlow(
  {
    name: 'voiceToTextConverterFlow',
    inputSchema: VoiceToTextConverterInputSchema,
    outputSchema: VoiceToTextConverterOutputSchema,
  },
  async input => {
    const {output} = await voiceToTextConverterPrompt(input);
    return output!;
  }
);
