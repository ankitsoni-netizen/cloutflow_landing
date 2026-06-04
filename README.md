# Cloutflow Marketing Site

Enterprise influencer marketing OS — Next.js 15 marketing site with local content data and API routes for forms.

## Structure

- `apps/web` — Next.js (App Router), Tailwind Probe design system, API routes for forms
- `apps/web/data` — Stories, insights, and jobs content (TypeScript)

## Quick start

```bash
npm install
cp .env.example apps/web/.env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Email

- Set `EMAIL_PROVIDER=resend` and `RESEND_API_KEY` for production email to `EMAIL_TO` (default `ankit.soni@cloutflow.com`).
- Default `EMAIL_PROVIDER=stub` logs emails to the server console in development.

## Forms & storage

| Endpoint | Purpose |
|----------|---------|
| `POST /api/contact` | Contact Sales |
| `POST /api/apply` | Job application + resume |
| `POST /api/creator-apply` | Creator network signup |
| `POST /api/help-ticket` | Help Center tickets |

Submissions are stored in SQLite (`DATABASE_URL`). Resumes go to `FILE_STORAGE_PATH` (use S3 env vars in serverless production).

## Content

Edit stories, insights, and jobs in:

- `apps/web/data/stories.ts`
- `apps/web/data/insights.ts`
- `apps/web/data/jobs.ts`

## Build

```bash
npm run build
```

## Deploy (Firebase App Hosting)

See **[docs/DEPLOY-FIREBASE.md](docs/DEPLOY-FIREBASE.md)** for GitHub connect, env vars, secrets, and custom domains. Backend: `landing-page-cf` on project `dev-cloutflow-platform`, deploy root `.` (monorepo lockfile).

## Design system

Probe theme: sharp corners (`rounded-none`), white canvas, `#073EFD` primary CTAs only, `#11286D` navy contrast sections. See `apps/web/app/globals.css`.
