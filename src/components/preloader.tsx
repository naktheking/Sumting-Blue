"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Waveform } from "@/components/waveform";

// Holds a full-screen cover over the page until fonts and all eagerly
// loaded images are ready, so the site never paints half-loaded.
// Lazy (below-the-fold) images are excluded — they load on scroll by
// design — and a hard timeout guarantees the cover always lifts.
const MAX_WAIT_MS = 4000;

export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    let alive = true;

    const pending = Array.from(document.images)
      .filter((img) => img.loading !== "lazy" && !img.complete)
      .map(
        (img) =>
          new Promise<void>((resolve) => {
            img.addEventListener("load", () => resolve(), { once: true });
            img.addEventListener("error", () => resolve(), { once: true });
          }),
      );

    const ready = Promise.all([document.fonts.ready, ...pending]);
    const timeout = new Promise((resolve) => setTimeout(resolve, MAX_WAIT_MS));

    Promise.race([ready, timeout]).then(() => {
      if (alive) setDone(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          role="status"
          aria-label="Loading Sumting Blue"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-paper"
        >
          <Waveform className="h-6" bars={7} />
          <p className="font-display text-2xl font-medium tracking-tight">
            Sumting Blue
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            Tuning up…
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
