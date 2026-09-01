import { NextRequest, NextResponse } from 'next/server';
import { getStoredSiteSettings, saveStoredSiteSettings, SiteSettings } from '@/lib/server-storage';

export async function GET() {
  try {
    const settings = getStoredSiteSettings();
    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body: Partial<SiteSettings> = await req.json();
    const currentSettings = getStoredSiteSettings();
    const updatedSettings: SiteSettings = {
      ...currentSettings,
      ...body,
    };

    saveStoredSiteSettings(updatedSettings);
    return NextResponse.json({ success: true, settings: updatedSettings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
