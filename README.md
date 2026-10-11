# Anushree G S — Portfolio

Premium, cinematic portfolio built with **React + TypeScript + Vite + Tailwind CSS**,
**GSAP ScrollTrigger + Lenis** (smooth scroll + 360° scroll hero), **Framer Motion** (micro-interactions)
and **Lucide** icons.

---

## 1. Run it in VS Code

1. Install **Node.js 18 or newer** → https://nodejs.org (choose LTS).
2. Unzip the project and open the folder in **VS Code** (`File → Open Folder`).
3. Open the terminal in VS Code (`Ctrl + ~`) and run:

```bash
npm install
npm run dev
```

4. Open the link shown in the terminal (usually http://localhost:5173).

Other commands:

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the site locally |
| `npm run build` | Create the production build (checks TypeScript too) |
| `npm run preview` | Preview the production build locally |
| `npm run frames:manifest` | Register the 360° hero frames (see step 3) |

---

## 2. Where to edit things

| I want to change… | Edit this file |
| --- | --- |
| Any text, links, projects, certificates, badges, skills | `src/data/site.ts` |
| Colours | `src/index.css` (top of the file, `:root { --bg … }`) |
| Hero photo / 360° settings | `src/config/hero.ts` |
| Images | `public/images/` (hero background: `hero-bg.webp`) |
| Project screenshots | `public/projects/` |

**Fill these in when ready (all in `src/data/site.ts`):**

- Each project has `github:` → currently your GitHub profile. Replace with the exact repo link.
- Each project has `tech: []` → add your stack, e.g. `['HTML', 'CSS', 'JavaScript']`.
- Each project has an `image:` (currently the mockups you sent). Replace the files in `public/projects/`
  with real screenshots any time (keep the same file names, or change the `image:` path).
- Badge names are read from the badge links. Rename them if you like.

---

## 3. Add the 360° hero frames

The hero is a **scroll-controlled 360° turntable**: your scroll position decides which frame is drawn on a canvas
(it is not a video and not a CSS spin). This needs a set of frames of you rotating.
**Until frames are added, the site shows your portrait as a normal hero — nothing breaks.**

**Step A – Make a 360° video (about 5 seconds).**
Use an AI video tool (Kling, Runway, Luma, Veo, etc.) with your portrait as the reference image and a prompt like:

> Slow, continuous, perfectly smooth 360-degree turntable rotation of the same woman from the reference photo.
> Upper-body only, black blazer and white shirt, plain light-grey studio background.
> Camera is fixed, subject stays centered, same scale and size all the time. Start facing the camera front,
> rotate through the side, back, the other side, and finish exactly facing front again (seamless loop).
> No zoom, no camera shake, no text, no logo.

Check that the face still looks like you, and that the last frame matches the first.
Portrait ratio **4:5** (for example 1080×1350) works best. Save it as `hero-360.mp4`.

**Step B – Turn the video into frames** (needs [ffmpeg](https://ffmpeg.org/download.html)):

```bash
ffmpeg -i hero-360.mp4 -vf "fps=24,scale=960:-2" -c:v libwebp -quality 80 public/hero-frames/frame_%04d.webp
```

(5 seconds × 24 fps ≈ 120 frames. More frames = smoother, but a bigger download.)

**Step C – Register the frames:**

```bash
npm run frames:manifest
```

Restart `npm run dev`. Scroll — the hero pins and you rotate 360°.
On phones the site automatically loads every 2nd frame to save data.
If you ever want to go back to the static portrait, delete `public/hero-frames/manifest.json`.

---

## 4. Contact form

Works out of the box: it opens the visitor's email app with everything pre-filled (to `gsanushree18@gmail.com`).

For a real "send" button that emails you directly (free):

1. Create a form at https://formspree.io and copy the endpoint (`https://formspree.io/f/xxxxxxx`).
2. Copy `.env.example` to `.env` and set `VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx`.
3. On Vercel add the same variable under *Settings → Environment Variables*.

---

## 5. Push to GitHub

1. Create a new **empty** repository on https://github.com/new (for example `portfolio`). Don't add a README there.
2. In the VS Code terminal:

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/gsanushree18/portfolio.git
git push -u origin main
```

(Replace `portfolio` with your repo name.)

---

## 6. Deploy on Vercel

1. Go to https://vercel.com and sign in with GitHub.
2. Click **Add New → Project** and import your `portfolio` repository.
3. Vercel detects **Vite** automatically. Leave the defaults:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Deploy**. In about a minute you get a live link.

Every time you `git push`, Vercel redeploys automatically.

**After deploying:** open `index.html` and change `<meta property="og:image" content="/og.jpg" />` to the full link,
e.g. `https://your-site.vercel.app/og.jpg`, so previews show correctly when you share the link on LinkedIn/WhatsApp.

---

## Notes

- Your photo file is 450 px wide, so it is upscaled in the hero. For a sharper result replace
  `public/images/portrait.webp` (and `portrait.jpg`) with a higher-resolution photo (at least 1200 px wide).
- Reduced-motion is respected: visitors who prefer less motion get a static hero and no smooth-scroll.
- Custom cursor is desktop-only; it is disabled on touch devices.
- **3D:** the hero and About portraits are real CSS-3D cards (mouse tilt, light glare, gentle floating sway).
  The Drawing and Sports sections are vertical 3D card flows driven by scrolling.
  The full 360° spin still needs the frames from step 3.
