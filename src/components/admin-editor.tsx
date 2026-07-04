"use client";

import { useRef, useState, useTransition } from "react";
import { Plus, Trash2, Upload } from "lucide-react";
import { genres, memberQuestions, type Content } from "@/lib/data";
import { saveContent, logout, uploadPhoto } from "@/app/admin/actions";

const inputCls =
  "w-full border border-ink/40 bg-paper px-3 py-2.5 text-sm focus:border-cobalt focus:outline-none";
const labelCls =
  "flex flex-col gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted";

type FieldDef = {
  key: string;
  label: string;
  kind?: "text" | "textarea" | "select" | "checkbox" | "image";
  options?: readonly string[];
  wide?: boolean;
};

function ImageField({
  def,
  value,
  onChange,
}: {
  def: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.set("file", file);
    const result = await uploadPhoto(formData);
    setUploading(false);
    if (result.ok && result.url) {
      onChange(result.url);
    } else {
      setError(result.message);
    }
    if (fileInput.current) fileInput.current.value = "";
  }

  return (
    <label className={`${labelCls} ${def.wide ? "sm:col-span-2" : ""}`}>
      {def.label}
      <div className="flex gap-2">
        <input
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
          placeholder="https://… or /images/…"
        />
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          disabled={uploading}
          className="flex shrink-0 items-center gap-1.5 border border-ink/40 px-3 py-2.5 text-sm hover:border-cobalt disabled:opacity-50"
        >
          <Upload size={14} />
          {uploading ? "Uploading…" : "Upload"}
        </button>
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
      {error && <span className="normal-case text-cobalt">{error}</span>}
    </label>
  );
}

