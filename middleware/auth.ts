import { useUserStore } from "~/store/userStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const { userData } = useUserStore();
  if ((to.path == "/profile" || to.path == "/checkout") && !userData) {
    return navigateTo("/auth/login");
  }
});
