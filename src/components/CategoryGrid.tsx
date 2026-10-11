import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { categories, thumbUrl, videosIn, type Category } from "@/lib/data";
import { Reveal } from "./Reveal";

/** One equal-sized card per category, each linking to that category's page. */
export function CategoryGrid({
  playableIds,
  exclude,
}: {
  playableIds: string[];
  exclude?: string;
}) {
  const shown = categories.filter((c) => c.slug !== exclude);
  // Three across when that fills every row (e.g. 9 cards), otherwise four.
  const columns = shown.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <ul className={`grid grid-cols-2 gap-3 sm:gap-5 ${columns}`}>
      {shown.map((category, i) => (
        <li key={category.slug}>
          <Reveal delay={(i % 4) * 0.05}>
            <CategoryCard category={category} playableIds={playableIds} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

function CategoryCard({ category, playableIds }: { category: Category; playableIds: string[] }) {
  const items = videosIn(category.slug);
  const cover = items
    .map((v) => thumbUrl(v, playableIds.includes(v.id)))
    .find((src) => src !== null);

  return (
    <Link
      href={`/work/${category.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-md border border-line bg-panel transition duration-500 hover:border-flare/70"
      style={{
        background: `radial-gradient(120% 90% at 85% 0%, hsl(${category.hue} 75% 30% / 0.9), transparent 62%), linear-gradient(160deg, hsl(${category.hue} 35% 13%), #0c0c0e 78%)`,
      }}
    >
      {cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cover}
          alt=""
          loading="lazy"
          className="absolute inset-0 size-full object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
        />
      ) : (
        <div className="scanlines absolute inset-0" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10" />

      <span className="absolute left-3 top-3 rounded-sm sm:left-4 sm:top-4 bg-ink/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/85 backdrop-blur-sm">
        {String(items.length).padStart(2, "0")} {items.length === 1 ? "video" : "videos"}
      </span>
      <span className="absolute right-3 top-3 hidden size-10 place-items-center sm:right-4 sm:top-4 sm:grid rounded-full bg-bone text-ink transition duration-500 group-hover:bg-flare">
        <ArrowUpRight className="size-4" aria-hidden />
      </span>
      <h3 className="absolute inset-x-3 bottom-3 font-display text-2xl uppercase sm:inset-x-4 sm:bottom-4 sm:text-4xl lg:text-[clamp(1.9rem,2.6vw,2.6rem)] leading-[0.95] text-balance">
        {category.label}
      </h3>
    </Link>
  );
}
