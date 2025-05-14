import type { ReactNode } from "react";

import { data } from "react-router";

import { getSession } from "~/sessions.server";

import type { Route } from "./+types/admin";

export default function Admin(): ReactNode {
  return <p>Welcome, admin!</p>;
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request);
  const user = session.get("user");
  if (!user?.isAdmin) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw data("User is not an admin", { status: 404 });
  }
}
