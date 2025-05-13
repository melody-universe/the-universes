import type { ReactNode } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import * as zod from "zod";

import { usersApi } from "~/api/usersApi";
import { Field, Form, SubmitButton } from "~/components/Form";

import type { Route } from "./+types/home";

export default function Home({
  actionData,
  loaderData,
}: Route.ComponentProps): ReactNode {
  return (
    <main className="flex items-center justify-center pt-6 pb-4">
      <div className="flex min-h-0 flex-1 flex-col items-center gap-8">
        <header className="flex flex-col items-center gap-9 text-4xl">
          The Universes
        </header>
        {(actionData?.errors ?? loaderData.isNewInstance) ? (
          <NewInstanceForm />
        ) : (
          <p>More coming soon, we promise!</p>
        )}
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

export async function action({ context, request }: Route.ActionArgs) {
  const { data, errors, receivedValues } = await getValidatedFormData<FormData>(
    request,
    resolver,
  );

  if (errors) {
    return { defaultValues: receivedValues, errors };
  }

  await usersApi(context).create({
    email: data.email,
    isAdmin: true,
    name: data.name,
    password: data.password,
  });
}

const schema = zod.object({
  email: zod
    .string()
    .min(1, "Please enter your email")
    .email("Please enter a valid email"),
  name: zod.string().min(1, "Please enter your name"),
  password: zod.string().min(1, "Please enter a password"),
});

type FormData = zod.infer<typeof schema>;

const resolver = zodResolver(schema);

function NewInstanceForm(): ReactNode {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useRemixForm<FormData>({ mode: "onSubmit", resolver });

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        error={errors.name}
        label="Name"
        type="text"
        {...register("name")}
      />
      <Field
        error={errors.email}
        label="Email"
        type="email"
        {...register("email")}
      />
      <Field
        error={errors.password}
        label="Password"
        type="password"
        {...register("password")}
      />
      <SubmitButton>Instantiate</SubmitButton>
    </Form>
  );
}
