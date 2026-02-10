"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Loader2, Rocket } from "lucide-react";
import Link from "next/link";
import { createService } from "../actions";

export default function NewServicePage() {
  const [isPending, startTransition] = useTransition();

  async function clientAction(formData: FormData) {
    startTransition(async () => {
      try {
        await createService(formData);
      } catch (error: unknown) {
        alert("Error saving: " + (error instanceof Error ? error.message : "An unknown error occurred"));
      }
    });
  }

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10 min-h-screen">
      <Link
        href="/admin/services"
        className="flex items-center gap-2 text-slate-500 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="font-black uppercase tracking-widest text-xs">
          Back to List
        </span>
      </Link>

      <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-10">
        Create <span className="text-blue-500">Service</span>
      </h1>

      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl rounded-[2rem] overflow-hidden">
        <CardContent className="p-8">
          <form action={clientAction} className="space-y-8">
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Service Title
              </label>
              <Input
                name="title"
                required
                className="bg-slate-950 border-slate-800 h-16 text-xl font-bold text-white focus:ring-blue-500"
                placeholder="e.g. CUSTOM WEB DEVELOPMENT"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Description
              </label>
              <Textarea
                name="description"
                required
                className="bg-slate-950 border-slate-800 min-h-[150px] text-lg font-medium text-slate-300"
                placeholder="Describe what you offer..."
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 h-16 text-white font-black uppercase tracking-[0.2em] shadow-xl"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Rocket className="mr-2" /> Launch Service
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
