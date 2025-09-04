
'use client'

import { useState } from 'react'
import { useForm, useFormState } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'

import { signIn, signUp, signInWithGoogle } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Upload, Mail, Key, User, Phone, Globe, Lock } from 'lucide-react'
import Image from 'next/image'

const loginSchema = z.object({
  identifier: z.string().min(1, 'Please enter your email or username'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  full_name: z.string().min(1, 'Please enter your full name'),
  mobile_number: z.string().min(10, 'Please enter a valid mobile number'),
  country: z.string().min(2, 'Please enter your country'),
  avatar: z.any().optional(),
});

function SubmitButton({ children }: { children: React.ReactNode }) {
    const { isSubmitting } = useFormState();
    return (
        <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Submitting...' : children}
        </Button>
    );
}

function GoogleButton() {
  const { isSubmitting } = useFormState();
  return (
      <Button variant="outline" className="w-full" formAction={signInWithGoogle} disabled={isSubmitting}>
          <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 21.2 173.4 58.2L339.2 174.1C312.7 151.3 283.5 140 248 140c-63.6 0-114.9 51.3-114.9 114.9S184.4 370.9 248 370.9c73.3 0 106.3-43.2 109.8-65.5H248V204.9h239.1c1.2 6.4 3.3 12.7 3.3 19.4v37.5z"></path></svg>
          Sign in with Google
      </Button>
  );
}

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const pathname = usePathname();
  const message = searchParams.get('message')

  const { register: registerLogin, handleSubmit: handleLoginSubmit } = useForm({ resolver: zodResolver(loginSchema) });
  const { register: registerSignup, handleSubmit: handleSignupSubmit, watch } = useForm({ resolver: zodResolver(signupSchema) });
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const redirectTo = pathname === '/admin' ? '/admin/dashboard' : '/';
  
  return (
    <div>
      {isLogin ? (
        <form action={signIn} className="space-y-4">
           <input type="hidden" name="redirectTo" value={redirectTo} />
          <div className="space-y-2">
            <Label htmlFor="identifier">Email or Username</Label>
            <Input id="identifier" name="identifier" placeholder="you@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
           <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" />
                <label
                    htmlFor="remember-me"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Remember me
                </label>
            </div>
            <Link href="#" className="text-sm text-primary hover:underline">
                Forgot password?
            </Link>
          </div>
           <Button type="submit" className="w-full">Sign In</Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <Button variant="outline" className="w-full" formAction={signInWithGoogle}>
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 21.2 173.4 58.2L339.2 174.1C312.7 151.3 283.5 140 248 140c-63.6 0-114.9 51.3-114.9 114.9S184.4 370.9 248 370.9c73.3 0 106.3-43.2 109.8-65.5H248V204.9h239.1c1.2 6.4 3.3 12.7 3.3 19.4v37.5z"></path></svg>
            Sign in with Google
          </Button>
        </form>
      ) : (
        <form action={signUp} className="space-y-4">
          <div className="space-y-2 text-center">
            <Label htmlFor="avatar" className="cursor-pointer">
              <div className="w-24 h-24 mx-auto rounded-full bg-muted flex items-center justify-center border-2 border-dashed">
                {avatarPreview ? (
                  <Image src={avatarPreview} alt="Avatar preview" width={96} height={96} className="rounded-full object-cover" />
                ) : (
                  <Upload className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
            </Label>
            <Input id="avatar" name="avatar" type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input id="full_name" name="full_name" required />
            </div>
          </div>
           <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
              <Label htmlFor="mobile_number">Mobile Number</Label>
              <Input id="mobile_number" name="mobile_number" type="tel" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" name="country" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
           <Button type="submit" className="w-full">Sign Up</Button>
        </form>
      )}

      <div className="mt-4 text-center text-sm">
        <button onClick={() => setIsLogin(!isLogin)} className="underline">
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
        </button>
      </div>

      {message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {message}
        </p>
      )}
    </div>
  )
}
