import type { ReactNode } from "react";

import { Form } from "react-router";

import { SubmitButton } from "~/components/Form";

import type { Route } from "./+types/admin";

import { assertUserIsAdmin } from "./utils/assertUserIsAdmin";

export default function Admin(): ReactNode {
  return (
    <Form action="/admin/reset-instance" method="post">
      <SubmitButton variant="destructive">Reset </SubmitButton>
    </Form>
  );
}

export async function loader({ request }: Route.LoaderArgs) {
  await assertUserIsAdmin(request);
}
