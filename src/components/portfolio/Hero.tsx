import { assetUrl } from "@/lib/utils";
import { profile } from "@/data/portfolio";
import { Tag, btn, MiniLabel } from "./ui";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export function Hero() {
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "Location", value: profile.location },
    { label: "Experience", value: "8+ years Unreal Engine" },
    { label: "Leadership", value: "4+ years Tech Lead" },
    { label: "Email", value: <a className="text-primary [overflow-wrap:normal] [word-break:normal] hover:underline lg:whitespace-nowrap lg:text-xs" href={`mailto:${profile.email}`}>{profile.email.split("@")[0]}@<wbr />{profile.email.split("@")[1]}</a> },
    { label: "LinkedIn", value: <a className="text-primary hover:underline" href={profile.links.linkedin} {...ext}>margusmagi-unreal</a> },
    { label: "Company", value: <a className="text-primary hover:underline" href={profile.links.company} {...ext}>dynamicrenderinteractive.com</a> },
  ];
  if (profile.cvUrl) rows.push({ label: "CV", value: <a className="text-primary hover:underline" href={assetUrl(profile.cvUrl)}>Download PDF</a> });

  return (
    <section id="top" className="relative">
      <div aria-hidden className="grid-bg absolute inset-0 -z-0" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-10 pt-16 md:pt-24 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        <div className="min-w-0">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span aria-hidden className="h-px w-8 bg-accent" />
            Portfolio / Unreal Engine
          </p>
          <h1 className="mt-6 text-[40px] font-bold leading-[1.02] tracking-[-0.03em] text-foreground md:text-[68px]">
            {profile.name}
          </h1>
          <p className="mt-4 text-xl font-medium text-primary md:text-2xl">{profile.title}</p>
          <p className="mt-3 font-mono text-sm text-body">
            {profile.roles.map((r, i) => (
              <span key={r}>
                {i > 0 && <span className="px-2 text-accent">/</span>}
                {r}
              </span>
            ))}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{profile.founderLine}</p>
          <p className="mt-6 max-w-[680px] leading-relaxed text-body">{profile.intro}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {profile.heroTags.map((t) => <Tag key={t} tone="cyan">{t}</Tag>)}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className={btn.primary}>Explore My Work</a>
            <a href="#contact" className={btn.secondary}>Get in Touch</a>
          </div>
        </div>
        <aside aria-label="Details" className="self-start border border-border border-l-2 border-l-primary bg-card">
          <div className="border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Details
          </div>
          <dl className="divide-y divide-border/60">
            {rows.map((r) => (
              <div key={r.label} className="grid grid-cols-[5.5rem_1fr] sm:grid-cols-[6.5rem_1fr] gap-3 px-4 py-2.5 text-sm">
                <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground pt-0.5">{r.label}</dt>
                <dd className="min-w-0 break-words [overflow-wrap:anywhere] text-body">{r.value}</dd>
              </div>
            ))}
          </dl>
          <div className="border-t border-border px-4 py-4">
            <MiniLabel className="mb-3">Availability</MiniLabel>
            <div className="flex flex-wrap gap-2">
              {profile.availability.map((a) => <Tag key={a}>{a}</Tag>)}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
