"use client";

import Image from "next/image";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Member } from "@/lib/data";
import { Waveform } from "@/components/waveform";

export function MemberGrid({ members }: { members: Member[] }) {
  const [selected, setSelected] = useState<Member | null>(null);
  const index = selected ? members.indexOf(selected) : -1;

  return (
    <>
      <div className="grid grid-cols-2 gap-px border border-ink bg-ink md:grid-cols-3 lg:grid-cols-4">
        {members.map((m, i) => (
          <motion.button
            key={m.name}
            type="button"
            onClick={() => setSelected(m)}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.03 * (i % 4) }}
            className="group bg-paper text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-cobalt"
            aria-label={`${m.name} — ${m.instrument}. Read note.`}
          >
            <div className="flex items-baseline justify-between px-3 py-2 font-mono text-[11px] uppercase tracking-[0.1em]">
              <span className="text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{m.instrument}</span>
            </div>
            <div className="relative aspect-[3/4] overflow-hidden border-y border-ink/15 bg-cobalt">
              <Image
                src={m.image}
                alt={m.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover grayscale contrast-[1.05] mix-blend-multiply transition-[filter,transform] duration-300 group-hover:scale-[1.02] group-hover:grayscale-0 group-hover:mix-blend-normal group-focus-visible:grayscale-0 group-focus-visible:mix-blend-normal"
              />
            </div>
            <p className="flex items-center justify-between px-3 py-2.5 font-display text-xl font-medium tracking-tight md:text-2xl">
              {m.name}
              <span
                aria-hidden
                className="font-mono text-xs text-muted transition-colors group-hover:text-cobalt"
              >
                →
              </span>
            </p>
          </motion.button>
        ))}

        {/* 12th cell squares the grid */}
        <div className="flex flex-col justify-between bg-ink p-4 text-paper">
          <Waveform className="h-4" barClassName="bg-paper" />
          <p>
            <span className="block font-display text-2xl font-medium leading-tight md:text-3xl">
              Sumting Blue
            </span>
            <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.1em] text-paper/70">
              Est. Sept 2025 — Los Angeles
            </span>
          </p>
        </div>
      </div>

      <Dialog.Root
        open={selected !== null}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <AnimatePresence>
          {selected && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  className="fixed inset-0 z-50 bg-ink/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              </Dialog.Overlay>
              <Dialog.Content
                forceMount
                className="fixed inset-x-0 bottom-0 z-50 sm:inset-0 sm:flex sm:items-center sm:justify-center sm:p-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="print-shadow relative max-h-[85svh] w-full overflow-auto border-2 border-ink bg-paper sm:max-w-2xl"
                >
                  <div className="flex items-center justify-between border-b border-ink px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em]">
                    <span>
                      Member {String(index + 1).padStart(2, "0")} / 11
                    </span>
                    <Dialog.Close
                      className="-mr-1 p-1 hover:text-cobalt"
                      aria-label="Close"
                    >
                      <X size={16} />
                    </Dialog.Close>
                  </div>
                  <div className="grid sm:grid-cols-2">
                    <div className="relative aspect-[4/3] border-b border-ink sm:aspect-auto sm:min-h-[380px] sm:border-b-0 sm:border-r">
                      <Image
                        src={selected.image}
                        alt={selected.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 336px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
                      <Dialog.Title className="font-display text-4xl font-medium tracking-tight">
                        {selected.name}
                      </Dialog.Title>
                      <p className="font-mono text-xs uppercase tracking-[0.14em] text-cobalt">
                        {selected.instrument}
                      </p>
                      <Dialog.Description className="mt-2 border-l-2 border-cobalt pl-4 font-display text-lg italic leading-relaxed">
                        “{selected.note}”
                      </Dialog.Description>
                      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                        — the rest of the band
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </>
  );
}
