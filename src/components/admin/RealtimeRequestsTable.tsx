"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabase/client";
import RequestStatusSelect from "./RequestStatusSelect";

type RequestStatus = "new" | "in_progress" | "completed";

type Request = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  message: string;
  status: RequestStatus | null;
};

export default function RealtimeRequestsTable({
  initialRequests,
}: {
  initialRequests: Request[];
}) {
  const [requests, setRequests] = useState<Request[]>(initialRequests);

  // keep server data in sync
  useEffect(() => {
    setRequests(initialRequests);
  }, [initialRequests]);

  // 🔁 realtime updates
  useEffect(() => {
    const channel = supabaseClient
      .channel("realtime-requests")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "contacts",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setRequests((prev) => [payload.new as Request, ...prev]);
          }

          if (payload.eventType === "UPDATE") {
            setRequests((prev) =>
              prev.map((r) =>
                r.id === payload.new.id ? (payload.new as Request) : r
              )
            );
          }

          if (payload.eventType === "DELETE") {
            setRequests((prev) =>
              prev.filter((r) => r.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white uppercase tracking-tighter">
          All Requests
        </h1>
        <div className="bg-slate-900 px-3 py-1 rounded border border-slate-800 text-xs text-slate-500 font-mono">
          Total: {requests.length}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-800/50 text-slate-300 font-bold uppercase text-[11px] tracking-widest">
            <tr>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Message</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {requests.map((r) => (
              <tr
                key={r.id}
                className="hover:bg-white/[0.02] transition-colors"
              >
                <td className="p-4 text-slate-500 text-xs whitespace-nowrap font-mono">
                  {new Date(r.created_at).toLocaleDateString()}
                  <span className="block text-[10px] opacity-50">
                    {new Date(r.created_at).toLocaleTimeString()}
                  </span>
                </td>

                <td className="p-4 font-bold text-slate-200">
                  {r.name}
                </td>

                <td className="p-4 text-blue-400 font-mono text-xs">
                  {r.email}
                </td>

                <td className="p-4 text-slate-400 max-w-md leading-relaxed text-xs">
                  {r.message}
                </td>

                {/* ✅ STATUS DROPDOWN */}
                <td className="p-4">
                  <RequestStatusSelect
                    id={r.id}
                    status={r.status ?? "new"}
                  />
                </td>
              </tr>
            ))}

            {requests.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="p-20 text-center text-slate-500 uppercase font-black tracking-widest opacity-50"
                >
                  No requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
