"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function StartProjectForm({ userEmail }: { userEmail: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Client", 
          email: userEmail,
          message: message,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to submit");
      }

      setSuccess(true);
      setMessage(""); // Clear message if you want, or keep it? "Disable submit button" suggests form is done.
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <Alert className="border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-200">
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Your project request has been submitted successfully. We will contact you shortly at {userEmail}.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-900 dark:text-red-200">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          value={userEmail} 
          disabled 
          className="bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 cursor-not-allowed" 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Project Details</Label>
        <Textarea
          id="message"
          placeholder="Describe your project requirements..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="min-h-[150px] resize-none"
          disabled={loading}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" /> Submit Request
          </>
        )}
      </Button>
    </form>
  );
}
