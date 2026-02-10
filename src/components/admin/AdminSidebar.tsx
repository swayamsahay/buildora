"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  Globe,
  Mail,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { supabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabaseClient.auth.signOut();
    router.push("/login");
  };

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/services", label: "Services", icon: Layers },
    { href: "/admin/requests", label: "Client Requests", icon: Mail },
    { href: "/admin/cms", label: "CMS", icon: Globe },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-72 fixed h-full border-r border-white/5 bg-[#0a0a0a] flex flex-col z-50">
      {/* Updated Logo Section with Glow Effect */}
      <Link href="/admin" className="group block">
        <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-800 transition-colors group-hover:bg-white/[0.02]">
          <img
            src="/logo.png"
            alt="Buildora Logo"
            className="h-10 w-10 object-contain transition duration-300 hover:drop-shadow-[0_0_12px_#22d3ee]"
          />
          <div>
            <p className="text-lg font-bold tracking-tight text-white group-hover:text-blue-500 transition-colors">
              Buildora
            </p>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-black">
              Admin
            </p>
          </div>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="p-6 space-y-1 flex-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3.5 rounded-md transition-all",
                "font-black uppercase tracking-[0.2em] text-[10px]",
                isActive 
                  ? "bg-blue-600/10 text-white" 
                  : "text-white/40 hover:text-white hover:bg-white/[0.03]"
              )}
            >
              <Icon 
                size={18} 
                className={cn(
                  "transition-colors",
                  isActive ? "text-blue-500" : "text-slate-600 group-hover:text-blue-500"
                )} 
              />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-white/5">
        <button 
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full p-3.5 text-red-500 font-black uppercase text-[10px] tracking-widest hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <LogOut size={18} strokeWidth={3} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}