import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createEventAction } from "@/lib/actions/events";
import Link from "next/link";

export default async function NewEventPage() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Create event</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createEventAction}>
            <FieldGroup>
              <Field>
                <FieldLabel>Title</FieldLabel>
                <Input id="title" name="title" required placeholder="Team dinner..." />
              </Field>
              <Field>
                <FieldLabel>Description</FieldLabel>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your event..."
                />
              </Field>
              <Field>
                <FieldLabel>Location</FieldLabel>
                <Input id="location" name="location" placeholder="Enter event location..." />
              </Field>
              <Field>
                <FieldLabel>Date and time</FieldLabel>
                <Input
                  id="eventDate"
                  name="eventDate"
                  placeholder="Team dinner..."
                  type="datetime-local"
                />
                <FieldDescription>Optional, you can set this later.</FieldDescription>
              </Field>
              <div className="flex items-center gap-3">
                <Button type="submit">Create event</Button>
                <Button type="button" variant="outline" asChild>
                  <Link href={"/dashboard"}>Cancel</Link>
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
