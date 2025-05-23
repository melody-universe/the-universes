import type { FieldError, FieldErrors } from "react-hook-form";

import { Form as RadixForm } from "radix-ui";
import {
  type ComponentProps,
  type FormEvent,
  type PropsWithChildren,
  type ReactNode,
  useMemo,
} from "react";
import { Form as ReactRouterForm } from "react-router";

import { mergeClassNames } from "~/utils/mergeClassNames";

export function Form({
  action,
  children,
  errors,
  omitRootErrors,
  onSubmit,
  unstyled,
}: FormProps): ReactNode {
  return (
    <RadixForm.Root asChild>
      <ReactRouterForm
        action={action}
        className={unstyled ? undefined : "w-72"}
        method="post"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={onSubmit}
      >
        {!omitRootErrors && <FormErrors errors={errors} />}
        {children}
      </ReactRouterForm>
    </RadixForm.Root>
  );
}

type FormProps = PropsWithChildren<{
  action?: string;
  errors: FieldErrors["root"];
  omitRootErrors?: boolean;
  onSubmit: (event?: FormEvent<HTMLFormElement>) => Promise<void> | void;
  unstyled?: boolean;
}>;

export function FormErrors({
  errors,
}: {
  errors: FieldErrors["root"] | undefined;
}): ReactNode {
  const errorItems = useMemo(
    () =>
      errors &&
      Object.values(errors)
        .map((error) => (typeof error === "object" ? error.message : undefined))
        .filter((error) => !!error),
    [errors],
  );

  return errorItems?.map((message, i) => <span key={i}>{message}</span>);
}

export function Field({
  error,
  label,
  name,
  ...inputProps
}: FieldProps): ReactNode {
  return (
    <RadixForm.Field className="mb-2.5 grid" name={name}>
      <div className="flex items-baseline justify-between">
        <RadixForm.Label className="text-lg font-medium">
          {label}
        </RadixForm.Label>
        {error && (
          <RadixForm.Message className="text-base opacity-80">
            {error.message}
          </RadixForm.Message>
        )}
      </div>
      <RadixForm.Control asChild>
        <input
          className={[
            "inline-flex h-9 w-full items-center justify-center rounded-sm pr-2.5 pl-2.5 text-lg shadow-xs",
            "bg-neutral-950/5 shadow-neutral-950/15 dark:bg-neutral-50/5 dark:shadow-neutral-50/15",
            "focus:shadow-sm focus:shadow-neutral-950 focus:outline-none focus:dark:shadow-neutral-50",
            "hover:shadow-neutral-950 hover:dark:shadow-neutral-50",
            "selection:bg-indigo-200/50 selection:dark:bg-indigo-800/50",
          ].join(" ")}
          {...inputProps}
        />
      </RadixForm.Control>
    </RadixForm.Field>
  );
}

type FieldProps = Omit<ComponentProps<"input">, "children" | "type"> & {
  error: FieldError | undefined;
  label: string;
  name: string;
  type: "email" | "password" | "text";
};

export function SubmitButton({
  children,
  className,
  variant,
}: SubmitButtonProps): ReactNode {
  return (
    <RadixForm.Submit asChild>
      <button
        className={mergeClassNames(
          "mt-2.5 inline-flex h-9 w-full items-center justify-center rounded-sm pr-4 pl-4 text-lg font-medium shadow-sm focus:outline-none",
          "shadow-neutral-950/20 focus:shadow-neutral-950",
          variant === "destructive"
            ? "bg-red-900 text-red-300 hover:bg-red-100 hover:text-red-900"
            : "bg-neutral-900 text-indigo-300 hover:bg-indigo-100 hover:text-indigo-900",
          "dark:shadow-neutral-50/20 dark:focus:shadow-neutral-50",
          variant === "destructive"
            ? "dark:bg-red-100 dark:text-red-900 dark:hover:bg-red-900 dark:hover:text-red-100"
            : "dark:bg-neutral-100 dark:text-indigo-900 dark:hover:bg-indigo-900 dark:hover:text-indigo-100",
          className,
        )}
      >
        {children}
      </button>
    </RadixForm.Submit>
  );
}

type SubmitButtonProps = PropsWithChildren<{
  className?: string;
  variant?: "destructive";
}>;
