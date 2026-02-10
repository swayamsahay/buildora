import { getSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RequestTimeline from "@/components/dashboard/RequestTimeline";

export const dynamic = "force-dynamic";

type RequestStatus = "new" | "in_progress" | "completed";

type LatestRequest = {
  id: string;
  message: string;
  status: RequestStatus;
  created_at: string;
};

export default async function DashboardPage() {
  const supabase = await getSupabaseServerClient();

  // 🔐 Auth check
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    redirect("/login");
  }

  // 🔹 Latest request
  const { data: latestRequest } = await supabase
    .from("contacts")
    .select("id, message, status, created_at")
    .eq("email", user.email)
    .order("created_at", { ascending: false })
    .limit(1)
    .single<LatestRequest>();

  // 🔹 Counts
  const { count: total } = await supabase
    .from("contacts")
    .select("*", { count: "exact", head: true })
    .eq("email", user.email);

  const { count: inProgress } = await supabase
    .from("contacts")
    .select("*", { count: "exact", head: true })
    .eq("email", user.email)
    .eq("status", "in_progress");

  const { count: completed } = await supabase
    .from("contacts")
    .select("*", { count: "exact", head: true })
    .eq("email", user.email)
    .eq("status", "completed");

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Track your requests and project progress
        </p>
      </div>

      {/* 🔥 Latest Request */}
      <Card>
        <CardHeader>
          <CardTitle>Your Latest Request</CardTitle>
        </CardHeader>

        <CardContent>
          {latestRequest ? (
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground">
                Submitted on{" "}
                {new Date(latestRequest.created_at).toLocaleString()}
              </p>

              <p className="font-medium leading-relaxed">
                {latestRequest.message}
              </p>

              <p className="uppercase text-xs font-bold tracking-wider">
                Status: {latestRequest.status.replace("_", " ")}
              </p>

              {/* ✅ Status Timeline */}
              <RequestTimeline status={latestRequest.status} />

              {/* ✅ Trust Signal */}
              <p className="text-xs text-muted-foreground">
                Estimated response time:{" "}
                <span className="font-semibold text-slate-300">
                  24–48 hours
                </span>
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground">
              You haven’t submitted any requests yet.
            </p>
          )}
        </CardContent>
      </Card>

      {/* 📊 Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              Total Requests
            </p>
            <p className="text-2xl font-bold">
              {total ?? 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              In Progress
            </p>
            <p className="text-2xl font-bold">
              {inProgress ?? 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              Completed
            </p>
            <p className="text-2xl font-bold">
              {completed ?? 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 🤝 Trust / Guidance */}
      <Card>
        <CardHeader>
          <CardTitle>What Happens Next?</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-1">
          <p>• We review your request</p>
          <p>• Status moves to In Progress</p>
          <p>• You’ll see updates right here</p>
        </CardContent>
      </Card>
    </div>
  );
}
