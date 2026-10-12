import aspects from "./aspects.json";
import type { Video } from "./data";

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
