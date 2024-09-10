import type { AuthSession, CreateAuthSessionBody } from "~/types/authSession";
import type { CodeGeneratorOptions } from "~/lib/number";
import { generateCode } from "~/lib/number";
import { durations } from "~/types/authSession";
import prisma from "~/server/database/client";

export const tokenOptions: CodeGeneratorOptions = {
  length: 24,
  numbers: true,
  upperCase: true,
  lowerCase: true,
};

export async function createAuthSession(body: CreateAuthSessionBody): Promise<AuthSession> {
  const token = generateCode(tokenOptions);
  const expiresAt = new Date(Date.now() + (body.keep ? durations.week : durations.hour));
  return await prisma.authSession.create({
    data: {
      authToken: token,
      user: {
        connect: {
          uid: body.userUid,
        },
      },
      expiresAt,
    },
  });
}

export async function recoverSession(body: { authToken: string; userUid: string }): Promise<AuthSession | null> {
  return await prisma.authSession.findUnique({
    where: {
      authToken_userUid: {
        ...body,
      },
      expiresAt: {
        gt: new Date(),
      },
    },
  });
}
