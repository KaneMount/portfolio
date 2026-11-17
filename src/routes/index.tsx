import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Projects } from "@/components/portfolio/Projects";
import { Expertise, Experience, About } from "@/components/portfolio/Sections";
import { Contact, Footer } from "@/components/portfolio/Contact";
import { profile } from "@/data/portfolio";

const siteUrl = "https://kanemount.github.io/portfolio/";
const title = "Margus Mägi — Senior Unreal Engine Developer";
const description =
  "Portfolio of Margus Mägi, Senior Unreal Engine Developer and Tech Lead. Multiplayer, gameplay, AWS backend and Pixel Streaming work in UE4/UE5.";
const ogImage = "https://kanemount.github.io/portfolio/og-image.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "theme-color", content: "#171722" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: siteUrl },
      { property: "og:image", content: ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: siteUrl }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: profile.title,
          url: siteUrl,
          email: `mailto:${profile.email}`,
          address: { "@type": "PostalAddress", addressLocality: "Keila", addressCountry: "EE" },
          worksFor: { "@type": "Organization", name: "Dynamic Render Interactive OÜ", url: profile.links.company },
          sameAs: [profile.links.linkedin, profile.links.company],
        }),
      },
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
