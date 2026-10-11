import { copy } from "@/lib/data";
import { CategoryGrid } from "./CategoryGrid";
import { SectionHeading } from "./SectionHeading";

export function Work({ playableIds }: { playableIds: string[] }) {
  return (
    <section id="work" className="px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1500px]">
        <SectionHeading index="01" {...copy.work} />
        <div className="mt-12">
          <CategoryGrid playableIds={playableIds} />
        </div>
      </div>
    </section>
  );
}
