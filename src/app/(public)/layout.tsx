import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      
      {/* Subtle Ambient Background (CHEAP + SAFE) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.02),transparent_60%)]" />
      </div>

      {/* Header FIRST */}
      <Header />

      {/* Page Content */}
      <main className="relative z-10 min-h-screen">
        {children}
      </main>

      {/* Footer LAST */}
      <Footer />
    </div>
  );
}
