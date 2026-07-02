import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { SetList } from "@/components/set-list";
import { CtaBand } from "@/components/cta-band";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Set List",
  description:
    "Around 30 songs and counting — jazz standards, pop anthems, soul, film scores, and party classics played by Sumting Blue.",
};

export default async function SetListPage() {
  const { songs } = await getContent();
  const featured = songs.filter((s) => s.featured);

  return (
    <>
      <section className="border-b border-ink pt-14">
        <Reveal className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cobalt">
            The book — {songs.length} songs and counting
          </p>
          <h1 className="mt-4 font-display text-[clamp(3rem,8vw,6rem)] font-medium leading-[0.95] tracking-tight">
            The <em className="text-cobalt">Set List</em>
          </h1>
          <p className="mt-5 max-w-lg text-muted">
            From Ella Fitzgerald to ABBA. Featured five up top, the whole book
            below.
          </p>
        </Reveal>
      </section>

      {/* Featured five */}
      <section className="border-b border-ink">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20">
          <Reveal className="mb-8 flex items-baseline justify-between">
            <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
              Featured five
            </h2>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-amber">
              ★ crowd favorites
            </p>
          </Reveal>
          <ol className="border-t-2 border-ink">
            {featured.map((s, i) => (
              <li key={s.title} className="border-b border-ink/20">
                <Reveal
                  delay={0.04 * i}
                  className="grid items-baseline gap-x-6 gap-y-1 py-6 sm:grid-cols-[3rem_1fr_auto]"
                >
                  <span className="font-mono text-sm text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-medium tracking-tight md:text-4xl">
                      {s.title}
                      <span className="ml-3 font-sans text-base text-muted md:text-lg">
                        {s.artist}
                      </span>
                    </h3>
                    <p className="mt-1.5 max-w-md italic leading-snug text-muted">
                      {s.note}
                    </p>
                  </div>
                  <span
                    className="text-amber max-sm:hidden"
                    aria-label="featured"
                  >
                    ★
                  </span>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Full list */}
      <section className="border-b border-ink bg-paper-dim">
        <div className="mx-auto max-w-4xl px-5 py-16 md:px-6 md:py-20">
          <Reveal className="mb-8 flex items-baseline justify-between">
            <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
              The whole book
            </h2>
          </Reveal>
          <SetList songs={songs} />
        </div>
      </section>

      <CtaBand heading="Want these songs at your event?" />
    </>
  );
}
