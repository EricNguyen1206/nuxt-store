export default defineNuxtRouteMiddleware((to, from) => {
    const { user } = useAuth();
    if ((to.path == "/profile" || to.path == "/checkout") && !user.value) {
        return navigateTo("/auth/login");
    }
});
