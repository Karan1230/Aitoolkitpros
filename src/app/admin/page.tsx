
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AuthForm } from '@/components/auth-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Logo } from '@/components/icons'
import { Suspense } from 'react'

export default async function AdminLoginPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    return redirect('/admin/dashboard')
  }

  return (
    <div className="container flex min-h-screen w-full items-center justify-center py-12">
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <Logo className="h-10 w-10 mx-auto mb-4 text-primary"/>
                <CardTitle className="font-headline text-3xl">Admin Login</CardTitle>
                <CardDescription>Sign in to access the dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading...</div>}>
                <AuthForm />
              </Suspense>
            </CardContent>
        </Card>
    </div>
  )
}
