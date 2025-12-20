# Gears

This is a silly little thing I've been slowly asking Gemini to build in chat.  I'm committing the work-in-progress now that I'm satisfied with the initial POC.

The plan is to clean it up with Copilot, give it some structure, and iterate past the "vibe-coded" POC.

## Run

Open `gears.html` in a modern browser.

## Gear Designer

`gear-designer.html` lets you design custom gear shapes with live SVG preview:

- Teeth: count, width ratio, addendum (tip), valley depth
- Hub & hole: shape (circle, rounded square, square, hexagon) and sizes
- Cutouts: radial circles/squares, spokes, star; count/size/ring position
- Visuals: hue and stroke color
- Export: copy the gear path or download a minimal SVG

Open `gear-designer.html` directly or use the "Designer" link in the game header.