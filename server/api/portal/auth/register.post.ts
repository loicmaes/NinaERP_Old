import type { CreateUserBody } from "~/types/user";

export default defineEventHandler(async (event) => {
  const body = await readBody<CreateUserBody>(event);
  console.log(body);
});
