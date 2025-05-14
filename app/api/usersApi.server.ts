import type { AppLoadContext } from "react-router";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { users } from "~/database/schema";

type UsersApi = {
  create(request: CreateUserRequest): Promise<CreateUserResponse>;
  isNewInstance(): Promise<boolean>;
  verifyCredentials(request: VerifyPasswordRequest): Promise<null | number>;
};

type CreateUserRequest = {
  email: string;
  isAdmin: boolean;
  name: string;
  password: string;
};

type CreateUserResponse = {
  isSuccessful: boolean;
};

type VerifyPasswordRequest = { email: string; password: string };

export function usersApi({ db }: AppLoadContext): UsersApi {
  async function create({
    email,
    isAdmin,
    name,
    password,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const passwordHash = await bcrypt.hash(password, 10);
    await db.insert(users).values({ email, isAdmin, name, passwordHash });
    return { isSuccessful: true };
  }

  async function isNewInstance(): Promise<boolean> {
    return (await db.query.users.findFirst()) === undefined;
  }

  async function verifyCredentials({
    email,
    password,
  }: VerifyPasswordRequest): Promise<null | number> {
    const user = await db.query.users.findFirst({
      columns: { id: true, passwordHash: true },
      where: eq(users.email, email),
    });
    if (!(user?.passwordHash && user.id)) {
      return null;
    }

    if (await bcrypt.compare(password, user.passwordHash)) {
      return user.id;
    } else {
      return null;
    }
  }

  return { create, isNewInstance, verifyCredentials };
}
