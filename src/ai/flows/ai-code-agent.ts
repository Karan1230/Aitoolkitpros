
'use server';

/**
 * @fileOverview An AI agent that generates a complete codebase from a prompt.
 *
 * - aiCodeAgent - A function that handles the code generation and zipping process.
 * - AiCodeAgentInput - The input type for the function.
 * - AiCodeAgentOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import JSZip from 'jszip';

// Define input and output schemas
const AiCodeAgentInputSchema = z.object({
  prompt: z.string().describe('A detailed description of the application to be built, including technologies and features.'),
});
export type AiCodeAgentInput = z.infer<typeof AiCodeAgentInputSchema>;

const FileSchema = z.object({
    path: z.string().describe("The full path of the file, including directories and the file name (e.g., 'src/components/Button.tsx')."),
    content: z.string().describe("The complete code or content for the file."),
});

const CodebaseSchema = z.object({
  files: z.array(FileSchema).describe('An array of all files needed for the project.'),
});

const AiCodeAgentOutputSchema = z.object({
  zipData: z.string().describe('The base64 encoded string of the generated ZIP file.'),
});
export type AiCodeAgentOutput = z.infer<typeof AiCodeAgentOutputSchema>;


const codeAgentPrompt = ai.definePrompt({
    name: 'codeAgentPrompt',
    input: { schema: AiCodeAgentInputSchema },
    output: { schema: CodebaseSchema },
    prompt: `You are an expert software engineer who specializes in creating complete, production-ready applications from a single prompt.

    **Task:**
    Generate a full codebase for the following project description. You must create all necessary files, including package.json, configuration files, components, styles, etc. Organize the files in a logical directory structure.
    
    **Project Description:**
    "{{{prompt}}}"
    
    **Instructions:**
    1.  **Think Step-by-Step:** First, decide on the folder structure. Then, plan out each file and its content.
    2.  **Be Complete:** Do not omit any files. Include package.json with all necessary dependencies, configuration files (like tsconfig.json, tailwind.config.ts), entry point files (like src/app/page.tsx), and all components.
    3.  **Use Best Practices:** The generated code should be clean, modern, and follow the best practices for the specified technologies.
    4.  **Format Output:** Your final output must be a single JSON object that strictly adheres to the provided output schema, containing an array of file objects, where each object has a 'path' and 'content' key.
    
    Generate the full codebase now.`,
});


export async function aiCodeAgent(input: AiCodeAgentInput): Promise<AiCodeAgentOutput> {
  // 1. Generate the file structure and content using the AI
  const { output } = await codeAgentPrompt(input);
  
  const generatedFiles = output?.files;

  if (!generatedFiles || generatedFiles.length === 0) {
    throw new Error('AI failed to generate any files for the project.');
  }

  // 2. Create a ZIP file in memory
  const zip = new JSZip();
  for (const file of generatedFiles) {
    zip.file(file.path, file.content);
  }

  // 3. Generate the ZIP file as a Base64 string
  const zipData = await zip.generateAsync({ type: 'base64' });

  return { zipData };
}
