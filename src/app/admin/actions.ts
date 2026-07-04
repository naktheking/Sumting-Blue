"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ADMIN_COOKIE,
  createSessionToken,
  isAuthed,
  passwordMatches,
} from "@/lib/auth";
import { getMongoClient, DB_NAME, CONTENT_COLLECTION, CONTENT_DOC_ID } from "@/lib/db";
import { localContent } from "@/lib/content";
import type { Content } from "@/lib/data";

export async function login(formData: FormData) {
  if (!process.env.ADMIN_PASSWORD) redirect("/admin?error=unconfigured");
  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) redirect("/admin?error=wrong");

  const store = await cookies();
  store.set(ADMIN_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 86_400,
    path: "/",
  });
  redirect("/admin");
}

export async function logout() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin");
}

// Whitelist the known sections/fields so arbitrary data can't be injected
// into the document the public site renders from.
function sanitize(input: Content): Content {
  const str = (v: unknown, fallback = "") =>
    typeof v === "string" ? v : fallback;
  const arr = <T,>(v: unknown, map: (item: Record<string, unknown>) => T): T[] =>
    Array.isArray(v) ? v.map((item) => map(item ?? {})) : [];

  return {
    site: {
      name: str(input.site?.name, localContent.site.name),
      tagline: str(input.site?.tagline),
      email: str(input.site?.email),
      instagram: str(input.site?.instagram),
      instagramHandle: str(input.site?.instagramHandle),
    },
    members: arr(input.members, (m) => ({
      name: str(m.name),
      instrument: str(m.instrument),
      favoriteSong: str(m.favoriteSong),
      favoriteMemory: str(m.favoriteMemory),
      image: str(m.image),
    })),
    songs: arr(input.songs, (s) => ({
      title: str(s.title),
      artist: str(s.artist),
      genre: (str(s.genre) || "Pop") as Content["songs"][number]["genre"],
      featured: Boolean(s.featured),
      note: str(s.note),
    })),
    videos: arr(input.videos, (v) => ({
      title: str(v.title),
      caption: str(v.caption),
      url: str(v.url),
    })),
    milestones: arr(input.milestones, (m) => ({
      date: str(m.date),
      title: str(m.title),
      body: str(m.body),
    })),
  };
}

export async function saveContent(
  input: Content,
): Promise<{ ok: boolean; message: string }> {
  if (!(await isAuthed())) {
    return { ok: false, message: "Session expired — refresh and sign in again." };
  }
  const client = getMongoClient();
  if (!client) {
    return {
      ok: false,
      message:
        "MONGODB_URI is not set, so content is being served from the built-in copy and can't be edited here.",
    };
  }

  try {
    const content = sanitize(input);
    await client
      .db(DB_NAME)
      .collection(CONTENT_COLLECTION)
      .replaceOne(
        { _id: CONTENT_DOC_ID as never },
        { _id: CONTENT_DOC_ID, ...content, updatedAt: new Date() },
        { upsert: true },
      );
  } catch (err) {
    console.error("[admin] save failed:", err);
    return { ok: false, message: "Database write failed — try again." };
  }

  // Bust the ISR cache so the live site reflects the edit immediately.
  revalidatePath("/", "layout");
  return { ok: true, message: "Saved — the live site is updated." };
}
