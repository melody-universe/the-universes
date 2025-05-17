import { redirect } from "react-router";

import { destroySession, getSession } from "~/sessions.server";

import type { Route } from "./+types/logout";

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request);

  return redirect("/", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
}
