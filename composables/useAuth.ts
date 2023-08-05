import { message } from "ant-design-vue";
import { IUser } from "~/types";
import useCart from "./useCart";

export default function () {
    const router = useRouter();

    const user = useState<IUser | null>("user", () => null);
    const { updateCart } = useCart();

    const login = async (email: string, password: string) => {
        const { data: res } = await useFetch("/api/user/login", {
            method: "POST",
            body: {
                email,
                password,
            },
        });
        if (res.value?.status == 200 && res.value.payload) {
            user.value = res.value.payload as IUser;
            message.success(res.value.message);
            updateCart();
            router.push("/");
            return;
        }

        message.error("Login failed! Plese try again!");
    };

    const register = async (
        username: string,
        email: string,
        password: string
    ) => {
        const { data: res } = await useFetch("/api/user/register", {
            method: "POST",
            body: {
                username,
                email,
                password,
                avatar: "https://firebasestorage.googleapis.com/v0/b/nuxt-store-4c385.appspot.com/o/fallback.png?alt=media&token=988b7e71-9db4-47e3-8d35-497ac32def3c",
                isAdmin: false,
            },
        });
        if (res.value?.status == 200) {
            router.push("/auth/login");
            message.success(res.value.message);
            return;
        }

        message.error("Login failed! Plese try again!");
    };

    const logout = () => {
        user.value = null;
        router.push("/");
    };

    return {
        user,
        login,
        register,
        logout,
    };
}
