import type { ReactNode } from "react";

import { Form, Outlet } from "react-router";

import { SubmitButton } from "~/components/Form";
import { getSession } from "~/sessions.server";

import type { Route } from "./+types/layout";

export default function Layout({
  loaderData,
}: Route.ComponentProps): ReactNode {
  return (
    <main className="flex items-center justify-center pt-6 pb-4">
      <div className="flex min-h-0 flex-1 flex-col items-center gap-8">
        <div className="flex w-full items-baseline pr-4">
          <header className="flex grow flex-col items-center gap-9 text-4xl">
            The Universes
          </header>
          {loaderData.isLoggedIn && (
            <Form action="/auth/logout" method="post">
              <SubmitButton className="max-w-30">Log out</SubmitButton>
            </Form>
          )}
        </div>
        <Outlet />
      </div>
    </main>
  );
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request);
  return { isLoggedIn: session.has("user") };
}
