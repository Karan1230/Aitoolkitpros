'use server';

/**
 * @fileOverview Transforms a user's photo into a stylized cartoon or avatar using an AI model.
 *
 * - cartoonAvatarMaker - A function that handles the image transformation process.
 * - CartoonAvatarMakerInput - The input type for the function.
 * - CartoonAvatarMakerOutput - The return type for the function.
 */

import { generateWithRetry } from '@/ai/genkit';
import {z} from 'genkit';

const CartoonAvatarMakerInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "The user's photo to transform, as a data URI that must include a MIME type and use Base64 encoding."
    ),
  style: z.string().describe('The artistic style for the avatar (e.g., 3D Avatar, Anime).'),
  background: z.object({
    type: z.string().describe('The type of background (e.g., transparent, solid, custom).'),
    value: z.string().describe('The value for the background (e.g., a hex code for solid, or a prompt for custom).'),
  }),
});
export type CartoonAvatarMakerInput = z.infer<typeof CartoonAvatarMakerInputSchema>;

const CartoonAvatarMakerOutputSchema = z.object({
  imageUrls: z.array(z.string()).describe('An array of URLs for the generated avatar images.'),
});
export type CartoonAvatarMakerOutput = z.infer<typeof CartoonAvatarMakerOutputSchema>;

export async function cartoonAvatarMaker({ imageDataUri, style, background }: CartoonAvatarMakerInput): Promise<CartoonAvatarMakerOutput> {
    let backgroundInstruction = '';
    switch (background.type) {
        case 'transparent':
            backgroundInstruction = 'The background must be completely transparent.';
            break;
        case 'solid':
            backgroundInstruction = `The background must be a solid, plain color: ${background.value}.`;
            break;
        case 'custom':
            backgroundInstruction = `The background should be a scene described as: "${background.value}".`;
            break;
    }

    const fullPrompt = [
        {
            text: `Transform the person in this photo into a high-quality avatar in the "${style}" style. 
            It is crucial to preserve the key facial features and likeness of the original person. 
            The final image should be clean, professional, and stylized.
            ${backgroundInstruction}`
        },
        {
            media: { url: imageDataUri }
        }
    ];

    const imagePromises = Array(4).fill(null).map(() => 
        generateWithRetry<{ media?: { url: string } }>({
            model: 'googleai/gemini-2.0-flash-preview-image-generation',
            prompt: fullPrompt,
            config: {
              responseModalities: ['TEXT', 'IMAGE'],
            },
        })
    );
    
    const results = await Promise.all(imagePromises);
    const imageUrls = results.map(result => result.media?.url).filter((url): url is string => !!url);
    
    if (imageUrls.length === 0) {
        throw new Error("The AI failed to generate any images. Please try a different photo or style.");
    }

    return { imageUrls };
}
