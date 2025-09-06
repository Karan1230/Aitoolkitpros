'use server';

/**
 * @fileOverview Generates a comprehensive market research report.
 *
 * - marketResearchReportGenerator - A function that handles the report generation.
 * - MarketResearchReportGeneratorInput - The input type for the function.
 * - MarketResearchReportGeneratorOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MarketResearchReportGeneratorInputSchema = z.object({
  industryProduct: z.string().describe('The industry or specific product for the report.'),
  targetMarket: z.string().describe('The target audience or demographic.'),
  region: z.string().describe('The geographical region for the analysis.'),
  reportStyle: z.string().describe('The desired style of the report (e.g., Detailed, Summary).'),
});
export type MarketResearchReportGeneratorInput = z.infer<typeof MarketResearchReportGeneratorInputSchema>;

const MarketResearchReportGeneratorOutputSchema = z.object({
  executiveSummary: z.string().describe('A concise overview of the entire report.'),
  marketOverview: z.object({
    size: z.string().describe('The estimated market size.'),
    growth: z.string().describe('The projected market growth rate.'),
    trends: z.array(z.string()).describe('A list of key market trends.'),
  }),
  targetAudience: z.object({
    demographics: z.string().describe('The demographic profile of the target audience.'),
    needs: z.array(z.string()).describe('A list of the primary needs and pain points of the audience.'),
    behavior: z.string().describe('The purchasing behavior and habits of the audience.'),
  }),
  competitorAnalysis: z.object({
      keyPlayers: z.array(z.object({ name: z.string(), strengths: z.string(), weaknesses: z.string() })).describe("A list of key competitors with their strengths and weaknesses."),
      competitiveLandscape: z.string().describe("An overview of the competitive environment."),
  }),
  swotAnalysis: z.object({
    strengths: z.array(z.string()).describe('Internal strengths of a business in this market.'),
    weaknesses: z.array(z.string()).describe('Internal weaknesses of a business in this market.'),
    opportunities: z.array(z.string()).describe('External opportunities available in the market.'),
    threats: z.array(z.string()).describe('External threats that could impact the market.'),
  }),
  opportunitiesAndChallenges: z.object({
    opportunities: z.array(z.string()).describe('Specific growth opportunities.'),
    challenges: z.array(z.string()).describe('Key challenges to be aware of.'),
  }),
  futureForecast: z.object({
    forecast: z.string().describe('A future outlook for the market.'),
    recommendations: z.array(z.string()).describe('Actionable recommendations for entering or operating in this market.'),
  }),
});
export type MarketResearchReportGeneratorOutput = z.infer<typeof MarketResearchReportGeneratorOutputSchema>;

export async function marketResearchReportGenerator(input: MarketResearchReportGeneratorInput): Promise<MarketResearchReportGeneratorOutput> {
  const prompt = `You are a professional market research analyst. Generate a comprehensive and professionally structured Market Research Report. The report should be of a '${input.reportStyle}' style.

  **Report Topic:** Market for ${input.industryProduct}
  **Target Market:** ${input.targetMarket}
  **Region:** ${input.region}

  **Instructions:**
  Please generate a report with the following sections, ensuring the content is insightful, data-driven (using plausible estimates where real-time data is not available), and professionally toned.

  1.  **Executive Summary:** A concise overview of the key findings and recommendations.
  2.  **Market Overview:** Include estimated market size (in USD), growth prospects (CAGR %), and major current trends.
  3.  **Target Audience Analysis:** Describe the demographics, key needs/pain points, and purchasing behaviors.
  4.  **Competitor Analysis:** Identify 3-4 key players, detailing their primary strengths and weaknesses. Also, describe the overall competitive landscape.
  5.  **SWOT Analysis:** Provide bullet points for Strengths, Weaknesses, Opportunities, and Threats for a new entrant in this market.
  6.  **Opportunities & Challenges:** List specific growth opportunities and key challenges.
  7.  **Future Forecast & Recommendations:** Give a future outlook for the market and provide actionable recommendations for success.

  Generate the report now.`;

  const { output } = await ai.generate({
    model: 'googleai/gemini-2.0-flash',
    prompt,
    output: {
      schema: MarketResearchReportGeneratorOutputSchema,
    }
  });

  return output!;
}
