import type { CreateUserBody, RichUser } from "~/types/user";
import { createUser } from "~/server/database/repositories/user";

export async function register(userData: CreateUserBody): Promise<string> {
  const user: RichUser = await createUser(userData);
  const code = user.verificationCode;
  // TODO: send mail with otp code
  return code;
}
