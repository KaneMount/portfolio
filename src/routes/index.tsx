import { createFileRoute } from "@tanstack/react-router";
import { Nav, sections } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Projects } from "@/components/portfolio/Projects";
import { SectionHeading } from "@/components/portfolio/ui";
import { profile } from "@/data/portfolio";

const description = `${profile.name} — ${profile.title}. ${profile.roles.join(", ")}. ${profile.location}.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${profile.name} — ${profile.title}` },
      { name: "description", content: description },
      { property: "og:title", content: `${profile.name} — ${profile.title}` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Projects />
        {sections.slice(1).map((s) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-heading`} className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <SectionHeading id={`${s.id}-heading`}>{s.label}</SectionHeading>
          </section>
        ))}
      </main>
    </div>
  );
}
