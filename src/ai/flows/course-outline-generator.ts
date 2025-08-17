'use server';

/**
 * @fileOverview An AI agent for generating course outlines.
 *
 * - courseOutlineGenerator - A function that handles course outline generation.
 * - CourseOutlineGeneratorInput - The input type for the function.
 * - CourseOutlineGeneratorOutput - The return type for the function.
 */

import { generateWithRetry } from '@/ai/genkit';
import {z} from 'genkit';

const LessonSchema = z.object({
  title: z.string().describe("The title of the lesson."),
  keyPoints: z.array(z.string()).describe("A list of key topics or points covered in the lesson."),
});

const ModuleSchema = z.object({
  title: z.string().describe("The title of the module."),
  lessons: z.array(LessonSchema).describe("A list of lessons within the module."),
});

const CourseOutlineGeneratorInputSchema = z.object({
  topic: z.string().describe('The main topic or subject of the course.'),
  level: z.string().describe('The target audience\'s skill level (e.g., Beginner, Intermediate, Advanced).'),
  duration: z.string().describe('The estimated duration of the course (e.g., "4 weeks", "6 hours").'),
  language: z.string().describe('The language for the generated course outline.'),
});
export type CourseOutlineGeneratorInput = z.infer<typeof CourseOutlineGeneratorInputSchema>;

const CourseOutlineGeneratorOutputSchema = z.object({
  courseTitle: z.string().describe("A compelling title for the course."),
  courseDescription: z.string().describe("A brief, engaging description of the course."),
  modules: z.array(ModuleSchema).describe('An array of course modules, each containing lessons.'),
});
export type CourseOutlineGeneratorOutput = z.infer<typeof CourseOutlineGeneratorOutputSchema>;

export async function courseOutlineGenerator(input: CourseOutlineGeneratorInput): Promise<CourseOutlineGeneratorOutput> {
  const prompt = `You are an expert curriculum designer and instructional designer. Create a comprehensive and well-structured online course outline in ${input.language} based on the following criteria.

  **Course Topic:** ${input.topic}
  **Target Level:** ${input.level}
  **Estimated Duration:** ${input.duration}
  
  **Instructions:**
  1.  Generate a compelling **courseTitle** that is clear and attractive.
  2.  Write a brief, engaging **courseDescription** that explains what the course is about and who it's for.
  3.  Structure the course into logical **modules**. Each module should have a clear title.
  4.  Within each module, break down the content into specific **lessons**. Each lesson should have a title and a list of key **keyPoints** (3-5 points) that will be covered.
  5.  The number of modules and lessons should be appropriate for the specified course **duration** and **level**.
  6.  Ensure the content progresses logically from basic concepts to more advanced ones, suitable for the target **level**.
  
  Generate the course outline now.`;

  const llmResponse = await generateWithRetry<CourseOutlineGeneratorOutput>({
    model: 'googleai/gemini-2.0-flash',
    prompt,
    output: {
      schema: CourseOutlineGeneratorOutputSchema,
    }
  });

  return llmResponse;
}
