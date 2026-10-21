import { Suspense } from "react";
import { InviteRsvpContent } from "@/components/invite-rsvp-content";

type Props = {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ submitted?: string }>;
};

export default function InvitePage({ params, searchParams }: Props) {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading...</p>}>
      <InviteResolver params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function InviteResolver({ params, searchParams }: Props) {
  const { token } = await params;
  const query = await searchParams;

  return <InviteRsvpContent token={token} submitted={query.submitted === "1"} />;
}
