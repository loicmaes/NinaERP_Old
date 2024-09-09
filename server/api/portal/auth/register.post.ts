import type { CreateUserBody, User } from "~/types/user";
import { register } from "~/server/services/auth";

export default defineEventHandler(async (event): Promise<User> => {
  const body = await readBody<CreateUserBody>(event);
  return await register(event, body);
});
