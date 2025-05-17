import type { PropsWithChildren, ReactNode } from "react";

import { Tabs as RadixTabs } from "radix-ui";

import { mergeClassNames } from "~/utils/mergeClassNames";
import { prefixClassName } from "~/utils/prefixClassName";

export function Tabs({
  children,
  defaultValue,
}: PropsWithChildren<{ defaultValue?: string }>): ReactNode {
  return (
    <RadixTabs.Root
      className="flex w-sm flex-col shadow-md text-shadow-neutral-900/50 dark:text-shadow-neutral-100/50"
      defaultValue={defaultValue}
    >
      {children}
    </RadixTabs.Root>
  );
}

export function TabsList({
  children,
  label,
}: PropsWithChildren<{ label: string }>): ReactNode {
  return (
    <RadixTabs.List
      aria-label={label}
      className="flex shrink-0 border-b border-indigo-900 dark:border-indigo-100"
    >
      {children}
    </RadixTabs.List>
  );
}

export function TabsTrigger({
  children,
  value,
}: PropsWithChildren<{ value: string }>): ReactNode {
  return (
    <RadixTabs.Trigger
      className={mergeClassNames(
        "flex h-12 flex-1 cursor-pointer items-center justify-center px-5 text-lg leading-none outline-none select-none first:rounded-tl-md last:rounded-tr-md",
        "bg-neutral-100/80 text-indigo-900 hover:text-indigo-800",
        prefixClassName(
          "data-[state=active]:",
          mergeClassNames(
            "inset-shadow-2xs shadow-current focus:relative focus:shadow-xs",
            "text-indigo-800 focus:shadow-neutral-900",
            prefixClassName(
              "dark:",
              "text-indigo-200 focus:shadow-neutral-100",
            ),
          ),
        ),
        prefixClassName(
          "dark:",
          "bg-neutral-900/80 text-indigo-100 hover:text-indigo-200",
        ),
      )}
      value={value}
    >
      {children}
    </RadixTabs.Trigger>
  );
}

export function TabsContent({
  children,
  value,
}: PropsWithChildren<{ value: string }>): ReactNode {
  return (
    <RadixTabs.Content
      className={mergeClassNames(
        "flex grow flex-col items-center rounded-b-md p-5 outline-none focus:shadow-xs",
        "bg-neutral-100/80 focus:shadow-neutral-900",
        "dark:bg-neutral-900/80 dark:focus:shadow-neutral-100",
      )}
      value={value}
    >
      {children}
    </RadixTabs.Content>
  );
}
