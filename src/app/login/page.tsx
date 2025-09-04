
import Link from 'next/link'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { SubmitButton } from './submit-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { signUp, signIn } from '../auth/actions'

export default function LoginPage({ searchParams }: { searchParams: { message: string } }) {

  return (
    <div className="container flex min-h-screen w-full items-center justify-center py-12">
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Welcome!</CardTitle>
                <CardDescription>Sign in or create an account to continue</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required />
                    </div>
                    
                    <SubmitButton
                        formAction={signIn}
                        className="w-full"
                    >
                        Sign In
                    </SubmitButton>
                    <SubmitButton
                        formAction={signUp}
                        className="w-full"
                        variant="outline"
                    >
                        Sign Up
                    </SubmitButton>
                    
                    {searchParams?.message && (
                    <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                        {searchParams.message}
                    </p>
                    )}
                </form>
                 <div className="mt-4 text-center text-sm">
                    <Link href="#" className="underline">
                        Forgot your password?
                    </Link>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}
