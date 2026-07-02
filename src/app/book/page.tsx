import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { CopyEmail } from "@/components/copy-email";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Book Us",
  description:
    "Book Sumting Blue for UCLA events, local venues, parties, and private events — full 11-piece band or a smaller combo.",
};

const expectations = [
  "Full 11-piece band, or a scaled-down combo to fit your room and budget",
  "A book of ~30 songs across jazz, pop, soul, film, and party classics",
  "Song requests welcome — give us enough notice and we'll learn it",
  "We usually reply within 48 hours",
];

export default async function BookPage() {
  const { site } = await getContent();

  return (
    <>
      <section className="border-b border-ink pt-14">
        <Reveal className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cobalt">
            Bookings — open
          </p>
          <h1 className="mt-4 font-display text-[clamp(3rem,8vw,6rem)] font-medium leading-[0.95] tracking-tight">
            Book <em className="text-cobalt">Sumting Blue</em>
          </h1>
          <p className="mt-5 max-w-xl text-muted">
            UCLA events, local venues, parties, private events — if there's a
            stage or a corner of a living room, we'll make it sound good.
          </p>
        </Reveal>
      </section>

      <section className="border-b border-ink">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:px-6 md:py-24 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
              What to expect
            </h2>
            <ol className="mt-6 border-t-2 border-ink">
              {expectations.map((item, i) => (
                <li
                  key={item}
                  className="grid grid-cols-[2.5rem_1fr] items-baseline gap-2 border-b border-ink/20 py-4"
                >
                  <span className="font-mono text-xs text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-relaxed text-muted">{item}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="print-shadow border-2 border-ink bg-paper">
              <p className="border-b border-ink px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Get in touch
              </p>
              <div className="grid grid-cols-[2.5rem_1fr] items-baseline gap-2 border-b border-ink/20 px-6 py-7">
                <span className="font-mono text-xs text-muted">01</span>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    Email us
                  </p>
                  <div className="mt-2">
                    <CopyEmail email={site.email} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-[2.5rem_1fr] items-baseline gap-2 px-6 py-7">
                <span className="font-mono text-xs text-muted">02</span>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    DM us on Instagram
                  </p>
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block w-fit font-display text-2xl font-medium tracking-tight underline decoration-cobalt decoration-2 underline-offset-4 hover:text-cobalt md:text-3xl"
                  >
                    {site.instagramHandle}
                  </a>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Tell us where, roughly how many people, and what vibe you're
              going for — we'll take it from there.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
