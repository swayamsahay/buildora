"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Send } from "lucide-react";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

export default function ContactClient() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // ✅ UPDATED SUBMIT HANDLER (LOGS REAL ERROR)
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to submit");
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
      router.refresh();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      console.error("CONTACT FORM ERROR:", errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 min-h-[80vh] flex flex-col justify-between bg-background relative overflow-hidden">
      <AnimatedBackground />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* LEFT */}
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8 block flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-foreground/20" />
            Contact
          </span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase mb-12">
            Let&apos;s<br />Talk
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-md">
            Have a project in mind? We&apos;d love to hear about it.
          </p>

          <a
            href="mailto:hello@buildora.studio"
            className="text-2xl font-medium border-b pb-2 inline-flex items-center gap-4"
          >
            hello@buildora.studio
            <ArrowUpRight className="w-6 h-6" />
          </a>
        </div>

        {/* FORM */}
        <div className="bg-foreground/5 p-8 md:p-12 rounded-2xl border border-border">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="text-xs uppercase tracking-widest">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-transparent border-b py-4 outline-none"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                className="w-full bg-transparent border-b py-4 outline-none"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                required
                className="w-full bg-transparent border-b py-4 outline-none resize-none"
              />
            </div>

            {success && (
              <p className="text-green-500 text-sm">
                Message sent successfully ✔
              </p>
            )}

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-between bg-foreground text-background h-16 px-8 rounded-full font-bold text-lg disabled:opacity-60"
            >
              {loading ? "Sending…" : "Send Message"}
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
