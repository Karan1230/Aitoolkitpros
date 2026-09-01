import { NextRequest, NextResponse } from 'next/server';
import { getStoredUsers, getStoredAccessSettings } from '@/lib/server-storage';

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.cookies.get('user_session')?.value;
    const adminSession = req.cookies.get('admin_session')?.value;
    const accessSettings = getStoredAccessSettings();

    if (adminSession === 'authenticated') {
      const users = getStoredUsers();
      const admin = users.find(u => u.role === 'admin');
      if (admin) {
        return NextResponse.json({
          success: true,
          authenticated: true,
          user: {
            id: admin.id,
            name: admin.name,
            email: admin.email,
            role: 'admin'
          },
          accessSettings
        });
      }
    }

    if (sessionId) {
      const users = getStoredUsers();
      const user = users.find(u => u.id === sessionId);
      if (user) {
        return NextResponse.json({
          success: true,
          authenticated: true,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          },
          accessSettings
        });
      }
    }

    return NextResponse.json({
      success: true,
      authenticated: false,
      user: null,
      accessSettings
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out' });
  response.cookies.delete('user_session');
  response.cookies.delete('admin_session');
  return response;
}
