import { NextRequest, NextResponse } from 'next/server';
import { searchFreeOnlineImages } from '@/lib/free-web-images';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || searchParams.get('query') || 'technology';
    const limit = parseInt(searchParams.get('limit') || '12', 10);

    const images = await searchFreeOnlineImages(query, limit);

    return NextResponse.json({
      success: true,
      query,
      images,
      count: images.length
    });
  } catch (error: any) {
    console.error('Error searching free images:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to search free images' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = body.query || body.q || 'technology';
    const limit = body.limit || 12;

    const images = await searchFreeOnlineImages(query, limit);

    return NextResponse.json({
      success: true,
      query,
      images,
      count: images.length
    });
  } catch (error: any) {
    console.error('Error searching free images:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to search free images' },
      { status: 500 }
    );
  }
}
