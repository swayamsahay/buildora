import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

// GET — fetch all CMS content
export async function GET() {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase
    .from("site_content")
    .select("*");

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data ?? []);
}

// PATCH — update CMS section content
export async function PATCH(req: Request) {
  const supabase = await getSupabaseServerClient();

  const body = await req.json();
  const { section, content } = body;

  if (!section || !content) {
    return NextResponse.json(
      { error: "Missing section or content" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("site_content")
    .update({
      content,
      updated_at: new Date().toISOString(),
    })
    .eq("section", section);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
