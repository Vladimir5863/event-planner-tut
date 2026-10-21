import { getSession } from "@/lib/auth/server";
import { EventDetailContent } from "@/components/event-detail-content";
import { Suspense } from "react";
import { redirect } from "next/navigation";

export default function EventDetailsPage({ params }: { params: Promise<{ eventId: string }> }) {
  return (
    <Suspense fallback={null}>
      <EventDetails params={params} />
    </Suspense>
  );
}

async function EventDetails({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  const session = await getSession();
  const user = session.data?.user;
  if (!user) redirect("/auth/sign-in");
  return <EventDetailContent userId={user.id} eventId={eventId} />;
}
