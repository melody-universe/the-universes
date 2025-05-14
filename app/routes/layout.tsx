import type { ReactNode } from "react";

import { Outlet } from "react-router";

export default function Layout(): ReactNode {
  return (
    <main className="flex items-center justify-center pt-6 pb-4">
      <div className="flex min-h-0 flex-1 flex-col items-center gap-8">
        <header className="flex flex-col items-center gap-9 text-4xl">
          The Universes
        </header>
        <Outlet />
      </div>
    </main>
  );
}
