import { assetUrl } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export const sections = [
  { id: "projects", label: "Projects" },
  { id: "expertise", label: "Expertise" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const link = (s: (typeof sections)[number], mobile = false) => (
    <a
      key={s.id}
      href={`#${s.id}`}
      onClick={() => setOpen(false)}
      aria-current={active === s.id ? "true" : undefined}
      className={cn(
        "font-mono text-xs uppercase tracking-[0.15em] transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-primary",
        active === s.id ? "text-primary" : "text-muted-foreground",
        mobile && "block border-b border-border px-4 py-4",
      )}
    >
      {s.label}
    </a>
  );

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] bg-primary px-3 py-2 font-mono text-xs text-primary-foreground focus:not-sr-only focus:fixed focus:left-2 focus:top-2"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
          <a href="#top" className="font-semibold tracking-tight text-foreground hover:text-primary">
            {profile.name}
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
            {sections.map((s) => link(s))}
            {profile.cvUrl && (
              <a href={assetUrl(profile.cvUrl)} className="border border-border px-3 py-1 font-mono text-xs uppercase tracking-[0.15em] text-foreground hover:border-accent hover:text-accent">
                CV
              </a>
            )}
          </nav>
          <button
            type="button"
            className="border border-border p-2 text-foreground md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {open && (
          <nav id="mobile-nav" aria-label="Primary mobile" className="border-t border-border bg-background md:hidden">
            {sections.map((s) => link(s, true))}
            {profile.cvUrl && (
              <a href={assetUrl(profile.cvUrl)} className="block px-4 py-4 font-mono text-xs uppercase tracking-[0.15em] text-foreground">
                CV
              </a>
            )}
          </nav>
        )}
      </header>
    </>
  );
}
