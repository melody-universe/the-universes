import type { ReactNode } from "react";

import { redirect } from "react-router";

import { usersApi } from "~/api/usersApi.server";
import { getSession } from "~/sessions.server";

import type { Route } from "./+types/home";

export default function Home(_: Route.ComponentProps): ReactNode {
  return <p>More coming soon, we promise!</p>;
}

export async function loader({ context, request }: Route.LoaderArgs) {
  if (await usersApi(context).isNewInstance()) {
    return redirect("/admin/new-instance");
  }

  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("userId")) {
    return redirect("/auth/login");
  }
}
