import { useRef, useState, type KeyboardEvent } from "react";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { BulletList, MiniLabel } from "./ui";

export function CaseStudy({ id, sections }: { id: string; sections: NonNullable<Project["caseStudy"]> }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent) => {
    const n = sections.length;
    let next = -1;
    if (e.key === "ArrowRight") next = (active + 1) % n;
    if (e.key === "ArrowLeft") next = (active - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next >= 0) {
      e.preventDefault();
      setActive(next);
      refs.current[next]?.focus();
    }
  };
  return (
    <div className="border-t border-border pt-6">
      <div className="hidden md:block">
        <div role="tablist" aria-label="Engineering details" className="flex flex-wrap gap-x-6 border-b border-border" onKeyDown={onKey}>
          {sections.map((s, i) => (
            <button
              key={s.title}
              ref={(el) => { refs.current[i] = el; }}
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${id}-panel-${i}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "-mb-px border-b py-3 font-mono text-xs uppercase tracking-[0.12em] transition-colors focus-visible:outline-2 focus-visible:outline-primary",
                i === active ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {s.title}
            </button>
          ))}
        </div>
        {sections.map((s, i) => (
          <div key={s.title} role="tabpanel" id={`${id}-panel-${i}`} aria-labelledby={`${id}-tab-${i}`} hidden={i !== active} className="pt-5">
            <BulletList items={s.points} />
          </div>
        ))}
      </div>
      <div className="space-y-6 md:hidden">
        {sections.map((s) => (
          <div key={s.title}>
            <MiniLabel className="mb-3 text-primary">{s.title}</MiniLabel>
            <BulletList items={s.points} />
          </div>
        ))}
      </div>
    </div>
  );
}
