/**
 * Push the local content (src/lib/data.ts) into MongoDB.
 *
 * Usage:
 *   MONGODB_URI="mongodb+srv://..." npm run db:seed
 * or put MONGODB_URI in .env.local and just run: npm run db:seed
 */
import { readFileSync, existsSync } from "node:fs";
import { MongoClient } from "mongodb";
import { localContent } from "../src/lib/content";
import { DB_NAME, CONTENT_COLLECTION, CONTENT_DOC_ID } from "../src/lib/db";

// Minimal .env.local loader so the script works without extra deps.
if (!process.env.MONGODB_URI && existsSync(".env.local")) {
  for (const line of readFileSync(".env.local", "utf8").split("\n")) {
    const match = line.match(/^MONGODB_URI\s*=\s*"?([^"\n]+)"?\s*$/);
    if (match) process.env.MONGODB_URI = match[1];
  }
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set (env var or .env.local). Aborting.");
    process.exit(1);
  }

  const client = new MongoClient(uri);
  try {
    const result = await client
      .db(DB_NAME)
      .collection(CONTENT_COLLECTION)
      .replaceOne(
        { _id: CONTENT_DOC_ID as never },
        { _id: CONTENT_DOC_ID, ...localContent, updatedAt: new Date() },
        { upsert: true },
      );
    console.log(
      `Seeded ${DB_NAME}.${CONTENT_COLLECTION} (doc "${CONTENT_DOC_ID}") — ` +
        `${result.upsertedCount ? "created" : "replaced"} with ` +
        `${localContent.members.length} members, ${localContent.songs.length} songs, ` +
        `${localContent.videos.length} videos, ${localContent.milestones.length} milestones.`,
    );
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
