import type { ReactNode } from "react";
import type { FieldErrors } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { data, redirect } from "react-router";
import { getValidatedFormData } from "remix-hook-form";
import * as zod from "zod";

import { usersApi } from "~/api/usersApi.server";
import { commitSession, getSession } from "~/sessions.server";

import type { Route } from "./+types/login";

export default function Login(): ReactNode {
  return null;
}

export function loader() {
  // eslint-disable-next-line @typescript-eslint/only-throw-error
  throw data("Login page loader was called.", { status: 404 });
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
    session.set("user", result.user);
    return redirect(result.user.isAdmin ? "/admin" : "/", {
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

export const schema = zod.object({
  email: zod
    .string()
    .min(1, "Please enter your email")
    .email("Please enter a valid email"),
  password: zod.string().min(1, "Please enter a password"),
});

export type FormData = zod.infer<typeof schema>;

export const resolver = zodResolver(schema);
