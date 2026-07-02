import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { SongMarquee } from "@/components/song-marquee";
import { CtaBand } from "@/components/cta-band";
import { VideoSection } from "@/components/video-section";
import { getContent } from "@/lib/content";

// Re-check MongoDB for updated content at most once a minute.
export const revalidate = 60;

export default async function HomePage() {
  const { site, members, songs, videos } = await getContent();
  const preview = members.slice(0, 6);

  return (
    <>
      <Hero tagline={site.tagline} />

      {/* Intro strip */}
      <section className="border-b border-ink">
        <Reveal className="mx-auto max-w-6xl px-5 py-20 md:px-6 md:py-28">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            The short version
          </p>
          <p className="mt-5 max-w-3xl font-display text-3xl font-medium leading-[1.15] tracking-tight md:text-5xl">
            Eleven students. One band. Founded at UCLA in fall 2025 —{" "}
            <em className="text-cobalt">
              jazz standards with a pop heart, pop songs with a jazz brain.
            </em>
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] underline decoration-cobalt decoration-2 underline-offset-4 hover:text-cobalt"
          >
            Our story <ArrowRight size={14} />
          </Link>
        </Reveal>
      </section>

      {/* Song marquee */}
      <section className="border-b border-ink">
        <Reveal className="mx-auto flex max-w-6xl items-baseline justify-between px-5 pb-8 pt-16 md:px-6 md:pt-20">
          <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
            What we play
          </h2>
          <Link
            href="/setlist"
            className="font-mono text-xs uppercase tracking-[0.14em] underline decoration-cobalt decoration-2 underline-offset-4 hover:text-cobalt"
          >
            Full set list
          </Link>
        </Reveal>
        <SongMarquee songs={songs} />
        <div className="mx-auto max-w-6xl px-5 py-6 md:px-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            {songs.length} songs and counting — Ella Fitzgerald to ABBA
          </p>
        </div>
      </section>

      {/* Band preview */}
      <section className="border-b border-ink">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-24">
          <Reveal className="flex items-baseline justify-between">
            <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
              The lineup
            </h2>
            <Link
              href="/members"
              className="font-mono text-xs uppercase tracking-[0.14em] underline decoration-cobalt decoration-2 underline-offset-4 hover:text-cobalt"
            >
              All eleven
            </Link>
          </Reveal>
          <Reveal
            delay={0.1}
            className="mt-10 grid grid-cols-3 gap-px border border-ink bg-ink sm:grid-cols-7"
          >
            {preview.map((m, i) => (
              <Link
                key={m.name}
                href="/members"
                aria-label={`${m.name} — ${m.instrument}`}
                className="group bg-paper"
              >
                <div className="relative aspect-square overflow-hidden bg-cobalt">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    sizes="(max-width: 640px) 33vw, 14vw"
                    className="object-cover grayscale contrast-[1.05] mix-blend-multiply transition-[filter] duration-300 group-hover:grayscale-0 group-hover:mix-blend-normal"
                  />
                </div>
                <p className="flex items-baseline justify-between px-2.5 py-2 font-mono text-[11px] uppercase tracking-[0.1em]">
                  {m.name}
                  <span className="text-muted">0{i + 1}</span>
                </p>
              </Link>
            ))}
            <Link
              href="/members"
              className="flex flex-col justify-between bg-ink p-3 text-paper transition-colors hover:bg-cobalt max-sm:col-span-3 max-sm:flex-row max-sm:items-center"
            >
              <span className="font-display text-2xl font-medium leading-none">
                +5
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.1em]">
                more →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <VideoSection videos={videos} instagram={site.instagram} />

      <CtaBand />
    </>
  );
}
