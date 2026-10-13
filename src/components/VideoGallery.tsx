"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";
import { aspectOf } from "@/lib/aspect";
import type { Video } from "@/lib/data";
import { Lightbox } from "./Lightbox";
import { Thumb } from "./Thumb";

/**
 * A category's videos and the player. Videos made with AI and videos made without it
 * are shown as two groups; whichever kind is listed first in the data comes first.
 */
export function VideoGallery({
  videos,
  playableIds,
}: {
  videos: Video[];
  playableIds: string[];
}) {
  const [open, setOpen] = useState<number | null>(null);

  const withAi = videos.filter((v) => v.ai);
  const withoutAi = videos.filter((v) => !v.ai);
  const groups = [
    { label: "Made with AI", items: withAi },
    { label: "Video edits", items: withoutAi },
  ].filter((g) => g.items.length > 0);
  if (videos[0] && !videos[0].ai) groups.reverse();

  // The player steps through the videos in the order they appear on the page.
  const playlist = groups.flatMap((g) => g.items);

  // Every card in a category is the same shape, whichever suits most of its videos; a
  // video of another shape is fitted inside. The player is what follows the real shape.
  const portrait = videos.filter((v) => aspectOf(v) < 1).length > videos.length / 2;

  return (
    <>
      <div className="space-y-16 md:space-y-20">
        {groups.map((group) => (
          <section key={group.label} aria-label={group.label}>
            <div className="mb-6 flex items-baseline gap-3">
              <h2 className="font-display text-2xl uppercase tracking-wide md:text-3xl">
                {group.label}
              </h2>
              <span className="font-mono text-xs tabular-nums text-ash">
                {String(group.items.length).padStart(2, "0")}
              </span>
            </div>
            <ul
              className={
                portrait
                  ? "grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6 md:gap-y-10"
                  : "grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
              }
            >
              {group.items.map((video, i) => (
                <motion.li
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(i, 8) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(playlist.indexOf(video))}
                    className="group block w-full text-left"
                  >
                    <div
                      className={`relative overflow-hidden rounded-md border border-line bg-panel transition duration-500 group-hover:border-flare/70 ${
                        portrait ? "aspect-[9/16]" : "aspect-video"
                      }`}
                    >
                      <div className="absolute inset-0 transition duration-700 ease-out group-hover:scale-[1.04]">
                        <Thumb video={video} playable={playableIds.includes(video.id)} />
                      </div>
                      <span className="absolute left-3 top-3 rounded-sm bg-ink/70 px-1.5 py-0.5 font-mono text-[10px] tracking-[0.18em] text-bone/80 backdrop-blur-sm">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="absolute bottom-3 right-3 grid size-11 place-items-center rounded-full bg-bone text-ink transition duration-500 group-hover:scale-110 group-hover:bg-flare">
                        <Play className="size-4 translate-x-px fill-current" aria-hidden />
                      </span>
                    </div>
                    <p className="mt-3 text-[15px] font-medium leading-snug text-bone transition group-hover:text-flare">
                      {video.title}
                    </p>
                    {video.client && <p className="mt-0.5 text-sm text-ash">{video.client}</p>}
                  </button>
                </motion.li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <Lightbox
            videos={playlist}
            playableIds={playableIds}
            index={open}
            onNavigate={setOpen}
            onClose={() => setOpen(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
