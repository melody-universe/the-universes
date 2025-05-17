import type { ReactNode } from "react";

import { useRemixForm } from "remix-hook-form";

import { Field, Form, SubmitButton } from "~/components/Form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/Tabs";

import { type FormData, resolver } from "./login";

export default function Auth(): ReactNode {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useRemixForm<FormData>({ mode: "onSubmit", resolver });

  return (
    <Tabs defaultValue="login">
      <TabsList label="Authenticate">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Form action="/auth/login" errors={errors.root} onSubmit={handleSubmit}>
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
      </TabsContent>
      <TabsContent value="register">
        <p>Time to register!</p>
      </TabsContent>
    </Tabs>
  );
}
