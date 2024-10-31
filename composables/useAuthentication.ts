import { useAsyncData, useAuth, useLoading, useRequestHeaders } from "#imports";
import { computed } from "vue";
import type { BuiltInProviderType } from "next-auth/providers/index";
export const useAuthentication = () => {
  const {
    data,
    status,
    lastRefreshedAt,
    getCsrfToken,
    getProviders,
    signIn,
    signOut,
    getSession,
  } = useAuth();
  const { setLoadingMessage, setLoading } = useLoading();

  const isAuthenticated = computed(() => status.value === "authenticated");
  const user = computed(() => data.value?.user || null);
  const Token = async () => {
    const { data: token } = await useAsyncData("/api/token", async () => {
      const headers = useRequestHeaders(["cookie"]);
      const result = await $fetch("/api/token", { headers });
      return result ?? null;
    });
    return token;
  };
  const CsrfToken = async () => {
    const csrfToken = await getCsrfToken();
    return csrfToken;
  };
  const Providers = async () => {
    const providers = await getProviders();
    return providers;
  };
  const SignIn = (provider: BuiltInProviderType) => {
    setLoadingMessage(`Redirecting to ${provider} login page...`);
    setLoading(true);
    signIn(provider, { callbackUrl: "/" });
  };
  const LogOut = () => {
    setLoadingMessage("Logging out...");
    setLoading(true);
    signOut({ callbackUrl: "" });
  };
  const LogIn = (email: string, password: string) => {
    // setLoadingMessage("Logging in...");
    // setLoading(true);
    signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  };
  return {
    isAuthenticated,
    user,
    Token,
    CsrfToken,
    Providers,
    SignIn,
    LogOut,
    LogIn,
  };
};