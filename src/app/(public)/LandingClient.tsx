"use client";

type Props = {
  cms: any;
};

export default function LandingClient({ cms }: Props) {
  return (
    <main className="space-y-40">

      {/* HERO */}
      <section className="pt-40">
        <h1 className="max-w-4xl text-6xl font-semibold leading-[1.05] tracking-tight">
          {cms?.hero?.heading ?? "Build products with clarity."}
        </h1>

        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-slate-400">
          {cms?.hero?.subheading ??
            "We work with founders and teams who care about building things properly — not just quickly."}
        </p>

        <div className="mt-12">
          <a
            href="/services"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition hover:bg-slate-200"
          >
            View Services →
          </a>
        </div>
      </section>
      {/* Flow indicator */}
<div className="mt-32 h-px w-24 bg-white/20" />


      {/* SEPARATOR */}
      <div className="h-px w-full bg-white/10" />

      {/* SECTION 1 */}
      <section>
        <h2 className="text-3xl font-medium">
          Websites that scale with your business
        </h2>

        <p className="mt-4 max-w-2xl text-lg text-slate-400">
          We design and develop fast, maintainable websites using modern
          technologies — built to grow with your product.
        </p>
      </section>

      {/* SECTION 2 */}
      <section>
        <h2 className="text-3xl font-medium">
          Interfaces people enjoy using
        </h2>

        <p className="mt-4 max-w-2xl text-lg text-slate-400">
          Clean UI and thoughtful UX decisions that improve clarity,
          usability, and conversion — without unnecessary complexity.
        </p>
      </section>

      {/* SECTION 3 */}
      <section>
        <h2 className="text-3xl font-medium">
          Technical guidance when it matters
        </h2>

        <p className="mt-4 max-w-2xl text-lg text-slate-400">
          We help founders and teams make the right technical decisions early,
          avoiding costly rewrites later.
        </p>
      </section>

    </main>
  );
}
