"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Ticket, Settings, LogOut } from "lucide-react";

const sidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/tickets", label: "My Tickets", icon: Ticket },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 md:flex md:w-64 md:flex-col">
      <div className="flex h-16 items-center border-b border-slate-200 px-6 dark:border-slate-800">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-slate-900 dark:text-slate-50">
            Buildora
          </span>
        </Link>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto py-4">
        <nav className="flex-1 space-y-1 px-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-50"
                )}
              >
                <link.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-slate-200 px-2 pt-4 dark:border-slate-800">
          <Link
            href="/login"
            className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-50"
          >
            <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
            Log out
          </Link>
        </div>
      </div>
    </div>
  );
}
