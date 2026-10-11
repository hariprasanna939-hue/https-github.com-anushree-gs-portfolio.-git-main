// Counts frame_0001.webp, frame_0002.webp ... inside public/hero-frames
// and writes manifest.json so the site knows how many frames to load.
import { readdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'hero-frames');
const frames = readdirSync(dir).filter((f) => /^frame_\d{4}\.webp$/.test(f));

if (frames.length < 2) {
  console.error('No frames found in public/hero-frames (expected frame_0001.webp, frame_0002.webp ...)');
  process.exit(1);
}

writeFileSync(join(dir, 'manifest.json'), JSON.stringify({ count: frames.length }));
console.log(`manifest.json written -> ${frames.length} frames`);
