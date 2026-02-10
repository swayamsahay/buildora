import type React from "react";

import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Topbar from "@/components/admin/Topbar";

/* =========================
   ADMIN LAYOUT (SERVER)
========================= */

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await getSupabaseServerClient();

  // 1️⃣ Check login
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // 2️⃣ Check admin role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      {/* ===== SIDEBAR (CLIENT) ===== */}
      <AdminSidebar />

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 ml-72 flex flex-col">
        <Topbar />
        <main className="flex-1 p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
