import { getSupabaseServerClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Shield, Server, CreditCard, Mail } from "lucide-react";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

export default async function AdminSettingsPage() {
  const supabase = await getSupabaseServerClient();
  
  // Fetch real user data
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch user role from profiles
  let role = "User";
  if (user?.id) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    if (profile?.role) {
      role = profile.role;
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white">Admin Settings</h1>
            <p className="text-slate-400 mt-1">System configuration and profile management.</p>
          </div>
          <Link href="/admin">
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* ACCOUNT INFORMATION */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-blue-500 font-bold uppercase tracking-widest text-xs">
            <User className="h-4 w-4" /> Account Information
          </div>
          <Card className="bg-[#0f172a] border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Your Profile</CardTitle>
              <CardDescription className="text-slate-400">Authenticated session details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-300">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <Input 
                    disabled 
                    value={user?.email || "No email found"} 
                    className="pl-10 bg-[#020617] border-slate-800 text-slate-400 cursor-not-allowed"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-300">Role</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <Input 
                    disabled 
                    value={role} 
                    className="pl-10 bg-[#020617] border-slate-800 text-slate-400 cursor-not-allowed capitalize"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ACCOUNT ACTIONS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-widest text-xs">
            <CreditCard className="h-4 w-4" /> Account Actions
          </div>
          <Card className="bg-[#0f172a] border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-bold">Sign Out</h4>
                  <p className="text-sm text-slate-400">End your current session securely.</p>
                </div>
                <LogoutButton />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* SYSTEM INFO */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-widest text-xs">
            <Server className="h-4 w-4" /> System Info
          </div>
          <Card className="bg-[#0f172a] border-slate-800">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#020617] rounded-lg border border-slate-800">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Application Name</p>
                  <p className="text-white font-mono">Buildora</p>
                </div>
                <div className="p-4 bg-[#020617] rounded-lg border border-slate-800">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Environment</p>
                  <p className="text-white font-mono">{process.env.NODE_ENV}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </div>
  );
}
