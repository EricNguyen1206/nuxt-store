// userStore.js
import { defineStore } from "pinia";
import { ICategory } from "~/types/category";
import { IColor } from "~/types/color";
import { ISize } from "~/types/size";
import { ITag } from "~/types/tag";

interface AssetsState {
  colors: IColor[];
  sizes: ISize[];
  categories: ICategory[];
  tags: ITag[];
}

export const useAssetsStore = defineStore("asset", {
  state: (): AssetsState => ({
    colors: [],
    sizes: [],
    categories: [],
    tags: [],
  }),
  actions: {
    async getColors() {
      const res = await useFetch("/api/assets/color");
      this.colors = res.data.value?.data ?? [];
    },
    async getSizes() {
      const res = await useFetch("/api/assets/size");
      this.sizes = res.data.value?.data ?? [];
    },
    async getCategories() {
      const res = await useFetch("/api/assets/category");
      this.categories = res.data.value?.data ?? [];
    },
    async getTags() {
      const res = await useFetch("/api/assets/tag");
      this.tags = res.data.value?.data ?? [];
    },
  },
});
