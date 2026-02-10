"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Mail, ArrowRight, Loader2, Phone, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export function BookCallSection({ userEmail }: { userEmail: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState("");
  const [method, setMethod] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  async function handleRequestCall() {
    if (!time || !method) {
      toast({
        title: "Missing fields",
        description: "Please select a preferred time and contact method.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Client", // Optional or could be fetched if available
          email: userEmail,
          message: `[CALL REQUEST] Preferred time: ${time}, Method: ${method}`,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit request");

      setOpen(false);
      toast({
        title: "Request Sent",
        description: "We have received your call request and will contact you shortly.",
      });
      router.refresh(); // Refresh to show the new request in the dashboard
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/20">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="flex items-center justify-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100 sm:justify-start">
            <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Book a Call
          </h3>
          <p className="max-w-md text-sm text-slate-500 dark:text-slate-400">
            Want to discuss your project in detail? Request a call with our team.
          </p>
        </div>
        
        <div className="flex flex-col items-center gap-3 w-full sm:w-auto sm:flex-row">
          <Link href="mailto:support@buildora.com" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full gap-2">
              <Mail size={16} />
              Email us
            </Button>
          </Link>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="w-full gap-2 bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 sm:w-auto">
                Request a Call <ArrowRight size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Request a Call</DialogTitle>
                <DialogDescription>
                  Let us know when and how you'd like to be contacted.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="time">Preferred Time</Label>
                  <Select onValueChange={setTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time of day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Morning">Morning (9AM - 12PM)</SelectItem>
                      <SelectItem value="Afternoon">Afternoon (12PM - 5PM)</SelectItem>
                      <SelectItem value="Evening">Evening (5PM - 8PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="method">Contact Method</Label>
                  <Select onValueChange={setMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select contact method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Phone Call">Phone Call</SelectItem>
                      <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                      <SelectItem value="Email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleRequestCall} disabled={loading} className="w-full sm:w-auto">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
