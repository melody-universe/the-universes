import type { ComponentProps, PropsWithChildren, ReactNode } from "react";

import { Form as RadixForm } from "radix-ui";
import { Form as ReactRouterForm } from "react-router";

export function Form({ children }: PropsWithChildren): ReactNode {
  return (
    <RadixForm.Root asChild>
      <ReactRouterForm className="w-72" method="post">
        {children}
      </ReactRouterForm>
    </RadixForm.Root>
  );
}

export function Field({
  children,
  name,
}: PropsWithChildren<{ name: string }>): ReactNode {
  return (
    <RadixForm.Field className="mb-2.5 grid" name={name}>
      {children}
    </RadixForm.Field>
  );
}

export function FieldHeader({ children }: PropsWithChildren): ReactNode {
  return <div className="flex items-baseline justify-between">{children}</div>;
}

export function FieldLabel({ children }: PropsWithChildren): ReactNode {
  return (
    <RadixForm.Label className="text-lg font-medium">
      {children}
    </RadixForm.Label>
  );
}

export function FieldMessage({
  children,
  match,
}: FieldMessageProps): ReactNode {
  return (
    <RadixForm.Message className="text-base opacity-80" match={match}>
      {children}
    </RadixForm.Message>
  );
}

type FieldMessageProps = PropsWithChildren<
  Pick<ComponentProps<(typeof RadixForm)["Message"]>, "match">
>;

export function FieldControl({ required, type }: FieldControlProps): ReactNode {
  return (
    <RadixForm.Control asChild>
      <input
        className={[
          "inline-flex h-9 w-full items-center justify-center rounded-b-sm pr-2.5 pl-2.5 text-lg shadow-xs",
          "bg-neutral-950/5 shadow-neutral-950/15 dark:bg-neutral-50/5 dark:shadow-neutral-50/15",
          "focus:shadow-sm focus:shadow-neutral-950 focus:outline-none focus:dark:shadow-neutral-50",
          "hover:shadow-neutral-950 hover:dark:shadow-neutral-50",
          "selection:bg-indigo-200/50 selection:dark:bg-indigo-800/50",
        ].join(" ")}
        required={required}
        type={type}
      />
    </RadixForm.Control>
  );
}

type FieldControlProps = {
  required?: boolean;
  type: "email" | "password" | "text";
};
