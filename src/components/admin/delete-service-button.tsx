"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/supabase/client"; // ✅ correct client
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";

// Accept string or number to prevent type mismatches
export default function DeleteServiceButton({ id }: { id: string | number }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    const isConfirmed = window.confirm(
      "Are you sure? This service will be removed from the live website immediately."
    );

    if (!isConfirmed) return;

    setIsDeleting(true);

    try {
      const { error } = await supabaseClient
        .from("services")
        .delete()
        .eq("id", id);

      if (error) throw error;

      // Forces Server Components to re-fetch fresh data
      router.refresh();
    } catch (error: unknown) {
      alert("Error: " + (error instanceof Error ? error.message : "An unknown error occurred"));
      setIsDeleting(false);
    }
  }

  return (
    <Button
      onClick={handleDelete}
      disabled={isDeleting}
      variant="outline"
      className="border-slate-800 bg-slate-950 text-red-500 hover:bg-red-600 hover:text-white font-black uppercase text-[10px] tracking-widest h-12 px-6"
    >
      {isDeleting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <Trash2 className="h-4 w-4 mr-2" /> Delete
        </>
      )}
    </Button>
  );
}
