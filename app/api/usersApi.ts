import type { AppLoadContext } from "react-router";

import bcrypt from "bcryptjs";

import { users } from "~/database/schema";

type UsersApi = {
  create(request: CreateUserRequest): Promise<CreateUserResponse>;
  isNewInstance(): Promise<boolean>;
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

  return { create, isNewInstance };
}
