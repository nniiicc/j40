# Deploying the J40 Birthday Color Wall to Vercel

## 1. Push to a Git host

1. Initialize a git repo in this folder.
2. Commit the files.
3. Push to GitHub / GitLab / Bitbucket.

## 2. Create a Vercel project

1. Go to Vercel and click **Add New Project**.
2. Import the repository containing this app.
3. Vercel should auto-detect **Next.js**.

Build settings (usually automatic):

- Framework: Next.js
- Install Command: `pnpm i` (or `npm i`/`yarn`)
- Build Command: `next build`
- Output: handled by Next.js

No environment variables are required.

## 3. Local verification (optional)

```bash
pnpm i
pnpm build
pnpm start
```

Open http://localhost:3000 and make sure:

- The intro + form render.
- You can add an entry.
- New tiles appear with photo + swatch side by side.
- The feature filter works.

## 4. Custom domain (optional)

1. In Vercel, open your project settings.
2. Go to **Domains**.
3. Add your custom domain and follow the DNS instructions.

## 5. Notes

- File uploads stay in the browser via object URLs and are not persisted or uploaded.
- For persistent storage, you could later connect this UI to an API route and a database (e.g., Supabase, PlanetScale, or Vercel Postgres).
