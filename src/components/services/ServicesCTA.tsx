"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ServicesCTA() {
  return (
    <section className="py-32 bg-background border-t border-border/50 text-center">
      <div className="container px-6">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 text-foreground">Ready to build?</h2>
        <Button size="lg" className="rounded-full px-8 h-12 text-lg" asChild>
          <Link href="/contact">Let&apos;s talk</Link>
        </Button>
      </div>
    </section>
  );
}
