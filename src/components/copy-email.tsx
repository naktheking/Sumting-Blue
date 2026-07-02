"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex flex-wrap items-center gap-3 text-left"
      aria-label={`Copy email address ${email}`}
    >
      <span className="font-display text-2xl font-medium tracking-tight underline decoration-cobalt decoration-2 underline-offset-4 group-hover:text-cobalt md:text-3xl">
        {email}
      </span>
      <span
        aria-live="polite"
        className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted"
      >
        {copied ? (
          <>
            <Check size={13} className="text-cobalt" /> Copied
          </>
        ) : (
          <>
            <Copy size={13} /> Click to copy
          </>
        )}
      </span>
    </button>
  );
}
