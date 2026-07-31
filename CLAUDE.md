# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**ARCHIVE WEB PRO** (`archivage_electronique` v4.0) — an electronic document archiving / GED application for a Côte d'Ivoire client (Logiciel Plus). Angular 20 standalone SPA, French-language UI, built on top of the "Cuba Tailwind Angular" admin template.

Consequence of the template origin: most of `src/app/components/*` (e-commerce, chat, kanban, blog, courses, jobs, social-app, ui-kits, bonus-ui, charts, maps, etc.) is **unused demo scaffolding** from the template. The real business code lives in a small subset — see "Business modules" below. Don't assume a directory is in use just because it's routed in `content.routes.ts`.

## Commands

```bash
npm start                # ng serve --o  (opens browser, port 4200)
npm run start_reverse    # port 3011 with proxy.conf.json → api-ged.archivepro.ci, 8GB heap
npm run build            # production build → dist/cuba-tailwind-angular/browser
npm run watch            # development build, watch mode
npm test                 # Karma + Jasmine
ng test --include='**/some.component.spec.ts'   # single spec file
```

There is **no linter configured** and essentially no test suite — `skipTests: true` is set in `angular.json` schematics, so generated components have no specs. Don't propose running lint.

Use `npm run start_reverse` when working against the real backend without CORS issues; `npm start` hits `environment.api_url` directly.

## Architecture

### Encrypted API layer (the most important thing to know)

**All** backend traffic is AES-CBC encrypted in both directions with a hardcoded key/IV from `src/environments/environment.ts`. Never call `HttpClient` directly for business endpoints — always go through `src/app/core/http.service.ts` (`HttpService`), which wraps the payload as `{data: postDataCrypte(payload)}` and runs `decryptData(res.body.data)` on the response.

- Crypto helpers live in `src/app/config/config.ts` (`postDataCrypte`, `decryptData`, `cryptSession`, plus a custom accented-alphabet `encode64`/`decode64` pair used only for the session passphrase).
- Key/IV come from `src/app/core/config.ts`, re-exported from `environment`.
- `postDataMultipart` is the exception: file uploads send raw `FormData` (no Content-Type header — the browser sets the boundary) but the **response is still decrypted**.
- `postDataNoCrypt` bypasses encryption entirely; only used for a few auxiliary calls.

### URL convention

Endpoints use a colon-prefixed segment, built inline in components:

```ts
`${environment.api_url}api/:savedocuments?idsociete=${id}&iduser_save=${uid}`
`${environment.api_url}auth/:login`
```

`api_url` is the parser gateway (`http://archivepro.ci:3500/parseur-awp/:`), `URL_API` is the media host (`http://api-ged.archivepro.ci/`) used for file/preview URLs. Note both `environment.ts` and `environment.prod.ts` have `production: true`, and `environment.prod.ts` lacks `api_url` — the dev file is the one actually used by every build.

### Auth & session

- Login (`auth/login`) → response is AES-encrypted with the passphrase `decode64(environment.CONFIG.APP_PASS)` and stored in **`sessionStorage`** under `environment.CONFIG.APP_TOKEN_NAME` (`_v4_`). Optional OTP second factor stashes an interim blob under `_temp_`.
- `Authorization` (`src/app/protect/authorization.service.ts`) is the only reader of that session: `getInfosUsers()` returns the decrypted user object, whose `access_token` is passed as the third argument to every `HttpService` method.
- Two guard layers: `AdminGuard` (`shared/guard/admin.guard.ts`) just checks a session exists; `routeGuardService` (`protect/auth.service.ts`) additionally checks the requested path against the server-supplied `users._menu` array and redirects to `/error405`.
- `HttpService.sessionExpired$` is a `Subject` fired on any 401 — `session-expired-modal` subscribes to it and offers re-login in place rather than hard-redirecting.

### Routing

`app.routes.ts` → public auth routes + two guarded shells:
- `ContentComponent` + `shared/routes/content.routes.ts` — the main app layout (sidebar/header), all lazy-loaded via `loadChildren`.
- `FullComponent` + `shared/routes/full.routes.ts` — full-page layouts (error pages, coming-soon).

`documents/recu` (`ConsultFileComponent`) is intentionally **public** — external document-sharing links land there.

### Business modules

The parts under active development:

| Path | Directory |
|---|---|
| `/dashboard/accueil` | `components/dashboard/accueil` (widgets: `mes-docs`, `repertoire`, …) |
| `/documents` | `components/documents` (`creer-un-document`, `classer-document`, `mes-documents`, `scanner`) |
| `/recherche` | `components/voir-document` (`trouver-un-doucment` — note the typo in the directory name) |
| `/records-management` | `components/configuration` (plan de classement, types de documents, sites/rayons/boîtes) |
| `/entites`, `/rh`, `/menu`, `/importer`, `/user` | organisation, HR (absences), menu admin, bulk import, access management |

Physical-storage hierarchy recurring across the API: `site → rayon → boîte → document → pièces`.

### UI stack

- **ng-zorro-antd** (`nz-*`) is the primary component library for business screens, locale-pinned to `fr_FR`. Icons must be registered in the `provideNzIcons([...])` array in `app.config.ts` before use — a missing icon renders blank.
- **Tailwind 3** with `important: true` (every utility emits `!important`, so utilities beat ng-zorro styles).
- **Tailwind breakpoints are inverted**: `tailwind.config.js` defines all screens with `max`, so `lg:` means ≤991px (mobile/tablet), not ≥. To hide something on mobile use `block lg:hidden`. This trips people up constantly.
- Template SCSS lives in `public/assets/scss/`, imported by `src/styles.scss`.
- Also in play: `ngx-toastr` for notifications, `sweetalert2` for confirms, `ngx-spinner`, ApexCharts/Chart.js, `xlsx` for exports, `jspdf` + `html2canvas` for PDF, `pdfjs-dist` (assets copied to `/assets/pdfjs`) for the document viewer.

### Sidebar menu

`shared/data/menu.ts` exports a static `menuItems` array plus `items` (a `BehaviorSubject`) that `SidebarComponent` subscribes to. Menu entries are hardcoded there, while route *authorization* comes from the server's `users._menu` — the two must be kept consistent when adding a screen.

## Conventions

- Components are **standalone** (no NgModules); declare deps in the `imports` array. Style is SCSS.
- UI text, comments, commit messages, and variable names are frequently French — match the surrounding language rather than translating to English.
- Components typically inject `HttpService` + `Authorization` and call endpoints directly; there is no per-domain service layer for the business modules (`shared/services/*` are leftover template services for the demo pages).
- 4-space indentation in the business code, 2-space in older template files.

## Deployment

Two GitHub Actions workflows on push to `main`: `docker-deploy.yml` (multi-stage build → `ghcr.io`, consumed by `docker-compose.yml`) and `deploy.yml` (direct copy to a Windows Nginx host). `nginx.docker.conf` handles SPA fallback. Detailed runbooks are in the French `containerisation.txt` and `deploiement-auto.txt` at the repo root.
