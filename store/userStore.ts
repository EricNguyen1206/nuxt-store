// userStore.js
import { message } from "ant-design-vue";
import { defineStore } from "pinia";
import { IUserDto } from "~/types/dto/user";
import { useCartStore } from "./cartStore";

type TUserState = {
  userData: IUserDto | null;
};

export const useUserStore = defineStore("user", {
  state: (): TUserState => ({
    userData: null,
  }),
  actions: {
    setUserData(data: IUserDto) {
      this.userData = data;
    },
    async login(email: string, password: string) {
      const router = useRouter();
      const cartStore = useCartStore();
      try {
        const { data: res } = await useFetch("/api/user/login", {
          method: "POST",
          body: {
            email,
            password,
          },
        });
        if (res.value?.status == 200 && res.value.data) {
          this.userData = res.value.data as unknown as IUserDto;
          message.success(res.value.message);
          await cartStore.getUserCart(res.value.data.userId);
          router.push("/");
          return;
        }
        message.error("Login failed! Plese try again!");
      } catch {
        message.error("Login failed! Plese try again!");
      }
    },
  },
});
