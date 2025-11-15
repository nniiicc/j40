# J40 Birthday Color Wall

This is a small Next.js app for a birthday project where friends upload a photo, pick a color, name it, and leave a short message.

The main page combines:
- A landing-style intro text block.
- An entry form for new color stories.
- A gallery of tiles showing each photo and its swatch side by side.

## Quickstart

```bash
# install deps
pnpm i   # or: npm i / yarn

# dev
pnpm dev

# build & start
pnpm build && pnpm start
```

Then open http://localhost:3000

## App behavior

- Each entry includes:
  - submitter name
  - color hex and color name
  - feature (e.g., Story, Memory, Inside joke)
  - message
  - photo (local preview only)
- The wall shows tiles with
  - photo on the left, color swatch on the right (proportional)
  - header row with color name, hex, feature, and submitter
  - click to reveal / hide the message
- A “Filter by feature” dropdown lets you view subsets of the wall.

Images in `public/images` are just placeholders. Replace them with real photos as needed.
