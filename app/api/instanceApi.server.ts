import type { AppLoadContext } from "react-router";

import { users } from "~/database/schema";

export function instanceApi({ db }: AppLoadContext): InstanceApi {
  async function isNewInstance(): Promise<boolean> {
    return (await db.query.users.findFirst()) === undefined;
  }

  async function resetInstance(): Promise<void> {
    await db.delete(users);
  }

  return { isNewInstance, resetInstance };
}

type InstanceApi = {
  isNewInstance(): Promise<boolean>;
  resetInstance(): Promise<void>;
};
