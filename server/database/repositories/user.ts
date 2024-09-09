import type { CodeGeneratorOptions } from "~/lib/number";
import { generateCode } from "~/lib/number";
import prisma from "~/server/database/client";
import type { CreateUserBody, RichUser } from "~/types/user";

const verificationCodeOptions: CodeGeneratorOptions = {
  length: 32,
  numbers: true,
  upperCase: true,
  lowerCase: true,
};

export async function createUser(body: CreateUserBody): Promise<RichUser> {
  const verificationCode = generateCode(verificationCodeOptions);
  return await prisma.user.create({
    data: {
      ...body,
      verificationCode,
      userInfo: {
        create: {
          ...body.userInfo,
          contactEmail: body.userInfo.contactEmail ?? body.email,
        },
      },
    },
    include: {
      userInfo: true,
    },
  }) as RichUser;
}
