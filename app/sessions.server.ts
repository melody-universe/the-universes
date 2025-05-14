import { createCookieSessionStorage } from "react-router";

type SessionData = {
  userId: string;
};

type SessionFlashData = {
  error: string;
};

const { commitSession, destroySession, getSession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      domain: import.meta.env.PROD ? "the-universes.com" : undefined,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      name: "__session",
      sameSite: "strict",
      secrets: ["s3cr3t"],
      secure: true,
    },
  });

export { commitSession, destroySession, getSession };
