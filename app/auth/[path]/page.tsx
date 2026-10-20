import { Suspense } from "react";
import { AuthView } from "@neondatabase/auth/react";

export default function AuthPage({ params }: { params: Promise<{ path: string }> }) {
  return (
    <main className="container mx-auto flex grow flex-col items-center justify-center gap-3 self-center">
      <Suspense fallback={null}>
        <AuthContent params={params} />
      </Suspense>
    </main>
  );
}

async function AuthContent({ params }: { params: Promise<{ path: string }> }) {
  const { path } = await params;
  return <AuthView path={path} />;
}
