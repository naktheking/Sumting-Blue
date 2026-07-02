import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function CtaBand({
  heading = "Planning an event? We'll bring the band.",
  buttonLabel = "Book Sumting Blue",
  href = "/book",
}: {
  heading?: string;
  buttonLabel?: string;
  href?: string;
}) {
  return (
    <section className="border-t-2 border-ink bg-cobalt text-paper">
      <Reveal className="mx-auto max-w-6xl px-5 py-20 md:px-6 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper/70">
          Bookings open
        </p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
          {heading}
        </h2>
        <p className="mt-5 max-w-md leading-relaxed text-paper/80">
          UCLA events, local venues, parties, and private events — full
          11-piece band or a smaller combo to fit the room.
        </p>
        <Link
          href={href}
          className="mt-9 inline-flex items-center gap-2 border border-paper bg-paper px-6 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-ink transition-colors hover:bg-transparent hover:text-paper"
        >
          {buttonLabel} <ArrowRight size={14} />
        </Link>
      </Reveal>
    </section>
  );
}
