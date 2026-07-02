import type { Song } from "@/lib/data";

function Row({ items, reverse = false }: { items: Song[]; reverse?: boolean }) {
  const list = [...items, ...items];
  return (
    <div className="marquee-row flex overflow-hidden border-b border-ink/15 py-5 first:border-t">
      <div
        className={`flex shrink-0 items-baseline whitespace-nowrap ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {list.map((song, i) => (
          <span
            key={`${song.title}-${i}`}
            className="flex items-baseline"
            aria-hidden={i >= items.length}
          >
            <span className="px-3 font-display text-3xl font-medium tracking-tight md:text-5xl">
              {song.title}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
              {song.artist}
            </span>
            <span className="px-4 text-cobalt" aria-hidden>
              ★
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function SongMarquee({ songs }: { songs: Song[] }) {
  const half = Math.ceil(songs.length / 2);
  return (
    <div>
      <Row items={songs.slice(0, half)} />
      <Row items={songs.slice(half)} reverse />
    </div>
  );
}
