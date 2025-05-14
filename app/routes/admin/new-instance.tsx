import type { ReactNode } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "react-router";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import * as zod from "zod";

import { usersApi } from "~/api/usersApi.server";
import { Field, Form, SubmitButton } from "~/components/Form";

import type { Route } from "./+types/new-instance";

export default function NewInstance(_: Route.ComponentProps): ReactNode {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useRemixForm<FormData>({
    mode: "onSubmit",
    resolver,
  });

  return (
    <Form errors={errors.root} onSubmit={handleSubmit}>
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

export async function loader({ context }: Route.LoaderArgs) {
  return { isNewInstance: await usersApi(context).isNewInstance() };
}

export async function action({ context, request }: Route.ActionArgs) {
  const { data, errors, receivedValues } = await getValidatedFormData<FormData>(
    request,
    resolver,
  );

  if (errors) {
    return {
      defaultValues: receivedValues,
      errors,
    };
  }

  await usersApi(context).create({
    email: data.email,
    isAdmin: true,
    name: data.name,
    password: data.password,
  });

  return redirect("/");
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
