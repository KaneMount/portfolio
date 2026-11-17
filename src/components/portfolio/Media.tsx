import { useState } from "react";
import { Play } from "lucide-react";
import type { ProjectMedia } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { Brackets } from "./ui";

export function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false);
  if (play)
    return (
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  return (
    <button type="button" onClick={() => setPlay(true)} className="group absolute inset-0" aria-label={`Play video: ${title}`}>
      <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt={title} loading="lazy" className="h-full w-full object-cover" />
      <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-primary bg-background/85 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Play size={22} />
      </span>
    </button>
  );
}

function MediaItem({ m }: { m: ProjectMedia }) {
  if (m.type === "youtube") return <YouTubeEmbed id={m.src} title={m.alt} />;
  if (m.type === "video")
    return <video className="absolute inset-0 h-full w-full object-cover" src={m.src} controls preload="none" aria-label={m.alt} />;
  return <img className="absolute inset-0 h-full w-full object-cover" src={m.src} alt={m.alt} loading="lazy" />;
}

export function MediaFrame({ media, title, ratio, featured }: { media: ProjectMedia[]; title: string; ratio: "16:9" | "4:3"; featured?: boolean }) {
  const [i, setI] = useState(0);
  const aspect = ratio === "16:9" ? "aspect-video" : "aspect-[4/3]";
  return (
    <div>
      <div className={cn("relative overflow-hidden border border-border bg-card", aspect)}>
        {media.length === 0 ? (
          <div className="grid-faint absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
            <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground">MEDIA SLOT</span>
            <span className="font-mono text-[11px] text-body">{title}</span>
            <span className="font-mono text-[10px] text-muted-foreground">{ratio}</span>
          </div>
        ) : (
          <MediaItem key={i} m={media[i]} />
        )}
        <Brackets tone={featured ? "accent" : "primary"} />
      </div>
      {media.length > 1 && (
        <div className="mt-2 flex gap-2 overflow-x-auto">
          {media.map((m, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Show media ${idx + 1}: ${m.alt}`}
              aria-pressed={idx === i}
              className={cn("relative h-12 w-20 shrink-0 overflow-hidden border", idx === i ? "border-primary" : "border-border")}
            >
              {m.type === "image" ? (
                <img src={m.src} alt="" loading="lazy" className="h-full w-full object-cover" />
              ) : m.type === "youtube" ? (
                <img src={`https://i.ytimg.com/vi/${m.src}/default.jpg`} alt="" loading="lazy" className="h-full w-full object-cover" />
              ) : (
                <span className="font-mono text-[10px] text-muted-foreground">VIDEO</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
