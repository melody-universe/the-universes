import type { ReactNode } from "react";

import { redirect } from "react-router";

import { usersApi } from "~/api/usersApi";
import { PageLayout } from "~/components/PageLayout";

import type { Route } from "./+types/home";

export default function Home(_: Route.ComponentProps): ReactNode {
  return (
    <PageLayout>
      <p>More coming soon, we promise!</p>
    </PageLayout>
  );
}

export async function loader({ context }: Route.LoaderArgs) {
  if (await usersApi(context).isNewInstance()) {
    return redirect("/admin/new-instance");
  }
}
