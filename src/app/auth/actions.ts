
'use server'

import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export async function signIn(formData: FormData) {
  const identifier = formData.get('identifier') as string;
  const password = formData.get('password') as string;
  const redirectTo = formData.get('redirectTo') as string || '/';
  const supabase = createClient();

  // Check if identifier is an email
  const emailSchema = z.string().email();
  const isEmail = emailSchema.safeParse(identifier).success;

  let emailToAuth = identifier;

  if (!isEmail) {
    // If it's not an email, assume it's a username and get the email from the database
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('email')
      .eq('username', identifier)
      .single();
    
    if (profileError || !profile) {
        return redirect('/login?message=Invalid username or password');
    }
    emailToAuth = profile.email;
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: emailToAuth,
    password,
  });
  
  if (error) {
    return redirect('/login?message=Could not authenticate user');
  }

  return redirect(redirectTo);
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

  // First, check if username or email already exists in profiles table
  const { data: existingUser, error: existingUserError } = await supabase
    .from('profiles')
    .select('id, username, email')
    .or(`email.eq.${email},username.eq.${username}`)
    .maybeSingle();

    if (existingUser) {
        if (existingUser.username === username) {
            return redirect('/login?message=Username already exists.');
        }
        if (existingUser.email === email) {
            return redirect('/login?message=Email already exists.');
        }
    }

  // Create the user in auth.users
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (signUpError) {
    console.error("Sign up error:", signUpError);
    return redirect(`/login?message=Could not sign up user: ${signUpError.message}`);
  }

  if (!signUpData.user) {
    return redirect('/login?message=Could not create user, please try again.');
  }

  // Handle avatar upload
  let avatar_url: string | null = null;
  if (avatarFile && avatarFile.size > 0) {
      const { data: uploadData, error: uploadError } = await supabase
          .storage
          .from('avatars')
          .upload(`public/${signUpData.user.id}/${Date.now()}_${avatarFile.name}`, avatarFile);
      
      if (uploadError) {
          console.error("Avatar upload error:", uploadError);
          // If avatar fails, we can proceed without it or handle the error
      } else {
        const { data: urlData } = supabase
            .storage
            .from('avatars')
            .getPublicUrl(uploadData.path);
        avatar_url = urlData.publicUrl;
      }
  }

  // Manually insert into public.profiles, as triggers can sometimes be unreliable.
  // This requires RLS policy to be set correctly for authenticated users to insert their own profile.
  const { error: profileError } = await supabase.from('profiles').insert({
    id: signUpData.user.id,
    username: username,
    full_name: fullName,
    mobile_number: mobileNumber,
    country: country,
    avatar_url: avatar_url,
    email: email,
  });

  if (profileError) {
    console.error("Profile creation error:", profileError);
    // If profile insert fails, it's critical to delete the auth user to prevent orphaned users.
    const { data: adminUser, error: adminError } = await supabase.auth.admin.deleteUser(signUpData.user.id);
    if(adminError){
        console.error("Failed to delete orphaned user:", adminError);
    }
    return redirect(`/login?message=Could not save user profile. Please try again. Error: ${profileError.message}`);
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
