import { NextRequest, NextResponse } from 'next/server';
import { getStoredUsers, saveStoredUsers, UserAccount } from '@/lib/server-storage';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, error: 'Name, email, and password are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ success: false, error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const users = getStoredUsers();
    const normalizedEmail = email.trim().toLowerCase();

    if (users.some(u => u.email.toLowerCase() === normalizedEmail)) {
      return NextResponse.json({ success: false, error: 'An account with this email already exists. Please log in.' }, { status: 400 });
    }

    const newUser: UserAccount = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      passwordHash: password, // In production, bcrypt is used
      role: 'user',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };

    users.push(newUser);
    saveStoredUsers(users);

    const response = NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      },
      message: 'Account created successfully! Enjoy unlimited free access.'
    });

    // Set cookie for authenticated user
    response.cookies.set('user_session', newUser.id, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: false,
      sameSite: 'lax'
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
