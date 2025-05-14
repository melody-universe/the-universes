import type { AppLoadContext } from "react-router";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { users } from "~/database/schema";

type UsersApi = {
  create(request: CreateUserRequest): Promise<CreateUserResponse>;
  isNewInstance(): Promise<boolean>;
  verifyCredentials(
    request: VerifyCredentialsRequest,
  ): Promise<VerifyCredentialsResponse>;
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

type VerifyCredentialsRequest = { email: string; password: string };

type VerifyCredentialsResponse =
  | { isAdmin: boolean; isMatch: true; userId: number }
  | { isMatch: false };

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
  }: VerifyCredentialsRequest): Promise<VerifyCredentialsResponse> {
    const user = await db.query.users.findFirst({
      columns: { id: true, isAdmin: true, passwordHash: true },
      where: eq(users.email, email),
    });
    if (!(user?.passwordHash && user.id)) {
      return { isMatch: false };
    }

    if (await bcrypt.compare(password, user.passwordHash)) {
      return { isAdmin: !!user.isAdmin, isMatch: true, userId: user.id };
    } else {
      return { isMatch: false };
    }
  }

  return { create, isNewInstance, verifyCredentials };
}
