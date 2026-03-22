"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  if (!data.email || !data.password) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/home", "layout");
  redirect("/home");
  // return { success: true };
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        display_name: formData.get("fullName") as string,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
    },
  };

  if (!data.email || !data.password || !data.options?.data?.display_name) {
    return { error: "Fill all fields correctly" };
  }

  if (data.password.length < 6) {
    return { error: "Password must be at least 6 characters long" };
  }

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { error: error.message };
  }
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error logging out:", error.message);
    return { error: error.message };
  }

  redirect("/login");
}
