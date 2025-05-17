import { data } from "react-router";

import { getSession } from "~/sessions.server";

export async function assertUserIsAdmin(request: Request): Promise<void> {
  const session = await getSession(request);
  const user = session.get("user");
  if (!user?.isAdmin) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw data("User is not an admin", { status: 404 });
  }
}
