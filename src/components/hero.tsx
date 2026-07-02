"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
};

const tickerItems = [
  "Booking now",
  "UCLA events",
  "Local venues",
  "Parties",
  "Private events",
  "Est. Sept 2025",
];

export function Hero({ tagline }: { tagline: string }) {
  return (
    <section className="border-b border-ink pt-14">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:px-6 md:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <div>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="font-mono text-xs uppercase tracking-[0.2em] text-cobalt"
          >
            UCLA — Jazz / Pop Fusion — 11 members
          </motion.p>

          <h1 className="mt-5 font-display text-[clamp(3.5rem,10vw,7.5rem)] font-medium leading-[0.92] tracking-tight">
            <motion.span
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="block"
            >
              Sumting
            </motion.span>
            <motion.span
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="block italic text-cobalt"
            >
              Blue
            </motion.span>
          </h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.45, delay: 0.45 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-muted"
          >
            {tagline}
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.45, delay: 0.58 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link
              href="/book"
              className="inline-flex items-center gap-2 border border-ink bg-ink px-6 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-paper transition-colors hover:bg-cobalt hover:border-cobalt"
            >
              Book the band <ArrowRight size={14} />
            </Link>
            <Link
              href="/setlist"
              className="inline-flex items-center gap-2 border border-ink px-6 py-3.5 font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:bg-ink hover:text-paper"
            >
              Hear our set
            </Link>
          </motion.div>
        </div>

        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="print-shadow relative border-2 border-ink"
        >
          <Image
            src="/images/groupPhoto.jpg"
            alt="Sumting Blue — the full 11-piece band"
            width={1200}
            height={800}
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="h-auto w-full object-cover grayscale-[0.15] contrast-[1.03]"
          />
          <figcaption className="flex items-center justify-between border-t-2 border-ink bg-paper px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            <span>The full lineup, eleven strong</span>
            <span aria-hidden>fig. 01</span>
          </figcaption>
        </motion.figure>
      </div>

      {/* Ticker */}
      <div className="overflow-hidden border-t border-ink bg-cobalt py-2.5 text-paper">
        <div className="flex w-max animate-ticker whitespace-nowrap">
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map(
            (item, i) => (
              <span
                key={i}
                aria-hidden={i >= tickerItems.length}
                className="flex items-center font-mono text-xs uppercase tracking-[0.2em]"
              >
                <span className="px-4">{item}</span>
                <span aria-hidden>★</span>
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
