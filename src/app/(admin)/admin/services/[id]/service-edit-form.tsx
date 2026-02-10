"use client";

import { useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateService } from "../actions";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import Image from "next/image";

interface ServiceData {
  id: string;
  title?: string;
  short_description?: string;
  long_description?: string;
  icon_url?: string;
  cover_image?: string;
  sort_order?: number;
  status?: string;
  [key: string]: unknown; // Allow for other properties from DB
}

export function ServiceEditForm({ service }: { service: ServiceData }) {
  const [isPending, startTransition] = useTransition();

  async function clientAction(formData: FormData) {
    startTransition(async () => {
      try {
        await updateService(service.id, formData);
      } catch (error: unknown) {
        alert("Error updating: " + (error instanceof Error ? error.message : "An unknown error occurred"));
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Edit Service</h1>
          <p className="text-sm text-slate-500">
            Update service content and how it looks to customers
          </p>
        </div>

        <Badge
          className="capitalize"
          variant={service.status === "published" ? "default" : "secondary"}
        >
          {service.status}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* LEFT SIDE: THE FORMS */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <form action={clientAction} className="space-y-4">
              <Field label="Service Title">
                <input
                  name="title"
                  defaultValue={service.title}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </Field>

              <Field label="Short Summary (Catchy!)">
                <textarea
                  name="short_description"
                  defaultValue={service.short_description}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black min-h-[80px]"
                />
              </Field>

              <Field label="Full Description">
                <textarea
                  name="long_description"
                  rows={6}
                  defaultValue={service.long_description}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Icon Name/URL">
                  <input
                    name="icon_url"
                    defaultValue={service.icon_url ?? ""}
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </Field>

                <Field label="Sort Order">
                  <input
                    type="number"
                    name="sort_order"
                    defaultValue={service.sort_order ?? 0}
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </Field>
              </div>

              <Field label="Cover Image Link">
                <input
                  name="cover_image"
                  defaultValue={service.cover_image ?? ""}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="https://example.com/image.jpg"
                />
              </Field>

              {/* Buttons */}
              <div className="flex items-center gap-3 pt-6 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 rounded-md bg-black text-white text-sm font-medium hover:bg-slate-800 transition-colors flex items-center"
                >
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Publish Changes
                </button>

                <Link
                  href="/admin/services"
                  className="ml-auto text-sm text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* RIGHT SIDE: LIVE PREVIEW */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Live Preview</h3>
          <Card className="overflow-hidden border-dashed border-2 border-slate-200 bg-slate-50/50">
            <CardContent className="p-6">
              <ServicePreview service={service} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-slate-700 uppercase tracking-tight">
        {label}
      </label>
      {children}
    </div>
  );
}

function ServicePreview({ service }: { service: ServiceData }) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
      {service.cover_image ? (
        <div className="relative w-full h-48">
          <Image
            src={service.cover_image}
            alt={service.title || "Service image"}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-slate-200 flex items-center justify-center text-slate-400 text-xs">
          No image provided
        </div>
      )}

      <div className="p-5 space-y-2">
        <h3 className="text-xl font-bold text-slate-900 leading-tight">
          {service.title || "Untitled Service"}
        </h3>

        <p className="text-sm text-slate-600 line-clamp-2">
          {service.short_description || "No description written yet..."}
        </p>

        <div className="pt-4 flex items-center text-xs font-bold text-black border-t border-slate-50">
           EXPLORE SERVICE →
        </div>
      </div>
    </div>
  );
}
