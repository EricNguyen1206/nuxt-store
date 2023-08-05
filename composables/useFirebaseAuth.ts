import { message } from "ant-design-vue";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    User,
} from "firebase/auth";

/**
 * firebase authentication
 * @returns user: user context from fireauth to authorization
 * @returns login method to login with email fireauth
 * @returns register method
 * @returns logout method
 */
export default function () {
    const { $auth } = useNuxtApp();
    const error = ref<any>(null);
    const loading = ref(false);
    const router = useRouter();

    const user = useState<User | null>("fb_user", () => null);
    /**
     * login with firebase authentication
     * @param email
     * @param password
     */
    const login = async (email: string, password: string) => {
        try {
            loading.value = true;
            const loginUser = await signInWithEmailAndPassword(
                $auth,
                email,
                password
            );
            if (loginUser.user) {
                user.value = loginUser.user;
                message.success("Welcome admin!");
                router.push("/admin");
            } else {
                message.error("Login failed! Plese try again!");
            }
        } catch (e: unknown) {
            message.error("Login failed! Plese try again!");
            return false;
        } finally {
            loading.value = false;
        }
    };

    /**
     * register with firebase auth
     * @param email
     * @param password
     */
    const register = async (
        username: string,
        email: string,
        password: string
    ) => {
        try {
            const { data: res } = await useFetch("/api/user/register", {
                method: "POST",
                body: {
                    username,
                    email,
                    password,
                    avatar: "https://firebasestorage.googleapis.com/v0/b/nuxt-store-4c385.appspot.com/o/fallback.png?alt=media&token=988b7e71-9db4-47e3-8d35-497ac32def3c",
                    isAdmin: true,
                },
            });
            if (res.value?.status == 200) {
                const userCreds = await createUserWithEmailAndPassword(
                    $auth,
                    email,
                    password
                );
                if (userCreds) {
                    router.push("/admin/login");
                    message.success(
                        "Create account successfully, please login!"
                    );
                    return;
                }
            }

            message.error("Create account failed! Please use other email!");
        } catch (e: unknown) {
            return;
        }
    };
    /**
     * logout firebase auth
     */
    const logout = async () => {
        try {
            loading.value = true;
            await $auth.signOut();
            user.value = null;
            router.push("/admin/login");
        } catch (e: unknown) {
            if (e instanceof Error) {
                error.value = e.message;
            }
        } finally {
            loading.value = false;
        }
    };

    return {
        user,
        error,
        loading,
        login,
        register,
        logout,
    };
}
