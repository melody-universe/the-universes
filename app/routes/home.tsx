import type { ReactNode } from "react";

import { usersApi } from "~/api/usersApi";
import {
  Field,
  FieldControl,
  FieldHeader,
  FieldLabel,
  FieldMessage,
  Form,
} from "~/components/Form";

import type { Route } from "./+types/home";

export default function Home({ loaderData }: Route.ComponentProps): ReactNode {
  return (
    <main className="flex items-center justify-center pt-6 pb-4">
      <div className="flex min-h-0 flex-1 flex-col items-center gap-8">
        <header className="flex flex-col items-center gap-9 text-4xl">
          The Universes
        </header>
        {loaderData.isNewInstance && <NewInstanceForm />}
      </div>
    </main>
  );
}

export function meta(_: Route.MetaArgs): Route.MetaDescriptors {
  return [
    { title: "The Universes" },
    { content: "Welcome to our family website!", name: "description" },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  return { isNewInstance: await usersApi(context).isNewInstance() };
}

function NewInstanceForm(): ReactNode {
  return (
    <Form>
      <Field name="name">
        <FieldHeader>
          <FieldLabel>Name</FieldLabel>
          <FieldMessage match="valueMissing">
            Please enter your name
          </FieldMessage>
        </FieldHeader>
        <FieldControl required type="text" />
      </Field>
      <Field name="email">
        <FieldHeader>
          <FieldLabel>Email</FieldLabel>
          <FieldMessage match="valueMissing">
            Please enter your email
          </FieldMessage>
          <FieldMessage match="typeMismatch">
            Please enter a valid email
          </FieldMessage>
        </FieldHeader>
        <FieldControl required type="email" />
      </Field>
      <Field name="password">
        <FieldHeader>
          <FieldLabel>Password</FieldLabel>
          <FieldMessage match="valueMissing">
            Please enter a password
          </FieldMessage>
        </FieldHeader>
        <FieldControl required type="password" />
      </Field>
    </Form>
  );
}
