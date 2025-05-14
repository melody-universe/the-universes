import type { ReactNode } from "react";

import { redirect } from "react-router";

import { usersApi } from "~/api/usersApi.server";
import { getSession } from "~/sessions.server";

import type { Route } from "./+types/home";

export default function Home({ loaderData }: Route.ComponentProps): ReactNode {
  if (loaderData) {
    return <p>Welcome, admin!</p>;
  }

  return <p>More coming soon, we promise!</p>;
}

export async function loader({ context, request }: Route.LoaderArgs) {
  if (await usersApi(context).isNewInstance()) {
    return redirect("/admin/new-instance");
  }

  const session = await getSession(request);
  if (!session.has("userId")) {
    return redirect("/auth/login");
  }

  return session.get("isAdmin");
}
