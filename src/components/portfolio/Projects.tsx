import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { BulletList, MiniLabel, Reveal, SectionHeading, Tag, btn } from "./ui";
import { MediaFrame } from "./Media";
import { CaseStudy } from "./CaseStudy";

function ProjectCard({ p, index, flip }: { p: Project; index: number; flip: boolean }) {
  const [open, setOpen] = useState(false);
  const featured = p.size === "featured";
  const wide = p.size !== "standard";
  const primaryLink = p.link.url.includes("itch.io");
  const meta = [p.role, p.period ?? p.context].filter(Boolean) as string[];
  if (p.period && p.context) meta.push(p.context);
  const panelId = `${p.id}-details`;

  return (
    <article
      aria-labelledby={`${p.id}-title`}
      className={cn(
        "group relative border bg-card/75 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary",
        featured ? "border-accent/50" : "border-border",
        wide && "md:col-span-2",
      )}
    >
      <span aria-hidden className={cn("absolute -top-px right-0 h-px w-16", featured ? "bg-accent" : "bg-primary")} />
      <div
        className={cn(
          "grid gap-6 p-5 md:p-7",
          wide && "lg:items-start lg:gap-10",
          featured && "lg:grid-cols-[55fr_45fr]",
          p.size === "large" && "lg:grid-cols-[1fr_1fr]",
        )}
      >
        <div className={cn(wide && flip && "lg:order-2")}>
          <MediaFrame media={p.media} title={p.title} ratio={wide ? "16:9" : "4:3"} featured={featured} />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <span className={featured ? "text-accent" : "text-primary"}>{String(index + 1).padStart(2, "0")}</span>
              <span className="px-2">/</span>
              {p.category}
            </p>
            {p.status && <Tag tone="magenta">{p.status}</Tag>}
          </div>
          <h3 id={`${p.id}-title`} className={cn("mt-3 font-bold tracking-tight text-foreground", featured ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl")}>
            {p.title}
          </h3>
          {meta.length > 0 && (
            <dl className="mt-4 divide-y divide-border/60 border-y border-border/60 font-mono text-xs">
              {p.role && (
                <div className="flex gap-4 py-1.5"><dt className="w-16 shrink-0 text-muted-foreground">ROLE</dt><dd className="text-body">{p.role}</dd></div>
              )}
              {p.period && (
                <div className="flex gap-4 py-1.5"><dt className="w-16 shrink-0 text-muted-foreground">PERIOD</dt><dd className="text-accent">{p.period}</dd></div>
              )}
              {p.context && (
                <div className="flex gap-4 py-1.5"><dt className="w-16 shrink-0 text-muted-foreground">CONTEXT</dt><dd className="text-body">{p.context}</dd></div>
              )}
            </dl>
          )}
          <p className="mt-4 leading-relaxed text-body">{p.summary}</p>
          <MiniLabel className="mb-3 mt-6">My contribution</MiniLabel>
          <BulletList items={p.contributions} />
          <div className="mt-6 flex flex-wrap gap-2">
            {p.tags.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={p.link.url} target="_blank" rel="noopener noreferrer" className={primaryLink ? btn.primary : btn.secondary}>
              {p.link.label} <ArrowUpRight size={14} aria-hidden />
            </a>
            {p.caseStudy && (
              <button type="button" className={btn.secondary} aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((o) => !o)}>
                Engineering details
                <ChevronDown size={14} aria-hidden className={cn("transition-transform", open && "rotate-180")} />
              </button>
            )}
          </div>
        </div>
      </div>
      {p.caseStudy && (
        <div id={panelId} hidden={!open} className="px-5 pb-7 md:px-7">
          {open && <CaseStudy id={p.id} sections={p.caseStudy} />}
        </div>
      )}
    </article>
  );
}

export function Projects() {
  let wideCount = 0;
  return (
    <section id="projects" aria-labelledby="projects-heading" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <SectionHeading id="projects-heading">Projects</SectionHeading>
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((p, i) => {
          const flip = p.size !== "standard" && wideCount++ % 2 === 1;
          return (
            <Reveal key={p.id} className={cn(p.size !== "standard" && "md:col-span-2")}>
              <ProjectCard p={p} index={i} flip={flip} />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
