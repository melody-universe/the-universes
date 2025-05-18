import type { AppLoadContext } from "react-router";

import bcrypt from "bcryptjs";
import { eq, type InferSelectModel } from "drizzle-orm";

import type { UnionFromTuple } from "~/types/UnionFromTuple";

import { users } from "~/database/schema";

export function usersApi({ db }: AppLoadContext): UsersApi {
  async function createAdmin({
    email,
    name,
    password,
  }: CreateAdminRequest): Promise<CreateAdminResponse> {
    const passwordHash = await bcrypt.hash(password, 10);
    const response = await db
      .insert(users)
      .values({ email, isAdmin: true, name, passwordHash })
      .returning();
    return { user: response[0] };
  }

  async function createUser({
    email,
    name,
    password,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const passwordHash = await bcrypt.hash(password, 10);
    const response = await db
      .insert(users)
      .values({ email, name, passwordHash })
      .returning();
    return { user: response[0] };
  }

  async function verifyCredentials({
    email,
    password,
  }: VerifyCredentialsRequest): Promise<VerifyCredentialsResponse> {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (!(user?.passwordHash && user.id)) {
      return { isMatch: false };
    }

    if (await bcrypt.compare(password, user.passwordHash)) {
      return { isMatch: true, user };
    } else {
      return { isMatch: false };
    }
  }

  return { createAdmin, createUser, verifyCredentials };
}

type UsersApi = {
  createAdmin(request: CreateAdminRequest): Promise<CreateAdminResponse>;
  createUser(request: CreateUserRequest): Promise<CreateUserResponse>;
  verifyCredentials(
    request: VerifyCredentialsRequest,
  ): Promise<VerifyCredentialsResponse>;
};

type CreateAdminRequest = {
  email: string;
  name: string;
  password: string;
};

type CreateAdminResponse = {
  user: User;
};

type CreateUserRequest = CreateAdminRequest;

type CreateUserResponse = CreateAdminResponse;

type VerifyCredentialsRequest = { email: string; password: string };

type VerifyCredentialsResponse =
  | { isMatch: false }
  | { isMatch: true; user: User };

export type User = InferSelectModel<typeof users>;

export type VerificationStatus = UnionFromTuple<
  typeof users.verificationStatus.enumValues
>;
