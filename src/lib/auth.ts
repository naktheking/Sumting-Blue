import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "sb_admin";
const SESSION_DAYS = 7;

function secret() {
  return process.env.ADMIN_PASSWORD ?? "";
}

function sign(payload: string) {
  return createHmac("sha256", `sumtingblue:${secret()}`)
    .update(payload)
    .digest("hex");
}

export function passwordMatches(input: string) {
  if (!secret()) return false;
  // Compare HMACs so lengths always match and timing leaks nothing.
  return timingSafeEqual(Buffer.from(sign(input)), Buffer.from(sign(secret())));
}

export function createSessionToken() {
  const expires = String(Date.now() + SESSION_DAYS * 86_400_000);
  return `${expires}.${sign(expires)}`;
}

export function verifySessionToken(token: string | undefined) {
  if (!token || !secret()) return false;
  const [expires, sig] = token.split(".");
  if (!expires || !sig || Number(expires) < Date.now()) return false;
  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(sign(expires)));
  } catch {
    return false;
  }
}

export async function isAuthed() {
  const store = await cookies();
  return verifySessionToken(store.get(ADMIN_COOKIE)?.value);
}
