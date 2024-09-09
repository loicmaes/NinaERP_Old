import type { CreateUserBody, RichUser, User } from "~/types/user";
import { createUser } from "~/server/database/repositories/user";

export async function register(userData: CreateUserBody): Promise<User> {
  const user: RichUser = await createUser(userData);
  const code = user.verificationCode;
  console.log(code);
  // TODO: send mail with otp code
  return {
    ...user,
  };
}
