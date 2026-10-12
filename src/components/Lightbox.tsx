"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { aspectOf } from "@/lib/aspect";
import { categories, hostName, watchUrl, type Video } from "@/lib/data";
import { Player } from "./Player";

export function Lightbox({
  videos,
  playableIds,
  index,
  onNavigate,
  onClose,
}: {
  videos: Video[];
  playableIds: string[];
  index: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
}) {
  const video = videos[index];
  const category = categories.find((c) => c.slug === video.category)!;
  const closeRef = useRef<HTMLButtonElement>(null);
  const many = videos.length > 1;

  const step = (by: number) => onNavigate((index + by + videos.length) % videos.length);

  // Opening the player adds a history entry, so the browser or phone back button closes
  // it (and stops the video) instead of leaving the page with it still playing.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });
  useEffect(() => {
    if (!window.history.state?.lightbox) {
      window.history.pushState({ ...window.history.state, lightbox: true }, "");
    }
    const onPop = () => onCloseRef.current();
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Every way of closing goes back through that history entry, so none is left behind.
  const dismiss = () => window.history.back();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") window.history.back();
      if (e.key === "ArrowRight") onNavigate((index + 1) % videos.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + videos.length) % videos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, videos.length, onNavigate]);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);

  // As large as the screen allows while keeping the video's own shape.
  const aspect = aspectOf(video);
  const width = `min(92vw, 1120px, calc(72dvh * ${aspect}))`;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink/92 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={dismiss}
    >
      <motion.div
        className="flex max-w-full flex-col gap-4"
        style={{ width }}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-flare">
              {video.client ?? category.label}
            </p>
            <h3 className="mt-1 line-clamp-2 font-display text-2xl uppercase leading-tight md:text-3xl">
              {video.title}
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={dismiss}
            aria-label="Close player"
            className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-bone transition hover:border-flare hover:text-flare"
          >
            <X className="size-5" />
          </button>
        </div>

        <div
          className="relative w-full overflow-hidden rounded-md border border-line bg-black"
          style={{ aspectRatio: aspect }}
        >
          {playableIds.includes(video.id) ? (
            <Player key={video.id} video={video} />
          ) : (
            // Drive only embeds files shared as "Anyone with the link"; a private one
            // would load as a blank frame, so say so and offer the direct link instead.
            <div className="absolute inset-0 grid place-items-center bg-panel p-6 text-center">
              <div>
                <p className="font-display text-2xl uppercase md:text-3xl">Preview coming soon</p>
                <p className="mx-auto mt-3 max-w-sm text-sm text-ash">
                  This video can&rsquo;t be played here yet. You can try opening it in {hostName(video)}.
                </p>
                <a
                  href={watchUrl(video)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-flare px-5 py-3 text-sm font-semibold text-ink transition hover:bg-bone"
                >
                  Open in {hostName(video)} <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
          {many ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous video"
                className="grid size-9 place-items-center rounded-full border border-line text-bone transition hover:border-flare hover:text-flare"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next video"
                className="grid size-9 place-items-center rounded-full border border-line text-bone transition hover:border-flare hover:text-flare"
              >
                <ChevronRight className="size-4" />
              </button>
              <span className="ml-2 whitespace-nowrap tabular-nums">
                {String(index + 1).padStart(2, "0")} / {String(videos.length).padStart(2, "0")}
              </span>
            </div>
          ) : (
            <span />
          )}
          <a
            href={watchUrl(video)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-bone transition hover:text-flare"
          >
            <span className="sm:hidden">Open original</span>
            <span className="hidden sm:inline">Watch on {hostName(video)}</span>
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
