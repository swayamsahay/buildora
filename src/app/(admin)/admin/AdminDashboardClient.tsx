"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Boxes, Mail, Globe, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface DashboardStats {
  services: number;
  leads: number;
  users: number;
}

export default function AdminDashboardClient({ stats }: { stats: DashboardStats }) {
  return (
    <div className="min-h-screen bg-[#020617] text-white p-8 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black tracking-tighter text-white">
            BUILDORA <span className="text-blue-500">HQ</span>
          </h1>
          <p className="text-slate-400 mt-2">Manage your digital studio operations.</p>
        </div>
        <Link href="/">
          <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
            <Globe className="mr-2 h-4 w-4" /> Visit Site
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-800">
          <Boxes className="text-blue-500 mb-4" />
          <p className="text-slate-400 text-sm font-bold uppercase">Total Services</p>
          <h2 className="text-4xl font-bold">{stats.services}</h2>
        </div>
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-800">
          <Mail className="text-orange-500 mb-4" />
          <p className="text-slate-400 text-sm font-bold uppercase">Project Leads</p>
          <h2 className="text-4xl font-bold">{stats.leads}</h2>
        </div>
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-800">
          <Users className="text-purple-500 mb-4" />
          <p className="text-slate-400 text-sm font-bold uppercase">Active Users</p>
          <h2 className="text-4xl font-bold">{stats.users}</h2>
        </div>
      </div>

      <Card className="bg-[#0f172a] border-slate-800">
        <CardHeader className="border-b border-slate-800">
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="text-yellow-400" /> Management Console
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/admin/cms" className="p-4 bg-slate-900 rounded-lg border border-slate-800 hover:border-blue-500 transition-all">
            <h4 className="font-bold">Landing Page CMS</h4>
            <p className="text-xs text-slate-500">Edit Hero and Sections</p>
          </Link>
          <Link href="/admin/services" className="p-4 bg-slate-900 rounded-lg border border-slate-800 hover:border-blue-500 transition-all">
            <h4 className="font-bold">Services</h4>
            <p className="text-xs text-slate-500">Update your offerings</p>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}