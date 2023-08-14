import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { IProduct } from "~/types";

export const useProductListStore = defineStore("product", {
    state: () => ({
        newProducts: [],
        menProducts: [],
        womenProducts: [],
        kidProducts: [],
    })
});
