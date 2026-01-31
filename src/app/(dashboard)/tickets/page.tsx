"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

const tickets = [
  { id: "1", title: "Login page not responsive on mobile", status: "Open", priority: "High", date: "2024-03-01" },
  { id: "2", title: "Add dark mode toggle", status: "In Progress", priority: "Medium", date: "2024-02-28" },
  { id: "3", title: "Update dependencies", status: "Closed", priority: "Low", date: "2024-02-25" },
  { id: "4", title: "Fix typo in about page", status: "Open", priority: "Low", date: "2024-03-02" },
  { id: "5", title: "Integrate Stripe payments", status: "In Progress", priority: "High", date: "2024-02-20" },
];

export default function TicketsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Tickets</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Ticket
        </Button>
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
                  <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">ID</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Title</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Priority</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Date</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Action</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800">
                    <td className="p-4 align-middle font-medium">{ticket.id}</td>
                    <td className="p-4 align-middle">{ticket.title}</td>
                    <td className="p-4 align-middle">
                      <Badge variant={ticket.status === "Open" ? "destructive" : ticket.status === "In Progress" ? "default" : "secondary"}>
                        {ticket.status}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle">{ticket.priority}</td>
                    <td className="p-4 align-middle">{ticket.date}</td>
                    <td className="p-4 align-middle">
                      <Link href={`/tickets/${ticket.id}`}>
                        <Button variant="ghost" size="sm">View</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
