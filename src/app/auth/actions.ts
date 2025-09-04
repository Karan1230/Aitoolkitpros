
'use server'

import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export async function signIn(formData: FormData) {
  const identifier = formData.get('identifier') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  // Check if identifier is an email
  const emailSchema = z.string().email();
  const isEmail = emailSchema.safeParse(identifier).success;

  let error;

  if (isEmail) {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: identifier,
      password,
    });
    error = signInError;
  } else {
    // Assume it's a username, fetch the user's email from the profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('email')
      .eq('username', identifier)
      .single();

    if (profileError || !profile) {
      return redirect('/login?message=Invalid username');
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: profile.email,
      password,
    });
    error = signInError;
  }
  
  if (error) {
    return redirect('/login?message=Could not authenticate user');
  }

  return redirect('/');
}

export async function signUp(formData: FormData) {
  const origin = headers().get('origin')
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const username = formData.get('username') as string
  const fullName = formData.get('full_name') as string
  const mobileNumber = formData.get('mobile_number') as string
  const country = formData.get('country') as string
  const avatarFile = formData.get('avatar') as File

  const supabase = createClient()

  let avatar_url: string | null = null;
  if (avatarFile && avatarFile.size > 0) {
      const { data: uploadData, error: uploadError } = await supabase
          .storage
          .from('avatars')
          .upload(`public/${Date.now()}_${avatarFile.name}`, avatarFile);
      
      if (uploadError) {
          console.error("Avatar upload error:", uploadError);
          return redirect('/login?message=Could not upload avatar');
      }

      const { data: urlData } = supabase
          .storage
          .from('avatars')
          .getPublicUrl(uploadData.path);
      
      avatar_url = urlData.publicUrl;
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        username,
        full_name: fullName,
        mobile_number: mobileNumber,
        country,
        avatar_url,
      },
    },
  })

  if (error) {
    console.error(error)
    return redirect('/login?message=Could not create user: ' + error.message);
  }

  return redirect('/login?message=Check email to continue sign in process');
}

export async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    return redirect('/')
}

export async function signInWithGoogle() {
  const origin = headers().get('origin');
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error('Google sign in error:', error);
    return redirect('/login?message=Could not authenticate with Google');
  }

  return redirect(data.url);
}
