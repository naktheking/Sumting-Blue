import type { Metadata } from "next";
import { isAuthed } from "@/lib/auth";
import { getContent } from "@/lib/content";
import { login } from "./actions";
import { AdminEditor } from "@/components/admin-editor";
import { Waveform } from "@/components/waveform";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Always render fresh — this page must never be cached.
export const dynamic = "force-dynamic";

const errorMessages: Record<string, string> = {
  wrong: "Wrong password — try again.",
  unconfigured:
    "No ADMIN_PASSWORD is set. Add it to .env.local (or Vercel env vars) and redeploy.",
};

function Login({ error }: { error?: string }) {
  return (
    <section className="flex min-h-svh items-center justify-center px-5 pt-14">
      <div className="print-shadow w-full max-w-sm border-2 border-ink bg-paper">
        <p className="flex items-center gap-2.5 border-b border-ink px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          <Waveform className="h-3" /> Band members only
        </p>
        <form action={login} className="flex flex-col gap-4 p-6">
          <h1 className="font-display text-3xl font-medium tracking-tight">
            Admin
          </h1>
          <label className="flex flex-col gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em]">
            Password
            <input
              type="password"
              name="password"
              required
              autoFocus
              className="w-full border border-ink/40 bg-paper px-3.5 py-3 text-sm focus:border-cobalt focus:outline-none"
            />
          </label>
          {error && (
            <p role="alert" className="text-sm text-cobalt">
              {errorMessages[error] ?? "Something went wrong — try again."}
            </p>
          )}
          <button
            type="submit"
            className="border border-ink bg-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] text-paper transition-colors hover:border-cobalt hover:bg-cobalt"
          >
            Sign in →
          </button>
        </form>
      </div>
    </section>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  if (!(await isAuthed())) return <Login error={error} />;

  const content = await getContent();
  return <AdminEditor initial={content} />;
}
