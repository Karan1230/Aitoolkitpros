
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

  const emailSchema = z.string().email();
  const isEmail = emailSchema.safeParse(identifier).success;

  let emailToAuth = identifier;

  if (!isEmail) {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('email')
      .eq('username', identifier)
      .single();
    
    if (profileError || !profile) {
        return { message: 'Invalid username or password' };
    }
    emailToAuth = profile.email;
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: emailToAuth,
    password,
  });
  
  if (error) {
    return { message: error.message };
  }

  return redirect(redirectTo);
}

export async function signUp(formData: FormData) {
    const origin = headers().get('origin');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const username = formData.get('username') as string;
    const fullName = formData.get('full_name') as string;
    const mobileNumber = formData.get('mobile_number') as string;
    const country = formData.get('country') as string;
    const avatarFile = formData.get('avatar') as File;

    const supabase = createClient();

    const { data: existingUser } = await supabase
        .from('profiles')
        .select('id, username, email')
        .or(`email.eq.${email},username.eq.${username}`)
        .maybeSingle();

    if (existingUser) {
        if (existingUser.username === username) {
            return { message: 'Username already taken. Please choose another.' };
        }
        if (existingUser.email === email) {
            return { message: 'An account with this email already exists.' };
        }
    }

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (signUpError) {
        return { message: `Could not sign up user: ${signUpError.message}` };
    }

    if (!signUpData.user) {
        return { message: 'User registration failed. Please try again.' };
    }

    let avatar_url: string | null = null;
    if (avatarFile && avatarFile.size > 0) {
        const { data: uploadData, error: uploadError } = await supabase
            .storage
            .from('avatars')
            .upload(`public/${signUpData.user.id}/${Date.now()}_${avatarFile.name}`, avatarFile);

        if (uploadError) {
            console.error("Avatar upload error:", uploadError);
        } else {
            const { data: urlData } = supabase
                .storage
                .from('avatars')
                .getPublicUrl(uploadData.path);
            avatar_url = urlData.publicUrl;
        }
    }

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
        await supabase.auth.admin.deleteUser(signUpData.user.id);
        return { message: `Could not save user profile. Please try again.` };
    }

    // On success, return null (no message)
    return { message: null };
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
