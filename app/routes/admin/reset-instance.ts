import type { ReactNode } from "react";

import { data, redirect } from "react-router";

import { instanceApi } from "~/api/instanceApi.server";
import { destroySession, getSession } from "~/sessions.server";

import type { Route } from "./+types/reset-instance";

import { assertUserIsAdmin } from "./utils/assertUserIsAdmin";

export default function ResetInstance(): ReactNode {
  return null;
}

export function loader() {
  // eslint-disable-next-line @typescript-eslint/only-throw-error
  throw data("Reset Instance page loader was called.", { status: 404 });
}

export async function action({ context, request }: Route.ActionArgs) {
  await assertUserIsAdmin(request);

  await instanceApi(context).resetInstance();

  const session = await getSession(request);
  return redirect("/", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
}
