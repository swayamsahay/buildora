"use client";

import { supabaseClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function passwordChecks(password: string) {
  return {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
}

export default function UpdatePasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const checks = passwordChecks(password);
  const strengthCount = Object.values(checks).filter(Boolean).length;
  const isStrongPassword = strengthCount === 5;

  async function updatePassword() {
    setError(null);

    if (!isStrongPassword) {
      setError("Please create a stronger password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabaseClient.auth.updateUser({
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);

    // Redirect to login after short delay
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-center">
        Set new password
      </h1>

      <p className="text-sm text-gray-400 text-center">
        Create a strong password to secure your account.
      </p>

      {/* Password */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="New password"
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
        placeholder="Confirm new password"
        className="w-full px-3 py-2 border rounded bg-transparent"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {/* Password strength bar */}
      <div className="h-1 w-full bg-white/10 rounded">
        <div
          className="h-1 rounded"
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

      {success && (
        <p className="text-sm text-green-400 text-center">
          Password updated successfully. Redirecting to login…
        </p>
      )}

      <button
        onClick={updatePassword}
        disabled={loading}
        className="w-full py-2 bg-white text-black rounded disabled:opacity-60"
      >
        {loading ? "Updating..." : "Update password"}
      </button>
    </div>
  );
}
