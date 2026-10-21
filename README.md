# EventPlanner

Create events, share one invite link and see who is coming. Guests reply without creating an account.

## Features

- Sign in and account management with Neon Auth
- Create events with a title, description, place and date
- Dashboard with all your events and reply counts (going, maybe, can't go)
- One invite link per event, which you can regenerate at any time
- Public invite page where guests reply with name, email and status
- Attendee table on the event page

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Cache Components)
- [React](https://react.dev) and [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) components
- [Prisma 7](https://www.prisma.io) with the `pg` driver adapter
- [Neon](https://neon.tech) Postgres and Neon Auth
- [pnpm](https://pnpm.io) and [Vite+](https://viteplus.dev) for tooling and pre-commit checks

## Getting started

### Requirements

- Node.js 24 or newer
- pnpm
- A Neon project (database and Neon Auth enabled)

### 1. Install dependencies

```bash
pnpm install
```

If pnpm reports `ERR_PNPM_IGNORED_BUILDS`, approve the build scripts for `prisma`, `@prisma/engines` and `esbuild`:

```bash
pnpm approve-builds
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```bash
# Neon Postgres. Use the direct (non-pooled) URL for migrations.
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# Public URL of the app, used to build invite links
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Neon Auth variables: copy them from the Auth page of your Neon project
```

Never commit `.env`. It is listed in `.gitignore`.

### 3. Set up the database

```bash
pnpm prisma migrate dev
pnpm prisma generate
```

The Prisma client is generated into `app/generated/prisma`. Run `pnpm prisma generate` again after every schema change.

### 4. Start the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

> Run the app with `pnpm dev`, not `vp dev`. `vp dev` starts a Vite server, which this Next.js project does not use.

## Scripts

| Command                   | What it does                 |
| ------------------------- | ---------------------------- |
| `pnpm dev`                | Start the development server |
| `pnpm build`              | Create a production build    |
| `pnpm start`              | Run the production build     |
| `pnpm exec tsc --noEmit`  | Type-check the project       |
| `pnpm prisma migrate dev` | Create and apply a migration |
| `pnpm prisma studio`      | Browse the database          |

A pre-commit hook runs `vp check --fix` on staged files. Commits fail on lint or type errors, so run `pnpm exec tsc --noEmit` before committing.

## Project structure

```
app/
  auth/[path]/       Sign in, sign up and other auth views
  account/[path]/    Account settings views
  dashboard/         List of your events
  events/new/        Create event form
  events/[eventId]/  Event details, invite link, attendees
  invite/[token]/    Public RSVP page for guests
  generated/prisma/  Generated Prisma client (not committed)
components/          App components and shadcn/ui (components/ui)
lib/
  actions/           Server Actions (create event, invite link, RSVP)
  auth/              Neon Auth server and client setup
  prisma.ts          Prisma client singleton
prisma/
  schema.prisma      Data model
proxy.ts             Route protection (Next.js 16 replacement for middleware)
```

## Data model

- **Event**: owned by a Neon Auth user (`ownerUserId`), with title, description, location and date
- **EventInvite**: one invite token per event
- **EventRsvp**: a guest reply with name, email and status (`going`, `maybe`, `not_going`)

## Notes

- The project uses Cache Components. Any page that reads the session, `params`, `searchParams` or the database must do so inside a `<Suspense>` boundary.
- Server Actions that filter by owner must check the session first. An `undefined` user id would otherwise drop the filter from the Prisma query.
- Regenerating an invite link invalidates the previous one.
- `proxy.ts` protects the dashboard and event routes. The home page, `/auth/*` and `/invite/*` stay public.

## Deployment

Deploy to any platform that supports Next.js, for example Vercel. Set `DATABASE_URL`, `NEXT_PUBLIC_APP_URL` and the Neon Auth variables in the project settings, and run `pnpm prisma migrate deploy` against the production database.
