import { redirect } from "react-router";

import type { User } from "~/api/usersApi.server";

import { commitSession, getSession } from "~/sessions.server";

export async function startSessionAndRedirect(
  request: Request,
  user: User,
): Promise<Response> {
  const session = await getSession(request);
  session.set("user", user);
  return redirect(user.isAdmin ? "/admin" : "/", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}
