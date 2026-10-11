"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

// Absolute hashes so the links also work from a category page.
const links = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition duration-300 ${
        scrolled ? "border-line bg-ink/75 backdrop-blur-xl" : "border-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-[1500px] items-center justify-between gap-6 px-5 md:px-10"
      >
        <Link href="/" className="font-display text-xl uppercase tracking-wide">
          {profile.firstName}
          <span className="text-flare">.</span>
        </Link>

        <ul className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.2em] text-ash md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition hover:text-bone">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Every page ends with the contact section, so this stays a same-page jump. */}
        <a
          href="#contact"
          className="rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition hover:border-flare hover:bg-flare hover:text-ink"
        >
          Get in touch
        </a>
      </nav>
    </header>
  );
}
