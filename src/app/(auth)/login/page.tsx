"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/supabase/client";

const EMAIL_DOMAINS = [
  "gmail.com",
  "outlook.com",
  "yahoo.com",
  "icloud.com",
  "proton.me",
];

const EMAIL_FIXES: Record<string, string> = {
  "gamil.com": "gmail.com",
  "gmial.com": "gmail.com",
  "hotnail.com": "hotmail.com",
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [emailFix, setEmailFix] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  function getEmailSuggestions(value: string) {
    if (!value || value.includes("@")) return [];
    return EMAIL_DOMAINS.map((domain) => `${value}@${domain}`);
  }

  function handleEmailBlur(value: string) {
    const parts = value.split("@");
    if (parts.length === 2 && EMAIL_FIXES[parts[1]]) {
      setEmailFix(`${parts[0]}@${EMAIL_FIXES[parts[1]]}`);
    } else {
      setEmailFix(null);
    }
  }

  async function login() {
    setError(null);
    setInfo(null);

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      setError(error?.message || "Login failed.");
      setLoading(false);
      return;
    }

    if (!data.user.email_confirmed_at) {
      await supabaseClient.auth.signOut();
      setError("Please verify your email before logging in.");
      setLoading(false);
      return;
    }

    const { data: profile, error: roleError } = await supabaseClient
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (roleError || !profile) {
      setError("Unable to determine user role.");
      setLoading(false);
      return;
    }

    setInfo("Login successful. Redirecting…");

    if (profile.role === "admin") {
      router.replace("/admin");
    } else {
      router.replace("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="border border-slate-800 bg-slate-950 p-6 md:p-8 rounded-lg space-y-6">

          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-slate-400">
              Manage projects. Track progress. Build faster.
            </p>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              className="w-full h-12 px-4 border border-slate-800 rounded bg-transparent focus:outline-none focus:border-white"
              onChange={(e) => {
                setEmail(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => {
                setTimeout(() => setShowSuggestions(false), 150);
                handleEmailBlur(email);
              }}
            />

            {showSuggestions && getEmailSuggestions(email).length > 0 && (
              <div className="absolute z-20 mt-1 w-full rounded-md bg-black border border-white/10 shadow-lg">
                {getEmailSuggestions(email).map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => {
                      setEmail(suggestion);
                      setShowSuggestions(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-white/10"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {emailFix && (
            <p className="text-xs text-slate-400">
              Did you mean{" "}
              <button
                onClick={() => {
                  setEmail(emailFix);
                  setEmailFix(null);
                }}
                className="underline text-white"
              >
                {emailFix}
              </button>
              ?
            </p>
          )}

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full h-12 px-4 border border-slate-800 rounded bg-transparent focus:outline-none focus:border-white"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") login();
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-xs text-slate-400"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Security reassurance */}
          <p className="text-xs text-slate-500">
            🔒 Your credentials are encrypted and securely stored.
          </p>

          <div className="flex justify-between items-center">
            <p className="text-xs text-slate-500">
              Press <span className="font-semibold">Enter</span> to login
            </p>
            <button
              onClick={() => router.push("/reset-password")}
              className="text-xs text-slate-400 hover:text-white"
            >
              Forgot password?
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          {info && (
            <p className="text-sm text-emerald-400 text-center">
              {info}
            </p>
          )}

          <button
            onClick={login}
            disabled={loading}
            className="w-full h-12 bg-white text-black font-semibold rounded disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-slate-400">
            Don’t have an account?{" "}
            <button
              onClick={() => router.push("/signup")}
              className="underline text-white"
            >
              Create account
            </button>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-500">
          © Buildora — Designed & Built by Swayam Sahay
        </p>
      </div>
    </div>
  );
}
