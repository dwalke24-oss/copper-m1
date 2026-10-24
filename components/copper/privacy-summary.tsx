import { ShieldCheckIcon } from "lucide-react";
import { getPrivacySummary } from "@/lib/copper/catalog";

// The points are the official 2026 policy, shown exactly as the catalog has them.
export function PrivacySummary() {
  const privacy = getPrivacySummary();

  return (
    <section
      data-testid="privacy-summary"
      id="privacy"
      className="bg-secondary w-full"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-16 md:py-24">
        <div className="flex flex-col gap-3">
          <span className="text-accent text-sm font-semibold tracking-wide uppercase">
            {privacy.policy} privacy policy
          </span>
          <h2 className="text-secondary-foreground text-3xl font-bold md:text-4xl">
            Your privacy, in plain words
          </h2>
        </div>
        <ul className="border-accent flex flex-col gap-5 border-l-4 pl-6">
          {privacy.points.map((point) => (
            <li key={point} className="flex gap-3">
              <ShieldCheckIcon
                aria-hidden="true"
                className="text-accent mt-0.5 size-5 shrink-0"
              />
              <span className="text-secondary-foreground text-lg">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
