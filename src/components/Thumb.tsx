"use client";

import { useState } from "react";
import { categories, thumbUrl, type Video } from "@/lib/data";

/**
 * A video's still, or a typographic title card when it has none yet, so videos that
 * aren't shared publicly still look designed.
 */
export function Thumb({ video, playable }: { video: Video; playable: boolean }) {
  const [failed, setFailed] = useState(false);
  const src = thumbUrl(video, playable);

  if (!src || failed) return <TitleCard video={video} />;

  // Stills come in many shapes (16:9, 9:16, 4:5...), so each is fitted whole over a
  // blurred copy of itself rather than cropped to the frame.
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 size-full scale-125 object-cover opacity-50 blur-2xl"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        loading="lazy"
        onError={() => setFailed(true)}
        className="absolute inset-0 size-full object-contain"
      />
    </>
  );
}

function TitleCard({ video }: { video: Video }) {
  const category = categories.find((c) => c.slug === video.category)!;
  return (
    <div
      className="@container absolute inset-0 flex items-end overflow-hidden"
      style={{
        background: `radial-gradient(120% 90% at 85% 0%, hsl(${category.hue} 75% 30% / 0.9), transparent 62%), linear-gradient(160deg, hsl(${category.hue} 35% 13%), #0c0c0e 78%)`,
      }}
    >
      <div className="scanlines absolute inset-0" />
      <p className="relative w-full p-[6cqw] pr-[20cqw] font-display text-[clamp(1.5rem,11cqw,4rem)] uppercase leading-[0.95] text-balance text-bone/95">
        {video.title}
      </p>
    </div>
  );
}
