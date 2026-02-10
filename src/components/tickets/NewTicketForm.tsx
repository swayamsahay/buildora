"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, ArrowLeft, AlertCircle, AlertTriangle, Info } from "lucide-react";
import Link from "next/link";
import { createTicket } from "@/app/(dashboard)/tickets/actions";

export function NewTicketForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    try {
      const result = await createTicket(formData);
      if (result?.error) {
        setError(result.error);
        setLoading(false);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/tickets">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Create New Ticket</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ticket Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-900 dark:text-red-200">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="title">Subject</Label>
              <Input id="title" name="title" placeholder="Brief summary of the issue" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select name="priority" defaultValue="low">
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-black">
                  <SelectItem value="low">
                    <span className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                      <Info className="h-4 w-4" />
                      <span className="font-medium">Low</span>
                      <span className="text-muted-foreground">- Minor issue or question</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="medium">
                    <span className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="font-medium">Medium</span>
                      <span className="text-muted-foreground">- Standard functionality issue</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="high">
                    <span className="flex items-center gap-2 text-red-600 dark:text-red-400">
                      <AlertCircle className="h-4 w-4" />
                      <span className="font-medium">High</span>
                      <span className="text-muted-foreground">- Critical system failure</span>
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Detailed explanation of the issue..."
                className="min-h-[150px]"
                required
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
                </>
              ) : (
                "Submit Ticket"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
