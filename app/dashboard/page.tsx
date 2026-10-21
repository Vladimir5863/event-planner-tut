import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/server";
import { DashboardContent } from "@/components/dashboard-content";

export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <Dashboard />
    </Suspense>
  );
}

async function Dashboard() {
  const session = await getSession();
  const user = session.data?.user;
  if (!user) redirect("/auth/sign-in");
  return <DashboardContent userId={user.id} />;
}
