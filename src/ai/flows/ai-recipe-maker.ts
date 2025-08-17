'use server';

/**
 * @fileOverview An AI recipe generation agent.
 *
 * - aiRecipeMaker - A function that handles recipe generation.
 * - AiRecipeMakerInput - The input type for the function.
 * - AiRecipeMakerOutput - The return type for the function.
 */

import { generateWithRetry } from '@/ai/genkit';
import {z} from 'genkit';

const RecipeSchema = z.object({
    title: z.string().describe("The creative and appealing title of the recipe."),
    description: z.string().describe("A short, enticing description of the dish."),
    cookingTime: z.string().describe("The estimated total cooking time (e.g., '30 minutes')."),
    servingSize: z.string().describe("The recommended number of servings (e.g., '4 servings')."),
    ingredients: z.array(z.string()).describe("The list of required ingredients and their quantities."),
    instructions: z.array(z.string()).describe("The step-by-step cooking instructions."),
    tips: z.array(z.string()).optional().describe("Optional cooking tips or variations."),
});

const AiRecipeMakerInputSchema = z.object({
  ingredients: z.string().describe('The list of ingredients the user has available.'),
  cuisine: z.string().describe('The desired cuisine type (e.g., Italian, Mexican, Indian).'),
  mealType: z.string().describe('The desired meal type (e.g., Breakfast, Lunch, Dinner, Snack).'),
  dietaryPreference: z.string().describe('Any dietary restrictions or preferences (e.g., Vegetarian, Gluten-Free, Low-Carb).'),
  language: z.string().describe('The language for the generated recipe.'),
});
export type AiRecipeMakerInput = z.infer<typeof AiRecipeMakerInputSchema>;

const AiRecipeMakerOutputSchema = z.object({
  recipes: z.array(RecipeSchema).describe('A list of 3 generated recipe ideas.'),
});
export type AiRecipeMakerOutput = z.infer<typeof AiRecipeMakerOutputSchema>;

export async function aiRecipeMaker(input: AiRecipeMakerInput): Promise<AiRecipeMakerOutput> {
  const prompt = `You are an expert chef and recipe developer. Generate 3 distinct and delicious recipes in ${input.language} based on the following criteria.

  **Available Ingredients:**
  ${input.ingredients}
  
  **Preferences:**
  - Cuisine: ${input.cuisine}
  - Meal Type: ${input.mealType}
  - Dietary Preference: ${input.dietaryPreference}
  
  **Instructions:**
  1.  Prioritize using the **Available Ingredients**. You may include a few common pantry staples (like salt, pepper, oil, water) if necessary.
  2.  For each of the 3 recipes, provide a complete plan:
      - A creative **title**.
      - A short, enticing **description**.
      - Estimated **cookingTime**.
      - Recommended **servingSize**.
      - A list of **ingredients** with quantities.
      - Clear, step-by-step **instructions**.
      - (Optional) A couple of helpful **tips** or variations.
  3.  Ensure the recipes are tailored to the specified cuisine, meal type, and dietary preferences.
  4.  Each recipe should be unique and appealing.
  
  Generate the recipes now.`;

  const llmResponse = await generateWithRetry<AiRecipeMakerOutput>({
    model: 'googleai/gemini-2.0-flash',
    prompt,
    output: {
      schema: AiRecipeMakerOutputSchema,
    }
  });

  return llmResponse;
}
