import Link from "next/link";
import { Button } from "./ui/button";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import type { RsvpStatus as PrismaRsvpStatus } from "@/app/generated/prisma/enums";
import { Badge } from "./ui/badge";

export function countByStatus(rsvps: { status: PrismaRsvpStatus }[]) {
  let goingCount = 0;
  let maybeCount = 0;
  let notGoingCount = 0;

  for (const rsvp of rsvps) {
    switch (rsvp.status) {
      case "going":
        goingCount++;
        break;
      case "maybe":
        maybeCount++;
        break;
      case "not_going":
        notGoingCount++;
        break;
    }
  }
  return { goingCount, maybeCount, notGoingCount };
}

export async function DashboardContent({ userId }: { userId: string }) {
  const rows = await prisma.event.findMany({
    where: { ownerUserId: userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      eventDate: true,
      location: true,
      rsvps: { select: { status: true } },
    },
  });

  const events = rows.map((e) => ({
    id: e.id,
    title: e.title,
    eventDate: e.eventDate ? e.eventDate.toISOString() : null,
    location: e.location,
    ...countByStatus(e.rsvps),
  }));

  return (
    <div className="flex flex-col gap-6 flex-1">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Your Events</h1>
          <p className="text-sm text-[var(--muted-foreground)]">
            Track attendee responses and manage invite links
          </p>
        </div>
        <Button asChild>
          <Link href="events/new">Create event</Link>
        </Button>
      </div>
      {/* List of events */}
      {events.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No events yet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--muted-foreground)]">
              Create your first event to start collecting RSVPs.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {events.map((e) => (
            <Card key={e.id}>
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-lg">{e.title}</CardTitle>
                  <Button asChild variant="link" size="sm">
                    <Link href={`/events/${e.id}`}>Open</Link>
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge>Going: {e.goingCount}</Badge>
                  <Badge variant="secondary">Maybe: {e.maybeCount}</Badge>
                  <Badge variant="outline">Not Going: {e.notGoingCount}</Badge>
                </div>
                {e.eventDate ? new Date(e.eventDate).toLocaleString() : "No date selected"}
                {e.location ? ` - ${e.location}` : ""}
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
