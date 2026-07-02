import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { MemberGrid } from "@/components/member-grid";
import { CtaBand } from "@/components/cta-band";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Members",
  description:
    "Meet the eleven members of Sumting Blue — vocals, horns, strings, and rhythm section, freshmen through grad students at UCLA.",
};

export default async function MembersPage() {
  const { members } = await getContent();

  return (
    <>
      <section className="border-b border-ink pt-14">
        <Reveal className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cobalt">
            The lineup — personnel
          </p>
          <h1 className="mt-4 font-display text-[clamp(3rem,8vw,6rem)] font-medium leading-[0.95] tracking-tight">
            Eleven <em className="text-cobalt">of us</em>
          </h1>
          <p className="mt-5 max-w-lg text-muted">
            Tap anyone to see what the rest of the band actually thinks of
            them.
          </p>
        </Reveal>
      </section>

      <section className="border-b border-ink">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20">
          <MemberGrid members={members} />
        </div>
      </section>

      <CtaBand heading="Want this crew at your event?" />
    </>
  );
}
