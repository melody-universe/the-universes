import type { ExecutionContext } from "@cloudflare/workers-types";
import type { AppLoadContext } from "react-router";

// Leaving DB stuff in case we need it later.
// import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";

// import * as schema from "./database/schema";

export function getLoadContext({
  context,
}: GetLoadContextArgs): AppLoadContext {
  // const db = drizzle(context.cloudflare.env.DB, { schema });

  return {
    cloudflare: context.cloudflare,
    // db,
  };
}

declare module "react-router" {
  // This needs to be an interface in order to merge properties:
  // https://www.typescriptlang.org/docs/handbook/declaration-merging.html
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface AppLoadContext {
    cloudflare: {
      ctx: Omit<ExecutionContext, "props">;
      env: CloudflareEnvironment;
    };
    // db: DrizzleD1Database<typeof schema>;
  }
}

type GetLoadContextArgs = {
  context: Pick<AppLoadContext, "cloudflare">;
  request: Request;
};

declare global {
  type CloudflareEnvironment = Env;
}
