"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await supabaseClient.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <Button 
      variant="destructive" 
      onClick={handleSignOut}
      disabled={loading}
      className="gap-2"
    >
      <LogOut className="h-4 w-4" />
      {loading ? "Signing out..." : "Sign Out"}
    </Button>
  );
}
