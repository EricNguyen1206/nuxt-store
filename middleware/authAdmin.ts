export default defineNuxtRouteMiddleware((to, from) => {
    const { user } = useFirebaseAuth();
    if (to.path !== "/admin/login" && !user.value) {
        return navigateTo("/admin/login");
    }
});
