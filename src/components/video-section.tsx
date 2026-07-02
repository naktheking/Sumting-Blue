import { Reveal } from "@/components/reveal";
import { Waveform } from "@/components/waveform";
import { youtubeId, type Video } from "@/lib/data";

export function VideoSection({
  videos,
  instagram,
}: {
  videos: Video[];
  instagram: string;
}) {
  return (
    <section className="border-b border-ink">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-24">
        <Reveal className="flex items-baseline justify-between">
          <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
            Recordings
          </h2>
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-[0.14em] underline decoration-cobalt decoration-2 underline-offset-4 hover:text-cobalt"
          >
            More on Instagram
          </a>
        </Reveal>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {videos.map((v, i) => (
            <Reveal key={v.title} delay={0.06 * i}>
              <figure className="print-shadow border-2 border-ink">
                <div className="relative aspect-video bg-paper-dim">
                  {youtubeId(v.url) ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${youtubeId(v.url)}`}
                      title={`${v.title} — ${v.caption}`}
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <Waveform className="h-5" />
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                        Recording coming soon
                      </p>
                    </div>
                  )}
                </div>
                <figcaption className="flex items-baseline justify-between border-t-2 border-ink bg-paper px-4 py-2.5">
                  <span className="font-display text-lg font-medium tracking-tight">
                    {v.title}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    {v.caption}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
