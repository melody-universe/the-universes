import type { PropsWithChildren, ReactNode } from "react";

import { Tabs as RadixTabs } from "radix-ui";

import { mergeClassNames } from "~/utils/mergeClassNames";

export function Tabs({
  children,
  defaultValue,
  onValueChange,
  value,
}: TabsProps): ReactNode {
  return (
    <RadixTabs.Root
      className="flex w-sm flex-col shadow-md text-shadow-neutral-900/50 dark:text-shadow-neutral-100/50"
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      value={value}
    >
      {children}
    </RadixTabs.Root>
  );
}

type TabsProps = PropsWithChildren<
  | {
      defaultValue?: never;
      onValueChange: (value: string) => void;
      value: string;
    }
  | { defaultValue?: string; onValueChange?: never; value?: never }
>;

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
        "dark:bg-neutral-900/80 dark:text-indigo-100 dark:hover:text-indigo-200",
        "data-[state=active]:inset-shadow-2xs data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-xs",
        "data-[state=active]:text-indigo-800 data-[state=active]:focus:shadow-neutral-900",
        "data-[state=active]:dark:text-indigo-200 data-[state=active]:dark:focus:shadow-neutral-100",
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
