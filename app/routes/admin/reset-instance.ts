import { redirect } from "react-router";

import { instanceApi } from "~/api/instanceApi.server";
import { destroySession, getSession } from "~/sessions.server";

import type { Route } from "./+types/reset-instance";

import { assertUserIsAdmin } from "./utils/assertUserIsAdmin";

export async function action({ context, request }: Route.ActionArgs) {
  await assertUserIsAdmin(request);

  await instanceApi(context).resetInstance();

  const session = await getSession(request);
  return redirect("/", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
}
