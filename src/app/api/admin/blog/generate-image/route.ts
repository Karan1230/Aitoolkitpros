import { NextRequest, NextResponse } from 'next/server';
import { generateGeminiImage, buildPhotorealisticPromptsForTopic, getCuratedUnsplashForTopic } from '@/lib/blog-image-curator';
import { generateQwenImage } from '@/lib/qwen-image-service';
import { generateNanoBananaImage, getFreeWatermarkFreeImage } from '@/lib/nano-banana-image-service';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      prompt,
      type = 'featured',
      topic = '',
      sectionTitle = '',
      keyword = '',
      category = 'Tech',
      engine = 'nano-banana' // 'nano-banana' | 'qwen' | 'unsplash' | 'flux'
    } = body;

    const cleanTopic = topic.trim() || 'Modern Technology and Digital Productivity';

    // If user specifically requested 100% free online watermark-free stock photography
    if (engine === 'unsplash') {
      const idx = type === 'featured' ? 0 : Math.floor(Math.random() * 3) + 1;
      const freePhoto = getFreeWatermarkFreeImage(cleanTopic, idx);
      return NextResponse.json({
        success: true,
        imageUrl: freePhoto.url,
        source: 'unsplash-free',
        prompt: `Free Online Watermark-Free Photography: ${freePhoto.alt}`,
        alt: freePhoto.alt,
        caption: freePhoto.caption || `Watermark-free high-resolution photography for ${cleanTopic}.`
      });
    }

    let finalPrompt = prompt?.trim();
    let altText = '';
    let captionText = '';

    // If no custom prompt provided, generate a vivid scene prompt
    if (!finalPrompt) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        try {
          const ai = new GoogleGenAI({
            apiKey,
            httpOptions: {
              headers: {
                'User-Agent': 'aistudio-build',
              },
            },
          });

          const geminiRes = await ai.models.generateContent({
            model: 'gemini-3.7-flash',
            contents: `You are an expert AI image prompt engineer for Nano Banana image generation model.
Create a vivid, photorealistic commercial photography prompt in 16:9 widescreen format for:
Topic: "${cleanTopic}"
Type: "${type}"
${sectionTitle ? `Section Heading: "${sectionTitle}"` : ''}
Keyword: "${keyword}"
Category: "${category}"

Rules:
1. Depict the specific visual subject, concept, people, hardware, or real-world scene described.
2. DO NOT default to a generic laptop computer screen or desk unless specifically requested. Use cinematic lighting, rich textures, and dramatic composition.
3. Output raw JSON format:
{
  "prompt": "detailed photorealistic prompt for 16:9 widescreen 8k commercial photography",
  "alt": "precise descriptive alt text of what is depicted in the image",
  "caption": "brief engaging caption"
}`,
            config: {
              responseMimeType: 'application/json',
              temperature: 0.7
            }
          });

          const text = geminiRes.text;
          if (text) {
            const parsed = JSON.parse(text);
            if (parsed.prompt) {
              finalPrompt = parsed.prompt;
              altText = parsed.alt || '';
              captionText = parsed.caption || '';
            }
          }
        } catch (gErr) {
          console.warn('Gemini prompt generation note, using smart heuristic builder:', gErr);
        }
      }

      // If still no prompt, use smart photorealistic builder
      if (!finalPrompt) {
        const plans = buildPhotorealisticPromptsForTopic(cleanTopic, [keyword, category]);
        if (type === 'featured') {
          finalPrompt = plans.featured.prompt;
          altText = plans.featured.alt;
          captionText = plans.featured.caption;
        } else {
          // In-article
          const matchedSection = plans.sections.find(s =>
            sectionTitle && s.sectionTitle.toLowerCase().includes(sectionTitle.toLowerCase())
          ) || plans.sections[0];

          finalPrompt = matchedSection.prompt;
          altText = matchedSection.alt;
          captionText = matchedSection.caption;
        }
      }
    }

    const seed = Math.floor(Math.random() * 900000) + 100000;

    let imageUrl = '';
    let imageSource = 'nano-banana';

    if (engine === 'nano-banana' || !engine) {
      const nanoRes = await generateNanoBananaImage(finalPrompt, {
        aspectRatio: '16:9',
        modelVariant: 'lite',
        topic: cleanTopic
      });
      imageUrl = nanoRes.url;
      imageSource = nanoRes.source;
    } else if (engine === 'qwen') {
      const qwenResult = await generateQwenImage(finalPrompt, { width: 1280, height: 720, seed });
      imageUrl = qwenResult.url;
      imageSource = qwenResult.source;
    } else {
      const result = await generateGeminiImage(finalPrompt, '16:9', seed, 'flux');
      imageUrl = result.url;
      imageSource = result.source;
    }

    return NextResponse.json({
      success: true,
      imageUrl,
      source: imageSource,
      seed,
      prompt: finalPrompt,
      alt: altText || `${cleanTopic} - High Resolution Visual`,
      caption: captionText || `Visual representation for ${cleanTopic}.`
    });
  } catch (error: any) {
    console.error('Image generation error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to generate image' }, { status: 500 });
  }
}
