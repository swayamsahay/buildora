import { getSupabaseServerClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Plus, Pencil } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  status?: string;
  created_at?: string;
}

export default async function AdminServicesPage() {
  const supabase = await getSupabaseServerClient();

  const { data: services, error } = await supabase
    .from("services")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="container mx-auto py-10 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground mt-1">
            Manage your service offerings and descriptions.
          </p>
        </div>
        <Link href="/admin/services/new">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" /> Add Service
          </Button>
        </Link>
      </div>

      {/* Error State */}
      {error && (
        <div className="rounded-md bg-destructive/15 p-4 text-destructive mb-6">
          <div className="flex items-center gap-2 font-medium">
            <span>Error loading services:</span>
            <span>{error.message}</span>
          </div>
        </div>
      )}

      {/* Data Table */}
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Service Name</TableHead>
              <TableHead className="w-[400px]">Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services?.map((service: ServiceItem) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">
                  {service.title}
                </TableCell>
                <TableCell className="text-muted-foreground truncate max-w-[400px]">
                  {service.description}
                </TableCell>
                <TableCell>
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                    Active
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/services/${service.id}`}>
                      <Button variant="ghost" size="sm">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {(!services || services.length === 0) && !error && (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No services found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}