'use server';

/**
 * @fileOverview A comprehensive content generation AI agent.
 *
 * - aiContentWriter - A function that handles the entire content generation process.
 * - AiContentWriterInput - The input type for the function.
 * - AiContentWriterOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiContentWriterInputSchema = z.object({
  title: z.string().describe('The main title or keywords for the content.'),
  contentType: z.string().describe('The type of content (e.g., Blog Post, Article).'),
  wordCount: z.number().describe('The target word count for the content.'),
  writingStyle: z.string().describe('The style of writing (e.g., Formal, Casual).'),
  readability: z.string().describe('The target readability level.'),
  articleType: z.string().describe('The specific type of article (e.g., How-to, Listicle).'),
  tone: z.string().describe('The desired tone of voice for the content.'),
  pointOfView: z.string().describe('The narrative point of view.'),
  targetCountry: z.string().describe('The target country for localization.'),
  language: z.string().describe('The language for the generated content.'),
  imageCount: z.number().describe('The number of images to generate and include.'),
  imageStyle: z.string().describe('The artistic style for the generated images.'),
  imageDimensions: z.string().describe('The aspect ratio for the generated images.'),
  internalLinks: z.string().optional().describe('User-provided internal links to include.'),
  externalLinks: z.string().optional().describe('User-provided external links to include.'),
});
export type AiContentWriterInput = z.infer<typeof AiContentWriterInputSchema>;

const AiContentWriterOutputSchema = z.object({
  generatedTitle: z.string().describe('The final, SEO-optimized title for the content.'),
  htmlContent: z.string().describe('The full content in HTML format, including embedded images and links.'),
  featuredImageUrl: z.string().describe('The URL of the featured image for the content.'),
});
export type AiContentWriterOutput = z.infer<typeof AiContentWriterOutputSchema>;


export async function aiContentWriter(input: AiContentWriterInput): Promise<AiContentWriterOutput> {
  return contentWriterFlow(input);
}

// Helper flow to generate images
const generateImagesFlow = ai.defineFlow(
  {
    name: 'generateImagesForContentFlow',
    inputSchema: z.object({
      title: z.string(),
      imageCount: z.number(),
      imageStyle: z.string(),
      imageDimensions: z.string(),
    }),
    outputSchema: z.array(z.string()),
  },
  async ({ title, imageCount, imageStyle, imageDimensions }) => {
    const imagePromises = Array(imageCount).fill(null).map((_, i) => {
        const prompt = i === 0 
            ? `Create a high-quality, professional featured image for an article titled "${title}". Style: ${imageStyle}.`
            : `Create a relevant, high-quality image for an article about "${title}". Style: ${imageStyle}.`;
        
        return ai.generate({
            model: 'googleai/gemini-2.0-flash-preview-image-generation',
            prompt,
            config: {
                responseModalities: ['TEXT', 'IMAGE'],
            },
            aspectRatio: imageDimensions as any,
        });
    });

    const results = await Promise.all(imagePromises);
    const imageUrls = results.map(result => result.media?.url).filter((url): url is string => !!url);
    
    if (imageUrls.length < imageCount) {
        throw new Error("Failed to generate the required number of images.");
    }

    return imageUrls;
  }
);


const contentGenerationPrompt = ai.definePrompt({
  name: 'contentWriterPrompt',
  input: {
    schema: z.object({
      ...AiContentWriterInputSchema.shape,
      imageUrls: z.array(z.string()),
    })
  },
  output: { schema: AiContentWriterOutputSchema },
  prompt: `You are an expert content writer and SEO specialist. Generate a high-quality, comprehensive {{contentType}} in {{language}} based on the following detailed requirements.

**Primary Topic/Keywords:** {{{title}}}
**Target Word Count:** Approximately {{wordCount}} words.
**Writing Style:** {{writingStyle}}
**Readability Level:** {{readability}}
**Article Type:** {{articleType}}
**Tone of Voice:** {{tone}}
**Point of View:** {{pointOfView}}
**Target Country for Localization:** {{targetCountry}}

**Content Structure and Formatting:**
1.  **Title:** Create a compelling, SEO-optimized title based on the user's input. Store it in the 'generatedTitle' output field.
2.  **Introduction:** Start with a strong hook to grab the reader's attention.
3.  **Body:** Structure the content with clear headings (H2, H3), subheadings, paragraphs, and lists (bulleted or numbered) to enhance readability.
4.  **Conclusion:** End with a concise summary and a strong concluding thought or call-to-action.
5.  **Output Format:** The final output must be a single, valid HTML string.

**Image Integration:**
- You have been provided with an array of image URLs: {{jsonStringify imageUrls}}.
- The first image, '{{imageUrls.[0]}}', must be set as the featured image.
- Integrate the remaining images naturally throughout the article. Place each image within its own <figure> tag with a descriptive <figcaption>. Example: <figure><img src="..." alt="A descriptive alt tag"><figcaption>A descriptive caption.</figcaption></figure>
- Ensure all images have descriptive alt text.

**Linking:**
{{#if internalLinks}}
- **Internal Links:** The user has provided the following internal links. Integrate them naturally into the content where they are most relevant:
{{{internalLinks}}}
{{/if}}
{{#if externalLinks}}
- **External Links:** The user has provided the following external links. Integrate them naturally where relevant:
{{{externalLinks}}}
{{else}}
- **AI-Generated External Links:** The user has not provided external links. Find opportunities to link to 2-3 high-authority, relevant external sources to add credibility.
{{/if}}

Generate the full HTML content now and provide the output in the specified JSON format.`,
});


const contentWriterFlow = ai.defineFlow(
  {
    name: 'contentWriterFlow',
    inputSchema: AiContentWriterInputSchema,
    outputSchema: AiContentWriterOutputSchema,
  },
  async (input) => {
    // Step 1: Generate all images in parallel.
    const imageUrls = await generateImagesFlow({
      title: input.title,
      imageCount: input.imageCount,
      imageStyle: input.imageStyle,
      imageDimensions: input.imageDimensions,
    });
    
    // Step 2: Generate the article content with the image URLs provided.
    const { output } = await contentGenerationPrompt({
      ...input,
      imageUrls,
    });
    
    if (!output) {
      throw new Error("Failed to generate content.");
    }
    
    return {
        ...output,
        featuredImageUrl: imageUrls[0], // Ensure the featured image URL from the generated list is in the final output
    };
  }
);
