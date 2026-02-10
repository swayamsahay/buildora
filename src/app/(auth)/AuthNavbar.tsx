"use client";

import { useRouter } from "next/navigation";

export default function AuthNavbar() {
  const router = useRouter();

  return (
    <div className="absolute top-6 left-0 right-0 flex items-center justify-between px-10 z-20">
      <button
        onClick={() => router.push("/")}
        className="text-lg font-semibold tracking-wide"
      >
        Buildora
      </button>

      <button
        onClick={() => router.push("/")}
        className="text-sm text-gray-300 hover:text-white transition"
      >
        Back to home
      </button>
    </div>
  );
}
