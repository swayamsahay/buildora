import { getSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

export default async function TicketsPage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch tickets for the logged-in user
  const { data: tickets } = await supabase
    .from("tickets")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          My Tickets
        </h1>
        <Link href="/tickets/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Ticket
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800">
                  <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">
                    ID
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">
                    Subject
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">
                    Status
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">
                    Priority
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">
                    Date
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {tickets?.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800"
                  >
                    <td className="p-4 align-middle font-medium">
                      #{ticket.id.slice(0, 8)}
                    </td>
                    <td className="p-4 align-middle font-medium">
                      {ticket.title}
                    </td>
                    <td className="p-4 align-middle">
                      <TicketStatusBadge status={ticket.status} />
                    </td>
                    <td className="p-4 align-middle">
                      <TicketPriorityBadge priority={ticket.priority} />
                    </td>
                    <td className="p-4 align-middle text-slate-500">
                      {new Date(ticket.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 align-middle">
                      <Link href={`/tickets/${ticket.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}

                {(!tickets || tickets.length === 0) && (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-8 text-center text-slate-500 dark:text-slate-400"
                    >
                      No tickets found. Create one to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TicketStatusBadge({ status }: { status: string }) {
  const styles: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    open: "destructive",
    in_progress: "default",
    closed: "secondary",
  };
  
  // Normalize status to lowercase for matching
  const normalizedStatus = status?.toLowerCase() || "open";

  return (
    <Badge variant={styles[normalizedStatus] || "outline"}>
      {status || "Open"}
    </Badge>
  );
}

function TicketPriorityBadge({ priority }: { priority: string }) {
   const styles: Record<string, string> = {
    high: "text-red-500",
    medium: "text-yellow-500",
    low: "text-blue-500",
  };

  const normalizedPriority = priority?.toLowerCase() || "low";

  return (
    <span className={`font-medium ${styles[normalizedPriority] || "text-slate-500"}`}>
      {priority || "Low"}
    </span>
  );
}
