import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Boxes,
  Mail,
  Activity,
  ArrowUpRight,
  Globe,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSupabaseServerClient } from "@/lib/supabase/server";

type StatColor = "blue" | "orange" | "purple" | "emerald" | "yellow";

export default async function AdminDashboardPage() {
  const supabase = await getSupabaseServerClient();

  const [
    servicesRes,
    totalContactsRes,
    newContactsRes,
    inProgressContactsRes,
    completedContactsRes,
    profilesRes
  ] = await Promise.all([
    supabase.from("services").select("*", { count: "exact", head: true }),
    supabase.from("contacts").select("*", { count: "exact", head: true }),
    supabase.from("contacts").select("*", { count: "exact", head: true }).or("status.eq.new,status.is.null"),
    supabase.from("contacts").select("*", { count: "exact", head: true }).eq("status", "in_progress"),
    supabase.from("contacts").select("*", { count: "exact", head: true }).eq("status", "completed"),
    supabase.from("profiles").select("*", { count: "exact", head: true }),
  ]);

  const { data: lastCMSUpdate } = await supabase
    .from("cms")
    .select("created_at")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  // Workflow Breakdown
  const workflow = {
    new: newContactsRes.count ?? 0,
    in_progress: inProgressContactsRes.count ?? 0,
    completed: completedContactsRes.count ?? 0,
    total: totalContactsRes.count ?? 0
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 p-4 md:p-8 min-h-screen text-slate-100">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-8 border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="bg-blue-600 p-1 rounded">
              <ShieldCheck className="text-white h-4 w-4" />
            </div>
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">
              Administrator Portal
            </span>
            <div className="flex items-center gap-2 ml-4 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">System Operational</span>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Buildora <span className="text-blue-500">HQ</span>
          </h1>
          {lastCMSUpdate && (
             <p className="text-xs text-slate-500 mt-2 font-mono">
                Last updated: {new Date(lastCMSUpdate.created_at).toLocaleString()}
             </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <Globe className="h-4 w-4" /> Visit Site
            </Button>
          </Link>
        </div>
      </div>

      {/* PRIMARY STATS */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/services" className="block">
          <StatCard title="Total Services" value={servicesRes.count ?? 0} icon={Boxes} color="blue" description="Live on site" clickable />
        </Link>
        <Link href="/admin/requests" className="block">
          <StatCard title="Total Leads" value={workflow.total} icon={Mail} color="orange" description="Lifetime inquiries" clickable />
        </Link>
        <StatCard title="Active Users" value={profilesRes.count ?? 0} icon={Users} color="purple" description="System access" />
        <StatCard title="CMS Integrity" value="Healthy" icon={Activity} color="emerald" description={lastCMSUpdate ? `Sync: ${new Date(lastCMSUpdate.created_at).toLocaleDateString()}` : "Online"} />
      </div>

      {/* WORKFLOW BREAKDOWN */}
      <div className="grid gap-6 md:grid-cols-3">
        <Link href="/admin/requests">
          <StatCard title="New Requests" value={workflow.new} icon={AlertCircle} color="blue" description="Needs immediate action" clickable />
        </Link>
        <Link href="/admin/requests">
          <StatCard title="In Progress" value={workflow.in_progress} icon={Clock} color="yellow" description="Currently being handled" clickable />
        </Link>
        <Link href="/admin/requests">
          <StatCard title="Completed" value={workflow.completed} icon={CheckCircle2} color="emerald" description="Successfully resolved" clickable />
        </Link>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, description, color, clickable }: { title: string; value: number | string; icon: React.ElementType; description: string; color: StatColor; clickable?: boolean; }) {
  const colors: Record<StatColor, string> = {
    blue: "bg-blue-500/10 text-blue-400",
    orange: "bg-orange-500/10 text-orange-400",
    purple: "bg-purple-500/10 text-purple-400",
    emerald: "bg-emerald-500/10 text-emerald-400",
    yellow: "bg-yellow-500/10 text-yellow-400",
  };

  return (
    <Card className={`border-slate-800 bg-slate-900/60 ${clickable ? "cursor-pointer hover:border-blue-500 hover:bg-slate-900/80" : ""}`}>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div className={`p-3 rounded-xl ${colors[color]}`}><Icon className="h-6 w-6" /></div>
          <ArrowUpRight className={`h-4 w-4 ${clickable ? "text-blue-500" : "text-slate-600"}`} />
        </div>
        <div className="mt-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</p>
          <h2 className="text-3xl font-black text-white mt-1">{value}</h2>
          <p className="text-[11px] text-slate-400 mt-1 font-medium">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}