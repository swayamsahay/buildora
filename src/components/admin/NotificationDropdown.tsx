"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, MessageSquare, Clock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

interface NotificationDropdownProps {
  count: number;
  notifications: Notification[];
}

export function NotificationDropdown({ count, notifications }: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center justify-center outline-none"
      >
        <Bell className={cn("transition-colors", isOpen ? "text-white" : "text-slate-400 group-hover:text-white")} size={20} />
        {count > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white ring-2 ring-[#050505]">
            {count}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-4 w-80 bg-[#0a0a0a] border border-slate-800 rounded-lg shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#0f172a]">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Notifications</h4>
            <span className="text-[10px] bg-blue-600/10 text-blue-500 px-2 py-0.5 rounded-full font-bold">
              {count} New
            </span>
          </div>
          
          <div className="max-h-[300px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">
                No new notifications
              </div>
            ) : (
              <div className="divide-y divide-slate-800/50">
                {notifications.map((note) => (
                  <Link 
                    key={note.id} 
                    href="/admin/requests"
                    onClick={() => setIsOpen(false)}
                    className="block p-4 hover:bg-white/[0.02] transition-colors group/item"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 bg-blue-500/10 p-1.5 rounded text-blue-500 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                        <MessageSquare size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{note.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{note.email}</p>
                        <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{note.message}</p>
                        <div className="flex items-center gap-1 mt-2 text-[9px] text-slate-600">
                          <Clock size={10} />
                          {new Date(note.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 border-t border-slate-800 bg-[#050505]">
            <Link 
              href="/admin/requests"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-2 rounded border border-slate-800 hover:bg-slate-900 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
            >
              View All Requests
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
