"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { genres, type Genre, type Song } from "@/lib/data";

export function SetList({ songs }: { songs: Song[] }) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState<Genre | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return songs.filter(
      (s) =>
        (!genre || s.genre === genre) &&
        (!q ||
          s.title.toLowerCase().includes(q) ||
          s.artist.toLowerCase().includes(q)),
    );
  }, [songs, query, genre]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block sm:w-72">
          <span className="sr-only">Search songs</span>
          <Search
            size={14}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH THE BOOK…"
            className="w-full border border-ink bg-paper py-2.5 pl-9 pr-4 font-mono text-xs uppercase tracking-[0.1em] placeholder:text-muted focus:border-cobalt focus:outline-none"
          />
        </label>
        <div
          className="-mx-5 flex gap-0 overflow-x-auto px-5 sm:mx-0 sm:px-0"
          role="group"
          aria-label="Filter by genre"
        >
          {[null, ...genres].map((g) => {
            const active = genre === g;
            return (
              <button
                key={g ?? "all"}
                type="button"
                aria-pressed={active}
                onClick={() => setGenre(g)}
                className={`shrink-0 border border-l-0 border-ink px-4 py-2.5 font-mono text-xs uppercase tracking-[0.1em] transition-colors first:border-l ${
                  active
                    ? "bg-ink text-paper"
                    : "bg-paper hover:bg-paper-dim"
                }`}
              >
                {g ?? "All"}
              </button>
            );
          })}
        </div>
      </div>

      <ul className="mt-8 border-t-2 border-ink">
        <AnimatePresence initial={false}>
          {filtered.map((s) => (
            <motion.li
              key={s.title}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-3 border-b border-ink/20 py-3.5 sm:grid-cols-[3rem_1fr_1fr_auto]"
            >
              <span className="font-mono text-xs text-muted">
                {String(songs.indexOf(s) + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="block truncate font-display text-lg font-medium tracking-tight md:text-xl">
                  {s.title}
                  {s.featured && (
                    <span className="ml-2 text-amber" aria-label="featured">
                      ★
                    </span>
                  )}
                </span>
                <span className="block text-sm text-muted sm:hidden">
                  {s.artist}
                </span>
              </span>
              <span className="hidden truncate text-sm text-muted sm:block">
                {s.artist}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                {s.genre}
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {filtered.length === 0 && (
        <p className="border-b border-ink/20 py-10 text-center italic text-muted">
          Nothing in the book yet — but request it and we might learn it.
        </p>
      )}
      <p className="mt-4 text-right font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        {filtered.length} / {songs.length} songs
      </p>
    </div>
  );
}
