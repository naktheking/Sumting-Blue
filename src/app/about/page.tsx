import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Timeline } from "@/components/timeline";
import { CtaBand } from "@/components/cta-band";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story of Sumting Blue — from two UCLA freshmen in September 2025 to an 11-piece jazz/pop fusion band.",
};

export const revalidate = 60;

export default async function AboutPage() {
  const { site, milestones } = await getContent();

  return (
    <>
      <section className="border-b border-ink pt-14">
        <Reveal className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cobalt">
            About the band — liner notes
          </p>
          <h1 className="mt-4 font-display text-[clamp(3rem,8vw,6rem)] font-medium leading-[0.95] tracking-tight">
            Sum ting <em className="text-cobalt">about us</em>
          </h1>
        </Reveal>
      </section>

      {/* Origin story */}
      <section className="border-b border-ink">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:px-6 md:py-24 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
              Two freshmen and a shared playlist
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-muted">
              <p>
                Sumting Blue started in September 2025, when two UCLA freshmen
                realized they kept queuing up the same songs — Laufey next to
                Fleetwood Mac, Ella Fitzgerald next to ABBA — and figured a band
                should sound like that too.
              </p>
              <p>
                Word spread the way it does on a campus with too many talented
                people. Singers, horns, strings, and a rhythm section signed on,
                and within a few months the duo had become an eleven-piece
                spanning freshmen to graduate students.
              </p>
              <p>
                We play jazz standards with a pop heart and pop songs with a
                jazz brain — at UCLA events, local venues, parties, and private
                events around Los Angeles.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <figure className="print-shadow border-2 border-ink">
              <Image
                src="/images/groupPhoto.jpg"
                alt="The full Sumting Blue lineup"
                width={1200}
                height={800}
                className="h-auto w-full object-cover grayscale-[0.15] contrast-[1.03]"
              />
              <figcaption className="flex items-center justify-between border-t-2 border-ink bg-paper px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                <span>All eleven of us</span>
                <span aria-hidden>fig. 02</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-b border-ink bg-paper-dim">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-24">
          <Reveal className="mb-12 flex items-baseline justify-between">
            <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
              How we got here
            </h2>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
              2025 — present
            </p>
          </Reveal>
          <Timeline milestones={milestones} />
        </div>
      </section>

      {/* Mission */}
      <section className="border-b border-ink">
        <Reveal className="mx-auto max-w-6xl px-5 py-20 md:px-6 md:py-28">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            The whole mission, honestly
          </p>
          <p className="mt-6 max-w-4xl font-display text-3xl font-medium italic leading-[1.2] tracking-tight md:text-5xl">
            “Make the standards feel new, make the hits feel timeless, and make
            every room feel like a{" "}
            <span className="text-cobalt">listening party</span>.”
          </p>
        </Reveal>
      </section>

      {/* Live strip */}
      <section className="border-b border-ink">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-24">
          <Reveal className="flex items-baseline justify-between">
            <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
              Live
            </h2>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
              More after every gig
            </p>
          </Reveal>
          <div className="mt-10 grid gap-px border border-ink bg-ink sm:grid-cols-3">
            <Reveal className="relative bg-paper sm:col-span-2">
              <Image
                src="/images/groupPhoto.jpg"
                alt="Sumting Blue performing together"
                width={1200}
                height={800}
                className="h-full w-full object-cover grayscale-[0.15] contrast-[1.03]"
              />
            </Reveal>
            <Reveal
              delay={0.08}
              className="flex flex-col justify-between gap-8 bg-paper p-6 md:p-8"
            >
              <p className="font-display text-2xl font-medium leading-snug tracking-tight">
                The rest of the camera roll lives on Instagram.
              </p>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] underline decoration-cobalt decoration-2 underline-offset-4 hover:text-cobalt"
              >
                {site.instagramHandle} <ArrowRight size={14} />
              </a>
            </Reveal>
          </div>
          <Reveal className="mt-12">
            <Link
              href="/members"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] underline decoration-cobalt decoration-2 underline-offset-4 hover:text-cobalt"
            >
              Meet all eleven of us <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand heading="Like the sound of us?" />
    </>
  );
}
