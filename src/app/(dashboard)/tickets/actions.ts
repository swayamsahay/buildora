"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createTicket(formData: FormData) {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to create a ticket." };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const priority = formData.get("priority") as string;

  if (!title || !description || !priority) {
    return { error: "Please fill in all fields." };
  }

  try {
    const { error } = await supabase.from("tickets").insert({
      user_id: user.id,
      title,
      description,
      priority,
      status: "open",
    });

    if (error) {
      console.error("Supabase error:", error);
      return { error: "Failed to create ticket. Please try again." };
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    return { error: "An unexpected error occurred." };
  }

  revalidatePath("/tickets");
  redirect("/tickets");
}
