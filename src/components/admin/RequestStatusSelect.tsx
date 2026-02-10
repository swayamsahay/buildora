"use client";

import { useState } from "react";

type RequestStatus = "new" | "in_progress" | "completed";

interface Props {
  id: string;
  status: RequestStatus;
}

export default function RequestStatusSelect({ id, status }: Props) {
  const [currentStatus, setCurrentStatus] = useState<RequestStatus>(status);
  const [loading, setLoading] = useState(false);

  async function onStatusChange(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    const newStatus = e.target.value as RequestStatus;

    setCurrentStatus(newStatus);
    setLoading(true);

    await fetch("/api/admin/requests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        status: newStatus,
      }),
    });

    setLoading(false);
  }

  return (
    <select
      value={currentStatus}
      disabled={loading}
      onChange={onStatusChange}
      className="bg-slate-950 border border-slate-700 rounded px-3 py-1 text-sm disabled:opacity-50"
    >
      <option value="new">New</option>
      <option value="in_progress">In Progress</option>
      <option value="completed">Completed</option>
    </select>
  );
}
