import { whoAmI } from "~/server/services/auth";

export default defineEventHandler(async (event) => {
  return await whoAmI(event);
});
