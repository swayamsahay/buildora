import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/server";

// CREATE + UPDATE
export async function POST(req: Request) {
  const body = await req.json();

  // CREATE
  if (!body.id) {
    const { data, error } = await supabase
      .from("services")
      .insert({
        title: body.title,
        description: body.description,
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  }

  // UPDATE
  const { error } = await supabase
    .from("services")
    .update({
      title: body.title,
      description: body.description,
    })
    .eq("id", body.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

// DELETE
export async function DELETE(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { error: "Service ID required" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("services")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
