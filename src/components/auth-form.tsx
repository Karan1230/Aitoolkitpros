
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const signInSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Please enter your password.' }),
});

const signUpSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }),
});

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClient();

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: '', password: '' },
  });

  const handleSignIn = async (values: z.infer<typeof signInSchema>) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword(values);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Sign In Failed',
        description: error.message,
      });
    } else {
      toast({
        title: 'Sign In Successful',
        description: "Welcome back! You're now signed in.",
      });
      router.refresh();
    }
    setIsLoading(false);
  };

  const handleSignUp = async (values: z.infer<typeof signUpSchema>) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signUp(values);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Sign Up Failed',
        description: error.message,
      });
    } else {
      toast({
        title: 'Sign Up Successful',
        description: 'Please check your email to verify your account.',
      });
      // You might want to refresh or redirect here as well
    }
    setIsLoading(false);
  };
  
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    setIsLoading(false);
  };


  return (
    <Tabs defaultValue="signin" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">Sign In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4 pt-4">
          <div className="grid gap-2">
            <Label htmlFor="email-signin">Email</Label>
            <Input id="email-signin" type="email" placeholder="m@example.com" {...signInForm.register('email')} />
            {signInForm.formState.errors.email && <p className="text-xs text-destructive">{signInForm.formState.errors.email.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password-signin">Password</Label>
            <Input id="password-signin" type="password" {...signInForm.register('password')} />
             {signInForm.formState.errors.password && <p className="text-xs text-destructive">{signInForm.formState.errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </form>
      </TabsContent>
      <TabsContent value="signup">
        <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4 pt-4">
          <div className="grid gap-2">
            <Label htmlFor="email-signup">Email</Label>
            <Input id="email-signup" type="email" placeholder="m@example.com" {...signUpForm.register('email')} />
             {signUpForm.formState.errors.email && <p className="text-xs text-destructive">{signUpForm.formState.errors.email.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password-signup">Password</Label>
            <Input id="password-signup" type="password" {...signUpForm.register('password')} />
            {signUpForm.formState.errors.password && <p className="text-xs text-destructive">{signUpForm.formState.errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up
          </Button>
        </form>
      </TabsContent>
       <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 
            <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4"><path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-5.067 2.4-4.333 0-7.867-3.5-7.867-7.8s3.533-7.8 7.867-7.8c2.2 0 3.867.867 4.933 1.867L19.8 4.533C17.933 2.733 15.6 1.5 12.48 1.5c-6.667 0-12 5.333-12 12s5.333 12 12 12c6.667 0 12-5.333 12-12 0-1.2-.133-2.333-.333-3.467h-11.2z"></path></svg>
            }
            Google
        </Button>
    </Tabs>
  );
}
