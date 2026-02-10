import { createBrowserClient } from '@supabase/ssr'

// Standardized name for the entire project
export const supabaseClient = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)