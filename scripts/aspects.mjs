// Records each saved thumbnail's width/height ratio in src/lib/aspects.json, so every
// video card and the player can be drawn in the video's real shape. Runs before
// `npm run dev` and `npm run build`; run `npm run aspects` after adding a thumbnail
// while the dev server is already up.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";

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
console.log(`aspects: recorded ${Object.keys(aspects).length} thumbnails`);
