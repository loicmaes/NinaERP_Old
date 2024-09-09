import type { CreateUserBody, User } from "~/types/user";

export async function useStrictAccess(shouldBe?: boolean) {
  const user = useState<User>("user").value;
  if (user && !shouldBe) return navigateTo("/app/me");
  if (!user && shouldBe) return navigateTo("/portal/auth/register");
}

export async function registerUser(body: CreateUserBody): Promise<User> {
  const user = await $fetch<User>("/api/portal/auth/register", {
    method: "POST",
    body,
  });

  useState<User>("user").value = user;
  await navigateTo("/app/me");

  return user;
}
