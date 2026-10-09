"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";
import {
  categories,
  copy,
  spotlightCategory,
  videos,
  type CategoryId,
  type Video,
} from "@/lib/data";
import { Lightbox } from "./Lightbox";
import { SectionHeading } from "./SectionHeading";
import { Thumb } from "./Thumb";

// The spotlight series already has its own section above, so it goes last here.
const ordered = [
  ...categories.filter((c) => c.id !== spotlightCategory),
  ...categories.filter((c) => c.id === spotlightCategory),
];
const groups = ordered.map((category) => ({
  category,
  items: videos.filter((v) => v.category === category.id),
}));

const workOrder = groups.flatMap((g) => g.items);

type Filter = CategoryId | "all";

export function Work({ publicIds }: { publicIds: string[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<number | null>(null);

  const visible = groups.filter((g) => filter === "all" || g.category.id === filter);
  const playlist = visible.flatMap((g) => g.items);

  const tabs: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All", count: videos.length },
    ...groups.map((g) => ({ id: g.category.id, label: g.category.label, count: g.items.length })),
  ];

  return (
    <section id="work" className="px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1500px]">
        <SectionHeading index="02" {...copy.work} />

        <div
          role="tablist"
          aria-label="Filter work by category"
          className="no-scrollbar -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0"
        >
          {tabs.map((tab) => {
            const active = tab.id === filter;
            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setFilter(tab.id)}
                className={`shrink-0 rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition ${
                  active
                    ? "border-flare bg-flare text-ink"
                    : "border-line text-ash hover:border-bone/40 hover:text-bone"
                }`}
              >
                {tab.label}
                <span className={`ml-2 tabular-nums ${active ? "text-ink/60" : "text-ash/60"}`}>
                  {String(tab.count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>

        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 space-y-16"
        >
          {visible.map(({ category, items }) => (
            <div key={category.id}>
              <h3 className="mb-6 font-display text-2xl uppercase tracking-wide md:text-3xl">
                {category.label}
              </h3>
              <ul
                className={
                  items[0].orientation === "portrait"
                    ? "grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
                    : "grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
                }
              >
                {items.map((video) => (
                  <li key={video.driveId}>
                    <VideoCard
                      video={video}
                      isPublic={publicIds.includes(video.driveId)}
                      onOpen={() => setOpen(playlist.indexOf(video))}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <Lightbox
            videos={playlist}
            publicIds={publicIds}
            index={open}
            onNavigate={setOpen}
            onClose={() => setOpen(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function VideoCard({
  video,
  isPublic,
  onOpen,
}: {
  video: Video;
  isPublic: boolean;
  onOpen: () => void;
}) {
  const number = String(workOrder.indexOf(video) + 1).padStart(2, "0");
  return (
    <button type="button" onClick={onOpen} className="group block w-full text-left">
      <div
        className={`relative overflow-hidden rounded-md border border-line bg-panel transition duration-500 group-hover:border-flare/70 ${
          video.orientation === "portrait" ? "aspect-[9/16]" : "aspect-video"
        }`}
      >
        <div className="absolute inset-0 transition duration-700 ease-out group-hover:scale-[1.04]">
          <Thumb video={video} isPublic={isPublic} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        <span className="absolute left-3 top-3 rounded-sm bg-ink/70 px-1.5 py-0.5 font-mono text-[10px] tracking-[0.18em] text-bone/80 backdrop-blur-sm">
          {number}
        </span>
        <span className="absolute bottom-3 right-3 grid size-11 place-items-center rounded-full bg-bone text-ink transition duration-500 group-hover:scale-110 group-hover:bg-flare">
          <Play className="size-4 translate-x-px fill-current" aria-hidden />
        </span>
      </div>
      <p className="mt-3 text-[15px] font-medium leading-snug text-bone transition group-hover:text-flare">
        {video.title}
      </p>
    </button>
  );
}
