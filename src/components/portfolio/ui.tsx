import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Tag({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "cyan" | "magenta" }) {
  return (
    <span
      className={cn(
        "inline-block border px-2 py-0.5 font-mono text-[11px] leading-5",
        tone === "default" && "border-border text-muted-foreground",
        tone === "cyan" && "border-primary/50 text-primary",
        tone === "magenta" && "border-accent/60 text-accent",
      )}
    >
      {children}
    </span>
  );
}

const btnBase =
  "inline-flex items-center justify-center gap-2 border px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
export const btn = {
  primary: cn(btnBase, "border-primary bg-primary text-primary-foreground hover:bg-primary/85"),
  secondary: cn(btnBase, "border-border text-foreground hover:border-accent hover:text-accent"),
};

export function SectionHeading({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <h2 id={id} className="shrink-0 font-mono text-xs font-medium uppercase tracking-[0.3em] text-primary">
        {children}
      </h2>
      <span aria-hidden className="fade-line h-px flex-1" />
    </div>
  );
}

export function MiniLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("font-mono text-[11px] uppercase tracking-[0.2em] text-accent", className)}>{children}</p>;
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it} className="flex gap-3 text-sm leading-relaxed text-body">
          <span aria-hidden className="mt-[0.55em] h-1.5 w-2.5 shrink-0 bg-deco" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function Brackets({ tone = "primary" }: { tone?: "primary" | "accent" }) {
  const c = tone === "accent" ? "border-accent/70" : "border-primary/70";
  const s = "pointer-events-none absolute h-3 w-3";
  return (
    <>
      <span aria-hidden className={cn(s, c, "left-2 top-2 border-l border-t")} />
      <span aria-hidden className={cn(s, c, "right-2 top-2 border-r border-t")} />
      <span aria-hidden className={cn(s, c, "bottom-2 left-2 border-b border-l")} />
      <span aria-hidden className={cn(s, c, "bottom-2 right-2 border-b border-r")} />
    </>
  );
}

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn("reveal", className)}>
      {children}
    </div>
  );
}
