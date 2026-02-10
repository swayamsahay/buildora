import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await getSupabaseServerClient();
  const { id, status } = await req.json();

  if (!id || !status) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const { error } = await supabase
    .from("contacts")
    .update({ status })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
