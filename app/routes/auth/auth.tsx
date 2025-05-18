import type { FieldErrors } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { type ReactNode, useEffect, useState } from "react";
import { data, redirect } from "react-router";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import * as zod from "zod";

import { usersApi } from "~/api/usersApi.server";
import { Field, Form, FormErrors, SubmitButton } from "~/components/Form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/Tabs";
import { getSession } from "~/sessions.server";

import type { Route } from "./+types/auth";

import { email, name, password } from "../utils/fields";
import { startSessionAndRedirect } from "../utils/startSessionAndRedirect";

export default function Auth(): ReactNode {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useRemixForm<FormData>({ mode: "onSubmit", resolver });

  const [selectedTab, setSelectedTab] = useState<string>("login");
  useEffect(() => {
    setValue(
      "intent",
      zod.literal("login").or(zod.literal("register")).parse(selectedTab),
    );
  }, [selectedTab]);
  const [selectedTabAtLastSubmission, setSelectedTabAtLastSubmission] =
    useState<null | string>(null);

  return (
    <Form
      errors={errors.root}
      omitRootErrors
      onSubmit={(event) => {
        setSelectedTabAtLastSubmission(selectedTab);
        void handleSubmit(event);
      }}
      unstyled
    >
      <Tabs onValueChange={setSelectedTab} value={selectedTab}>
        <TabsList label="Authenticate">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <div className="w-72">
            {selectedTabAtLastSubmission === "login" && (
              <FormErrors errors={errors.root} />
            )}
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
          </div>
        </TabsContent>
        <TabsContent value="register">
          <div className="w-72">
            {selectedTabAtLastSubmission === "register" && (
              <FormErrors errors={errors.root} />
            )}
            <Field
              error={"name" in errors ? errors.name : undefined}
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
            <SubmitButton>Register</SubmitButton>
          </div>
        </TabsContent>
      </Tabs>
    </Form>
  );
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request);
  const isLoggedIn = session.has("user");
  if (isLoggedIn) {
    return redirect("/");
  }
}

export async function action({ context, request }: Route.ActionArgs) {
  const {
    data: formData,
    errors,
    receivedValues,
  } = await getValidatedFormData<FormData>(request, resolver);

  if (errors) {
    return {
      defaultValues: receivedValues,
      errors,
    };
  }

  if (formData.intent === "login") {
    const result = await usersApi(context).verifyCredentials({
      email: formData.email,
      password: formData.password,
    });

    if (result.isMatch) {
      return startSessionAndRedirect(request, result.user);
    } else {
      return {
        defaultValues: receivedValues,
        errors: {
          root: { noMatch: { message: "Invalid email / password" } },
        } satisfies FieldErrors<FormData>,
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  } else if (formData.intent === "register") {
    const result = await usersApi(context).createUser({
      email: formData.email,
      name: formData.name,
      password: formData.password,
    });

    return startSessionAndRedirect(request, result.user);
  } else {
    // @ts-expect-error - This if-else chain should be exhaustive.
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw data(`Unexpected intent: ${formData.intent as string}`, 404);
  }
}

const schema = zod.discriminatedUnion("intent", [
  zod.object({
    email,
    intent: zod.literal("login"),
    password,
  }),
  zod.object({
    email,
    intent: zod.literal("register"),
    name,
    password,
  }),
]);

type FormData = zod.infer<typeof schema>;

const resolver = zodResolver(schema);
