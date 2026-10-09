import { MotionConfig } from "framer-motion";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Spotlight } from "@/components/Spotlight";
import { Work } from "@/components/Work";
import { getPublicDriveIds } from "@/lib/drive";

export default async function Home() {
  const publicIds = await getPublicDriveIds();

  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <Spotlight publicIds={publicIds} />
        <Work publicIds={publicIds} />
        <About />
        <Contact />
      </main>
    </MotionConfig>
  );
}
