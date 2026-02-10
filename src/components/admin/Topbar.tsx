import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { NotificationDropdown } from "./NotificationDropdown";

export default async function Topbar() {
  const supabase = await getSupabaseServerClient();

  // Count rows in contacts table (represents "new client requests")
  const { count } = await supabase
    .from("contacts")
    .select("*", { count: "exact", head: true });

  // Fetch recent 5 notifications
  const { data: recentRequests } = await supabase
    .from("contacts")
    .select("id, name, email, message, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  const notifications = recentRequests || [];

  return (
    <header className="h-20 border-b border-white/5 bg-[#050505] flex items-center justify-between px-10 sticky top-0 z-40">
      <div>
        <h3 className="text-white font-bold text-sm uppercase tracking-wider">
          Admin Console
        </h3>
      </div>
      <div className="flex items-center gap-6">
        {/* Notification Indicator */}
        {count !== null && count > 0 && (
          <NotificationDropdown count={count} notifications={notifications} />
        )}

        <Link href="/admin/settings">
          <div className="h-8 w-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 font-bold text-xs hover:bg-blue-600/30 transition-colors cursor-pointer">
            A
          </div>
        </Link>
      </div>
    </header>
  );
}
