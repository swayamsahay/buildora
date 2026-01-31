"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter, MoreHorizontal } from "lucide-react";

const tickets = [
  { id: "T-101", user: "Alice Freeman", title: "Cannot access dashboard", status: "Open", priority: "High", date: "2024-03-01" },
  { id: "T-102", user: "Bob Smith", title: "Feature request: Dark mode", status: "In Progress", priority: "Medium", date: "2024-02-29" },
  { id: "T-103", user: "Charlie Brown", title: "Payment failed", status: "Closed", priority: "High", date: "2024-02-28" },
  { id: "T-104", user: "David Wilson", title: "Typo in documentation", status: "Open", priority: "Low", date: "2024-02-28" },
  { id: "T-105", user: "Eva Green", title: "Account deletion request", status: "Open", priority: "High", date: "2024-02-27" },
  { id: "T-106", user: "Frank Miller", title: "API rate limit exceeded", status: "In Progress", priority: "Medium", date: "2024-02-26" },
  { id: "T-107", user: "Grace Lee", title: "Mobile layout broken", status: "Closed", priority: "High", date: "2024-02-25" },
];

export default function AdminTicketsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Support Tickets</h1>
        <Button>Export CSV</Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
           <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
           <Input placeholder="Search tickets..." className="pl-9" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800">
                  <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Ticket ID</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">User</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Subject</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Priority</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Date</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800">
                    <td className="p-4 align-middle font-medium">{ticket.id}</td>
                    <td className="p-4 align-middle">{ticket.user}</td>
                    <td className="p-4 align-middle">{ticket.title}</td>
                    <td className="p-4 align-middle">
                      <Badge variant={ticket.status === "Open" ? "destructive" : ticket.status === "In Progress" ? "default" : "secondary"}>
                        {ticket.status}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle">{ticket.priority}</td>
                    <td className="p-4 align-middle">{ticket.date}</td>
                    <td className="p-4 align-middle">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
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
