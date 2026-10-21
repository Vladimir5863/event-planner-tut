import { Button } from "./ui/button";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { notFound } from "next/navigation";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { submitOrUpdateRsvpAction } from "@/lib/actions/events";

export async function InviteRsvpContent({
  token,
  submitted,
}: {
  token: string;
  submitted: boolean;
}) {
  const row = await prisma.eventInvite.findFirst({
    where: { token },
    include: {
      event: {
        select: {
          id: true,
          title: true,
          description: true,
          location: true,
          eventDate: true,
        },
      },
    },
  });
  if (!row) {
    notFound();
  }

  const e = row.event;

  const event = {
    title: e.title,
    description: e.description,
    location: e.location,
    eventDate: e.eventDate ? e.eventDate.toISOString() : null,
  };

  const submitRsvpForToken = submitOrUpdateRsvpAction.bind(null, token);

  return (
    <div className="flex flex-col gap-6 flex-1">
      <Card>
        <CardHeader className="space-y-3">
          <Badge>RSVP</Badge>
          <CardTitle>{event.title}</CardTitle>
          <p className="text-sm text-[var(--muted-foreground)]">
            {event.eventDate ? new Date(event.eventDate).toLocaleString() : "No date selected"}
            {event.location ? ` - ${event.location}` : ""}
          </p>
          {event.description ? (
            <p className="text-sm text-muted-foreground">{event.description}</p>
          ) : null}
        </CardHeader>
        <CardContent>
          {submitted ? (
            <p className="mb-4 rounded-mb bprder border-accent/50 bg-accent/15">
              Thanks. Your RSVP has been recorder(or updated).
            </p>
          ) : null}
          <form action={submitRsvpForToken}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input id="name" name="name" required placeholder="Your Name" />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="status">Attendance</FieldLabel>
                <select
                  id="status"
                  name="status"
                  required
                  defaultValue="goind"
                  className="flex h-10 w-full rounded-mb border border-border"
                >
                  <option value="going">Going</option>
                  <option value="maybe">Maybe</option>
                  <option value="not_going">Not Going</option>
                </select>
              </Field>
              <Button type="submit">Submit RSVP</Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
