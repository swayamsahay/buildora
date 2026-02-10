"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabaseClient.auth.signOut();
    router.push("/login");
  };

  return (
    <Button 
      variant="destructive" 
      onClick={handleSignOut}
      className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 font-bold uppercase tracking-wider text-xs"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Sign Out
    </Button>
  );
}
