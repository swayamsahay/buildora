"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createService(formData: FormData) {
  const supabase = await getSupabaseServerClient();
  
  const title = formData.get("title")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  
  if (!title || !description) {
    throw new Error("Title and description are required");
  }

  const payload = {
    title,
    description,
    slug: title.toLowerCase().replace(/\s+/g, "-"),
    status: "active",
    // created_at is automatic
  };

  const { error } = await supabase.from("services").insert([payload]);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  const supabase = await getSupabaseServerClient();
  
  const title = formData.get("title")?.toString().trim();
  const short_description = formData.get("short_description")?.toString().trim();
  const long_description = formData.get("long_description")?.toString().trim();
  const icon_url = formData.get("icon_url")?.toString().trim();
  const cover_image = formData.get("cover_image")?.toString().trim();
  const sort_order = formData.get("sort_order")?.toString();

  const payload: Record<string, string | number> = {};
  if (title) payload.title = title;
  if (short_description) payload.short_description = short_description;
  if (long_description) payload.long_description = long_description;
  if (icon_url) payload.icon_url = icon_url;
  if (cover_image) payload.cover_image = cover_image;
  if (sort_order) payload.sort_order = parseInt(sort_order);

  const { error } = await supabase
    .from("services")
    .update(payload)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/services");
  revalidatePath(`/admin/services/${id}`);
  redirect("/admin/services");
}
