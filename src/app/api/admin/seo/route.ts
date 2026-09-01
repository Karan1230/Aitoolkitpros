import { NextRequest, NextResponse } from 'next/server';
import { getStoredSeoSettings, saveStoredSeoSettings, SeoSettings } from '@/lib/server-storage';

export async function GET() {
  try {
    const settings = getStoredSeoSettings();
    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body: Partial<SeoSettings> = await req.json();
    const currentSettings = getStoredSeoSettings();
    const updatedSettings: SeoSettings = {
      ...currentSettings,
      ...body,
      keywords: Array.isArray(body.keywords)
        ? body.keywords
        : typeof body.keywords === 'string'
        ? (body.keywords as string).split(',').map(k => k.trim()).filter(Boolean)
        : currentSettings.keywords
    };

    saveStoredSeoSettings(updatedSettings);
    return NextResponse.json({ success: true, settings: updatedSettings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
