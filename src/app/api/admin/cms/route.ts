import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/server";

/**
 * GET → fetch landing page CMS
 */
export async function GET() {
  const { data, error } = await supabase
    .from("site_content")
    .select("section, content")
    .eq("page", "/")
    .eq("is_active", true);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const result: Record<string, any> = {};
  data.forEach((row) => {
    result[row.section] = row.content;
  });

  return NextResponse.json(result);
}

/**
 * POST → save landing page CMS
 */
export async function POST(req: Request) {
  const body = await req.json();

  const updates = [
    {
      section: "hero",
      content: {
        heading: body.heroHeading,
        subheading: body.heroSubheading,
      },
    },
    {
      section: "cta",
      content: {
        button_text: body.ctaText,
        button_link: body.ctaLink,
      },
    },
  ];

  for (const item of updates) {
    // 1️⃣ Try UPDATE first
    const { data, error } = await supabase
      .from("site_content")
      .update({
        content: item.content,
      })
      .eq("page", "/")
      .eq("section", item.section)
      .select()
      .single();

    // 2️⃣ If no row exists → INSERT
    if (error || !data) {
      const { error: insertError } = await supabase
        .from("site_content")
        .insert({
          page: "/",
          section: item.section,
          content: item.content,
          is_active: true,
        });

      if (insertError) {
        console.error("CMS save error:", insertError);
        return new Response(
          JSON.stringify({ error: insertError.message }),
          { status: 500 }
        );
      }
    }
  }

  return new Response(
    JSON.stringify({ success: true }),
    { status: 200 }
  );
}
