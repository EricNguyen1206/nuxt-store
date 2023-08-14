// userStore.js
import { defineStore } from "pinia";
import { IInventoryDto } from "~/types/dto/inventory";

type TReceiptState = {
  details: IInventoryDto[];
};

export const useReceiptStore = defineStore("receipt", {
  state: (): TReceiptState => ({
    details: [],
  }),
  actions: {
    addProduct(product: IInventoryDto) {
      this.details.push(product);
    },
    async createReceipt() {
      try {
        await useFetch("/api/receipt", {
          method: "POST",
          body: {
            day: new Date(),
            details: this.details.map((d) => ({
              colorId: d.colorId,
              price: d.price,
              productId: d.productId,
              quantity: d.quantity,
              sizeId: d.sizeId,
            })),
          },
        });
        return true;
      } catch {
        return false;
      }
    },
  },
});
