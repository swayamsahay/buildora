import { supabase } from "@/lib/supabase/server";

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
  const { data, error } = await supabase
    .from("site_content")
    .select("section, content")
    .eq("page", "/")
    .eq("is_active", true);

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
