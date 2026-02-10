"use client";

import { supabaseClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendReset() {
    setError(null);

    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/update-password`,
    });

    if (error) {
      setError(error.message);
      return;
    }

    setSent(true);
  }

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-semibold text-center">Reset password</h1>

      {sent ? (
        <p className="text-center text-gray-400">
          Check your email for the reset link.
        </p>
      ) : (
        <>
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-3 py-2 border rounded bg-transparent"
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            onClick={sendReset}
            className="w-full py-2 bg-white text-black rounded"
          >
            Send reset link
          </button>
        </>
      )}
    </div>
  );
}
