import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket, Activity, Users, DollarSign } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Overview</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Tickets", value: "12", icon: Ticket, change: "+2 from last week" },
          { title: "Active Projects", value: "3", icon: Activity, change: "+1 from last month" },
          { title: "Team Members", value: "8", icon: Users, change: "No change" },
          { title: "Billing", value: "$1,200", icon: DollarSign, change: "Due in 5 days" },
        ].map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                { user: "John Doe", action: "created ticket", target: "Login Issue", time: "2 hours ago" },
                { user: "Sarah Smith", action: "commented on", target: "API Integration", time: "5 hours ago" },
                { user: "Mike Johnson", action: "completed task", target: "Update Documentation", time: "1 day ago" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 mr-4">
                    {activity.user[0]}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.user} <span className="text-slate-500 font-normal">{activity.action}</span> {activity.target}
                    </p>
                    <p className="text-xs text-slate-500">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-slate-500 mb-4">Shortcuts to common tasks</p>
             <div className="grid gap-2">
               <button className="w-full text-left px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors text-sm font-medium">
                 Create New Ticket
               </button>
               <button className="w-full text-left px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors text-sm font-medium">
                 Invite Team Member
               </button>
               <button className="w-full text-left px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors text-sm font-medium">
                 View Documentation
               </button>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
