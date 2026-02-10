"use client";

import { useEffect, useState } from "react";
// ✅ Universal named import
import { supabaseClient } from "@/lib/supabase/client"; 
import { Pencil, Settings2, Globe, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Service {
  id: string;
  title: string;
  slug: string;
  is_active: boolean;
}

export default function ServicesManager({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState<Service[]>(initialServices);

  useEffect(() => {
    const channel = supabaseClient
      .channel('admin-sync')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'services' }, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (payload: any) => { 
          if (payload.eventType === 'INSERT') {
            setServices((prev) => [payload.new, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setServices((prev) => prev.map((s) => s.id === payload.new.id ? payload.new : s));
          } else if (payload.eventType === 'DELETE') {
            setServices((prev) => prev.filter((s) => s.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => { supabaseClient.removeChannel(channel); };
  }, []);

  return (
    <div className="grid gap-0 border-t border-white/5 bg-[#050505]">
      {services.map((service) => (
        <div key={service.id} className="group border-b border-white/5 p-10 transition-none hover:bg-white/[0.01]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="flex items-start gap-8 text-white">
              <div className={`mt-2.5 h-2 w-2 rounded-none ${service.is_active ? 'bg-blue-500' : 'bg-white/10'}`} />
              <div>
                <h3 className="text-4xl font-black uppercase tracking-tighter leading-none mb-4">{service.title}</h3>
                <div className="flex items-center gap-6 text-white/20 font-black uppercase text-[10px] tracking-[0.3em]">
                  <span className="flex items-center gap-2"><Globe size={14} /> /{service.slug}</span>
                  <span className="flex items-center gap-2"><History size={14} /> LIVE_DATA</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/services/edit/${service.id}`}>
                <Button className="rounded-none bg-white text-black hover:bg-blue-600 hover:text-white font-black uppercase text-[10px] h-14 px-8 transition-none">
                  <Pencil size={16} className="mr-3" /> Edit Entry
                </Button>
              </Link>
              <Button variant="outline" className="rounded-none border-white/10 bg-transparent text-white/20 h-14 w-14 p-0 transition-none">
                <Settings2 size={20} />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}