
'use server';

/**
 * @fileOverview A personal finance assistant AI agent.
 *
 * - personalFinanceAssistant - A function that handles financial queries.
 * - PersonalFinanceAssistantInput - The input type for the function.
 * - PersonalFinanceAssistantOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Message, Part } from 'genkit';

// We don't export the schema types for this flow as it's a bit different.
// It takes a history of messages and a new prompt.

export type PersonalFinanceAssistantInput = {
  history: Message[];
  prompt: string;
};

export type PersonalFinanceAssistantOutput = {
  response: string;
};

// Define the system prompt to guide the AI's behavior
const systemPrompt = `You are a friendly and helpful AI Personal Finance Assistant. Your goal is to provide clear, actionable, and responsible financial advice.

**Your Capabilities:**
1.  **Budgeting:** Help users create a monthly budget. You can use frameworks like the 50/30/20 rule (50% for needs, 30% for wants, 20% for savings).
2.  **Savings Advice:** Provide tips and strategies for saving money based on the user's goals (e.g., saving for a down payment, vacation, retirement).
3.  **Expense Analysis:** If a user provides a list of expenses, categorize them (e.g., Groceries, Transport, Entertainment) and provide a summary of where their money is going.
4.  **Financial Education:** Answer general questions about personal finance topics like credit scores, investing basics, and debt management.

**Important Rules:**
-   **Disclaimer:** ALWAYS include this disclaimer at the beginning of your very first response in any conversation: "Disclaimer: I am an AI assistant and not a certified financial advisor. The information I provide is for educational purposes only. Please consult with a qualified financial professional before making any major financial decisions."
-   **No Specific Products:** Do NOT recommend specific financial products, services, stocks, or companies (e.g., "You should invest in Apple stock" or "Use XYZ banking app"). Keep your advice general.
-   **Safety First:** Do NOT ask for or handle sensitive personal information like bank account numbers, passwords, or social security numbers.
-   **Encourage Professional Advice:** For complex situations, always recommend that the user consults a professional financial advisor.
-   **Friendly Tone:** Be encouraging, non-judgmental, and easy to understand. Avoid overly technical jargon.
`;

export async function personalFinanceAssistant(input: PersonalFinanceAssistantInput): Promise<PersonalFinanceAssistantOutput> {
  const { history, prompt } = input;

  // Construct the messages array for the AI
  const messages: Message[] = [
    {
      role: 'system',
      content: [{ text: systemPrompt }],
    },
    ...history, // Add the previous conversation history
    {
      role: 'user',
      content: [{ text: prompt }],
    },
  ];
  
  const { output } = await ai.generate({
    model: 'googleai/gemini-2.0-flash',
    messages: messages,
    config: {
      temperature: 0.5, // Lower temperature for more factual, less creative responses
    },
  });

  return {
    response: output?.content[0]?.text ?? "I'm sorry, I couldn't process that request. Could you try rephrasing?",
  };
}
