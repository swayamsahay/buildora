"use client";

import { Button } from "@/components/ui/button";
import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-950 sm:px-6">
      <div className="flex items-center gap-4">
        <div className="relative w-full max-w-sm md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
          <Input
            type="search"
            placeholder="Search..."
            className="h-9 w-full rounded-md bg-slate-50 pl-9 sm:w-64 dark:bg-slate-900"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-slate-500 dark:text-slate-400" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800">
             <User className="h-5 w-5 text-slate-500 dark:text-slate-400" />
          </div>
        </Button>
      </div>
    </header>
  );
}
