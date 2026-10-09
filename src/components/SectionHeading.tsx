import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  label,
  title,
  blurb,
}: {
  index: string;
  label: string;
  title: string;
  blurb?: string;
}) {
  return (
    <Reveal className="flex flex-col gap-5 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-flare">
          {index} <span className="text-ash">/ {label}</span>
        </p>
        <h2 className="mt-4 font-display text-[clamp(2.75rem,9vw,6.5rem)] uppercase leading-[0.92]">
          {title}
        </h2>
      </div>
      {blurb && <p className="max-w-xs text-pretty text-ash md:text-right">{blurb}</p>}
    </Reveal>
  );
}
