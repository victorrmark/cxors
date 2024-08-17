'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  if (!data.email || !data.password) {
    return { error: 'Email and password are required' }
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard', 'layout')
  return { success: true }
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        display_name: formData.get("fullName") as string,
      },
    },
  }

  const { error } = await supabase.auth.signUp(data)

  if (!data.email || !data.password || !data.options?.data?.display_name) {
    return { error: 'Fill all feilds correctly' }
  }

  if (data.password.length < 6) {
    return { error: 'Password must be at least 6 characters long' }
  }

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard')
}


export async function logout() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Error logging out:', error.message)
    // Optionally, you could return an error message to handle in the client-side
    return { error: error.message }
  }

  // Redirect to the login page after logout
  redirect('/login')
}
