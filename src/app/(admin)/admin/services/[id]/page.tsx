import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { ServiceEditForm } from "./service-edit-form";

export default async function ServiceEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Wait for the ID and the Connection
  const { id } = await params; 
  const supabase = await getSupabaseServerClient();

  // 2. Go find the specific service in the drawer
  const { data: service, error } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single();

  // 3. If it's not there, go back to the list
  if (error || !service) {
    redirect("/admin/services");
  }

  return <ServiceEditForm service={service} />;
}
