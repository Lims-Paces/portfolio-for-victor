"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import { copy, driveEmbedUrl, spotlightCategory, videos } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { Thumb } from "./Thumb";

const episodes = videos.filter((v) => v.category === spotlightCategory);

export function Spotlight({ publicIds }: { publicIds: string[] }) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const video = episodes[current];

  return (
    <section id="series" className="px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1500px]">
        <SectionHeading index="01" {...copy.spotlight} />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto aspect-[9/16] w-full max-w-[380px] overflow-hidden rounded-xl border border-line bg-black shadow-[0_40px_120px_-30px] shadow-flare/25">
              {playing ? (
                <iframe
                  key={video.driveId}
                  src={driveEmbedUrl(video.driveId)}
                  title={video.title}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  className="absolute inset-0 size-full"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label={`Play ${video.title}`}
                  className="group absolute inset-0"
                >
                  <Thumb key={video.driveId} video={video} isPublic={publicIds.includes(video.driveId)} />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
                  <span className="absolute left-4 top-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/85">
                    <span className="size-1.5 rounded-full bg-flare" />
                    Now showing
                  </span>
                  <span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-flare text-ink transition duration-500 group-hover:scale-110">
                    <Play className="size-7 translate-x-0.5 fill-current" aria-hidden />
                  </span>
                  <span className="absolute inset-x-4 bottom-4 text-left font-display text-3xl uppercase leading-none">
                    {video.title}
                  </span>
                </button>
              )}
            </div>
          </Reveal>

          <ol className="lg:col-span-7">
            {episodes.map((episode, i) => {
              const active = i === current;
              return (
                <Reveal key={episode.driveId} delay={i * 0.06}>
                  <li className="border-b border-line first:border-t">
                    <button
                      type="button"
                      onClick={() => setCurrent(i)}
                      aria-current={active}
                      className="group flex w-full items-center gap-5 py-5 text-left md:gap-8 md:py-7"
                    >
                      <span
                        className={`font-mono text-xs tabular-nums tracking-[0.2em] transition ${
                          active ? "text-flare" : "text-ash"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`flex-1 font-display text-[clamp(2rem,6vw,4.25rem)] uppercase leading-none transition duration-300 group-hover:translate-x-2 ${
                          active ? "text-bone" : "text-bone/35 group-hover:text-bone/80"
                        }`}
                      >
                        {episode.title}
                      </span>
                      <span
                        className={`relative hidden aspect-[9/16] w-12 shrink-0 overflow-hidden rounded-sm border transition sm:block ${
                          active ? "border-flare" : "border-line opacity-60 group-hover:opacity-100"
                        }`}
                      >
                        <Thumb video={episode} isPublic={publicIds.includes(episode.driveId)} />
                      </span>
                    </button>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
