import type { H3Event } from "h3";
import type { CreateUserBody, RichUser, User } from "~/types/user";
import { createUser } from "~/server/database/repositories/user";
import type { AuthSession, CreateAuthSessionBody } from "~/types/authSession";
import { createAuthSession } from "~/server/database/repositories/authSession";

export const authTokenCookie = "auth-token";
export const userUidCookie = "user-uid";

export async function register(event: H3Event<Request>, userData: CreateUserBody): Promise<User> {
  const user: RichUser = await createUser(userData);
  const code = user.verificationCode;

  console.log(code);
  // TODO: send mail with otp code

  await makeSession(event, {
    userUid: user.uid,
  });

  return {
    ...user,
  };
}

export async function makeSession(event: H3Event<Request>, body: CreateAuthSessionBody): Promise<AuthSession> {
  const session: AuthSession = await createAuthSession({
    userUid: body.userUid,
  });
  setCookie(event, authTokenCookie, session.authToken, {
    path: "/",
    secure: true,
    httpOnly: true,
    expires: session.expiresAt,
  });
  setCookie(event, userUidCookie, body.userUid, {
    path: "/",
    secure: true,
    httpOnly: true,
    expires: session.expiresAt,
  });
  console.log(session.authToken);
  return session;
}
