import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server"; // ✅ 1. Correct the name

// ❌ DO NOT put 'const supabase = ...' here anymore.
// In Next.js 16, it must be inside the function below.

export async function GET() {
  // ✅ 2. Initialize and await the client INSIDE the function
  const supabase = await getSupabaseServerClient();

  try {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}