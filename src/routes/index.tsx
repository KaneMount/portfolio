import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Projects } from "@/components/portfolio/Projects";
import { Expertise, Experience, About } from "@/components/portfolio/Sections";
import { Contact, Footer } from "@/components/portfolio/Contact";
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
        <Expertise />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
