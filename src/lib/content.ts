import { cache } from "react";
import { site, members, songs, videos, milestones, type Content } from "@/lib/data";
import { getMongoClient, DB_NAME, CONTENT_COLLECTION, CONTENT_DOC_ID } from "@/lib/db";

export type { Content };

// The local copy, bundled with the site. Used as the fallback whenever
// MongoDB is not configured, unreachable, or missing a section — and as
// the baseline for the load-time diff below.
export const localContent: Content = { site, members, songs, videos, milestones };

const sections = ["site", "members", "songs", "videos", "milestones"] as const;

function diffAgainstLocal(remote: Content) {
  const differing = sections.filter(
    (key) => JSON.stringify(remote[key]) !== JSON.stringify(localContent[key]),
  );
  if (differing.length === 0) {
    console.info("[content] MongoDB matches the local data.ts copy.");
  } else {
    console.warn(
      `[content] MongoDB differs from local data.ts in: ${differing.join(", ")}. ` +
        "Serving the MongoDB version. Run `npm run db:seed` if you want to " +
        "overwrite the database with the local copy instead.",
    );
  }
}

// Fetch content from MongoDB, falling back to the local copy per-section.
// Wrapped in React cache() so one page render hits the DB at most once.
export const getContent = cache(async (): Promise<Content> => {
  const client = getMongoClient();
  if (!client) return localContent;

  try {
    const doc = await client
      .db(DB_NAME)
      .collection(CONTENT_COLLECTION)
      .findOne({ _id: CONTENT_DOC_ID as never });

    if (!doc) {
      console.warn(
        "[content] MONGODB_URI is set but no content document was found. " +
          "Serving local data.ts. Run `npm run db:seed` to populate the database.",
      );
      return localContent;
    }

    const remote: Content = {
      site: doc.site ?? localContent.site,
      members: doc.members ?? localContent.members,
      songs: doc.songs ?? localContent.songs,
      videos: doc.videos ?? localContent.videos,
      milestones: doc.milestones ?? localContent.milestones,
    };
    diffAgainstLocal(remote);
    return remote;
  } catch (err) {
    console.error("[content] MongoDB unreachable, serving local data.ts:", err);
    return localContent;
  }
});
