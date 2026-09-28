# Copilot Instructions for danna-fabian

## Project overview
This repository is a small Next.js wedding website for Fabián y Danna . It uses the App Router (`app/`), TypeScript, and Tailwind CSS. The site is mostly static marketing content spread across route pages and reusable section components.

## Local workflow
- Install dependencies: `npm install`
- Start the app locally: `npm run dev`
- Preview the production build locally: `npm run build` then `npm run start`

## Build, test, and lint commands
- Lint: `npm run lint`
- Production build: `npm run build`
- Test runner: no automated test framework is configured in this repo right now; there are no existing test files or `test` script in `package.json`.

When a test runner is added later, prefer running a single targeted test rather than the whole suite (for example, a Jest/Vitest command filtered to one file or one test name). For now, validation should rely on `npm run lint` and `npm run build`.

## High-level architecture
- `app/layout.tsx` defines the root layout, site metadata, and global font setup (`next/font/google`).
- `app/page.tsx` is the home page and composes the main landing-page sections.
- `app/nuestra-historia/page.tsx`, `app/viaje-alojamiento/page.tsx`, and `app/faqs/page.tsx` are the main route pages.
- `components/` contains reusable UI blocks such as `NavBar`, `Hero`, `Schedule`, `VenueDetails`, and `ReserveButton`.
- `public/` stores static assets such as the wedding imagery and hotel graphics; use `next/image` for local images.
- `app/globals.css` defines the shared palette and global Tailwind setup. Most visual styling is done with Tailwind utility classes rather than custom CSS.

## Key conventions
- Follow the App Router structure for new pages: add a route under `app/<route>/page.tsx` and keep page composition lightweight.
- Prefer `@/components/...` imports for shared components.
- Keep interactive logic in client components only when required (`"use client"`). The mobile menu in `components/NavBar.tsx` is currently the main example.
- Respect the existing color system in `app/globals.css`: use the palette tokens (`--background`, `--dark`, `--light`, `--accent`, `--light-accent`) and the matching Tailwind theme variables instead of introducing ad hoc colors.
- This project is content-heavy and mostly static; prefer reusable, section-based components over creating new application state or data flows unless the feature truly requires them.
- Preserve the existing Spanish-language tone and wedding branding. Copy and page structure are intentionally themed for a Colombian celebration rather than a generic SaaS landing page.
- Keep page metadata and route titles aligned with the current site naming (`Fabián y Danna `, `Nuestra Historia`, `Viaje y Alojamiento`, `Preguntas frecuentes`).

## Repository notes
- The project was bootstrapped from `create-next-app` and still follows the standard Next.js conventions for App Router projects.
- The main development entry point is `npm run dev`; open `http://localhost:3000` in the browser to view changes.
