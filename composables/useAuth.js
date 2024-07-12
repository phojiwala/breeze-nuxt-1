export const User = {
  name: "",
  email: "",
};

export const LoginCredentials = {
  email: "",
  password: "",
};

export const RegisterCredentials = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

export const ResetPasswordCredentials = {
  email: "",
  password: "",
  password_confirmation: "",
  token: "",
};

// Value is initialized in: ~/plugins/auth.ts
export const useUser = () => {
  return useState("user", () => undefined);
};

export const useAuth = () => {
  const router = useRouter();

  const user = useUser();
  const isLoggedIn = computed(() => !!user.value);

  async function refresh() {
    try {
      user.value = await fetchCurrentUser();
    } catch {
      user.value = null;
    }
  }

  async function login(credentials) {
    if (isLoggedIn.value) return;

    await $fetcher("/login", { method: "post", body: credentials });
    await refresh();
  }

  async function register(credentials) {
    await $fetcher("/register", { method: "post", body: credentials });
    await refresh();
  }

  async function resendEmailVerification() {
    return await $fetcher(
      "/email/verification-notification",
      {
        method: "post",
      }
    );
  }

  async function logout() {
    if (!isLoggedIn.value) return;

    await $fetcher("/logout", { method: "post" });
    user.value = null;

    await router.push("/login");
  }

  async function forgotPassword(email) {
    return await $fetcher("/forgot-password", {
      method: "post",
      body: { email },
    });
  }

  async function resetPassword(credentials) {
    return await $fetcher("/reset-password", {
      method: "post",
      body: credentials,
    });
  }

  return {
    user,
    isLoggedIn,
    login,
    register,
    resendEmailVerification,
    logout,
    forgotPassword,
    resetPassword,
    refresh,
  };
};

export const fetchCurrentUser = async () => {
  try {
    return await $fetcher("/api/user");
  } catch (error) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }
};
