import type { ReactNode } from "react";

import { data, redirect } from "react-router";

import { destroySession, getSession } from "~/sessions.server";

import type { Route } from "./+types/logout";

export default function Logout(): ReactNode {
  return null;
}

export function loader() {
  // eslint-disable-next-line @typescript-eslint/only-throw-error
  throw data("Logout page loader was called.", { status: 404 });
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request);

  return redirect("/", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
}
