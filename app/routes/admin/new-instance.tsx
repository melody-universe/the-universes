import type { ReactNode } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "react-router";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import * as zod from "zod";

import { instanceApi } from "~/api/instanceApi.server";
import { usersApi } from "~/api/usersApi.server";
import { Field, Form, SubmitButton } from "~/components/Form";

import type { Route } from "./+types/new-instance";

import { email, name, password } from "../utils/fields";
import { startSessionAndRedirect } from "../utils/startSessionAndRedirect";

export default function NewInstance(): ReactNode {
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
  if (!(await instanceApi(context).isNewInstance())) {
    return redirect("/");
  }
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

  const result = await usersApi(context).createAdmin({
    email: data.email,
    name: data.name,
    password: data.password,
  });

  return startSessionAndRedirect(request, result.user);
}

const schema = zod.object({
  email,
  name,
  password,
});

type FormData = zod.infer<typeof schema>;

const resolver = zodResolver(schema);
