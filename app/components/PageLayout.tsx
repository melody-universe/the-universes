import type { PropsWithChildren, ReactNode } from "react";

export function PageLayout({ children }: PropsWithChildren): ReactNode {
  return (
    <main className="flex items-center justify-center pt-6 pb-4">
      <div className="flex min-h-0 flex-1 flex-col items-center gap-8">
        <header className="flex flex-col items-center gap-9 text-4xl">
          The Universes
        </header>
        {children}
      </div>
    </main>
  );
}
