"use client";

import { useEffect, useRef } from "react";
import { embedUrl, type Video } from "@/lib/data";

/** The playing video inside the lightbox, using the best player each host allows. */
export function Player({ video }: { video: Video }) {
  if (video.source === "tiktok") return <TikTokPlayer video={video} />;
  return <Embed video={video} />;
}

function Embed({ video, ref }: { video: Video; ref?: React.Ref<HTMLIFrameElement> }) {
  return (
    <iframe
      ref={ref}
      src={embedUrl(video)}
      title={video.title}
      allow="autoplay; fullscreen"
      allowFullScreen
      className="absolute inset-0 size-full"
    />
  );
}

const TIKTOK_ORIGIN = "https://www.tiktok.com";

/** TikTok starts autoplayed videos muted; turn the sound on once its player is ready. */
function TikTokPlayer({ video }: { video: Video }) {
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== TIKTOK_ORIGIN || e.source !== frame.current?.contentWindow) return;
      if (e.data?.type !== "onPlayerReady") return;
      frame.current?.contentWindow?.postMessage(
        { type: "unMute", "x-tiktok-player": true },
        TIKTOK_ORIGIN,
      );
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return <Embed video={video} ref={frame} />;
}
