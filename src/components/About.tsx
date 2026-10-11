import { copy } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="about" className="border-y border-line bg-panel px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1500px]">
        <SectionHeading index="02" label={copy.about.label} title={copy.about.title} />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className="text-pretty text-[clamp(1.6rem,3.4vw,2.9rem)] font-medium leading-[1.18] tracking-tight">
              {copy.about.lead}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-bone/70 lg:col-span-5">
            {copy.about.body.map((paragraph) => (
              <p key={paragraph} className="text-pretty">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
