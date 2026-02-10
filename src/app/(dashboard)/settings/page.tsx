import { getSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Shield } from "lucide-react";
import { SignOutButton } from "./SignOutButton";

export default async function SettingsPage() {
  const supabase = await getSupabaseServerClient();
  
  // Fetch user session
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch user profile/role
  let role = "User";
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role) {
    role = profile.role;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Settings
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage your account preferences and session.
          </p>
        </div>
      </div>

      {/* ACCOUNT INFORMATION */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-slate-500" />
            Profile Information
          </CardTitle>
          <CardDescription>
            Your personal account details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <Input 
                id="email" 
                value={user.email} 
                disabled 
                className="pl-9 bg-slate-50 dark:bg-slate-900" 
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="role">Account Role</Label>
            <div className="relative">
              <Shield className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <Input 
                id="role" 
                value={role} 
                disabled 
                className="pl-9 bg-slate-50 dark:bg-slate-900 capitalize" 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SESSION MANAGEMENT */}
      <Card className="border-red-100 dark:border-red-900/50">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400">Session Management</CardTitle>
          <CardDescription>
            Sign out of your account on this device.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              You are currently logged in as <span className="font-medium text-slate-900 dark:text-slate-200">{user.email}</span>
            </div>
            <SignOutButton />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
