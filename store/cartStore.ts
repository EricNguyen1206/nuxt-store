// userStore.js
import { message } from "ant-design-vue";
import { defineStore } from "pinia";
import { ICartDto } from "~/types/dto/cart";
import { ICartDetailEntity } from "~/types/entities/cart.entity";
import { useUserStore } from "./userStore";

export const useCartStore = defineStore("cart", {
  state: (): ICartDto => ({
    cartId: "",
    userId: "",
    cartDetails: [],
  }),
  getters: {
    totalItems: (state): number => {
      return state.cartDetails.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    totalPrice: (state): number => {
      return state.cartDetails.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
  actions: {
    addProduct(product: ICartDetailEntity) {
      this.cartDetails.push(product);
    },
    setUserId(userId: string) {
      this.userId = userId;
    },
    async getUserCart(userId?: string) {
      try {
        if (userId || this.userId) {
          const res = await useFetch(`/api/cart/${userId ?? this.userId}`, {
            method: "get",
          });
          this.userId = res.data.value?.userId ?? "";
          this.cartDetails = res.data.value?.details ?? [];
          this.cartId = res.data.value?.cartId ?? "";
          return true;
        }
        return false;
      } catch {
        return false;
      }
    },
    async orderProductInCart() {
      const userStore = useUserStore();
      try {
        if (this.userId) {
          const res = await useFetch("/api/order", {
            method: "POST",
            body: {
              order: {
                address: userStore.userData?.address,
                created: new Date(),
                status: "pending",
                userId: this.userId,
              },
              details: this.cartDetails.map((item) => ({
                inventoryId: item.inventoryId,
                quantity: item.quantity,
              })),
            },
          });
          if (res.data.value?.status === 200) {
            await this.getUserCart();
            message.success("Create order completed successfully!");
            return;
          }
          message.error("Server Error");
          return;
        }

        message.error("Account Error");
      } catch {
        message.error("Error");
        return false;
      }
    },
  },
});
