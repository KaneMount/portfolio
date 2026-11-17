import { ArrowUpRight } from "lucide-react";
import { expertise, experience, profile, projects } from "@/data/portfolio";
import { BulletList, MiniLabel, SectionHeading, Tag } from "./ui";

const sectionClass = "mx-auto max-w-6xl px-5 pb-20 md:pb-28";
const linkClass = "transition-colors duration-150 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

export function Expertise() {
  return (
    <section id="expertise" aria-labelledby="expertise-heading" className={sectionClass}>
      <SectionHeading id="expertise-heading">Expertise</SectionHeading>
      <div className="grid gap-px border border-border bg-border after:hidden after:bg-background after:content-[''] sm:grid-cols-2 sm:after:block lg:grid-cols-3 lg:after:hidden">
        {expertise.map((group) => (
          <div key={group.name} className="min-w-0 bg-background p-5 transition-colors duration-150 hover:bg-card md:p-6">
            <h3 className="mb-4 font-mono text-xs uppercase text-primary">{group.name}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => <Tag key={item}>{item}</Tag>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className={sectionClass}>
      <SectionHeading id="experience-heading">Experience</SectionHeading>
      <div className="divide-y divide-border border-y border-border">
        {experience.map((entry) => (
          <article key={entry.company} className="py-7 md:py-8">
            <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-8">
              <div className="min-w-0">
                <p className="font-mono text-xs text-accent">{entry.period}</p>
                <h3 className="mt-3 text-lg font-semibold uppercase">
                  {entry.url ? <a href={entry.url} target="_blank" rel="noopener noreferrer" className={linkClass}>{entry.company}</a> : entry.company}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{entry.location}</p>
              </div>
              <div className="min-w-0 border-l border-border pl-5 md:pl-8">
                <h4 className="mb-4 text-lg font-medium text-primary">{entry.role}</h4>
                <BulletList items={entry.points} />
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-xs">
              <span className="text-muted-foreground">Projects</span>
              {entry.relatedProjectIds.map((id) => {
                const project = projects.find((item) => item.id === id);
                if (!project) return null;
                return <a key={id} href={`#${id}-title`} className={`${linkClass} underline decoration-border underline-offset-4`}>{project.title}</a>;
              })}
              {entry.extraLink && <a href={entry.extraLink.url} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-1.5`}>{entry.extraLink.label}<ArrowUpRight size={13} aria-hidden /></a>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className={sectionClass}>
      <SectionHeading id="about-heading">About</SectionHeading>
      <div className="grid gap-10 md:grid-cols-[2fr_1fr] md:gap-12">
        <div className="max-w-[640px] space-y-5 text-base leading-relaxed text-body md:text-lg">
          {profile.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="space-y-7">
          <div><MiniLabel className="mb-3">Based in</MiniLabel><p>{profile.location}</p></div>
          <div>
            <MiniLabel className="mb-3">Languages</MiniLabel>
            <dl className="space-y-2">
              {profile.languages.map((language) => <div key={language.name} className="flex flex-wrap gap-x-3"><dt>{language.name}</dt><dd className="text-muted-foreground">{language.level}</dd></div>)}
            </dl>
          </div>
          <div>
            <MiniLabel className="mb-3">Outside work</MiniLabel>
            <dl className="space-y-4">
              {profile.interests.map((interest) => <div key={interest.title}><dt>{interest.title}</dt><dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{interest.detail}</dd></div>)}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}