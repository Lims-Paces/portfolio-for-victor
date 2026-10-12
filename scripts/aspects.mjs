// Records what is saved in /public for the videos, so the site can use it:
//   src/lib/aspects.json - each thumbnail's width/height ratio, so every video card and
//                          the player can be drawn in the video's real shape
//   src/lib/hosted.json  - the video files in /public/videos, which play in the
//                          browser's own player instead of an embedded one
// Runs before `npm run dev` and `npm run build`; run `npm run aspects` after adding a
// thumbnail or video file while the dev server is already up.
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";

const dir = new URL("../public/thumbs/", import.meta.url);
const out = new URL("../src/lib/aspects.json", import.meta.url);

/** Width and height from a JPEG's start-of-frame header. */
function jpegSize(buf) {
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) return null;
    const marker = buf[i + 1];
    const isFrameHeader =
      marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    if (isFrameHeader) return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}

const aspects = {};
for (const file of readdirSync(dir).sort()) {
  if (!/\.jpe?g$/i.test(file)) continue;
  const size = jpegSize(readFileSync(new URL(file, dir)));
  if (!size) {
    console.warn(`aspects: could not read the size of ${file}`);
    continue;
  }
  aspects[`/thumbs/${file}`] = Number((size.width / size.height).toFixed(4));
}

writeFileSync(out, JSON.stringify(aspects, null, 2) + "\n");

const videoDir = new URL("../public/videos/", import.meta.url);
const hosted = existsSync(videoDir)
  ? readdirSync(videoDir)
      .filter((file) => /\.mp4$/i.test(file))
      .sort()
      .map((file) => `/videos/${file}`)
  : [];
writeFileSync(new URL("../src/lib/hosted.json", import.meta.url), JSON.stringify(hosted, null, 2) + "\n");

console.log(
  `aspects: recorded ${Object.keys(aspects).length} thumbnails and ${hosted.length} hosted videos`,
);
