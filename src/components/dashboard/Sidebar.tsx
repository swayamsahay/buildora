"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  MessageSquare,
  X,
} from "lucide-react";

/* ✅ ADD PROPS TYPE */
type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

const sidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/requests", label: "My Requests", icon: MessageSquare },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed z-50 inset-y-0 left-0 w-64 bg-[#0a0a0a] border-r border-slate-800 flex flex-col transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:static"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-6">
          <Link href="/dashboard" className="flex items-center gap-3">
            <img src="/logo.png" className="h-8 w-8" alt="Logo" />
            <span className="font-black uppercase tracking-tight">Buildora</span>
          </Link>

          {/* Close button (mobile) */}
          <button
            onClick={onClose}
            className="md:hidden text-slate-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "flex items-center px-3 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-colors",
                  isActive
                    ? "bg-blue-600/10 text-white border-l-2 border-blue-500"
                    : "text-slate-500 hover:text-white"
                )}
              >
                <Icon className="mr-3 h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-800 px-3 py-4">
          <Link
            href="/login"
            className="flex items-center px-3 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut className="mr-3 h-4 w-4" />
            Log out
          </Link>
        </div>
      </aside>
    </>
  );
}