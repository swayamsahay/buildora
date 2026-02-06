import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";

export default async function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/tickets" className="flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50">
           <ArrowLeft className="mr-2 h-4 w-4" />
           Back to Tickets
        </Link>
        <div className="flex gap-2">
            <Button variant="outline">Close Ticket</Button>
            <Button variant="destructive">Delete</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
           <Card>
             <CardHeader>
               <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">Login page not responsive on mobile</CardTitle>
                    <p className="text-sm text-slate-500 mt-1">Ticket ID: #{id}</p>
                  </div>
                  <Badge>Open</Badge>
               </div>
             </CardHeader>
             <CardContent className="space-y-4">
               <div>
                 <h3 className="font-semibold mb-2">Description</h3>
                 <p className="text-slate-600 dark:text-slate-400">
                   When accessing the login page on an iPhone 14 Pro, the input fields are cut off on the right side. This prevents users from entering their full email address.
                 </p>
               </div>
               <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
                  <h3 className="font-semibold mb-4">Activity</h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                       <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 flex-shrink-0">
                         J
                       </div>
                       <div className="space-y-1">
                         <div className="flex items-center gap-2">
                           <span className="font-semibold">John Doe</span>
                           <span className="text-xs text-slate-500">2 hours ago</span>
                         </div>
                         <p className="text-sm text-slate-600 dark:text-slate-400">
                          I&apos;ve assigned this to the frontend team. Please check the viewport meta tag.
                        </p>
                       </div>
                    </div>
                  </div>
               </div>
               <div className="pt-4">
                  <div className="space-y-4">
                    <Textarea placeholder="Add a comment..." />
                    <Button className="w-full sm:w-auto">
                      <Send className="mr-2 h-4 w-4" /> Post Comment
                    </Button>
                  </div>
               </div>
             </CardContent>
           </Card>
        </div>
        <div className="space-y-6">
           <Card>
             <CardHeader>
               <CardTitle className="text-lg">Details</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                   <div className="text-slate-500">Status</div>
                   <div className="font-medium">Open</div>
                   <div className="text-slate-500">Priority</div>
                   <div className="font-medium">High</div>
                   <div className="text-slate-500">Assignee</div>
                   <div className="font-medium">Unassigned</div>
                   <div className="text-slate-500">Created</div>
                   <div className="font-medium">Mar 1, 2024</div>
                   <div className="text-slate-500">Updated</div>
                   <div className="font-medium">2 hours ago</div>
                </div>
             </CardContent>
           </Card>
           <Card>
             <CardHeader>
               <CardTitle className="text-lg">Tags</CardTitle>
             </CardHeader>
             <CardContent>
                <div className="flex flex-wrap gap-2">
                   <Badge variant="secondary">Bug</Badge>
                   <Badge variant="secondary">Mobile</Badge>
                   <Badge variant="secondary">UI/UX</Badge>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
