import { getSupabaseServerClient } from "@/lib/supabase/server"; // ✅ 1. Corrected name

export type LandingCMSContent = {
  hero?: {
    heading: string;
    subheading: string;
  };
  build_flow?: {
    steps: { title: string; description: string }[];
  };
  cta?: {
    button_text: string;
    button_link: string;
  };
};

export async function getLandingPageContent(): Promise<LandingCMSContent> {
  // ✅ 2. Initialize and await the client INSIDE the function
  // This is required because Next.js 16 needs to await request headers/cookies
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase
    .from("site_content")
    .select("section, content")
    .eq("is_active", true); 
    // Note: I removed .eq("page", "/") because your previous SQL fixes 
    // made 'page' optional/nullable. This ensures content still loads.

  if (error) {
    console.error("CMS fetch error:", error);
    return {};
  }

  const result: LandingCMSContent = {};

  if (!data) {
    return result;
  }

  data.forEach((row: { section: string; content: unknown }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    result[row.section as keyof LandingCMSContent] = row.content as any;
  });

  return result;
}