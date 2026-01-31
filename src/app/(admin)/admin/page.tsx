import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Ticket, DollarSign, Activity, TrendingUp } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Admin Overview</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Revenue", value: "$45,231.89", icon: DollarSign, change: "+20.1% from last month" },
          { title: "Subscriptions", value: "+2350", icon: Users, change: "+180.1% from last month" },
          { title: "Active Tickets", value: "+12,234", icon: Ticket, change: "+19% from last month" },
          { title: "Active Now", value: "+573", icon: Activity, change: "+201 since last hour" },
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
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
             <div className="h-[350px] flex items-center justify-center text-slate-400 bg-slate-50 dark:bg-slate-900/50 rounded-md border border-dashed border-slate-200 dark:border-slate-800">
                Chart Placeholder (Recharts or similar would go here)
             </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <p className="text-sm text-slate-500">
              You made 265 sales this month.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00" },
                { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00" },
                { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+$299.00" },
                { name: "William Kim", email: "will@email.com", amount: "+$99.00" },
                { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00" },
              ].map((sale, i) => (
                <div key={i} className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 mr-4">
                    {sale.name[0]}
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{sale.name}</p>
                    <p className="text-sm text-slate-500">{sale.email}</p>
                  </div>
                  <div className="ml-auto font-medium">{sale.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
