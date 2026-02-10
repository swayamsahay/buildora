import { getSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { StartProjectForm } from "@/components/dashboard/StartProjectForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function StartProjectPage() {
  const supabase = await getSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    redirect("/login");
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Start a Project</CardTitle>
        </CardHeader>
        <CardContent>
          <StartProjectForm userEmail={user.email} />
        </CardContent>
      </Card>
    </div>
  );
}
