import { getSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const dynamic = "force-dynamic";

type RequestStatus = "new" | "in_progress" | "completed";

type Request = {
  id: string;
  message: string;
  status: RequestStatus;
  created_at: string;
};

export default async function RequestsPage() {
  const supabase = await getSupabaseServerClient();

  // 🔐 Auth check
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    redirect("/login");
  }

  // 🔹 Fetch requests (do NOT trust DB order)
  const { data, error } = await supabase
    .from("contacts")
    .select("id, message, status, created_at")
    .eq("email", user.email);

  if (error) {
    return (
      <div className="p-4 md:p-8 text-red-500">
        Failed to load your requests.
      </div>
    );
  }

  // 🔒 Guaranteed newest-first sort
  const requests: Request[] = (data ?? []).sort(
    (a, b) =>
      new Date(b.created_at).getTime() -
      new Date(a.created_at).getTime()
  );

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          My Requests
        </h1>
        <p className="text-sm text-muted-foreground">
          History of your project inquiries
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Requests</CardTitle>
        </CardHeader>

        <CardContent>
          {requests.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              No requests found.
            </p>
          ) : (
            /* ✅ MOBILE SAFE TABLE */
            <div className="overflow-x-auto">
              <Table className="min-w-[700px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[55%]">
                      Message
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">
                      Submitted
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {requests.map((request) => {
                    const date = new Date(request.created_at);

                    return (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">
                          <p className="max-w-md leading-relaxed">
                            {request.message}
                          </p>
                        </TableCell>

                        <TableCell className="uppercase text-xs font-semibold whitespace-nowrap">
                          {request.status.replace("_", " ")}
                        </TableCell>

                        <TableCell className="text-right text-muted-foreground whitespace-nowrap">
                          <div>
                            {date.toLocaleDateString()}
                          </div>
                          <div className="text-xs opacity-60">
                            {date.toLocaleTimeString()}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
