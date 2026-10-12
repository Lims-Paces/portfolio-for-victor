import aspects from "./aspects.json";
import type { Video } from "./data";
import hosted from "./hosted.json";

const recorded: Record<string, number> = aspects;

/**
 * A video's width / height. Taken from its saved thumbnail when there is one; YouTube
 * is always 16:9; anything else falls back on whether it is marked portrait.
 */
export function aspectOf(video: Video): number {
  if (video.poster && recorded[video.poster]) return recorded[video.poster];
  if (video.source === "youtube") return 16 / 9;
  return video.orientation === "portrait" ? 9 / 16 : 16 / 9;
}

/**
 * The video's own file on this site, if one is saved. A file is matched to its video by
 * name: the thumbnail /thumbs/dubai-ld.jpg goes with /videos/dubai-ld.mp4.
 */
export function hostedFile(video: Video): string | null {
  const file = video.poster?.replace(/^\/thumbs\/(.+)\.jpe?g$/i, "/videos/$1.mp4");
  return file && (hosted as string[]).includes(file) ? file : null;
}
