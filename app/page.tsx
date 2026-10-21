import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const rsvp = [
  { label: "Going", count: 24, bar: "bg-accent" },
  { label: "Maybe", count: 6, bar: "bg-accent/50" },
  { label: "Can't go", count: 3, bar: "bg-border" },
];
const total = rsvp.reduce((sum, r) => sum + r.count, 0);

const steps = [
  {
    title: "Create the event",
    text: "Add a title, a place and a date. It takes under a minute.",
  },
  {
    title: "Share one link",
    text: "Send the invite link in any chat. Guests don't need an account.",
  },
  {
    title: "See who is coming",
    text: "Replies show up on your dashboard as going, maybe or can't go.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-24 px-4 py-16 md:py-24">
      {/* Hero */}
      <section className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col items-start gap-6">
          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-6xl">
            Invite people with a link. See who is coming.
          </h1>
          <p className="max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
            EventPlanner keeps every event, invite and reply in one place, so you stop counting
            answers in group chats.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/events/new">Create an event</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/dashboard">Open dashboard</Link>
            </Button>
          </div>
        </div>

        {/* The memorable element: a live-looking event card */}
        <div
          className="rounded-2xl border border-border bg-surface p-6 shadow-2xl shadow-accent/10"
          aria-label="Example event with replies"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Saturday, 8 November, 19:00</p>
              <h2 className="mt-1 text-xl font-semibold text-foreground">Rooftop housewarming</h2>
              <p className="text-sm text-muted-foreground">Knez Mihailova 12, Belgrade</p>
            </div>
            <Badge>{total} replies</Badge>
          </div>

          <div
            className="mt-6 flex h-3 w-full overflow-hidden rounded-full bg-surface-elevated"
            role="img"
            aria-label={rsvp.map((r) => `${r.count} ${r.label}`).join(", ")}
          >
            {rsvp.map((r) => (
              <div
                key={r.label}
                className={r.bar}
                style={{ width: `${(r.count / total) * 100}%` }}
              />
            ))}
          </div>

          <ul className="mt-5 grid grid-cols-3 gap-3">
            {rsvp.map((r) => (
              <li key={r.label} className="rounded-lg bg-surface-elevated px-3 py-2">
                <p className="text-2xl font-semibold text-foreground">{r.count}</p>
                <p className="text-sm text-muted-foreground">{r.label}</p>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2">
            <span className="truncate text-sm text-muted-foreground">
              eventplanner.app/invite/2a31e9cc…
            </span>
            <span className="shrink-0 text-sm font-medium text-accent">Copy link</span>
          </div>
        </div>
      </section>

      {/* How it works: a real sequence, so numbering is meaningful */}
      <section className="flex flex-col gap-8">
        <h2 className="max-w-[24ch] text-3xl font-semibold tracking-tight text-foreground">
          From idea to guest list in three steps
        </h2>
        <ol className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-3 border-t border-border pt-5">
              <span className="text-sm font-medium text-accent">Step {i + 1}</span>
              <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="max-w-[40ch] leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Closing call to action */}
      <section className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-surface px-6 py-10 md:flex-row md:items-center md:px-10">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-foreground">Planning something soon?</h2>
          <p className="max-w-[48ch] text-muted-foreground">
            Sign in and create your first event. Your invite link is ready as soon as you save.
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/auth/sign-in">Sign in to start</Link>
        </Button>
      </section>
    </div>
  );
}
