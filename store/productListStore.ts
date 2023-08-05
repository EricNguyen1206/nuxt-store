import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { IProduct } from "~/types";

export const useProductListStore = defineStore("productListStore", () => {
    //state
    const data = ref<IProduct[]>([]);

    // getters
    const dataMen = computed(() =>
        data.value.filter((item) => item.category === "men")
    );
    const dataWomen = computed(() =>
        data.value.filter((item) => item.category === "women")
    );
    const dataKid = computed(() =>
        data.value.filter((item) => item.category === "kid")
    );

    //actions
    const setData = (products: IProduct[]) => {
        data.value = products;
    };

    return {
        data,
        dataMen,
        dataWomen,
        dataKid,
        setData,
    };
});
