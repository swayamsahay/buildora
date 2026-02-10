"use client";

type Status = "new" | "in_progress" | "completed";

export default function RequestTimeline({ status }: { status: Status }) {
  const steps = [
    { key: "new", label: "Submitted" },
    { key: "in_progress", label: "In Progress" },
    { key: "completed", label: "Completed" },
  ];

  const currentIndex = steps.findIndex(
    (step) => step.key === status
  );

  return (
    <div className="flex items-center gap-4 mt-4">
      {steps.map((step, index) => {
        const active = index <= currentIndex;

        return (
          <div key={step.key} className="flex items-center gap-2">
            <span
              className={`h-3 w-3 rounded-full ${
                active ? "bg-emerald-500" : "bg-slate-700"
              }`}
            />
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${
                active ? "text-emerald-400" : "text-slate-500"
              }`}
            >
              {step.label}
            </span>

            {index < steps.length - 1 && (
              <div className="w-8 h-px bg-slate-700 mx-2" />
            )}
          </div>
        );
      })}
    </div>
  );
}
