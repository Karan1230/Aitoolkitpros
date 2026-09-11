import { NextRequest, NextResponse } from 'next/server';
import { replaceAllArticleImagesWithFreeWebImages } from '@/lib/free-web-images';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title = '',
      content = '',
      category = 'Tech',
      inArticleImages = []
    } = body;

    if (!title && !content) {
      return NextResponse.json(
        { success: false, error: 'Article title or content is required to find relevant free images.' },
        { status: 400 }
      );
    }

    const result = await replaceAllArticleImagesWithFreeWebImages({
      title: title || 'Modern Technology',
      content,
      category,
      inArticleImages
    });

    return NextResponse.json({
      success: true,
      featuredImage: result.newFeaturedImage,
      content: result.newContent,
      inArticleImages: result.newInArticleImages,
      replacedCount: result.replacedCount,
      message: `Successfully replaced ${result.replacedCount} images with high-resolution, watermark-free online photos!`
    });
  } catch (error: any) {
    console.error('Error replacing article images:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to replace article images with free online photos.' },
      { status: 500 }
    );
  }
}
