import type { FetchError } from "ofetch";
import type { CreateUserBody, User } from "~/types/user";
import { useToast } from "~/components/ui/toast";
import { authTokenCookie } from "~/server/services/auth";

export const useAuthCookie = () => useCookie(authTokenCookie);

export async function useUser(): Promise<User | null> {
  const authCookie = useAuthCookie();
  const user = useState<User>("user");

  if (authCookie && !user.value) {
    const { data } = await useFetch<User>("/api/portal/auth/whoami", {
      method: "GET",
      headers: useRequestHeaders(["cookie"]),
    });
    if (!data.value) return null;

    user.value = data.value;
  }

  return user.value;
}

export async function useStrictAccess(shouldBe?: boolean) {
  const user = useState<User>("user").value;
  if (user && !shouldBe) return navigateTo("/app/me");
  if (!user && shouldBe) return navigateTo("/portal/auth/register");
}

export async function registerUser(body: CreateUserBody) {
  try {
    const user = await $fetch<User>("/api/portal/auth/register", {
      method: "POST",
      body,
    });

    useState<User>("user").value = user;
    await navigateTo("/app/me");
  }
  catch (e) {
    const err = e as FetchError;
    useToast().toast({
      title: "Oops 💢",
      description: err.statusCode === 409 ? "Le login ou l'e-mail est déjà utilisé !" : "Une erreur est survenue !",
      variant: "destructive",
    });
  }
}
