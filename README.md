# Gears

This is a silly little thing I've been slowly asking Gemini to build in chat.  I'm committing the work-in-progress now that I'm satisfied with the initial POC.

The plan is to clean it up with Copilot, give it some structure, and iterate past the "vibe-coded" POC.

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
```

Pages: the game at `/` and the designer at `/designer/`.

Both pages share a header built from [`@noahwright/design`](https://github.com/NoahWright87/design) (home link back to https://noahwright.dev, light/dark toggle). The shared chrome lives in `src/chrome.tsx`; the game and designer logic is still inline in each page's HTML.

## Deploy

Published at https://gears.noahwright.dev from Netlify. `netlify.toml` runs `npm run build` and publishes `dist/`.

## Gear Designer

`gear-designer.html` lets you design custom gear shapes with live SVG preview:

- Teeth: count, width ratio, addendum (tip), valley depth
- Hub & hole: shape (circle, rounded square, square, hexagon) and sizes
- Cutouts: radial circles/squares, spokes, star; count/size/ring position
- Visuals: hue and stroke color
- Export: copy the gear path or download a minimal SVG

Open `/designer/` or use the "Designer" link in the game header.