import type { H3Event } from "h3";
import type { CreateUserBody, RichUser, User } from "~/types/user";
import { createUser, recoverUser } from "~/server/database/repositories/user";
import type { AuthSession, CreateAuthSessionBody } from "~/types/authSession";
import { createAuthSession, recoverSession } from "~/server/database/repositories/authSession";
import { UniqueConstraintError } from "~/types/error";

export const authTokenCookie = "auth-token";
export const userUidCookie = "user-uid";

export async function register(event: H3Event<Request>, userData: CreateUserBody): Promise<User | undefined> {
  try {
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
  catch (e) {
    if (e instanceof UniqueConstraintError) sendError(event, createError({
      statusCode: 409,
      statusMessage: "Le login ou l'e-mail est déjà utilisé !",
    }));
    sendError(event, createError({
      statusCode: 500,
      statusMessage: "Une erreur est survenue !",
    }));
    return;
  }
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

export async function whoAmI(event: H3Event<Request>): Promise<User | undefined> {
  const authToken = getCookie(event, authTokenCookie);
  const userUid = getCookie(event, userUidCookie);

  if (!authToken || !userUid) {
    sendError(event, createError({
      statusCode: 400,
      statusMessage: "Aucune session en cours !",
    }));
    return undefined;
  }

  const session = await recoverSession({
    authToken,
    userUid,
  });
  if (!session) {
    sendError(event, createError({
      statusCode: 404,
      statusMessage: "La session a expirée !",
    }));
    return undefined;
  }

  const user = await recoverUser(userUid);
  if (!user) {
    sendError(event, createError({
      statusCode: 404,
      statusMessage: "L'utilisateur n'a pas été trouvé !",
    }));
    return undefined;
  }

  return user;
}
