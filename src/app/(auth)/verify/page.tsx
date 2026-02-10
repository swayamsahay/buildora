"use client";

import { supabaseClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Try to get the last signed-up email (best-effort UX)
  useEffect(() => {
    supabaseClient.auth.getUser().then(({ data }) => {
      if (data.user?.email) {
        setEmail(data.user.email);
      }
    });
  }, []);

  async function resendVerification() {
    setError(null);
    setMessage(null);
    setLoading(true);

    if (!email) {
      setError("Email address not found. Please try logging in again.");
      setLoading(false);
      return;
    }

    const { error } = await supabaseClient.auth.resend({
      type: "signup",
      email,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage("Verification email sent again. Please check your inbox.");
    setLoading(false);
  }

  return (
    <div className="space-y-5 text-center">
      <h1 className="text-xl font-semibold">
        Check your email
      </h1>

      <p className="text-gray-400">
        We’ve sent a verification link to
      </p>

      <p className="font-medium break-all">
        {email ?? "your email address"}
      </p>

      <p className="text-sm text-gray-400">
        Click the link in the email to activate your account.
        You can close this tab after verifying.
      </p>

      {message && (
        <p className="text-sm text-green-400">
          {message}
        </p>
      )}

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      <div className="space-y-3 pt-2">
        <button
          onClick={resendVerification}
          disabled={loading}
          className="w-full py-2 bg-white text-black rounded disabled:opacity-60"
        >
          {loading ? "Resending..." : "Resend verification email"}
        </button>

        <button
          onClick={() => router.push("/login")}
          className="w-full py-2 border border-white/20 rounded text-white hover:bg-white/5 transition"
        >
          Back to login
        </button>
      </div>

      <p className="text-xs text-gray-500 pt-2">
        Didn’t receive the email? Check your spam folder.
      </p>
    </div>
  );
}
