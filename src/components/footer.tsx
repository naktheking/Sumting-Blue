import Link from "next/link";
import { getContent } from "@/lib/content";

export async function Footer() {
  const { site } = await getContent();

  return (
    <footer className="border-t-2 border-ink">
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-14 md:px-6">
        <p className="font-display text-[clamp(2.5rem,8vw,5rem)] font-medium leading-none tracking-tight">
          Sumting Blue
        </p>
        <div className="mt-10 grid gap-8 border-t border-ink/15 pt-8 sm:grid-cols-3">
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            An 11-piece jazz/pop fusion band at UCLA. {site.tagline}
          </p>
          <nav
            aria-label="Footer"
            className="flex flex-col gap-2 font-mono text-xs uppercase tracking-[0.14em]"
          >
            <Link href="/about" className="w-fit hover:text-cobalt">About</Link>
            <Link href="/members" className="w-fit hover:text-cobalt">Members</Link>
            <Link href="/setlist" className="w-fit hover:text-cobalt">Set List</Link>
            <Link href="/book" className="w-fit text-cobalt underline underline-offset-4">
              Book Us
            </Link>
          </nav>
          <div className="flex flex-col gap-2 font-mono text-xs uppercase tracking-[0.14em]">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit hover:text-cobalt"
            >
              Instagram — {site.instagramHandle}
            </a>
            <span className="w-fit select-all normal-case">{site.email}</span>
          </div>
        </div>
        <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          © {new Date().getFullYear()} Sumting Blue · Los Angeles, CA · Est. Sept 2025
        </p>
      </div>
    </footer>
  );
}
