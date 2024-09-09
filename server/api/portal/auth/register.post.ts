import type { CreateUserBody } from "~/types/user";
import { register } from "~/server/services/auth";

export default defineEventHandler(async (event) => {
  const body = await readBody<CreateUserBody>(event);
  return await register(body);
});
