import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {elevenLabs} from '@genkit-ai/elevenlabs';


export const ai = genkit({
  plugins: [
    googleAI(),
    elevenLabs({apiKey: process.env.ELEVENLABS_API_KEY}),
  ],
  model: 'googleai/gemini-2.0-flash',
});
