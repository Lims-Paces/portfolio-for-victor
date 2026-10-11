import { cacheLife } from "next/cache";
import { driveThumbUrl, videos } from "./data";

async function isSharedPublicly(driveId: string) {
  try {
    const res = await fetch(driveThumbUrl(driveId, 64), {
      signal: AbortSignal.timeout(8000),
    });
    // Private files answer 200 with a sign-in page, so the status alone isn't enough.
    return res.ok && (res.headers.get("content-type") ?? "").startsWith("image/");
  } catch {
    return false;
  }
}

/**
 * Ids of the videos that can be played in the page. YouTube and TikTok ones always can.
 * A Drive video can once it is shared as "Anyone with the link": one with a saved poster
 * was checked when it was added, and the rest are checked here every few minutes, so
 * they start playing on their own after their sharing is fixed.
 */
export async function getPlayableIds(): Promise<string[]> {
  "use cache";
  cacheLife("minutes");

  const checks = await Promise.all(
    videos.map(async (v) =>
      v.source !== "drive" || v.poster || (await isSharedPublicly(v.id)) ? v.id : null,
    ),
  );
  return checks.filter((id): id is string => id !== null);
}
