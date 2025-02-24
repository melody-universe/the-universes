import type { ReactNode } from "react";

import type { Route } from "./+types/home";

import { Welcome } from "../welcome/welcome";

export default function Home(): ReactNode {
  return <Welcome />;
}

export function meta(_: Route.MetaArgs): Route.MetaDescriptors {
  return [
    { title: "The Universes" },
    { content: "Welcome to our family website!", name: "description" },
  ];
}
