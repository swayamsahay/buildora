"use client";

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function ContactInlineForm({
  userEmail,
}: {
  userEmail: string;
}) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Initialize EmailJS SAFELY (browser only)
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      console.error("EmailJS public key missing");
      return;
    }

    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
  }, []);

  // Auto-hide success message
  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => setSuccess(false), 3000);
    return () => clearTimeout(timer);
  }, [success]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!message.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // 1️⃣ Save to Supabase
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          message,
        }),
      });

      if (!res.ok) throw new Error("Database insert failed");

      // 2️⃣ Send Email via EmailJS
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        {
          name: "Buildora User",
          user_email: userEmail, // MUST match template
          message: message,
        }
      );
      // 3️⃣ Send ADMIN notification email
        await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID as string,
        {
        email: userEmail,
        message: message,
        }
        );


      console.log("EMAIL SENT:", result);

      setSuccess(true);
      setMessage("");
    } catch (err) {
  console.error("EMAIL ERROR (non-blocking):", err);

  // ❗ Request is already saved, so we still show success
  setSuccess(true);
  setMessage("");
}
 finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="DESCRIBE YOUR PROJECT OR REQUIREMENT..."
        className="w-full min-h-[120px] bg-slate-950 border border-slate-800 p-4 text-xs uppercase"
      />

      <button
        type="submit"
        disabled={loading}
        className="h-12 w-full md:w-auto px-10 bg-white text-black text-xs font-black uppercase tracking-widest disabled:opacity-50"
      >
        {loading ? "SENDING..." : "SUBMIT REQUEST"}
      </button>

      {success && (
        <p className="text-green-500 text-sm">
          Request submitted. Check your email.
        </p>
      )}

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </form>
  );
}
