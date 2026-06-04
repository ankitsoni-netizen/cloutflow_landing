# Deploy Cloutflow to a public website (Firebase App Hosting)

Your backend already exists:

**https://landing-page-cf--dev-cloutflow-platform.asia-southeast1.hosted.app**

After a successful deploy, that URL is your public site. You can add a custom domain (e.g. `www.cloutflow.com`) in the Firebase Console.

---

## Checklist (do these in order)

### 1. Firebase Console settings

1. Open [Firebase Console → App Hosting](https://console.firebase.google.com/project/dev-cloutflow-platform/apphosting).
2. Select backend **landing-page-cf**.
3. **Deployment settings → App root directory:** `.` (repository root, **not** `apps/web`).
4. **Environment variables** (Runtime):
   - `NEXT_PUBLIC_SITE_URL` = `https://landing-page-cf--dev-cloutflow-platform.asia-southeast1.hosted.app` (or your custom domain later)
   - `EMAIL_PROVIDER` = `resend`
   - `RESEND_API_KEY` = your Resend key (use Secret Manager if available)
   - `EMAIL_FROM` = `hello@cloutflow.com`
   - `EMAIL_TO` = your inbox

### 2. Push code to GitHub (recommended)

App Hosting works best with Git connected. From your machine:

```bash
cd /Users/AnkitSoni/Desktop/Landing

# First time only — create a repo on GitHub, then:
git init
git add .
git commit -m "Initial Cloutflow marketing site"
git branch -M main
git remote add origin https://github.com/YOUR_ORG/YOUR_REPO.git
git push -u origin main
```

**Must be committed:** `package-lock.json`, `firebase.json`, `apphosting.yaml`, `apps/web/`, root `package.json`.

### 3. Connect GitHub in Firebase

App Hosting → **landing-page-cf** → connect the repo and branch `main`. Set app root to `.` again in the UI.

### 4. Deploy from your computer (alternative)

```bash
cd /Users/AnkitSoni/Desktop/Landing
firebase login
firebase use dev-cloutflow-platform
firebase deploy --only apphosting:landing-page-cf
```

Watch the rollout in the [console](https://console.firebase.google.com/project/dev-cloutflow-platform/apphosting) or Cloud Build logs if it fails.

### 5. Verify locally before deploy

```bash
npm install
npm run build -w @cloutflow/web
```

---

## Custom domain (public brand URL)

1. Firebase Console → App Hosting → **landing-page-cf** → **Domains**.
2. Add `cloutflow.com` or `www.cloutflow.com`.
3. Add the DNS records Firebase shows at your registrar.
4. Update `NEXT_PUBLIC_SITE_URL` in App Hosting env to the custom domain.

---

## If the build fails

| Error | Fix |
|--------|-----|
| `package-lock.json: no such file` | App root must be `.` and lockfile must be in git |
| Lightning CSS Linux module | Run `npm install` at repo root and commit lockfile; optional deps include Linux packages |
| Build timeout / memory | Increase `memoryMiB` in `apphosting.yaml` |
| Old site after deploy | Hard refresh or wait for rollout; check latest build succeeded |

Build logs: Firebase Console → App Hosting → rollout → **View logs**, or the Cloud Build link in the CLI error.

---

## What is not on this deploy

- **SQLite form DB** — does not persist on Cloud Run; use Resend email or Cloud SQL later.
- **Resume files** — use S3 env vars in production (`S3_*` in `.env.example`).

---

## Project files

| File | Role |
|------|------|
| `firebase.json` | Backend `landing-page-cf`, `rootDir: "."` |
| `.firebaserc` | Project `dev-cloutflow-platform` |
| `apphosting.yaml` | Build/run commands and env |
| `apps/web/` | Next.js marketing site |
