import { cacheLife } from "next/cache";
import { driveThumbUrl, videos } from "./data";

async function hasPublicThumbnail(driveId: string) {
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
 * Ids of the Drive videos that are shared publicly. Re-checked hourly, so a video
 * picks up its thumbnail on its own once its sharing is set to "Anyone with the link".
 */
export async function getPublicDriveIds(): Promise<string[]> {
  "use cache";
  cacheLife("hours");

  const checks = await Promise.all(
    videos.map(async (v) => ((await hasPublicThumbnail(v.driveId)) ? v.driveId : null)),
  );
  return checks.filter((id): id is string => id !== null);
}
