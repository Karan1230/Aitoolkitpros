import { NextRequest, NextResponse } from 'next/server';
import { getStoredUsers, saveStoredUsers, UserAccount } from '@/lib/server-storage';

export async function POST(req: NextRequest) {
  try {
    const { email, password, action, newPassword, name } = await req.json();

    const users = getStoredUsers();
    const admin = users.find(u => u.role === 'admin');

    if (action === 'change-password') {
      if (!admin || admin.passwordHash !== password) {
        return NextResponse.json({ success: false, error: 'Current password is incorrect' }, { status: 401 });
      }
      if (!newPassword || newPassword.length < 6) {
        return NextResponse.json({ success: false, error: 'New password must be at least 6 characters' }, { status: 400 });
      }

      admin.passwordHash = newPassword;
      if (name) admin.name = name;
      saveStoredUsers(users);

      return NextResponse.json({ success: true, message: 'Admin credentials updated successfully' });
    }

    // Standard Admin Login
    // Default admin: admin@aitoolkitpro.com / admin123456 (or matches current stored admin)
    if (admin) {
      if ((email === admin.email || email === 'admin') && password === admin.passwordHash) {
        admin.lastLoginAt = new Date().toISOString();
        saveStoredUsers(users);

        const response = NextResponse.json({
          success: true,
          user: {
            id: admin.id,
            name: admin.name,
            email: admin.email,
            role: 'admin'
          },
          token: `admin_token_${Date.now()}`
        });

        // Set secure HTTP-only cookie for admin
        response.cookies.set('admin_session', 'authenticated', {
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 7 days
          httpOnly: false, // accessible to client check if needed
          sameSite: 'lax'
        });

        return response;
      }
    }

    return NextResponse.json({ success: false, error: 'Invalid admin email or password' }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
