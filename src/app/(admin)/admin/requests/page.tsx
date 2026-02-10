import { getSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import RealtimeRequestsTable from "@/components/admin/RealtimeRequestsTable";

export default async function AdminRequestsPage() {
  const supabase = await getSupabaseServerClient();

  // 1. Auth & Admin Check
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/");
  }

  // 2. Fetch Data
  const { data: requests } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  return <RealtimeRequestsTable initialRequests={requests || []} />;
}
