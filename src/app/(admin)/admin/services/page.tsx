"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Service = {
  id: string;
  title: string;
  description: string;
  is_active?: boolean;
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // NEW SERVICE STATE
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  /* =========================
     LOAD SERVICES
  ========================= */
  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error("Failed to load services", err);
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  /* =========================
     UPDATE LOCAL STATE
  ========================= */
  function updateService(
    index: number,
    field: keyof Service,
    value: string
  ) {
    const updated = [...services];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setServices(updated);
  }

  if (loading) {
    return <div className="p-8">Loading services…</div>;
  }

  return (
    <div className="max-w-5xl space-y-10 p-8">
      <h1 className="text-3xl font-bold">Services CMS</h1>

      {/* =========================
          ADD NEW SERVICE
      ========================= */}
      <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-950 p-6">
        <h2 className="text-xl font-semibold">Add New Service</h2>

        <Input
          placeholder="Service title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />

        <Textarea
          placeholder="Service description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />

        <Button
  variant="destructive"  disabled>
  
 Delete (Coming Soon)
</Button>

      </div>

      {/* =========================
          EXISTING SERVICES
      ========================= */}
      {services.map((service, index) => (
        
        <div
          key={service.id}
          className="space-y-4 rounded-xl border border-border bg-background p-6"
        >
          <Input
            value={service.title}
            onChange={(e) =>
              updateService(index, "title", e.target.value)
            }
            placeholder="Service title"
          />

          <Button
  variant="destructive"
  onClick={async () => {
    if (!confirm("Delete this service?")) return;

    const res = await fetch("/api/admin/services/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: service.id }),
    });

    if (!res.ok) {
      alert("Delete failed");
      return;
    }

    setServices((prev) =>
      prev.filter((s) => s.id !== service.id)
    );
  }}
>
  Delete
</Button>

     


          <Textarea
            value={service.description}
            onChange={(e) =>
              updateService(index, "description", e.target.value)
            }
            placeholder="Service description"
          />

          <Button
            onClick={async () => {
              try {
                const res = await fetch("/api/admin/services", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    id: service.id,
                    title: service.title,
                    description: service.description,
                  }),
                });

                if (!res.ok) {
                  const err = await res.json();
                  console.error("Save failed:", err);
                  alert("Save failed");
                  return;
                }

                alert("Saved successfully");
              } catch (error) {
                console.error("Request error:", error);
                alert("Save failed");
              }
            }}
          >
            Save
          </Button>
        </div>
      ))}
    </div>
  );
}
