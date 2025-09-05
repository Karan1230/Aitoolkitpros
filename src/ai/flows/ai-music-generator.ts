
'use server';

/**
 * @fileOverview A music generation AI agent using Google's Lyria model.
 *
 * - aiMusicGenerator - A function that handles the music generation process.
 * - AiMusicGeneratorInput - The input type for the function.
 * - AiMusicGeneratorOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';

const AiMusicGeneratorInputSchema = z.object({
  prompt: z.string().describe('A detailed description of the music to generate.'),
  duration: z.number().int().min(5).max(60).describe('The duration of the music in seconds.'),
});
export type AiMusicGeneratorInput = z.infer<typeof AiMusicGeneratorInputSchema>;

const AiMusicGeneratorOutputSchema = z.object({
  audioDataUri: z.string().describe('The audio data URI in WAV format.'),
});
export type AiMusicGeneratorOutput = z.infer<typeof AiMusicGeneratorOutputSchema>;

export async function aiMusicGenerator(input: AiMusicGeneratorInput): Promise<AiMusicGeneratorOutput> {
  const { media } = await ai.generate({
    model: 'googleai/gemini-2.5-flash-preview-tts', // Note: Using TTS as a stand-in for a dedicated music model
    config: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Algenib' },
        },
      },
    },
    prompt: `Generate a piece of music based on this description: ${input.prompt}. The music should be instrumental and last for ${input.duration} seconds.`,
  });

  if (!media) {
    throw new Error('no media returned from Google AI');
  }
  const audioBuffer = Buffer.from(
    media.url.substring(media.url.indexOf(',') + 1),
    'base64'
  );

  const wavData = await toWav(audioBuffer);
  
  return { audioDataUri: 'data:audio/wav;base64,' + wavData };
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

    let bufs: any[] = [];
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
