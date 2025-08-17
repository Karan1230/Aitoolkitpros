'use server';

/**
 * @fileOverview A product description generation AI agent.
 *
 * - productDescriptionGenerator - A function that handles the description generation.
 * - ProductDescriptionGeneratorInput - The input type for the function.
 * - ProductDescriptionGeneratorOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import {z} from 'genkit';

const ProductDescriptionGeneratorInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  category: z.string().describe('The product category or niche.'),
  features: z.string().describe('A list of key features of the product, separated by commas or new lines.'),
  targetAudience: z.string().describe('The intended audience for the product.'),
  tone: z.string().describe('The desired tone for the description (e.g., Professional, Casual, Sales-oriented, SEO-optimized).'),
});
export type ProductDescriptionGeneratorInput = z.infer<typeof ProductDescriptionGeneratorInputSchema>;

const ProductDescriptionGeneratorOutputSchema = z.object({
  description: z.string().describe('The generated product description.'),
});
export type ProductDescriptionGeneratorOutput = z.infer<typeof ProductDescriptionGeneratorOutputSchema>;

export async function productDescriptionGenerator(input: ProductDescriptionGeneratorInput): Promise<ProductDescriptionGeneratorOutput> {
  const prompt = `You are an expert e-commerce copywriter. Generate a compelling, well-structured, and persuasive product description for an online store.

  **Product Details:**
  - Product Name: ${input.productName}
  - Category: ${input.category}
  - Key Features:
  ${input.features}
  - Target Audience: ${input.targetAudience}
  
  **Tone:** ${input.tone}
  
  **Instructions:**
  1.  Start with a captivating opening that grabs the reader's attention.
  2.  Highlight the key benefits of the features provided.
  3.  Use persuasive language to encourage a purchase.
  4.  Incorporate relevant keywords naturally for SEO, based on the product name and category.
  5.  Structure the description with clear headings and bullet points for readability.
  6.  End with a strong call to action.
  7.  The description should be suitable for platforms like Amazon, Shopify, or Flipkart.
  
  Generate the product description now.`;

  const { output } = await ai.generate({
    model: 'googleai/gemini-2.0-flash',
    prompt,
    output: {
      schema: ProductDescriptionGeneratorOutputSchema,
    }
  });

  return output!;
}
