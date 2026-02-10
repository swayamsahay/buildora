"use client";

import { supabaseClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

function passwordChecks(password: string) {
  return {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
}

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailFix, setEmailFix] = useState<string | null>(null);

  const checks = passwordChecks(password);
  const strengthCount = Object.values(checks).filter(Boolean).length;
  const isStrongPassword = strengthCount === 5;

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

  async function handleSignup() {
    setError(null);

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isStrongPassword) {
      setError("Please create a stronger password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/login`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/verify");
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-center">
        Get started for free
      </h1>

      {/* Email input */}
      <div className="relative">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          className="w-full px-3 py-2 border rounded bg-transparent"
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

        {/* Email suggestions */}
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
                className="w-full text-left px-3 py-2 text-sm hover:bg-white/10 transition"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Email typo fix */}
      {emailFix && (
        <p className="text-sm text-gray-400">
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
          className="w-full px-3 py-2 border rounded bg-transparent"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2 text-xs text-gray-400"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {/* Confirm password */}
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Confirm password"
        className="w-full px-3 py-2 border rounded bg-transparent"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {/* Password strength bar */}
      <div className="h-1 w-full bg-white/10 rounded">
        <div
          className="h-1 rounded transition-all"
          style={{
            width: `${(strengthCount / 5) * 100}%`,
            backgroundColor: isStrongPassword ? "#4ade80" : "#facc15",
          }}
        />
      </div>

      {/* Password rules */}
      <ul className="text-xs space-y-1">
        <li className={checks.length ? "text-green-400" : "text-gray-400"}>
          • At least 8 characters
        </li>
        <li className={checks.upper ? "text-green-400" : "text-gray-400"}>
          • Uppercase letter
        </li>
        <li className={checks.lower ? "text-green-400" : "text-gray-400"}>
          • Lowercase letter
        </li>
        <li className={checks.number ? "text-green-400" : "text-gray-400"}>
          • Number
        </li>
        <li className={checks.special ? "text-green-400" : "text-gray-400"}>
          • Special character
        </li>
      </ul>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        onClick={handleSignup}
        disabled={loading}
        className="w-full py-2 bg-white text-black rounded disabled:opacity-60"
      >
        {loading ? "Creating account..." : "Create account"}
      </button>

      <p className="text-center text-sm text-gray-400">
        Already have an account?{" "}
        <button
          onClick={() => router.push("/login")}
          className="underline text-white"
        >
          Login
        </button>
      </p>

      <p className="text-xs text-center text-gray-500">
        By continuing, you agree to our{" "}
        <span className="underline">Terms</span> &{" "}
        <span className="underline">Privacy Policy</span>.
      </p>
    </div>
  );
}
