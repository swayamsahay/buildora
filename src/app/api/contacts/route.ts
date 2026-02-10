import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    // LINE 7 — create server supabase client
    const supabase = await getSupabaseServerClient();

    // LINE 10 — parse request body
    const body = await req.json();
    const { name, email, message } = body;

    // LINE 14 — validation (name OPTIONAL)
    if (!email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // LINE 21 — insert into contacts (SAFE DEFAULT FOR NAME)
    const { error } = await supabase.from("contacts").insert([
      {
        name: name ?? "Client",
        email,
        message,
        status: "new",
      },
    ]);

    // LINE 31 — handle DB error
    if (error) {
      console.error("SUPABASE INSERT ERROR:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // LINE 39 — success
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/requests");

    return NextResponse.json({ success: true });

  } catch (err) {
    // LINE 45 — crash-level error
    console.error("CONTACT API CRASH:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
