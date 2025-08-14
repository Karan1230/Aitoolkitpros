'use server';

/**
 * @fileOverview A horoscope generation AI agent.
 *
 * - horoscopeGenerator - A function that handles the horoscope generation.
 * - HoroscopeGeneratorInput - The input type for the function.
 * - HoroscopeGeneratorOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HoroscopeGeneratorInputSchema = z.object({
  zodiacSign: z.string().describe('The zodiac sign for the horoscope.'),
  timeframe: z.string().describe('The timeframe for the horoscope (e.g., Daily, Weekly, Monthly).'),
  language: z.string().describe('The language for the generated horoscope.'),
});
export type HoroscopeGeneratorInput = z.infer<typeof HoroscopeGeneratorInputSchema>;

const HoroscopeGeneratorOutputSchema = z.object({
    love: z.string().describe("The horoscope prediction for love and relationships."),
    career: z.string().describe("The horoscope prediction for career and finance."),
    health: z.string().describe("The horoscope prediction for health and wellness."),
    luckyNumber: z.string().describe("The lucky number for the period."),
    luckyColor: z.string().describe("The lucky color for the period."),
});
export type HoroscopeGeneratorOutput = z.infer<typeof HoroscopeGeneratorOutputSchema>;

export async function horoscopeGenerator(input: HoroscopeGeneratorInput): Promise<HoroscopeGeneratorOutput> {
  return horoscopeGeneratorFlow(input);
}

const horoscopePrompt = ai.definePrompt({
  name: 'horoscopePrompt',
  input: {schema: HoroscopeGeneratorInputSchema},
  output: {schema: HoroscopeGeneratorOutputSchema},
  prompt: `You are an expert astrologer. Generate a personalized, insightful, and positive horoscope in {{language}} for the following zodiac sign.

**Zodiac Sign:** {{zodiacSign}}
**Timeframe:** {{timeframe}}

**Instructions:**
1.  Generate a detailed prediction for each of the following categories:
    - **Love & Relationships**
    - **Career & Finance**
    - **Health & Wellness**
2.  Provide a **Lucky Number** and a **Lucky Color** for the specified timeframe.
3.  The tone should be encouraging, positive, and engaging.
4.  Ensure the predictions are tailored to the specified timeframe.

Generate the horoscope now.`,
});


const horoscopeGeneratorFlow = ai.defineFlow(
  {
    name: 'horoscopeGeneratorFlow',
    inputSchema: HoroscopeGeneratorInputSchema,
    outputSchema: HoroscopeGeneratorOutputSchema,
  },
  async (input) => {
    const {output} = await horoscopePrompt(input);
    return output!;
  }
);
