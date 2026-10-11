import { MotionConfig } from "framer-motion";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Work } from "@/components/Work";
import { getPlayableIds } from "@/lib/drive";

export default async function Home() {
  const playableIds = await getPlayableIds();

  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <Work playableIds={playableIds} />
        <About />
        <Contact index="03" />
      </main>
    </MotionConfig>
  );
}
