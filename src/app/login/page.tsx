
import { AuthForm } from '@/components/auth-form';
import { Logo } from '@/components/icons';
import { createClient } from '@/lib/supabase/server';
import { type Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Login | AI Toolkit Pro',
    description: 'Sign in or create an account to access all features.',
};

export default async function LoginPage() {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();

    if (data.session) {
        return redirect('/');
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <div className="w-full max-w-md space-y-6">
                <div className="flex flex-col items-center text-center">
                    <Logo className="h-10 w-10 text-primary mb-4" />
                    <h1 className="text-3xl font-bold font-headline">Welcome Back</h1>
                    <p className="text-muted-foreground">
                        Sign in to your account or create a new one to continue.
                    </p>
                </div>
                <AuthForm />
            </div>
        </div>
    );
}
