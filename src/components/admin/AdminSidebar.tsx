"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Ticket, FileText, Briefcase, LogOut, Settings } from "lucide-react";

const adminLinks = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/tickets", label: "Tickets", icon: Ticket },
  { href: "/admin/cms", label: "CMS Editor", icon: FileText },
  { href: "/admin/applications", label: "Pipeline", icon: Briefcase },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r border-slate-200 bg-slate-900 text-slate-50 dark:border-slate-800 md:flex md:w-64 md:flex-col">
      <div className="flex h-16 items-center border-b border-slate-800 px-6">
        <Link href="/admin" className="flex items-center space-x-2">
          <span className="text-xl font-bold">
            Buildora Admin
          </span>
        </Link>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto py-4">
        <nav className="flex-1 space-y-1 px-2">
          {adminLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <link.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-slate-800 px-2 pt-4">
          <Link
            href="/login"
            className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
            Log out
          </Link>
        </div>
      </div>
    </div>
  );
}
