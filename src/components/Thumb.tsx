"use client";

import { useState } from "react";
import { categories, driveThumbUrl, type Video } from "@/lib/data";

/**
 * A video's still. Uses the local poster, then the Drive thumbnail when the file is
 * public, and otherwise a typographic title card so private videos still look designed.
 */
export function Thumb({ video, isPublic }: { video: Video; isPublic: boolean }) {
  const [failed, setFailed] = useState(false);
  const src = video.poster ?? (isPublic ? driveThumbUrl(video.driveId) : null);

  if (!src || failed) return <TitleCard video={video} />;

  // Portrait frames match their footage, so the still can fill them. Landscape frames
  // may hold footage of any shape, so the still is fitted over a blurred copy of itself.
  if (video.orientation === "portrait") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        loading="lazy"
        onError={() => setFailed(true)}
        className="absolute inset-0 size-full object-cover"
      />
    );
  }

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
  const category = categories.find((c) => c.id === video.category)!;
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
