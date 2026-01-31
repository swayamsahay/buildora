"use client";

import { useRouter } from "next/navigation";


import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminCMSPage() {
  const router = useRouter();
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSubheading, setHeroSubheading] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [ctaLink, setCtaLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ================= LOAD CMS ================= */
  useEffect(() => {
    async function loadCMS() {
      const res = await fetch("/api/admin/cms");
      const data = await res.json();

      if (data?.hero) {
        setHeroHeading(data.hero.heading ?? "");
        setHeroSubheading(data.hero.subheading ?? "");
      }

      if (data?.cta) {
        setCtaText(data.cta.button_text ?? "");
        setCtaLink(data.cta.button_link ?? "");
      }

      setLoading(false);
    }

    loadCMS();
  }, []);

  /* ================= SAVE CMS ================= */
  async function saveCMS() {
    setSaving(true);

    const res = await fetch("/api/admin/cms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        heroHeading,
        heroSubheading,
        ctaText,
        ctaLink,
      }),
    });

    setSaving(false);

    if (!res.ok) {
      alert("Save failed");
      return;
    }

    alert("CMS saved successfully");
    router.refresh();
  }

  if (loading) {
    return <div className="p-8">Loading CMS…</div>;
  }

  return (
    <div className="max-w-4xl space-y-10 p-8">
      <h1 className="text-3xl font-bold">Landing Page CMS</h1>

      {/* HERO */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Hero Section</h2>

        <Input
          placeholder="Hero Heading"
          value={heroHeading}
          onChange={(e) => setHeroHeading(e.target.value)}
        />

        <Textarea
          placeholder="Hero Subheading"
          value={heroSubheading}
          onChange={(e) => setHeroSubheading(e.target.value)}
        />
      </section>

      {/* CTA */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">CTA Section</h2>

        <Input
          placeholder="CTA Button Text"
          value={ctaText}
          onChange={(e) => setCtaText(e.target.value)}
        />

        <Input
          placeholder="CTA Button Link"
          value={ctaLink}
          onChange={(e) => setCtaLink(e.target.value)}
        />
      </section>

      <Button
  size="lg"
  onClick={async () => {
    const res = await fetch("/api/admin/cms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        heroHeading,
        heroSubheading,
        ctaText,
        ctaLink,
      }),
    });

    if (!res.ok) {
      alert("Save failed");
      return;
    }

    alert("Saved successfully");
  }}
>
  Save Changes
</Button>

    </div>
  );
}
