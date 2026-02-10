"use client";

import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { supabaseClient } from "@/lib/supabase/client";

function getPageTitle(pathname: string) {
  if (pathname === "/admin") return "Admin Overview";
  if (pathname.startsWith("/admin/services")) return "Services";
  if (pathname.startsWith("/admin/requests")) return "Client Requests";
  if (pathname.startsWith("/admin/cms")) return "Landing Page CMS";
  if (pathname.startsWith("/admin/settings")) return "Settings";
  if (pathname.startsWith("/dashboard")) return "Client Dashboard";
  return "Buildora Portal";
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await supabaseClient.auth.signOut();
    router.replace("/login");
  }

  return (
    <header className="h-16 border-b border-slate-800 bg-[#0a0a0a] flex items-center justify-between px-6 sticky top-0 z-[999] w-full">
      <div className="flex items-center gap-6">
        
        {/* BRAND SECTION */}
        <div className="flex items-center gap-3 group cursor-pointer">
          {/* ✅ EMBEDDED SVG LOGO - This cannot fail to load */}
          <div className="flex-shrink-0 transition-all duration-300 group-hover:drop-shadow-[0_0_12px_#22d3ee]">
            <svg 
              width="36" 
              height="36" 
              viewBox="0 0 40 40" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="8" fill="#2563eb"/>
              <path d="M12 28V12H20C23 12 25 14 25 17C25 18.5 24 20 22.5 20.5C24.5 21 26 23 26 25C26 28 24 30 20.5 30H12V28ZM15 15V19H19C20.5 19 21.5 18.5 21.5 17C21.5 15.5 20.5 15 19 15H15ZM15 22V27H20.5C22 27 23 26.5 23 25C23 23.5 22 22.5 20.5 22.5H15V22Z" fill="white"/>
              <circle cx="32" cy="8" r="4" fill="#22d3ee" className="animate-pulse" />
            </svg>
          </div>
          
          <span className="text-xl font-bold tracking-tight text-white transition-colors group-hover:text-blue-500">
            BUILDORA
          </span>
        </div>

        {/* Separator */}
        <div className="h-6 w-[1px] bg-slate-800 hidden sm:block" />

        {/* Page Title */}
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hidden sm:block">
          {getPageTitle(pathname)}
        </h2>
      </div>

      {/* Logout */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-all border border-slate-800 bg-white/5 px-4 py-2 hover:bg-red-500/10"
        >
          <LogOut className="h-3.5 w-3.5" />
          Logout
        </button>
      </div>
    </header>
  );
}