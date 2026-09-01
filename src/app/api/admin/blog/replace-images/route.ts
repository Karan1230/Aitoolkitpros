import { NextRequest, NextResponse } from 'next/server';
import { generateNanoBananaImage, getFreeWatermarkFreeImage } from '@/lib/nano-banana-image-service';
import { GoogleGenAI } from '@google/genai';

interface ImageReplacementPlan {
  originalUrl: string;
  altText?: string;
  sectionContext?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      topic = 'Technology and Modern Productivity',
      content = '',
      currentFeaturedImage = '',
      mode = 'free-online' // 'free-online' | 'nano-banana'
    } = body;

    const cleanTopic = topic.trim() || 'Modern Digital Technology';

    // 1. Extract existing markdown images from content: ![alt](url)
    const imageMarkdownRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    const foundImages: Array<{ fullMatch: string; alt: string; url: string; index: number }> = [];
    let match;

    while ((match = imageMarkdownRegex.exec(content)) !== null) {
      foundImages.push({
        fullMatch: match[0],
        alt: match[1] || `${cleanTopic} illustration`,
        url: match[2],
        index: match.index
      });
    }

    // 2. Prepare Replacements for Featured Image
    let newFeaturedImage = currentFeaturedImage;
    if (mode === 'free-online') {
      const freeHero = getFreeWatermarkFreeImage(cleanTopic, 0);
      newFeaturedImage = freeHero.url;
    } else {
      const nanoHero = await generateNanoBananaImage(
        `Commercial editorial photograph of ${cleanTopic}, 35mm lens, natural studio lighting, ultra-sharp detail, 8k resolution, 16:9 widescreen landscape`,
        { aspectRatio: '16:9', modelVariant: 'lite', topic: cleanTopic, index: 0 }
      );
      newFeaturedImage = nanoHero.url;
    }

    // 3. Prepare Replacements for In-Article Images
    let updatedContent = content;
    const replacedImagesList: Array<{
      oldUrl: string;
      newUrl: string;
      alt: string;
      caption: string;
    }> = [];

    if (foundImages.length > 0) {
      for (let i = 0; i < foundImages.length; i++) {
        const item = foundImages[i];
        let replacementUrl = '';
        let newAlt = item.alt;
        let caption = '';

        if (mode === 'free-online') {
          // Free watermark-free online image from Unsplash
          const freeImg = getFreeWatermarkFreeImage(item.alt || cleanTopic, i + 1);
          replacementUrl = freeImg.url;
          newAlt = freeImg.alt;
          caption = freeImg.caption;
        } else {
          // Generate with Nano Banana model
          const nanoImg = await generateNanoBananaImage(
            `High-definition commercial photograph for section "${item.alt || cleanTopic}", natural lighting, 8k, 16:9`,
            { aspectRatio: '16:9', modelVariant: 'lite', topic: cleanTopic, index: i + 1 }
          );
          replacementUrl = nanoImg.url;
          newAlt = nanoImg.alt || item.alt;
          caption = nanoImg.caption;
        }

        replacedImagesList.push({
          oldUrl: item.url,
          newUrl: replacementUrl,
          alt: newAlt,
          caption
        });

        // Replace within markdown content
        updatedContent = updatedContent.replace(
          item.fullMatch,
          `![${newAlt}](${replacementUrl})`
        );
      }
    }

    return NextResponse.json({
      success: true,
      mode,
      featuredImage: newFeaturedImage,
      content: updatedContent,
      replacedCount: replacedImagesList.length + (newFeaturedImage !== currentFeaturedImage ? 1 : 0),
      replacedImages: replacedImagesList
    });
  } catch (error: any) {
    console.error('Error replacing article images:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to replace images' },
      { status: 500 }
    );
  }
}
