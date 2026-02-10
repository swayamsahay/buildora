"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, LayoutTemplate, Megaphone, Globe, Info, Layers, ChevronRight } from "lucide-react";
import Link from "next/link";
import { updateCMS } from "./actions";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface CMSFormProps {
  initialData: {
    hero: { heading?: string; subheading?: string };
    about: { title?: string; description?: string };
    services: { title?: string; description?: string };
    cta: { button_text?: string; button_link?: string };
  };
}

export function CMSForm({ initialData }: CMSFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeSection, setActiveSection] = useState("hero");

  // State for Sections
  // Hero
  const [heroHeading, setHeroHeading] = useState(initialData.hero.heading || "");
  const [heroSubheading, setHeroSubheading] = useState(initialData.hero.subheading || "");
  
  // About
  const [aboutTitle, setAboutTitle] = useState(initialData.about.title || "");
  const [aboutDescription, setAboutDescription] = useState(initialData.about.description || "");

  // Services
  const [servicesTitle, setServicesTitle] = useState(initialData.services.title || "");
  const [servicesDescription, setServicesDescription] = useState(initialData.services.description || "");

  // CTA
  const [ctaText, setCtaText] = useState(initialData.cta.button_text || "");
  const [ctaLink, setCtaLink] = useState(initialData.cta.button_link || "");

  async function handleSave() {
    startTransition(async () => {
      const updates = [
        {
          section: "hero",
          content: { heading: heroHeading, subheading: heroSubheading },
        },
        {
          section: "about",
          content: { title: aboutTitle, description: aboutDescription },
        },
        {
          section: "services",
          content: { title: servicesTitle, description: servicesDescription },
        },
        {
          section: "cta",
          content: { button_text: ctaText, button_link: ctaLink },
        },
      ];

      const result = await updateCMS(updates);

      if (result.success) {
        router.refresh();
      } else {
        alert(`Error saving: ${result.error}`);
      }
    });
  }

  const sections = [
    { id: "hero", label: "Hero Section", icon: LayoutTemplate, description: "Main headline and intro" },
    { id: "about", label: "About / Intro", icon: Info, description: "Company overview" },
    { id: "services", label: "Services", icon: Layers, description: "Service offerings text" },
    { id: "cta", label: "Call to Action", icon: Megaphone, description: "Footer CTA button" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col text-slate-100">
      {/* Top Navigation Bar */}
      <header className="bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 h-16 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="font-black text-lg tracking-tight text-white flex items-center gap-2">
            <span className="bg-blue-600 w-6 h-6 rounded flex items-center justify-center text-xs">W</span>
            Website Content Manager
          </div>
          <div className="h-6 w-px bg-slate-800 hidden md:block" />
          <nav className="hidden md:flex items-center gap-1 text-sm text-slate-400">
            <Link href="/admin" className="hover:text-white transition-colors">Admin</Link>
            <ChevronRight className="h-4 w-4 text-slate-600" />
            <span className="text-white font-medium">CMS</span>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" target="_blank">
            <Button variant="ghost" size="sm" className="hidden sm:flex gap-2 text-slate-400 hover:text-white hover:bg-slate-800">
              <Globe className="h-4 w-4" />
              <span className="text-xs uppercase tracking-wider font-bold">Live Site</span>
            </Button>
          </Link>
          <Button 
            size="sm" 
            onClick={handleSave} 
            disabled={isPending}
            className="bg-blue-600 hover:bg-blue-500 text-white gap-2 shadow-lg shadow-blue-900/20"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save Changes
          </Button>
        </div>
      </header>

      <div className="flex flex-1 max-w-[1600px] w-full mx-auto p-4 md:p-8 gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-72 flex-shrink-0 hidden lg:block sticky top-28 h-[calc(100vh-8rem)]">
          <div className="space-y-1">
            <h3 className="px-3 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">
              Page Sections
            </h3>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={cn(
                  "w-full flex items-start gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 border",
                  activeSection === section.id
                    ? "bg-blue-600/10 text-blue-400 border-blue-600/20"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-white border-transparent"
                )}
              >
                <section.icon className={cn("h-5 w-5 mt-0.5", activeSection === section.id ? "text-blue-500" : "text-slate-500")} />
                <div className="text-left">
                  <div className="font-bold">{section.label}</div>
                  <div className="text-[10px] text-slate-500 font-normal uppercase tracking-wider mt-0.5">{section.description}</div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 space-y-12 pb-32">
          
          {/* Hero Section */}
          <section id="hero" className="scroll-mt-32 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-800 rounded-lg">
                <LayoutTemplate className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Hero Section</h2>
                <p className="text-sm text-slate-400">The first thing visitors see on your landing page.</p>
              </div>
            </div>
            
            <Card className="bg-[#0f172a] border-slate-800 shadow-sm">
              <CardContent className="p-8 space-y-8">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">Headline</label>
                  <Input
                    value={heroHeading}
                    onChange={(e) => setHeroHeading(e.target.value)}
                    className="font-bold text-lg bg-[#020617] border-slate-800 text-white placeholder:text-slate-700 focus-visible:ring-blue-600 h-12"
                    placeholder="e.g. Build faster with Buildora"
                  />
                  <p className="text-xs text-slate-500">Make it punchy and clear.</p>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">Subheading</label>
                  <Textarea
                    value={heroSubheading}
                    onChange={(e) => setHeroSubheading(e.target.value)}
                    className="min-h-[120px] resize-y bg-[#020617] border-slate-800 text-slate-300 placeholder:text-slate-700 focus-visible:ring-blue-600 leading-relaxed"
                    placeholder="e.g. The all-in-one platform for modern construction management..."
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* About Section */}
          <section id="about" className="scroll-mt-32 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-800 rounded-lg">
                <Info className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">About / Intro</h2>
                <p className="text-sm text-slate-400">Brief introduction to your company or mission.</p>
              </div>
            </div>
            
            <Card className="bg-[#0f172a] border-slate-800 shadow-sm">
              <CardContent className="p-8 space-y-8">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">Section Title</label>
                  <Input
                    value={aboutTitle}
                    onChange={(e) => setAboutTitle(e.target.value)}
                    className="bg-[#020617] border-slate-800 text-white placeholder:text-slate-700 focus-visible:ring-blue-600"
                    placeholder="e.g. Who We Are"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">Description</label>
                  <Textarea
                    value={aboutDescription}
                    onChange={(e) => setAboutDescription(e.target.value)}
                    className="min-h-[160px] resize-y bg-[#020617] border-slate-800 text-slate-300 placeholder:text-slate-700 focus-visible:ring-blue-600 leading-relaxed"
                    placeholder="Tell your story here..."
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Services Section */}
          <section id="services" className="scroll-mt-32 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-800 rounded-lg">
                <Layers className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Services Section</h2>
                <p className="text-sm text-slate-400">Introduction to your service offerings.</p>
              </div>
            </div>
            
            <Card className="bg-[#0f172a] border-slate-800 shadow-sm">
              <CardContent className="p-8 space-y-8">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">Section Title</label>
                  <Input
                    value={servicesTitle}
                    onChange={(e) => setServicesTitle(e.target.value)}
                    className="bg-[#020617] border-slate-800 text-white placeholder:text-slate-700 focus-visible:ring-blue-600"
                    placeholder="e.g. Our Services"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">Intro Text</label>
                  <Textarea
                    value={servicesDescription}
                    onChange={(e) => setServicesDescription(e.target.value)}
                    className="min-h-[100px] resize-y bg-[#020617] border-slate-800 text-slate-300 placeholder:text-slate-700 focus-visible:ring-blue-600 leading-relaxed"
                    placeholder="Briefly describe what you offer..."
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA Section */}
          <section id="cta" className="scroll-mt-32 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-800 rounded-lg">
                <Megaphone className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Call to Action</h2>
                <p className="text-sm text-slate-400">Bottom section to drive conversions.</p>
              </div>
            </div>
            
            <Card className="bg-[#0f172a] border-slate-800 shadow-sm">
              <CardContent className="p-8 grid gap-8 md:grid-cols-2">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">Button Text</label>
                  <Input
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    placeholder="e.g., Get Started Now"
                    className="bg-[#020617] border-slate-800 text-white placeholder:text-slate-700 focus-visible:ring-blue-600"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">Button Link</label>
                  <Input
                    value={ctaLink}
                    onChange={(e) => setCtaLink(e.target.value)}
                    placeholder="e.g., /contact"
                    className="font-mono text-sm bg-[#020617] border-slate-800 text-blue-400 placeholder:text-slate-700 focus-visible:ring-blue-600"
                  />
                </div>
              </CardContent>
            </Card>
          </section>

        </main>
      </div>
    </div>
  );
}
