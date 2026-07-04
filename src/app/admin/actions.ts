"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import sharp from "sharp";
import {
  ADMIN_COOKIE,
  createSessionToken,
  isAuthed,
  passwordMatches,
} from "@/lib/auth";
import { getMongoClient, DB_NAME, CONTENT_COLLECTION, CONTENT_DOC_ID } from "@/lib/db";
import { localContent } from "@/lib/content";
import type { Content } from "@/lib/data";

const MAX_UPLOAD_BYTES = 15 * 1024 * 1024; // 15MB, ample for phone photos
const MAX_DIM = 1600;

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

export async function uploadPhoto(
  formData: FormData,
): Promise<{ ok: boolean; url?: string; message: string }> {
  if (!(await isAuthed())) {
    return { ok: false, message: "Session expired — refresh and sign in again." };
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return { ok: false, message: "Photo uploads aren't configured on this deployment." };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: "No file received." };
  }
  if (!file.type.startsWith("image/")) {
    return { ok: false, message: "That file isn't an image." };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, message: "Image is too large (max 15MB)." };
  }

  try {
    const input = Buffer.from(await file.arrayBuffer());
    const image = sharp(input, { failOn: "none" }).rotate();
    const meta = await image.metadata();

    let pipeline = image;
    if (meta.width && meta.height && Math.max(meta.width, meta.height) > MAX_DIM) {
      pipeline = pipeline.resize({
        width: meta.width >= meta.height ? MAX_DIM : undefined,
        height: meta.height > meta.width ? MAX_DIM : undefined,
        withoutEnlargement: true,
      });
    }
    const output = await pipeline.jpeg({ quality: 80, mozjpeg: true }).toBuffer();

    const blob = await put(`member-photos/${crypto.randomUUID()}.jpg`, output, {
      access: "public",
      contentType: "image/jpeg",
    });

    return { ok: true, url: blob.url, message: "Uploaded." };
  } catch (err) {
    console.error("[admin] photo upload failed:", err);
    return { ok: false, message: "Upload failed — try again." };
  }
}
