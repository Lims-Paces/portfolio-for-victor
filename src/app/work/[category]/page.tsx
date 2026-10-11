import { MotionConfig } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CategoryGrid } from "@/components/CategoryGrid";
import { Contact } from "@/components/Contact";
import { Nav } from "@/components/Nav";
import { VideoGallery } from "@/components/VideoGallery";
import { categories, profile, videosIn } from "@/lib/data";
import { getPlayableIds } from "@/lib/drive";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[category]">): Promise<Metadata> {
  const { category: slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};
  const title = `${category.label} — ${profile.name}`;
  const description = `${category.label} videos edited by ${profile.name}.`;
  return { title, description, openGraph: { title, description } };
}

type Params = PageProps<"/work/[category]">["params"];

// The page shell (top bar, contact) renders straight away; the part that depends on
// which category was asked for streams in behind a Suspense boundary.
export default function CategoryPage({ params }: PageProps<"/work/[category]">) {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Suspense fallback={<div className="min-h-dvh" />}>
          <CategoryContent params={params} />
        </Suspense>
        <Contact />
      </main>
    </MotionConfig>
  );
}

async function CategoryContent({ params }: { params: Params }) {
  const { category: slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const items = videosIn(category.slug);
  const clients = [...new Set(items.flatMap((v) => (v.client ? [v.client] : [])))];
  const playableIds = await getPlayableIds();

  return (
    <>
      <section className="px-5 pb-24 pt-28 md:px-10 md:pb-32 md:pt-36">
        <div className="mx-auto max-w-[1500px]">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ash transition hover:text-bone"
          >
            <ArrowLeft className="size-3.5" aria-hidden /> All work
          </Link>

          <div className="mt-8 flex flex-col gap-4 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
            <h1 className="font-display text-[clamp(3rem,11vw,9rem)] uppercase leading-[0.92]">
              {category.label}
            </h1>
            <p className="text-ash md:pb-3 md:text-right">
              {items.length} {items.length === 1 ? "video" : "videos"}
              {clients.length > 0 && (
                <>
                  <br />
                  Edited for {clients.join(", ")}
                </>
              )}
            </p>
          </div>

          <div className="mt-12">
            <VideoGallery videos={items} playableIds={playableIds} />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-panel px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1500px]">
          <h2 className="mb-8 font-display text-3xl uppercase md:text-4xl">More work</h2>
          <CategoryGrid playableIds={playableIds} exclude={category.slug} />
        </div>
      </section>
    </>
  );
}
