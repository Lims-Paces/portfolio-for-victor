import { ArrowUpRight } from "lucide-react";
import { copy, profile, socials } from "@/lib/data";
import { SocialIcon } from "./icons";
import { Reveal } from "./Reveal";

export function Contact({ index }: { index?: string }) {
  return (
    <section id="contact" className="relative overflow-hidden px-5 pt-24 md:px-10 md:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[45%] left-1/2 size-[80vw] -translate-x-1/2 rounded-full bg-flare/15 blur-[150px]"
      />

      <div className="relative mx-auto max-w-[1500px]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-flare">
            {index && <>{index} </>}
            <span className="text-ash">{index && "/ "}Contact</span>
          </p>
          <h2 className="mt-5 font-display text-[clamp(3.25rem,13vw,12rem)] uppercase leading-[0.98]">
            {copy.contact.line1}
            <br />
            <span className="text-outline">{copy.contact.line2}</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-3 rounded-full bg-flare px-7 py-4 font-semibold text-ink transition hover:bg-bone"
          >
            <SocialIcon id="email" className="size-5" />
            Email me
          </a>
          <a
            href={profile.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-bone px-7 py-4 font-semibold text-ink transition hover:bg-flare"
          >
            <SocialIcon id="whatsapp" className="size-5" />
            WhatsApp me
          </a>
        </Reveal>

        <ul className="mt-16 grid border-t border-line sm:grid-cols-2 lg:grid-cols-5">
          {socials.map((social, i) => (
            <li
              key={social.id}
              className="border-b border-line lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0"
            >
              <Reveal delay={i * 0.05}>
                <a
                  href={social.href}
                  target={social.id === "email" ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group flex items-center gap-4 py-6 transition lg:flex-col lg:items-start lg:gap-8 lg:py-8"
                >
                  <SocialIcon id={social.id} className="size-5 text-ash transition group-hover:text-flare" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-ash">
                      {social.label}
                    </span>
                    <span className="mt-1 block truncate font-medium transition group-hover:text-flare">
                      {social.value}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-4 text-ash transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-flare lg:hidden"
                    aria-hidden
                  />
                </a>
              </Reveal>
            </li>
          ))}
        </ul>

        <footer className="flex flex-col gap-3 border-t border-line py-8 font-mono text-[11px] uppercase tracking-[0.2em] text-ash sm:flex-row sm:items-center sm:justify-between lg:border-t">
          <p>© {profile.name}</p>
          <a href="#top" className="transition hover:text-bone">
            Back to top ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
