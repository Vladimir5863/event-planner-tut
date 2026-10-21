import { Suspense } from "react";
import { AccountView } from "@neondatabase/auth/react";
import { accountViewPaths } from "@neondatabase/auth/react/ui/server";

export function generateStaticParams() {
  return Object.values(accountViewPaths).map((path) => ({ path }));
}

type Props = { params: Promise<{ path: string }> };

export default function AccountPage({ params }: Props) {
  return (
    <main className="container p-4 md:p-6">
      <Suspense fallback={null}>
        <AccountContent params={params} />
      </Suspense>
    </main>
  );
}

async function AccountContent({ params }: Props) {
  const { path } = await params;
  return <AccountView path={path} />;
}
