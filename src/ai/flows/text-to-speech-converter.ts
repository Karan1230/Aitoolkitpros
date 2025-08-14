'use server';
/**
 * @fileOverview Converts text to speech using various AI models. It supports
 * multiple voices and languages for creating accessible audio content.
 *
 * - textToSpeechConverter - A function that converts text to speech.
 * - TextToSpeechConverterInput - The input type for the textToSpeechConverter function.
 * - TextToSpeechConverterOutput - The return type for the textToSpeechConverter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const TextToSpeechConverterInputSchema = z.object({
  text: z.string().describe('The text to convert to speech.'),
  model: z.string().describe('The TTS model to use.'),
  language: z.string().describe('The language of the text.').optional(),
});
export type TextToSpeechConverterInput = z.infer<typeof TextToSpeechConverterInputSchema>;

const TextToSpeechConverterOutputSchema = z.object({
  audioDataUri: z.string().describe('The audio data URI in WAV or MP3 format.'),
});
export type TextToSpeechConverterOutput = z.infer<typeof TextToSpeechConverterOutputSchema>;

export async function textToSpeechConverter(input: TextToSpeechConverterInput): Promise<TextToSpeechConverterOutput> {
  return textToSpeechConverterFlow(input);
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}


const textToSpeechConverterFlow = ai.defineFlow(
  {
    name: 'textToSpeechConverterFlow',
    inputSchema: TextToSpeechConverterInputSchema,
    outputSchema: TextToSpeechConverterOutputSchema,
  },
  async (input) => {
    let audioDataUri: string;
    
    if (input.model.startsWith('googleai/')) {
        const { media } = await ai.generate({
            model: input.model as any,
            config: {
                responseModalities: ['AUDIO'],
                speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: 'Algenib' },
                },
                },
            },
            prompt: input.text,
        });

        if (!media) {
            throw new Error('no media returned from Google AI');
        }
        const audioBuffer = Buffer.from(
            media.url.substring(media.url.indexOf(',') + 1),
            'base64'
        );
        audioDataUri = 'data:audio/wav;base64,' + (await toWav(audioBuffer));

    } else {
        throw new Error(`Unsupported model: ${input.model}`);
    }

    return { audioDataUri };
  }
);
