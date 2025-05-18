import * as zod from "zod";

export const email = zod
  .string()
  .min(1, "Please enter your email")
  .email("Please enter a valid email");

export const name = zod.string().min(1, "Please enter your name");

export const password = zod.string().min(1, "Please enter a password");