function Field({
  def,
  value,
  onChange,
}: {
  def: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  if (def.kind === "checkbox") {
    return (
      <label className="flex items-center gap-2 self-end pb-2 font-mono text-[10px] uppercase tracking-[0.14em]">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 accent-[var(--color-cobalt)]"
        />
        {def.label}
      </label>
    );
  }
  if (def.kind === "select") {
    return (
      <label className={labelCls}>
        {def.label}
        <select
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        >
          {def.options?.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
    );
  }
  if (def.kind === "image") {
    return <ImageField def={def} value={value} onChange={onChange} />;
  }
  if (def.kind === "textarea") {
    return (
      <label className={`${labelCls} ${def.wide ? "sm:col-span-2" : ""}`}>
        {def.label}
        <textarea
          rows={2}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        />
      </label>
    );
  }
  return (
    <label className={`${labelCls} ${def.wide ? "sm:col-span-2" : ""}`}>
      {def.label}
      <input
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      />
    </label>
  );
}

function ListSection<T extends Record<string, unknown>>({
  title,
  hint,
  items,
  fields,
  blank,
  onChange,
}: {
  title: string;
  hint?: string;
  items: T[];
  fields: FieldDef[];
  blank: T;
  onChange: (items: T[]) => void;
}) {
  return (
    <details className="border-2 border-ink bg-paper">
      <summary className="cursor-pointer select-none px-5 py-4 font-display text-xl font-medium tracking-tight">
        {title}{" "}
        <span className="font-mono text-xs text-muted">({items.length})</span>
        {hint && (
          <span className="mt-1 block font-sans text-sm font-normal text-muted">
            {hint}
          </span>
        )}
      </summary>
      <div>
        {items.map((item, i) => (
          <div
            key={i}
            className="grid gap-3 border-t border-ink/20 p-5 sm:grid-cols-2"
          >
            {fields.map((def) => (
              <Field
                key={def.key}
                def={def}
                value={item[def.key]}
                onChange={(v) => {
                  const next = [...items];
                  next[i] = { ...item, [def.key]: v };
                  onChange(next);
                }}
              />
            ))}
            <div className="flex justify-end sm:col-span-2">
              <button
                type="button"
                onClick={() => onChange(items.filter((_, j) => j !== i))}
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted hover:text-cobalt"
              >
                <Trash2 size={12} /> Remove
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...items, { ...blank }])}
          className="flex w-full items-center justify-center gap-2 border-t border-ink/20 py-3.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted hover:text-cobalt"
        >
          <Plus size={12} /> Add
        </button>
      </div>
    </details>
  );
}

export function AdminEditor({ initial }: { initial: Content }) {
  const [content, setContent] = useState<Content>(initial);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(
    null,
  );
  const [saving, startSaving] = useTransition();

  function save() {
    startSaving(async () => {
      const result = await saveContent(content);
      setMessage({ ok: result.ok, text: result.message });
    });
  }

  const set = <K extends keyof Content>(key: K, value: Content[K]) =>
    setContent((c) => ({ ...c, [key]: value }));

  return (
    <div className="mx-auto max-w-4xl px-5 pb-32 pt-24 md:px-6">
      <div className="flex items-baseline justify-between">
        <h1 className="font-display text-4xl font-medium tracking-tight">
          Content admin
        </h1>
        <button
          type="button"
          onClick={() => logout()}
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted underline underline-offset-4 hover:text-cobalt"
        >
          Sign out
        </button>
      </div>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
        Edits here change the words and pictures on the live site — never the
        design. For member photos, click Upload to pick a file from your
        device, or paste a link to any hosted image.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        <details className="border-2 border-ink bg-paper" open>
          <summary className="cursor-pointer select-none px-5 py-4 font-display text-xl font-medium tracking-tight">
            Site info
          </summary>
          <div className="grid gap-3 border-t border-ink/20 p-5 sm:grid-cols-2">
            {(
              [
                { key: "tagline", label: "Tagline", wide: true },
                { key: "email", label: "Booking email" },
                { key: "instagramHandle", label: "Instagram handle" },
                { key: "instagram", label: "Instagram URL", wide: true },
              ] as FieldDef[]
            ).map((def) => (
              <Field
                key={def.key}
                def={def}
                value={content.site[def.key as keyof Content["site"]]}
                onChange={(v) =>
                  set("site", { ...content.site, [def.key]: String(v) })
                }
              />
            ))}
          </div>
        </details>

        <ListSection
          title="Members"
          hint={`Each member answers: “${memberQuestions.favoriteSong}” and “${memberQuestions.favoriteMemory}”`}
          items={content.members}
          onChange={(v) => set("members", v)}
          blank={{ name: "", instrument: "", favoriteSong: "", favoriteMemory: "", image: "" }}
          fields={[
            { key: "name", label: "Name" },
            { key: "instrument", label: "Instrument" },
            { key: "image", label: "Photo (upload, URL, or /images/…)", kind: "image", wide: true },
            { key: "favoriteSong", label: "Favorite song answer", kind: "textarea", wide: true },
            { key: "favoriteMemory", label: "Favorite memory answer", kind: "textarea", wide: true },
          ]}
        />

        <ListSection
          title="Songs"
          items={content.songs}
          onChange={(v) => set("songs", v)}
          blank={{ title: "", artist: "", genre: "Pop", featured: false, note: "" }}
          fields={[
            { key: "title", label: "Title" },
            { key: "artist", label: "Artist" },
            { key: "genre", label: "Genre", kind: "select", options: genres },
            { key: "featured", label: "Featured (top five)", kind: "checkbox" },
            { key: "note", label: "Note (featured songs only)", kind: "textarea", wide: true },
          ]}
        />

        <ListSection
          title="Videos"
          hint="Paste any YouTube link — leave empty to show the “recording coming soon” frame."
          items={content.videos}
          onChange={(v) => set("videos", v)}
          blank={{ title: "", caption: "", url: "" }}
          fields={[
            { key: "title", label: "Title" },
            { key: "caption", label: "Caption" },
            { key: "url", label: "YouTube link", wide: true },
          ]}
        />

        <ListSection
          title="Timeline (About page)"
          items={content.milestones}
          onChange={(v) => set("milestones", v)}
          blank={{ date: "", title: "", body: "" }}
          fields={[
            { key: "date", label: "Date label" },
            { key: "title", label: "Title" },
            { key: "body", label: "Body", kind: "textarea", wide: true },
          ]}
        />
      </div>

      {/* Sticky save bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-ink bg-paper">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-5 py-3.5 md:px-6">
          <p
            aria-live="polite"
            className={`text-sm ${message ? (message.ok ? "text-ink" : "text-cobalt") : "text-muted"}`}
          >
            {saving ? "Saving…" : (message?.text ?? "Unsaved changes stay in this tab until you save.")}
          </p>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="shrink-0 border border-ink bg-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] text-paper transition-colors hover:border-cobalt hover:bg-cobalt disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save to live site"}
          </button>
        </div>
      </div>
    </div>
  );
}
