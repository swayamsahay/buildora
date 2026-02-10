import { getSupabaseServerClient } from "@/lib/supabase/server";
import { CMSForm } from "./cms-form";

export default async function AdminCMSPage() {
  const supabase = await getSupabaseServerClient();
  
  // Fetch CMS data server-side
  const { data: cmsData } = await supabase
    .from("cms")
    .select("*");
    
  // Map data for the form (safe defaults)
  const initialData = {
    hero: cmsData?.find(d => d.section === "hero")?.content || {},
    about: cmsData?.find(d => d.section === "about")?.content || {},
    services: cmsData?.find(d => d.section === "services")?.content || {},
    cta: cmsData?.find(d => d.section === "cta")?.content || {}
  };

  return <CMSForm initialData={initialData} />;
}
