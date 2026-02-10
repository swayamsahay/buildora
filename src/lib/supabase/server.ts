import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getSupabaseServerClient() {
  // ✅ IMPORTANT: cookies() is async in Next 16
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // ✅ READ ONLY — safe for Server Components
        getAll() {
          // Next 16 compatibility
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const store = cookieStore as any;
          return typeof store.getAll === "function" ? store.getAll() : [];
        },

        // ❌ DO NOT WRITE COOKIES HERE
        setAll() {
          // intentionally disabled
        },
      },
    }
  );
}
