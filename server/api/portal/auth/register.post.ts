import type { CreateUserBody } from "~/types/user";
import { generateCode } from "~/lib/number";

export default defineEventHandler(async (event) => {
  const body = await readBody<CreateUserBody>(event);
  console.log(body);
  return generateCode({
    numbers: true,
  });
});
