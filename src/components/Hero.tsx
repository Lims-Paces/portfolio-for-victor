"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { copy, profile, tools } from "@/lib/data";
import { Timecode } from "./Timecode";

const ease = [0.22, 1, 0.36, 1] as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

// Where each tool's clip sits on the two timeline tracks (desktop only).
const clips = [
  "md:col-span-4 md:col-start-1 md:row-start-1",
  "md:col-span-3 md:col-start-6 md:row-start-1",
  "md:col-span-4 md:col-start-3 md:row-start-2",
  "md:col-span-2 md:col-start-8 md:row-start-2",
  "col-span-2 md:col-span-3 md:col-start-10 md:row-start-1",
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pt-28 md:px-10 md:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[20%] -top-[30%] size-[70vw] rounded-full bg-flare/20 blur-[140px]"
      />

      <div className="relative mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
        <div className="lg:col-span-7 lg:pb-6">
          <motion.p
            {...rise(0)}
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ash"
          >
            <span className="size-2 animate-blink rounded-full bg-flare" />
            {profile.role}
          </motion.p>

          <h1 className="mt-6 font-display text-[clamp(4rem,21vw,10rem)] uppercase leading-[0.98] lg:text-[clamp(6rem,11.6vw,13.5rem)]">
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease }}
              >
                {profile.firstName}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span
                className="text-outline block"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease }}
              >
                {profile.lastName}
              </motion.span>
            </span>
          </h1>

          <motion.p
            {...rise(0.35)}
            className="mt-8 max-w-xl text-pretty text-2xl font-medium leading-snug tracking-tight md:text-3xl"
          >
            {copy.hero.statement}
          </motion.p>
          <motion.p {...rise(0.4)} className="mt-4 max-w-lg text-pretty leading-relaxed text-ash">
            {copy.hero.sub}
          </motion.p>

          <motion.div {...rise(0.45)} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-flare px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-bone"
            >
              Watch my work
              <ArrowDown className="size-4 transition group-hover:translate-y-0.5" aria-hidden />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-semibold transition hover:border-bone"
            >
              Get in touch
              <ArrowUpRight
                className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
          </motion.div>
        </div>

        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease }}
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-md bg-panel">
            <Image
              src="/victor.jpg"
              alt={`Portrait of ${profile.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-[50%_18%] contrast-[1.05] saturate-[0.85]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/35" />

            {/* Viewfinder overlay */}
            <div aria-hidden className="absolute inset-4 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/90">
              <span className="absolute left-0 top-0 size-5 border-l border-t border-bone/70" />
              <span className="absolute right-0 top-0 size-5 border-r border-t border-bone/70" />
              <span className="absolute bottom-0 left-0 size-5 border-b border-l border-bone/70" />
              <span className="absolute bottom-0 right-0 size-5 border-b border-r border-bone/70" />
              <span className="absolute left-4 top-3 flex items-center gap-2">
                <span className="size-2 animate-blink rounded-full bg-red-500" />
                Rec
              </span>
              <Timecode className="absolute right-4 top-3" />
              <span className="absolute bottom-3 left-4">@{profile.handle}</span>
              <span className="absolute bottom-3 right-4">24 fps</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* The tools, laid out as clips on an editing timeline. */}
      <div className="relative mx-auto mt-14 max-w-[1500px] pb-10 md:mt-20 md:pb-14">
        <div aria-hidden className="ticks h-6 border-b border-line" />
        <div
          aria-hidden
          className="absolute bottom-12 left-[41.5%] top-0 hidden w-px bg-flare md:block"
        >
          <span className="absolute -left-[5px] top-0 size-0 border-x-[5.5px] border-t-[8px] border-x-transparent border-t-flare" />
        </div>
        <ul aria-label="Tools I use" className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-12">
          {tools.map((tool, i) => (
            <motion.li
              key={tool}
              {...rise(0.55 + i * 0.07)}
              className={`flex h-12 items-center gap-3 rounded-sm border border-line bg-panel-2 px-3 font-mono text-[11px] uppercase tracking-[0.14em] ${clips[i]}`}
            >
              <span className="h-5 w-0.5 shrink-0 bg-flare" />
              <span className="truncate">{tool}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
