import { NextRequest, NextResponse } from 'next/server';
import { getStoredAccessSettings, saveStoredAccessSettings, AccessSettings } from '@/lib/server-storage';

export async function GET() {
  try {
    const settings = getStoredAccessSettings();
    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body: Partial<AccessSettings> = await req.json();
    const currentSettings = getStoredAccessSettings();
    const updatedSettings: AccessSettings = {
      ...currentSettings,
      ...body,
      guestTrialMinutes: typeof body.guestTrialMinutes === 'number' ? Math.max(1, body.guestTrialMinutes) : currentSettings.guestTrialMinutes
    };

    saveStoredAccessSettings(updatedSettings);
    return NextResponse.json({ success: true, settings: updatedSettings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
