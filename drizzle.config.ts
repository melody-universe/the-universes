import type { Config } from "drizzle-kit";

export default {
  dbCredentials: {
    accountId: "2bcbef515e72375efa7e408eeb8d183a",
    databaseId: "cbe00d7c-7e89-41f6-a132-662db9bec313",
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    token: process.env.CLOUDFLARE_API_TOKEN!,
  },
  dialect: "sqlite",
  driver: "d1-http",
  out: "./drizzle",
  schema: "./database/schema.ts",
} satisfies Config;
