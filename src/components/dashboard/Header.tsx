"use client";

import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { supabaseClient } from "@/lib/supabase/client";

/* ✅ Props for mobile hamburger */
type HeaderProps = {
  onMenuClick?: () => void;
};

function getPageTitle(pathname: string) {
  if (pathname === "/admin") return "Admin Overview";
  if (pathname.startsWith("/admin/services")) return "Services";
  if (pathname.startsWith("/admin/cms")) return "Landing Page CMS";
  if (pathname.startsWith("/admin/contacts")) return "Contacts";
  if (pathname.startsWith("/admin/users")) return "Users";
  if (pathname.startsWith("/admin/settings")) return "Settings";
  if (pathname.startsWith("/dashboard")) return "Dashboard";
  return "Buildora";
}

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await supabaseClient.auth.signOut();
    router.replace("/login");
  }

  return (
    <header className="h-16 border-b border-slate-800 bg-black flex items-center justify-between px-4 md:px-6">
      
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">
        {/* ✅ Mobile Hamburger */}
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="md:hidden text-slate-400 hover:text-white"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        {/* Page Title */}
        <h2 className="text-lg font-semibold text-white">
          {getPageTitle(pathname)}
        </h2>
      </div>

      {/* RIGHT SIDE */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </header>
  );
}
