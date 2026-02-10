import { NextResponse } from "next/server";
// ✅ 1. Use the correct name: 'getSupabaseServerClient' instead of 'createClient'
import { getSupabaseServerClient } from "@/lib/supabase/server"; 

// ❌ DELETE 'const supabase = ...' from this spot. It must move inside the functions.

export async function GET() {
  // ✅ 2. Initialize and 'await' the client inside the function
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

export async function POST(req: Request) {
  // ✅ 3. Do the same for POST or any other method
  const supabase = await getSupabaseServerClient();
  
  try {
    const body = await req.json();
    const { data, error } = await supabase
      .from("services")
      .insert([body])
      .select();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}