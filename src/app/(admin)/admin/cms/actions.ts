"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateCMS(updates: { section: string; content: Record<string, unknown> }[]) {
  const supabase = await getSupabaseServerClient();
  
  try {
    for (const update of updates) {
      // Upsert based on section column
      const { error } = await supabase
        .from("cms")
        .upsert(
          { section: update.section, content: update.content }, 
          { onConflict: "section" }
        );

      if (error) {
        console.error(`CMS Update Error for ${update.section}:`, error);
        // We continue to next update even if one fails, or throw? 
        // Let's throw to notify client
        throw new Error(error.message);
      }
    }

    revalidatePath("/admin/cms");
    revalidatePath("/"); // Update home page cache
    return { success: true };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: errorMessage };
  }
}
