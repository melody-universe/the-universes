import { createCookieSessionStorage, type Session } from "react-router";

type SessionData = {
  isAdmin: boolean;
  userId: number;
};

type SessionFlashData = {
  error: string;
};

const {
  commitSession,
  destroySession,
  getSession: defaultGetSession,
} = createCookieSessionStorage<SessionData, SessionFlashData>({
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

export { commitSession, destroySession };

export function getSession(
  request: Request,
): Promise<Session<SessionData, SessionFlashData>> {
  return defaultGetSession(request.headers.get("Cookie"));
}
