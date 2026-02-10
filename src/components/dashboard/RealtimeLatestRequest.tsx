"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabase/client";

type RequestStatus = "new" | "in_progress" | "completed";

type Request = {
  id: string;
  message: string;
  status: RequestStatus;
  created_at: string;
};

type Props = {
  initialRequest: Request | null;
  email: string;
};

export default function RealtimeLatestRequest({
  initialRequest,
  email,
}: Props) {
  const [request, setRequest] = useState<Request | null>(initialRequest);

  useEffect(() => {
    if (!email) return;

    const channel = supabaseClient
      .channel("realtime-latest-request")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "contacts",
          filter: `email=eq.${email}`,
        },
        (payload) => {
          setRequest(payload.new as Request);
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [email]);

  if (!request) {
    return (
      <p className="text-muted-foreground">
        You haven’t submitted any requests yet.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">
        {new Date(request.created_at).toLocaleString()}
      </p>

      <p className="font-medium">{request.message}</p>

      <p className="uppercase text-xs font-bold">
        Status: {request.status.replace("_", " ")}
      </p>
    </div>
  );
}
