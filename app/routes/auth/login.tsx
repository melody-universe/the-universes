import type { ReactNode } from "react";
import type { FieldErrors } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "react-router";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import * as zod from "zod";

import { usersApi } from "~/api/usersApi.server";
import { Field, Form, SubmitButton } from "~/components/Form";
import { commitSession, getSession } from "~/sessions.server";

import type { Route } from "./+types/login";

export default function Login(): ReactNode {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useRemixForm<FormData>({ mode: "onSubmit", resolver });

  return (
    <Form errors={errors.root} onSubmit={handleSubmit}>
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
      <SubmitButton>Login</SubmitButton>
    </Form>
  );
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

  const result = await usersApi(context).verifyCredentials({
    email: data.email,
    password: data.password,
  });

  if (result.isMatch) {
    const session = await getSession(request);
    session.set("isAdmin", result.isAdmin);
    session.set("userId", result.userId);
    return redirect("/", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  } else {
    return {
      defaultValues: receivedValues,
      errors: {
        root: { noMatch: { message: "Invalid email / password" } },
      } satisfies FieldErrors<FormData>,
    };
  }
}

const schema = zod.object({
  email: zod
    .string()
    .min(1, "Please enter your email")
    .email("Please enter a valid email"),
  password: zod.string().min(1, "Please enter a password"),
});

type FormData = zod.infer<typeof schema>;

const resolver = zodResolver(schema);
