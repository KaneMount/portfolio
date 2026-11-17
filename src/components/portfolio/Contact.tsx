import { assetUrl } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { profile } from "@/data/portfolio";
import { MiniLabel, SectionHeading, Tag, btn } from "./ui";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timeout.current) clearTimeout(timeout.current); }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setCopyFailed(false);
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyFailed(true);
    }
  }

  const [emailName, emailDomain] = profile.email.split("@");
  return (
    <section id="contact" aria-labelledby="contact-heading" className="border-y border-border bg-card">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <SectionHeading id="contact-heading">Contact</SectionHeading>
        <h3 className="text-4xl font-semibold md:text-5xl">Let's talk</h3>
        <p className="mt-4 text-base text-muted-foreground">Open to Unreal Engine roles and contract work.</p>
        <div className="mt-7 flex flex-wrap items-center gap-4 md:gap-6">
          <a href={`mailto:${profile.email}`} className="min-w-0 text-lg font-medium leading-relaxed text-primary transition-colors duration-150 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:text-2xl lg:text-3xl">
            <span className="whitespace-nowrap">{emailName}@</span><wbr /><span className="whitespace-nowrap">{emailDomain}</span>
          </a>
          <button type="button" onClick={copyEmail} className={`${btn.secondary} w-28`}>
            {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}{copied ? "Copied" : "Copy"}
          </button>
        </div>
        <p role="status" className="sr-only">{copied ? "Copied" : ""}</p>
        {copyFailed && <p role="alert" className="mt-3 text-sm text-muted-foreground">Unable to copy. Please select the email address to copy it.</p>}
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className={btn.secondary}>LinkedIn<ArrowUpRight size={14} aria-hidden /></a>
          <a href={profile.links.company} target="_blank" rel="noopener noreferrer" className={btn.secondary}>Company website<ArrowUpRight size={14} aria-hidden /></a>
          {profile.cvUrl && <a href={assetUrl(profile.cvUrl)} download className={btn.secondary}>Download CV<ArrowUpRight size={14} aria-hidden /></a>}
        </div>
        <MiniLabel className="mb-3 mt-9">Availability</MiniLabel>
        <div className="flex flex-wrap gap-2">{profile.availability.map((item) => <Tag key={item}>{item}</Tag>)}</div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-7 font-mono text-xs text-muted-foreground">
      <p>© {new Date().getFullYear()} {profile.name}</p>
      <a href="#top" className="transition-colors duration-150 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Back to top</a>
    </footer>
  );
}