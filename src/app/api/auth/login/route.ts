import { NextRequest, NextResponse } from 'next/server';
import { getStoredUsers, saveStoredUsers } from '@/lib/server-storage';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
    }

    const users = getStoredUsers();
    const normalizedEmail = email.trim().toLowerCase();

    const user = users.find(u => u.email.toLowerCase() === normalizedEmail && u.passwordHash === password);

    if (!user) {
      return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
    }

    user.lastLoginAt = new Date().toISOString();
    saveStoredUsers(users);

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

    response.cookies.set('user_session', user.id, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: false,
      sameSite: 'lax'
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
